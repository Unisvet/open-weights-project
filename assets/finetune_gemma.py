#!/usr/bin/env python3
"""
Spreeland-Maschinenbau GmbH - Gemma Fine-Tuning Script
This script demonstrates how to fine-tune a Gemma model locally on KMU machine data
using Parameter-Efficient Fine-Tuning (PEFT) and Low-Rank Adaptation (LoRA).
"""

import os
import sys
import torch
import pandas as pd
from datasets import Dataset
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    TrainingArguments,
    BitsAndBytesConfig
)
from peft import LoraConfig, get_peft_model, TaskType
from trl import SFTTrainer

# 1. Environment and Hardware Verification
print("=== Hardware- & System-Überprüfung ===")
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Verwende Gerät: {device.upper()}")
if device == "cuda":
    print(f"GPU Name: {torch.cuda.get_device_name(0)}")
    print(f"Freier Videospeicher: {torch.cuda.get_device_properties(0).total_memory / (1024**3):.2f} GB")
else:
    print("WARNING: Training auf einer CPU wird extrem langsam sein! NVIDIA GPU empfohlen.")

# 2. Configuration Parameters
MODEL_ID = "google/gemma-2-2b-it"  # Base model path on Hugging Face
OUTPUT_DIR = "./gemma-kmu-finetuned"
MAX_SEQ_LENGTH = 1024

# 3. Custom KMU Machinery Troubleshoot Data
print("\n=== Vorbereiten der KMU-Wartungsdaten ===")
kmu_data = [
    {
        "instruction": "Fehlermeldung E104 an der Spreeland Press V4 beheben.",
        "response": "Der Fehler E104 an der Press V4 deutet auf einen unzureichenden Öldruck im Hydraulikkreislauf hin. Gehen Sie wie folgt vor:\n1. Schalten Sie die Maschine ab und sichern Sie sie gegen Wiedereinschalten.\n2. Überprüfen Sie den Füllstand des Hydrauliköls am Schauglas (Soll: min. 60%).\n3. Prüfen Sie den Druckminderer Ventil Y3 auf Verstopfung.\n4. Reinigen Sie den Ölfilter F12. Falls der Fehler bestehen bleibt, kontaktieren Sie den Werkskundendienst."
    },
    {
        "instruction": "Wartungsintervall für den Turbomix S300 Mischkopf.",
        "response": "Der Mischkopf des Turbomix S300 erfordert folgende Wartungsintervalle:\n- Täglich: Sichtprüfung auf Dichtheit der Flansche und Reinigung der Mischkammer mit Spülmittellösung Typ M.\n- Alle 500 Betriebsstunden: Nachschmierung der Hauptlagerwelle mit Hochtemperaturfett Spreeland-HT-2.\n- Alle 2.000 Betriebsstunden oder jährlich: Vollständiger Austausch der PTFE-Dichtungen am Mischwellenauslass."
    },
    {
        "instruction": "Wie starte ich den Kalibrierungsmodus der Spreeland LaserCut 9000?",
        "response": "Um den Kalibrierungsmodus an der LaserCut 9000 zu starten:\n1. Navigieren Sie im Hauptmenü des Bedienpanels auf 'Service' -> 'System-Diagnose'.\n2. Geben Sie die KMU-Service-PIN '7739' ein.\n3. Wählen Sie 'Optische Justierung' und drücken Sie den grünen Taster 'Start/OK'.\n4. Die Maschine fährt nun automatisch die 5 Referenzpunkte ab. Platzieren Sie hierzu die Justierplatte auf dem Schneidtisch."
    }
]

df = pd.DataFrame(kmu_data)
dataset = Dataset.from_pandas(df)

# Gemma 4 / Gemma 2 Chat template structure
gemma_prompt = "<|turn>user\n{}<turn|>\n<|turn>model\n{}<turn|>"

def apply_template(sample):
    text = gemma_prompt.format(sample["instruction"], sample["response"])
    return {"text": text}

dataset = dataset.map(apply_template)
print(f"Datensatz geladen. Anzahl der Beispiele: {len(dataset)}")

# 4. Model Loading with 4-bit Quantization (bitsandbytes)
print("\n=== Lade vortrainiertes Gemma Modell (4-Bit Quantisierung) ===")
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True
)

tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
tokenizer.padding_side = "right"  # Padding side essential for causal LM training

model = AutoModelForCausalLM.from_pretrained(
    MODEL_ID,
    quantization_config=bnb_config,
    device_map="auto"
)

# 5. Configuring LoRA (PEFT)
print("\n=== Konfiguriere LoRA-Adapter (PEFT) ===")
peft_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type=TaskType.CAUSAL_LM
)

model = get_peft_model(model, peft_config)
model.print_trainable_parameters()

# 6. Training Arguments
print("\n=== Starte den SFTTrainer ===")
training_args = TrainingArguments(
    output_dir=OUTPUT_DIR,
    per_device_train_batch_size=1,
    gradient_accumulation_steps=4,
    learning_rate=2e-4,
    logging_steps=1,
    max_steps=20,  # Small step count for immediate workshop feedback
    optim="paged_adamw_8bit",
    fp16=True,
    remove_unused_columns=False,
    seed=3407
)

trainer = SFTTrainer(
    model=model,
    train_dataset=dataset,
    peft_config=peft_config,
    dataset_text_field="text",
    max_seq_length=MAX_SEQ_LENGTH,
    tokenizer=tokenizer,
    args=training_args,
)

# Run the training process
trainer.train()

# 7. Verification / Inference Test
print("\n=== Führe Inferenz-Test mit dem feinjustierten Modell aus ===")
test_prompt = gemma_prompt.format("Fehlermeldung E104 an der Spreeland Press V4 beheben.", "")
inputs = tokenizer(test_prompt, return_tensors="pt").to(device)

model.eval()
with torch.no_grad():
    outputs = model.generate(**inputs, max_new_tokens=150, temperature=0.1)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    print("\n--- Model Response ---")
    print(response)

# Save the adapter
print(f"\n=== Speichere LoRA-Adapter in {OUTPUT_DIR} ===")
model.save_pretrained(OUTPUT_DIR)
print("Erfolgreich beendet!")
