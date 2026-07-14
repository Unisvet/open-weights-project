# 🚀 Open-Weights-Modelle für KMU: Interaktiver Begleit-Leitfaden

Dieses Repository enthält den interaktiven Begleit-Leitfaden und die praktischen Entwicklungsmaterialien für den **Workshop zur digitalen Souveränität in kleinen und mittleren Unternehmen (KMU)**. Unser Ziel ist es, Betrieben im Spreeland zu zeigen, wie sie modernste Open-Weights-Sprachmodelle vollständig offline, datenschutzkonform und kostengünstig in ihre Produktions- und Verwaltungsprozesse integrieren können.

---

## 🌟 Projekt-Features

Das Projekt besteht aus einer High-End-Web-Applikation und einsatzbereiten Python-Modulen für die praxisnahe Erprobung:

1. **Interaktiver Einstieg**: Erklärung der Unterschiede zwischen Open-Weights (Datensouveränität, Offline-Betrieb) und geschlossenen Cloud-APIs (Datenabfluss, laufende API-Gebühren).
2. **Visuelle RAG-Datenreise**: Eine interaktive Infografik, die veranschaulicht, wie ein lokales Retrieval-Augmented Generation (RAG) System ein „externes Gedächtnis“ für interne PDFs (ISO-Normen, Handbücher) bildet, ohne dass Daten das Werkstor verlassen.
3. **Praktische Labore**:
   - **Labor 1: Qwen Feinabstimmung (Fine-Tuning)**: Ein direktes Google Colab-Notebook und lokale Skripte, um Qwen mit Unsloth und QLoRA auf eigene Maschinendaten anzupassen. Enthält einen Live-Vergleichs-Simulator im Browser.
   - **Labor 2: Autonome Agenten & Ollama CPU-Leitfaden**: Ein lauffähiger ReAct-Agent, der selbstständig logische Schlüsse zieht, interne Lagerbestände abfragt und Produktionszeiten kalkuliert. Enthält einen Live-Agenten-Simulator im Browser und einen umfassenden Leitfaden zur lokalen Ausführung auf reiner CPU-Hardware mit Ollama.
   - **Labor 3: Strukturierte Extraktion aus Rechnungen & E-Mails**: Anleitung und Simulator zur lokalen, fehlerfreien Übertragung unstrukturierter Eingänge in sauberes JSON-Datenbank-Format, sowie ein direkter Verweis auf den offiziellen [Google Cloud Skills: Generative AI Learning Path](https://www.skills.google/paths/3135) zur Vertiefung.
4. **Digitale-Souveränitäts-Quiz**: Ein interaktives Wissens-Quiz mit automatischer Generierung eines personalisierten Teilnahmezertifikats im PDF-Format.

---

## 📂 Repository-Struktur

```bash
open-weights-project/
├── index.html                   # Hauptseite des interaktiven Workshops
├── css/
│   └── style.css                # Premium Web-Design (Dark & Light Mode, Glassmorphism)
├── js/
│   └── app.js                   # Interaktive Event-Logiken, Simulatoren & Quiz-Engine
├── assets/
│   ├── Gemma_4_Fine_Tuning_Colab.ipynb  # Jupyter Notebook für das interaktive Fine-Tuning
│   ├── finetune_gemma.py        # Lokales Python-Skript für QLoRA-Feinabstimmung (Unsloth)
│   ├── gemma_agent.py           # Ausführbarer ReAct-Agent mit Gemma 4 (Ollama)
│   └── images/                  # Logos und Bundesförderungs-Banner (MBWE2025_de.jpg)
└── docs/
│   ├── offline_rag_guide.md     # Ausführlicher Leitfaden zur lokalen Offline-Inbetriebnahme
│   └── README.md                # Dokumentationsübersicht
```

---

## 🛠️ Schnellstart & Ausführung

### 1. Interaktiven Leitfaden im Browser starten
Sie können das interaktive Dashboard ohne Serverinstallation direkt starten. Öffnen Sie dazu einfach die Datei `index.html` per Doppelklick in einem beliebigen modernen Browser (Chrome, Edge, Firefox, Safari).

Alternativ können Sie einen lokalen Entwicklungs-Server starten:
```bash
# Mit Python (Standardmäßig installiert)
python -m http.server 8000
```
Öffnen Sie anschließend `http://localhost:8000` in Ihrem Browser.

---

### 2. Labor 1: Qwen Feinabstimmung (Fine-Tuning)
Das Feinabstimmungs-Notebook zeigt Ihnen Schritt für Schritt, wie Sie ein Qwen-Modell mit Ihren eigenen Betriebsdaten trainieren:
- **Online (Google Colab)**: Klicken Sie im interaktiven Leitfaden auf **„In Google Colab ausführen“** oder nutzen Sie den Link im Repository, um direkt auf kostenlosen T4-GPUs in der Cloud zu trainieren.
- **Lokal ausführen**: Das Trainingsskript befindet sich in `assets/finetune_gemma.py`. Es verwendet das extrem speichereffiziente Framework **Unsloth**:
  ```bash
  pip install unsloth torch transformers trl
  python assets/finetune_gemma.py
  ```

---

### 3. Labor 2: Lauffähiger Gemma 4 ReAct-Agent (mit lokalem Ollama)
Das Skript `assets/gemma_agent.py` führt einen echten autonomen KI-Agenten auf Ihrem System aus. Er verwendet den „Thinking Mode“ von Gemma 4, um komplexe Kundenanfragen in strukturierte Werkzeugaufrufe (API-Mocks) zu übersetzen.

#### Voraussetzungen:
1. Installieren Sie [Ollama](https://ollama.com/).
2. Laden Sie das Modell herunter (Tipp für reine CPUs: Nutzen Sie `gemma2:2b` für extrem schnellen Lauf):
   ```bash
   ollama run gemma4:12b # Hauptmodell
   # ODER der CPU-Tipp:
   ollama run gemma2:2b
   ```
3. Starten Sie den Agenten:
   ```bash
   # Abhängigkeiten installieren
   pip install ollama
   
   # Agenten ausführen
   python assets/gemma_agent.py
   ```

---

## 🤝 Kooperationspartner & Förderung

Das Projekt wird im Rahmen des Workshops zur Vorstellung lokaler KI-Technologien für kleine und mittlere Unternehmen präsentiert.

* **Mittelstand-Digital Zentrum Spreeland**: [www.digitalzentrum-spreeland.de](https://www.digitalzentrum-spreeland.de/)
* **Mittelstand-Digital Netzwerk**: [www.mittelstand-digital.de](https://www.mittelstand-digital.de/MD/Navigation/DE/Home/home.html)

---

## 🇩🇪 Gefördert durch

Dieses Projekt wird gefördert durch das **Bundesministerium für Wirtschaft und Energie (BMWE)** aufgrund eines Beschlusses des Deutschen Bundestages.

<img src="assets/images/MBWE2025_de.jpg" alt="BMWE Förderlogo" width="300" style="max-width: 100%; border-radius: 6px;" />
