#!/usr/bin/env python3
"""
Gemma Structured Extraction Script
Uses the locally running 'gemma-schnell' model via Ollama to extract
structured JSON data from unstructured invoice text files.
"""

import os
import sys
import json
import urllib.request

# --- Configuration ---
OLLAMA_API_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "gemma-schnell"

# JSON Schema target format
SYSTEM_PROMPT = """Du bist ein präziser Extraktions-Assistent für deutsche Rechnungen.
Lese die folgende Rechnung sorgfältig durch und extrahiere die Daten exakt in folgendem JSON-Format.
Antworte AUSSCHLIESSLICH mit dem puren JSON-Objekt. Verwende keine Erklärungen, kein Markdown (wie ```json) und keine Einleitung.

Ziel-JSON-Struktur:
{
  "rechnungssteller": "Name des Rechnungsstellers",
  "rechnungsnummer": "Die Rechnungsnummer",
  "datum": "Das Rechnungsdatum im Format YYYY-MM-DD oder DD.MM.YYYY",
  "betrag_netto": 0.0,
  "betrag_brutto": 0.0,
  "waehrung": "EUR",
  "positionen": [
    {
      "name": "Name oder Beschreibung des Artikels/Dienstleistung",
      "menge": 1,
      "gesamtpreis": 0.0
    }
  ]
}"""

def run_extraction(file_path):
    if not os.path.exists(file_path):
        print(f"Fehler: Datei '{file_path}' wurde nicht gefunden.")
        return

    # 1. Rechnungstext einlesen
    with open(file_path, "r", encoding="utf-8") as f:
        invoice_text = f.read()

    print(f"\n📄 Lese Rechnung ein: '{file_path}'...")
    print("-" * 60)
    print(invoice_text.strip()[:250] + "\n... [gekürzt] ...")
    print("-" * 60)

    # 2. Prompt für Ollama vorbereiten
    prompt = f"{SYSTEM_PROMPT}\n\nRechnungstext:\n{invoice_text}\n\nJSON-Antwort:"

    data = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": False,
        "options": {
            "temperature": 0.0,  # Absolute Vorhersagbarkeit, keine Kreativität
        }
    }

    print(f"🧠 Sende Daten an lokales Modell '{MODEL_NAME}'...")
    
    try:
        req = urllib.request.Request(
            OLLAMA_API_URL,
            data=json.dumps(data).encode("utf-8"),
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=30) as res:
            response_data = json.loads(res.read().decode("utf-8"))
            raw_response = response_data.get("response", "").strip()
            
            # Bereinige eventuelle Markdown-Umrandungen (```json ... ```) falls das Modell sich nicht ganz an die Anweisung hält
            if raw_response.startswith("```"):
                lines = raw_response.splitlines()
                if lines[0].startswith("```"):
                    lines = lines[1:]
                if lines[-1].startswith("```"):
                    lines = lines[:-1]
                raw_response = "\n".join(lines).strip()
            
            # Versuche als valides JSON zu parsen für schöne Formatierung
            try:
                parsed_json = json.loads(raw_response)
                print("\n🎯 [ERGEBNIS] Erfolgreich strukturiertes JSON extrahiert:")
                print(json.dumps(parsed_json, indent=2, ensure_ascii=False))
            except json.JSONDecodeError:
                print("\n⚠️ Das Modell hat kein reines JSON zurückgegeben, hier ist die Rohantwort:")
                print(raw_response)

    except Exception as e:
        print(f"\n❌ Fehler beim Aufruf der Ollama-API: {e}")
        print("Stellen Sie sicher, dass Ollama läuft (ollama run gemma-schnell).")

if __name__ == "__main__":
    # Standardmäßig rechnung_1001.txt extrahieren
    target_invoice = "Rechnungen/rechnung_1001.txt"
    if len(sys.argv) > 1:
        target_invoice = sys.argv[1]
    
    run_extraction(target_invoice)
