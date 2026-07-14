#!/usr/bin/env python3
"""
Gemma 4 ReAct Agent - Local KMU Assistant
This script demonstrates how to build a fully local, tool-using Agent (ReAct loop)
powered by Gemma 4 (run offline via Ollama or Hugging Face).
"""

import re
import sys
import json
import urllib.request

# --- 1. Define Local Agent Tools ---
def check_stock(item: str) -> str:
    """Verfügbaren Lagerbestand für ein bestimmtes Material oder Bauteil prüfen."""
    item = item.lower().strip()
    stock_db = {
        "titanbolzen": 320,
        "kupferrohr d15": 142,
        "ptfe-dichtung m20": 45,
        "hydrauliköl hlp46": 120,  # in Litern
    }
    for key, val in stock_db.items():
        if key in item:
            return f"ERGEBNIS: {val} Einheiten von '{key}' sind derzeit im Lager Spreeland verfügbar."
    return f"ERGEBNIS: '{item}' wurde nicht im Lagerkatalog gefunden."

def calculate_production_time(amount_str: str) -> str:
    """Berechnet die benötigte Produktionszeit in Stunden für eine bestimmte Anzahl an Einheiten."""
    try:
        # Extrahiere die Zahl aus dem String
        amount = int(re.search(r'\d+', amount_str).group())
    except (ValueError, AttributeError):
        return "FEHLER: Ungültige Mengenangabe. Bitte übergeben Sie eine Ganzzahl."
    
    # Produktionsgeschwindigkeit: 150 Stück pro Stunde auf Linie B
    rate_per_hour = 150
    hours = amount / rate_per_hour
    return f"ERGEBNIS: Die Produktion von {amount} Einheiten benötigt voraussichtlich {hours:.2f} Stunden auf Fertigungslinie B."

def query_technical_db(keyword: str) -> str:
    """Sucht in der internen technischen Datenbank nach Maschinenspezifikationen."""
    keyword = keyword.lower().strip()
    tech_db = {
        "press v4": "Spreeland Press V4: Hydraulikdruck Sollwert: 210 bar. Öltyp: HLP46. Fehler E104 = Öldruckabfall.",
        "turbomix s300": "Turbomix S300: Wartungsintervall Mischkopf alle 500 Stunden mit Fett HT-2. PTFE Dichtungen jährlicher Tausch.",
        "lasercut 9000": "Spreeland LaserCut 9000: Kalibrierungs-Code PIN: 7739. Optische Referenzprüfung erforderlich.",
    }
    for key, spec in tech_db.items():
        if key in keyword:
            return f"ERGEBNIS: {spec}"
    return f"ERGEBNIS: Keine Maschinenspezifikation für '{keyword}' gefunden."

# Mapping von Tool-Namen zu Python-Funktionen
TOOLS = {
    "check_stock": check_stock,
    "calculate_production_time": calculate_production_time,
    "query_technical_db": query_technical_db
}

# --- 2. ReAct Agent System-Prompt ---
SYSTEM_PROMPT = """Du bist 'Spreeland-Agent', ein intelligenter KI-Assistent für ein deutsches Fertigungsunternehmen (Spreeland-Maschinenbau GmbH).
Du hast Zugriff auf lokale Werkzeuge, um Aufgaben Schritt für Schritt zu lösen. Verwende das ReAct-Muster (Reasoning and Action):

Verwende strikt folgendes Format für deine Denkschritte:

Denken: Überlege, was als nächstes zu tun ist. Welches Werkzeug hilft dir?
Aktion: Name_des_Werkzeugs(Argument)
Beobachtung: Das Ergebnis des Werkzeugaufrufs (wird dir vom System übergeben).

(Dieses Denken-Aktion-Beobachtung-Muster kann sich mehrfach wiederholen)

Wenn du alle nötigen Informationen hast und die Aufgabe gelöst ist, antworte im Format:
Endantwort: Deine endgültige ausführliche Antwort an den Benutzer.

Verfügbare Werkzeuge:
1. check_stock(item): Prüft den Lagerbestand für Bauteile. Argument ist der Name des Bauteils (z.B. "Titanbolzen").
2. calculate_production_time(amount): Berechnet die Produktionszeit in Stunden für eine Stückzahl. Argument ist die gewünschte Menge (z.B. "1200").
3. query_technical_db(keyword): Sucht technische Spezifikationen für Maschinen. Argument ist der Maschinenname (z.B. "Press V4").

WICHTIG: Antworte pro Durchgang immer nur mit EINEM Denk- und Aktionsschritt und warte auf die Beobachtung! Wenn keine Werkzeuge mehr nötig sind, antworte direkt mit 'Endantwort:'."""

# --- 3. Local Inference Client (Ollama Helper) ---
def run_ollama_completion(prompt: str) -> str:
    """Sendet einen Prompt an eine lokal laufende Ollama-Instanz."""
    url = "http://localhost:11434/api/generate"
    data = {
        "model": "gemma-schnell",  # Nutzt das hardware-optimierte Modell
        "prompt": prompt,
        "stream": False,
        "options": {
            "temperature": 0.1,
            "stop": ["Beobachtung:"]
        }
    }
    
    try:
        req = urllib.request.Request(
            url, 
            data=json.dumps(data).encode("utf-8"), 
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=10) as res:
            response_data = json.loads(res.read().decode("utf-8"))
            return response_data.get("response", "").strip()
    except Exception as e:
        # Fallback Mock für Demo-Zwecke, falls Ollama nicht läuft oder offline gearbeitet wird
        return ""

# --- 4. Mock Agent Loop für Workshop-Demonstration ---
def mock_agent_run(user_query: str):
    """
    Demonstriert die Ausführung des ReAct Agenten Schritt für Schritt.
    Falls Ollama nicht erreichbar ist, wird der Datenfluss simuliert,
    um Teilnehmern das Prinzip von Gemma 4 Tool-Calls zu verdeutlichen.
    """
    print(f"\n[Benutzer-Anfrage]: {user_query}")
    print("-" * 50)
    
    # Wir simulieren den ReAct Loop für den Workshop-Fall, um den exakten Tokenflow zu demonstrieren
    steps = [
        {
            "thought": "Der Benutzer möchte wissen, wie viele Titanbolzen wir herstellen müssen und wie lange das dauert. Zuerst muss ich prüfen, wie viele Titanbolzen derzeit auf Lager sind.",
            "action_name": "check_stock",
            "action_arg": "Titanbolzen"
        },
        {
            "thought": "Wir haben 320 Titanbolzen auf Lager. Für einen Auftrag von 1500 Einheiten fehlen uns also genau 1180 Stück (1500 - 320 = 1180). Jetzt muss ich die Produktionszeit für diese verbleibenden 1180 Titanbolzen berechnen.",
            "action_name": "calculate_production_time",
            "action_arg": "1180"
        },
        {
            "thought": "Ich habe alle notwendigen Informationen. Wir haben 320 Titanbolzen auf Lager. Wir müssen 1180 Einheiten neu produzieren, was 7,87 Stunden auf Fertigungslinie B dauern wird. Nun formuliere ich die Endantwort für den Kunden.",
            "final": "Endantwort: Für den angeforderten Auftrag von 1.500 Einheiten Titanbolzen haben wir derzeit bereits 320 Stück im Lager Spreeland vorrätig. Die verbleibenden 1.180 Einheiten müssen neu gefertigt werden. Dies wird auf unserer Fertigungslinie B eine Produktionszeit von voraussichtlich **7,87 Stunden** beanspruchen. Wir können somit unmittelbar nach Schichtbeginn mit der Auslieferung der Lagerware beginnen und die Produktion am selben Tag abschließen."
        }
    ]
    
    for i, step in enumerate(steps):
        print(f"\n⚡ [SCHRITT {i+1}] Denken und Planen...")
        print(f"Denken: {step.get('thought')}")
        
        if "final" in step:
            print(f"\n🎯 [AGENTEN-ANTWORT]:")
            print(step["final"])
            break
        
        tool_name = step["action_name"]
        tool_arg = step["action_arg"]
        print(f"Aktion: {tool_name}(\"{tool_arg}\")")
        
        # Führe das reale Tool aus!
        print(f"⚙️ Rufe Werkzeug '{tool_name}' im Hintergrund auf...")
        observation = TOOLS[tool_name](tool_arg)
        print(f"{observation}")

if __name__ == "__main__":
    query = "Wir benötigen für einen Kundenauftrag dringend 1.500 Titanbolzen. Prüfe den aktuellen Lagerbestand und berechne, wie lange die Produktion der fehlenden Menge dauert."
    
    # Prüfe ob Ollama läuft
    print("Starte Spreeland-Agent System...")
    mock_agent_run(query)
