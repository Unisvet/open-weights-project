/**
 * Open-Weights-Modelle für KMU einfach erklärt
 * Workshop Interactive Logic & Engines
 */

// 1. Theme Switcher Logic
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const htmlEl = document.documentElement;
    const toggleIcon = document.getElementById('theme-toggle-icon');
    const toggleText = document.getElementById('theme-toggle-text');
    
    if (savedTheme === 'light') {
        htmlEl.classList.remove('theme-dark');
        htmlEl.classList.add('theme-light');
        if (toggleText) toggleText.innerText = 'Dunkler Modus';
        if (toggleIcon) {
            // Moon icon SVG
            toggleIcon.innerHTML = `<path d="M12 3c.13 0 .26 0 .38.01C9.47 5.61 9.47 10.39 12.38 13c-3.14 0-5.38-2.61-5.38-5.7 0-3.32 2.24-5.3 5-5.3zM12 1c-4.97 0-8 3.58-8 8s3.03 8 8 8 8-3.58 8-8c0-3.32-2.24-8-8-8z"/>`;
        }
    } else {
        htmlEl.classList.remove('theme-light');
        htmlEl.classList.add('theme-dark');
        if (toggleText) toggleText.innerText = 'Heller Modus';
        if (toggleIcon) {
            // Sun icon SVG
            toggleIcon.innerHTML = `<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>`;
        }
    }
}

function toggleTheme() {
    const htmlEl = document.documentElement;
    if (htmlEl.classList.contains('theme-light')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
    initTheme();
}

// 2. Tab Navigation Logic
function switchTab(tabId) {
    // Deactivate all nav items and panels
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(el => el.classList.remove('active'));
    
    // Activate clicked ones
    const navItem = document.getElementById(`nav-${tabId}`);
    const tabPanel = document.getElementById(`tab-${tabId}`);
    
    if (navItem) navItem.classList.add('active');
    if (tabPanel) tabPanel.classList.add('active');

    // Force quiz rendering when switching to quiz tab
    if (tabId === 'quiz') {
        renderQuizQuestion();
    }
    
    // Dynamically update the global hero introduction description with fun stories & quotes
    const heroDescEl = document.getElementById('hero-desc-global');
    if (heroDescEl) {
        // Add a smooth fade-out / fade-in micro-animation
        heroDescEl.style.transition = 'opacity 0.15s ease';
        heroDescEl.style.opacity = '0';
        
        setTimeout(() => {
            if (tabId === 'intro') {
                heroDescEl.innerHTML = `💡 <strong>„Das Wissen teilen, nicht die Kontrolle abgeben.“</strong><br>
                    Willkommen im Cockpit Ihres KI-Workshops! Begleiten Sie uns auf einer Entdeckungsreise, wie kleine und mittlere Unternehmen (KMU) dank moderner Open-Weights-Modelle wie <strong>Gemma 4 12B Unified</strong> die volle Datensouveränität behalten, komplett offline arbeiten und kostengünstig maßgeschneiderte KI-Lösungen implementieren können.`;
            } else if (tabId === 'infographic') {
                heroDescEl.innerHTML = `📖 <strong>Die Spurensuche im Dokumenten-Dschungel...</strong><br>
                    Stellen Sie sich vor: Ein Meister sucht um 3 Uhr nachts ein Toleranzmaß in einem 500-seitigen PDF-Wartungsordner von 1998. Unser lokales RAG-System findet es in <strong>0,8 Sekunden</strong> – ohne, dass auch nur ein einziges Byte Ihr Werkstor verlässt. Klicken Sie unten auf die Komponenten und reisen Sie mit den Daten!`;
            } else if (tabId === 'lab') {
                heroDescEl.innerHTML = `💻 <strong>Vom Code-Zeilen-Jongleur zum Offline-Architekten!</strong><br>
                    <em>„The best way to predict the future is to invent it.“ – Alan Kay</em>. Genug der Theorie: Jetzt krempeln wir die Ärmel hoch! Mit nur einem einzigen Python-Skript und dem ultraschnellen Paketmanager <strong>uv</strong> erwecken wir Ihre eigene Gemma 4 auf Ihrem Rechner zum Leben. Los geht's!`;
            } else if (tabId === 'quiz') {
                heroDescEl.innerHTML = `🏆 <strong>Wer wird KI-Souveränitäts-Millionär?</strong><br>
                    Die Hardware summt, der Code steht – aber haben Sie das Zeug zum echten Offline-Champion? Stellen Sie Ihr neues Wissen in unserem interaktiven 5-Fragen-Quiz auf die Probe und holen Sie sich Ihr personalisiertes <strong>Zertifikat für digitale Souveränität</strong>!`;
            }
            heroDescEl.style.opacity = '1';
        }, 150);
    }
    
    // Smooth scroll top on tab switch
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 3. Interactive Weights Visualizer
function updateWeightsVisuals() {
    const w1 = parseFloat(document.getElementById('slider-weight-1').value);
    const w2 = parseFloat(document.getElementById('slider-weight-2').value);
    const w3 = parseFloat(document.getElementById('slider-weight-3').value);
    
    document.getElementById('val-w1').innerText = w1.toFixed(1);
    document.getElementById('val-w2').innerText = w2.toFixed(1);
    document.getElementById('val-w3').innerText = w3.toFixed(1);
    
    // Adjust opacity and stroke of SVG weight lines based on sliders
    const scaleFactor = 0.35;
    
    // Layer 1 weights (Input to Hidden)
    document.querySelectorAll('.net-weight-line').forEach(line => {
        const id = line.id;
        let opacity = 0.2;
        let width = 2;
        
        if (id.startsWith('line-0-')) {
            opacity = 0.1 + (w1 * scaleFactor);
            width = 1.5 + (w1 * 2);
        } else if (id.startsWith('line-1-')) {
            opacity = 0.1 + (w2 * scaleFactor);
            width = 1.5 + (w2 * 2);
        } else if (id.startsWith('line-2-')) {
            opacity = 0.1 + (w3 * scaleFactor);
            width = 1.5 + (w3 * 2);
        } else if (id.includes('-out')) {
            // Hidden to Output combines signals
            opacity = 0.1 + ((w1 + w2) / 2 * scaleFactor);
            width = 1.5 + ((w1 + w2) / 2 * 2);
        }
        
        line.style.strokeOpacity = Math.min(1, opacity);
        line.style.strokeWidth = `${width}px`;
        
        // Highlight active connections with glow
        if (opacity > 0.6) {
            line.classList.add('active');
        } else {
            line.classList.remove('active');
        }
    });
}

// 4. Interactive Infographic Steps DB
const infographicSteps = {
    docs: {
        badge: "Komponente 1",
        title: "Dokumentenordner (Sicherer Speicher)",
        desc: "Der Ausgangspunkt Ihres lokalen Firmenwikis. Hier liegen all Ihre PDFs, alten ISO-Normen, Wartungsprotokolle und Betriebsanleitungen in einem geschützten, rein lokalen Ordner auf Ihrer Arbeitsstation oder Ihrem Intranet-Server.",
        tip: "Praxis-Tipp: Sortieren Sie unvollständige Scans oder extrem verrauschte Bild-PDFs vorher aus, um die Qualität des Sprachmodells voll auszunutzen."
    },
    embed: {
        badge: "Komponente 2",
        title: "Lokale Embeddings (Vektorisierung)",
        desc: "Die PDFs werden in Textblöcke (Chunks) zerlegt. Ein leichtgewichtiges lokales Modell (z. B. nomic-embed-text) wandelt diese Textstücke in mathematische Zahlenreihen (Embeddings) um. Diese drücken die semantische Bedeutung des Texts aus.",
        tip: "Sicherheits-Vorteil: Dieser Schritt findet zu 100% offline statt. Es wird keine Cloud-API (wie OpenAI) kontaktiert. Ihre firmeneigenen Daten verbleiben auf Ihrem System."
    },
    vector: {
        badge: "Komponente 3",
        title: "Vektordatenbank (ChromaDB)",
        desc: "Die generierten mathematischen Vektoren werden zusammen mit dem Originaltext in einer lokalen Vektordatenbank (z. B. Chroma) indiziert. Dies ist das 'externe Gedächtnis' der KI, das blitzschnelle Ähnlichkeitssuchen in Sekundenschnelle erlaubt.",
        tip: "Technische Notiz: ChromaDB läuft als dateibasierte Datenbank direkt in Ihrem Python-Prozess. Es ist keine komplexe Server-Installation notwendig!"
    },
    query: {
        badge: "Ablauf 4",
        title: "Mitarbeiter-Anfrage (Input)",
        desc: "Ein Mitarbeiter stellt dem Firmenwiki eine konkrete fachliche Frage. Zum Beispiel: 'Welche Toleranzmaße galten bei der Ventil-Baugruppe X aus dem Projekt von 2026?'.",
        tip: "Multimodalität: Gemma 4 12B Unified kann zusätzlich zum Text auch Konstruktionszeichnungen (Bilder) oder aufgezeichnete Audionotizen als Eingabe verarbeiten!"
    },
    prompt: {
        badge: "Synthese 5",
        title: "Prompt-Synthesizer (Kontext-Injektion)",
        desc: "Das System sucht in der Vektordatenbank nach den zwei oder drei Textblöcken, die semantisch am besten zur Frage passen. Es baut daraus automatisch einen strukturierten Prompt zusammen: 'Beantworte die Frage NUR basierend auf diesem Kontext: [Kontext] Frage: [Frage]'.",
        tip: "Präzision: Durch diese Methode wird das gefürchtete 'Halluzinieren' (Erfinden von Fakten) der KI nahezu komplett unterbunden."
    },
    gemma: {
        badge: "Gehirn 6",
        title: "Gemma 4 12B Unified (Offline LLM)",
        desc: "Das hochmoderne Open-Weights-Modell Gemma 4 liest die synthetisierte Anfrage inklusive der gelieferten Quelltexte offline aus dem RAM Ihres Rechners. Es versteht den technischen Kontext sofort und formuliert eine präzise, menschliche Antwort.",
        tip: "Hardware-Anforderung: Das 12B Unified-Modell läuft flüssig auf einem handelsüblichen Workstation-Laptop mit dedizierter Grafikkarte (z.B. RTX 4060 oder Mac M2/M3 mit 16GB RAM)."
    }
};

function selectSvgNode(nodeId) {
    // Update active classes in SVG
    document.querySelectorAll('.svg-step-node').forEach(node => {
        node.classList.remove('active');
    });
    const selectedNode = document.getElementById(`node-${nodeId}`);
    if (selectedNode) selectedNode.classList.add('active');
    
    // Update active classes on path lines
    document.querySelectorAll('.svg-data-path').forEach(path => {
        path.classList.remove('active');
    });
    
    // Toggle active paths depending on node selected
    if (nodeId === 'docs' || nodeId === 'embed') {
        document.getElementById('path-docs-embed').classList.add('active');
    }
    if (nodeId === 'embed' || nodeId === 'vector') {
        document.getElementById('path-embed-vector').classList.add('active');
    }
    if (nodeId === 'query' || nodeId === 'prompt') {
        document.getElementById('path-query-prompt').classList.add('active');
    }
    if (nodeId === 'vector' || nodeId === 'prompt') {
        document.getElementById('path-vector-prompt').classList.add('active');
    }
    if (nodeId === 'prompt' || nodeId === 'gemma') {
        document.getElementById('path-prompt-gemma').classList.add('active');
    }

    // Update Drawer text contents
    const stepData = infographicSteps[nodeId];
    if (stepData) {
        document.getElementById('drawer-step-badge').innerText = stepData.badge;
        document.getElementById('drawer-step-title').innerText = stepData.title;
        document.getElementById('drawer-step-desc').innerText = stepData.desc;
        document.getElementById('drawer-step-tip').innerHTML = `<strong>Praxis-Tipp:</strong> ${stepData.tip}`;
    }
}

// 5. Stepper Logic for Lab Section
let currentStepIndex = 0;
const totalStepsCount = 4;

function goToStep(stepIndex) {
    currentStepIndex = stepIndex;
    updateStepperVisuals();
}

function changeStep(direction) {
    currentStepIndex += direction;
    if (currentStepIndex < 0) currentStepIndex = 0;
    if (currentStepIndex >= totalStepsCount) currentStepIndex = totalStepsCount - 1;
    updateStepperVisuals();
}

function updateStepperVisuals() {
    // Stepper nodes state
    const steps = document.querySelectorAll('.step-node');
    steps.forEach((step, idx) => {
        step.classList.remove('active', 'completed');
        if (idx < currentStepIndex) {
            step.classList.add('completed');
        } else if (idx === currentStepIndex) {
            step.classList.add('active');
        }
    });
    
    // Stepper line progress width
    const progressPercent = (currentStepIndex / (totalStepsCount - 1)) * 100;
    document.getElementById('stepper-progress').style.width = `${progressPercent}%`;
    
    // Panel visibility
    document.querySelectorAll('.step-panel').forEach((panel, idx) => {
        panel.classList.remove('active');
        if (idx === currentStepIndex) {
            panel.classList.add('active');
        }
    });
    
    // Navigation buttons state
    document.getElementById('btn-prev-step').disabled = (currentStepIndex === 0);
    
    const nextBtn = document.getElementById('btn-next-step');
    if (currentStepIndex === totalStepsCount - 1) {
        nextBtn.innerText = 'Bereit zum Testen';
        nextBtn.disabled = true; // Stay in simulator playground
    } else {
        nextBtn.innerText = 'Weiter';
        nextBtn.disabled = false;
    }
}

// 6. SUB-LAB & SIMULATORS LOGIC
function switchSubLab(subLabId) {
    // Switch active buttons
    document.querySelectorAll('.sub-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.sub-lab-panel').forEach(panel => panel.classList.remove('active'));

    const activeBtn = document.getElementById(`btn-sub-${subLabId}`);
    const activePanel = document.getElementById(`sub-lab-${subLabId}`);

    if (activeBtn) activeBtn.classList.add('active');
    if (activePanel) activePanel.classList.add('active');
}

// Fine-Tuning Simulator Data
const ftScenarios = {
    press: {
        prompt: "Fehlermeldung E104 an der Spreeland Press V4 beheben.",
        base: "Es tut mir leid, aber ich habe keine spezifischen Informationen über 'Spreeland Press V4' oder 'Fehler E104' in meinen allgemeinen Trainingsdaten. Bitte konsultieren Sie das Benutzerhandbuch des Herstellers oder kontaktieren Sie Ihren internen technischen Support, um Maschinenschäden zu vermeiden.",
        tuned: "Der Fehler E104 an der Press V4 deutet auf einen unzureichenden Öldruck im Hydraulikkreislauf hin. Gehen Sie wie folgt vor:\n\n1. Schalten Sie die Maschine ab und sichern Sie sie gegen Wiedereinschalten.\n2. Überprüfen Sie den Füllstand des Hydrauliköls am Schauglas (Soll: min. 60%).\n3. Prüfen Sie den Druckminderer Ventil Y3 auf Verstopfung.\n4. Reinigen Sie den Ölfilter F12. Falls der Fehler bestehen bleibt, kontaktieren Sie den Werkskundendienst."
    },
    turbomix: {
        prompt: "Wartungsintervall für den Turbomix S300 Mischkopf.",
        base: "Das Wartungsintervall für Industrie-Mischköpfe liegt üblicherweise zwischen 100 und 1000 Betriebsstunden, abhängig von der Materialbelastung. Bitte schauen Sie in die Herstellerspezifikation Ihres Modells oder fragen Sie den Systemadministrator Ihrer Produktionslinie.",
        tuned: "Der Mischkopf des Turbomix S300 erfordert folgende Wartungsintervalle:\n\n- Täglich: Sichtprüfung auf Dichtheit der Flansche und Reinigung der Mischkammer mit Spülmittellösung Typ M.\n- Alle 500 Betriebsstunden: Nachschmierung der Hauptlagerwelle mit Hochtemperaturfett Spreeland-HT-2.\n- Alle 2.000 Betriebsstunden oder jährlich: Vollständiger Austausch der PTFE-Dichtungen am Mischwellenauslass."
    },
    lasercut: {
        prompt: "Wie starte ich den Kalibrierungsmodus der Spreeland LaserCut 9000?",
        base: "Um einen Laser-Cutter zu kalibrieren, müssen Sie in der Regel in die Systemeinstellungen gehen. Wenn Sie ein Passwort benötigen, wenden Sie sich bitte an Ihren Vorarbeiter. Sichern Sie die Maschine und tragen Sie eine Schutzbrille, bevor Sie Justierungen an den Spiegeln vornehmen.",
        tuned: "Um den Kalibrierungsmodus an der LaserCut 9000 zu starten:\n\n1. Navigieren Sie im Hauptmenü des Bedienpanels auf 'Service' -> 'System-Diagnose'.\n2. Geben Sie die KMU-Service-PIN '7739' ein.\n3. Wählen Sie 'Optische Justierung' und drücken Sie den grünen Taster 'Start/OK'.\n4. Die Maschine fährt nun automatisch die 5 Referenzpunkte ab. Platzieren Sie hierzu die Justierplatte auf dem Schneidtisch."
    }
};

function updateFtScenario() {
    const select = document.getElementById('ft-scenario');
    const scenario = select.value;
    const data = ftScenarios[scenario];

    if (!data) return;

    // Update prompts displays
    document.getElementById('ft-prompt-base').innerText = data.prompt;
    document.getElementById('ft-prompt-tuned').innerText = data.prompt;

    // Fade and update responses
    const baseRes = document.getElementById('ft-response-base');
    const tunedRes = document.getElementById('ft-response-tuned');

    baseRes.style.opacity = '0.3';
    tunedRes.style.opacity = '0.3';

    setTimeout(() => {
        baseRes.innerText = data.base;
        tunedRes.innerText = data.tuned;
        baseRes.style.opacity = '1';
        tunedRes.style.opacity = '1';
    }, 200);
}

// Extraction Simulator Data
const extScenarios = {
    invoice: {
        input: "RECHNUNG - Spreeland Industriebedarf GmbH\nRechnungsnummer: RE-2026-88391\nDatum: 14. Juli 2026\nKundennummer: DE-99382\n\nPosten:\n1. 10x PTFE-Dichtung M20 (Art-Nr: 55319) - Einzelpreis: 4,50 EUR - Gesamt: 45,00 EUR\n2. 2x Hydrauliköl HLP46 20L (Art-Nr: 88201) - Einzelpreis: 59,90 EUR - Gesamt: 119,80 EUR\n\nNetto-Betrag: 164,80 EUR\nUSt. (19%): 31,31 EUR\nBruttobetrag: 196,11 EUR\nZahlbar innerhalb von 14 Tagen ohne Abzug auf DE88 3005 0000 1234 5678 90.",
        output: "{\n  \"beleg_typ\": \"Rechnung\",\n  \"rechnungsnummer\": \"RE-2026-88391\",\n  \"datum\": \"2026-07-14\",\n  \"aussteller\": \"Spreeland Industriebedarf GmbH\",\n  \"kundennummer\": \"DE-99382\",\n  \"waehrung\": \"EUR\",\n  \"bruttobetrag\": 196.11,\n  \"posten\": [\n    {\n      \"bezeichnung\": \"PTFE-Dichtung M20\",\n      \"menge\": 10,\n      \"gesamtpreis\": 45.0\n    },\n    {\n      \"bezeichnung\": \"Hydrauliköl HLP46 20L\",\n      \"menge\": 2,\n      \"gesamtpreis\": 119.8\n    }\n  ]\n}"
    },
    email_kunden: {
        input: "Betreff: Express-Bestellung & Reklamation zu Ticket-77291\n\nSehr geehrte Damen und Herren,\n\nwir müssen dringend 150 Stück Kupferschrauben M10 nachbestellen (bitte Expresslieferung an Werk 2, Herr Schneider).\n\nZudem reklamieren wir die letzte Lieferung vom 08. Juli. Dort waren von den 500 bestellten Titanbolzen leider 12 Stück fehlerhaft gewindet und unbrauchbar. Bitte buchen Sie uns den entsprechenden Betrag von 54,00 € auf unser Kundenkonto zurück.\n\nMit freundlichen Grüßen,\nFirma Metallbau Spree-Neiße",
        output: "{\n  \"beleg_typ\": \"Kunden-E-Mail\",\n  \"absender\": \"Firma Metallbau Spree-Neiße\",\n  \"bestellungen\": [\n    {\n      \"artikel\": \"Kupferschrauben M10\",\n      \"menge\": 150,\n      \"ort\": \"Werk 2 (Herr Schneider)\",\n      \"versand\": \"Express\"\n    }\n  ],\n  \"reklamationen\": [\n    {\n      \"ticket_id\": \"Ticket-77291\",\n      \"datum_bezug\": \"2026-07-08\",\n      \"artikel\": \"Titanbolzen\",\n      \"menge_defekt\": 12,\n      \"erstattungsbetrag_eur\": 54.0\n    }\n  ]\n}"
    },
    note: {
        input: "Notiz an Schichtwechsel:\n\nTurbomix S300 hat bei Schichtende seltsam vibriert. Müller hat den Mischkopf grob gereinigt, aber die Lagerwelle müsste dringend mal wieder nachgeschmiert werden. \n\nSollte spätestens in 3 Tagen passieren, sonst blockiert das noch alles. Kein Fehlercode sichtbar.",
        output: "{\n  \"beleg_typ\": \"Werkstattbericht\",\n  \"maschine\": \"Turbomix S300\",\n  \"zeitstempel\": \"Schichtende\",\n  \"fehlercode\": null,\n  \"techniker\": \"Müller\",\n  \"prioritaet\": \"MITTEL\",\n  \"ursache\": \"Hauptlagerwelle muss nachgeschmiert werden\",\n  \"massnahmen\": [\n    \"Mischkopf grob gereinigt\"\n  ]\n}"
    }
};

function updateExtScenario() {
    const select = document.getElementById('ext-scenario');
    const scenario = select.value;
    const data = extScenarios[scenario];

    if (!data) return;

    const inputDisplay = document.getElementById('ext-input-text');
    const outputDisplay = document.getElementById('ext-output-json');

    inputDisplay.style.opacity = '0.3';
    outputDisplay.style.opacity = '0.3';

    setTimeout(() => {
        inputDisplay.innerText = data.input;
        outputDisplay.innerText = data.output;
        inputDisplay.style.opacity = '1';
        outputDisplay.style.opacity = '1';
    }, 200);
}

// ReAct Agent Simulator Loop
const agentScenarios = {
    bolts: [
        { type: "text", text: "// Starte ReAct-Lauf für: '1.500 Titanbolzen bestellen - Lagerbestand prüfen & Produktionszeit kalkulieren'..." },
        { type: "thought", text: "Der Benutzer möchte wissen, wie viele Titanbolzen wir herstellen müssen und wie lange das dauert. Zuerst muss ich prüfen, wie viele Titanbolzen derzeit auf Lager sind. Ich rufe das Werkzeug check_stock auf." },
        { type: "action", text: "check_stock(\"Titanbolzen\")" },
        { type: "observation", text: "ERGEBNIS: 320 Einheiten von 'titanbolzen' sind derzeit im Lager Spreeland verfügbar." },
        { type: "thought", text: "Wir haben 320 Titanbolzen auf Lager. Für einen Auftrag von 1500 Einheiten fehlen uns also genau 1180 Stück (1500 - 320 = 1180). Jetzt muss ich die Produktionszeit für diese verbleibenden 1180 Titanbolzen berechnen. Ich rufe das Werkzeug calculate_production_time auf." },
        { type: "action", text: "calculate_production_time(\"1180\")" },
        { type: "observation", text: "ERGEBNIS: Die Produktion von 1180 Einheiten benötigt voraussichtlich 7.87 Stunden auf Fertigungslinie B." },
        { type: "thought", text: "Ich habe alle notwendigen Informationen. Wir haben 320 Titanbolzen auf Lager. Wir müssen 1180 Einheiten neu produzieren, was 7.87 Stunden auf Fertigungslinie B dauern wird. Nun formuliere ich die Endantwort für den Kunden." },
        { type: "final", text: "Für den angeforderten Auftrag von 1.500 Einheiten Titanbolzen haben wir derzeit bereits 320 Stück im Lager Spreeland vorrätig. Die verbleibenden 1.180 Einheiten müssen neu gefertigt werden. Dies wird auf unserer Fertigungslinie B eine Produktionszeit von voraussichtlich **7,87 Stunden** beanspruchen. Wir können somit unmittelbar nach Schichtbeginn mit der Auslieferung der Lagerware beginnen und die Produktion am selben Tag abschließen." }
    ],
    lasercut: [
        { type: "text", text: "// Starte ReAct-Lauf für: 'LaserCut 9000 kalibrieren'..." },
        { type: "thought", text: "Der Benutzer möchte den Kalibrierungsmodus für die LaserCut 9000 starten. Hierzu benötige ich spezifische technische Details wie z.B. einen PIN-Code oder Zugangsdaten. Ich frage die interne technische Datenbank ab." },
        { type: "action", text: "query_technical_db(\"LaserCut 9000\")" },
        { type: "observation", text: "ERGEBNIS: Spreeland LaserCut 9000: Kalibrierungs-Code PIN: 7739. Optische Referenzprüfung erforderlich." },
        { type: "thought", text: "Ich habe die PIN (7739) und die Anforderung einer optischen Referenzprüfung ermittelt. Ich formuliere nun die präzise Schritt-für-Schritt-Anleitung für den Bediener." },
        { type: "final", text: "Um die LaserCut 9000 erfolgreich zu kalibrieren, führen Sie bitte folgende Schritte am Bedienpanel aus:\n\n1. Öffnen Sie 'Service' -> 'System-Diagnose'.\n2. Geben Sie die ermittelte Service-PIN **7739** ein.\n3. Wählen Sie 'Optische Justierung' aus und drücken Sie 'Start/OK'.\n4. Die Maschine führt eine optische Referenzprüfung durch und fährt selbstständig 5 Punkte ab. Stellen Sie sicher, dass die Justierplatte auf dem Schneidtisch liegt." }
    ],
    turbomix: [
        { type: "text", text: "// Starte ReAct-Lauf für: 'Turbomix S300 Mischkopf warten'..." },
        { type: "thought", text: "Für den Turbomix S300 soll die Wartung geprüft werden. Ich muss die Service-Intervalle nachschlagen, um zu sehen, welche Aufgaben fällig sind, und ob wir die Materialien auf Lager haben." },
        { type: "action", text: "query_technical_db(\"Turbomix S300\")" },
        { type: "observation", text: "ERGEBNIS: Turbomix S300: Wartungsintervall Mischkopf alle 500 Stunden mit Fett HT-2. PTFE Dichtungen jährlicher Tausch." },
        { type: "thought", text: "Der Mischkopf benötigt Schmierung mit Fett HT-2 und Dichtungstausch. Ich sollte prüfen, ob PTFE-Dichtungen auf Lager sind, um den Tausch vorzubereiten." },
        { type: "action", text: "check_stock(\"PTFE-Dichtung\")" },
        { type: "observation", text: "ERGEBNIS: 45 Einheiten von 'ptfe-dichtung m20' sind derzeit im Lager Spreeland verfügbar." },
        { type: "thought", text: "Wir haben 45 PTFE-Dichtungen auf Lager, was für die Wartung ausreicht. Ich erstelle die endgültige Antwort mit dem Wartungsfahrplan." },
        { type: "final", text: "Der Wartungsfahrplan für den Turbomix S300 sieht folgendes vor:\n\n- **Mischkopf-Schmierung (alle 500h):** Verwenden Sie das Hochtemperaturfett Spreeland-HT-2.\n- **Dichtungstausch (jährlich):** Ein Austausch der PTFE-Dichtungen ist erforderlich. Im Lager Spreeland sind aktuell **45 Einheiten** von 'ptfe-dichtung m20' vorrätig (Soll erfüllt). Die Wartung kann somit sofort durchgeführt werden." }
    ]
};

let simInterval = null;

function startAgentSimulation() {
    const task = document.getElementById('agent-task').value;
    const btn = document.getElementById('btn-start-agent');
    const consoleLog = document.getElementById('agent-console-log');
    const steps = agentScenarios[task];

    if (!steps) return;

    // Reset Console
    consoleLog.innerHTML = "";
    btn.disabled = true;
    btn.innerText = "Agent läuft...";

    if (simInterval) clearInterval(simInterval);

    let stepIdx = 0;

    function renderNextStep() {
        if (stepIdx < steps.length) {
            const step = steps[stepIdx];
            let html = "";

            if (step.type === "text") {
                html = `<div class="console-line text-muted">${step.text}</div>`;
            } else if (step.type === "thought") {
                html = `<div class="console-line console-thought"><strong>🧠 Denken:</strong> ${step.text}</div>`;
            } else if (step.type === "action") {
                html = `<div class="console-line"><strong>⚙️ Aktion (Tool Call):</strong> <span class="console-action">${step.text}</span></div>`;
            } else if (step.type === "observation") {
                html = `<div class="console-line console-observation"><strong>📥 Beobachtung:</strong> ${step.text}</div>`;
            } else if (step.type === "final") {
                html = `<div class="console-line console-final"><strong>🎯 Endantwort (Gemma 4):</strong><br>${step.text.replace(/\n/g, '<br>')}</div>`;
            }

            consoleLog.innerHTML += html;
            consoleLog.scrollTop = consoleLog.scrollHeight;
            stepIdx++;
        } else {
            clearInterval(simInterval);
            btn.disabled = false;
            btn.innerText = "🚀 Agenten-Loop starten";
        }
    }

    simInterval = setInterval(renderNextStep, 2000);
    renderNextStep(); // Run the first one immediately
}

// 7. Interactive Quiz Engine
const quizQuestions = [
    {
        q: "Was unterscheidet ein Open-Weights-Modell (wie Googles Gemma) im Kern von einem herkömmlichen Cloud-Modell?",
        options: [
            "Es besitzt keine veränderbaren Verbindungsgewichte und rechnet nur mit festen mathematischen Konstanten.",
            "Es funktioniert nur im Freien und benötigt keine Stromverbindung.",
            "Es kann nur Bilder, aber niemals Texte oder Code verarbeiten.",
            "Die trainierten Gewichte (Weights) sind frei verfügbar, wodurch es komplett lokal, offline und ohne Datenabfluss betrieben werden kann."
        ],
        correct: 3,
        feedback: "Korrekt! Open-Weights bedeutet, dass die Parameter öffentlich zur Verfügung stehen und Sie das Modell ohne Datenweitergabe an Dritte komplett offline auf Ihrer eigenen Hardware betreiben können."
    },
    {
        q: "Welches Gemma-Modell wird für Standard-Laptops mit 16 GB RAM empfohlen, um eine flüssige CPU-Ausführung zu gewährleisten?",
        options: [
            "Gemma 4 (12B) – da 12 Milliarden Parameter genau auf 12 GB RAM aufgeteilt werden können.",
            "Gemma 2 (2B) – da es extrem ressourcenschonend ist, nur ca. 4 GB RAM belegt und pfeilschnell auf reinen Büro-CPUs reagiert.",
            "Gemma 1 (7B) – da es das einzige Modell ist, das ohne Betriebssystem gestartet werden kann.",
            "Es gibt kein funktionierendes Modell für 16 GB RAM."
        ],
        correct: 1,
        feedback: "Perfekt! Gemma 2 (2B) läuft hervorragend auf Standard-CPUs mit 16 GB RAM. Größere Modelle wie Gemma 4 (12B) überlasten oft den Arbeitsspeicher des Laptops, was zu starkem Ruckeln führt."
    },
    {
        q: "Warum schränkt man in einem 'Modelfile' den Parameter 'num_thread' auf die Anzahl physischer Kerne der CPU ein?",
        options: [
            "Um Context-Switching-Overhead zu vermeiden, was das Rechentempo auf Consumer-CPUs drastisch beschleunigt.",
            "Weil das Modell sonst abstürzt, wenn es mehr als 2 Threads gleichzeitig verwendet.",
            "Damit die Grafikkarte des Computers vollständig deaktiviert wird.",
            "Dies ist ein geheimer Befehl, der nur für Intel-Prozessoren existiert."
        ],
        correct: 0,
        feedback: "Genau! Das Pinning auf die echten physischen Kerne (z.B. 4 statt 8 logische Threads bei vielen i7-Modellen) vermeidet Leistungseinbußen durch Hyperthreading-Overhead."
    },
    {
        q: "Mit welchem Tool-Aufruf können Sie Ihr eigenes, optimiertes Modell aus einem Modelfile in Ollama kompilieren und registrieren?",
        options: [
            "ollama run gemma-schnell",
            "ollama build gemma-schnell",
            "ollama create gemma-schnell -f ./Modelfile",
            "ollama compile --all"
        ],
        correct: 2,
        feedback: "Korrekt! Der Befehl 'ollama create [Name] -f ./Modelfile' erzeugt Ihr maßgeschneidertes Modell lokal auf Ihrem System. Danach starten Sie es mit 'ollama run'."
    },
    {
        q: "Welche Einstellung ist bei einer strukturierten JSON-Datenextraktion aus Rechnungen entscheidend, um deterministische Ergebnisse zu garantieren?",
        options: [
            "Das Modell muss zwingend mit dem Internet verbunden sein.",
            "Es muss im Hintergrund Musik abgespielt werden.",
            "Man muss die Kontextlänge (num_ctx) auf das Maximum von 1.000.000 Token erhöhen.",
            "Die Temperatur muss auf 0.0 gesetzt werden, um Kreativität und Halluzinationen (Fantasieren) vollständig auszuschließen."
        ],
        correct: 3,
        feedback: "Absolut richtig! Eine Temperatur von 0.0 sorgt dafür, dass das Modell streng mathematisch die wahrscheinlichsten Token auswählt. Perfekt für strukturierte Daten wie Rechnungen!"
    },
    {
        q: "Was versteht man unter 'Flexiblem Deployment' bei Open-Weights-Modellen?",
        options: [
            "Die freie Wahl des Betriebsortes – ob auf eigenen lokalen Servern (on-premise), Edge-Geräten, Laptops oder in einer privaten Cloud.",
            "Dass das Modell ausschließlich über den Google Play Store heruntergeladen werden kann.",
            "Dass sich das Modell flexibel an die Bildschirmgröße des Benutzers anpasst.",
            "Dass das Modell stündlich gelöscht und neu installiert werden muss."
        ],
        correct: 0,
        feedback: "Korrekt! Flexibles Deployment bedeutet absolute Freiheit bei der Hosting-Infrastruktur. Sie entscheiden selbst, wo Ihre Daten verarbeitet werden, ob offline auf Ihrem Rechner oder gesichert in Ihrer Cloud."
    },
    {
        q: "Was unterscheidet einen autonomen 'KI-Agenten' von einem einfachen Chat-Modell?",
        options: [
            "Ein KI-Agent benötigt keine Eingaben, sondern erfindet seine eigenen Fragen.",
            "Ein Agent kann nur E-Mails verschicken, aber keine mathematischen Aufgaben lösen.",
            "Ein KI-Agent arbeitet in einer ReAct-Schleife (Reasoning + Acting), kann eigenständig externe Werkzeuge (Tools) aufrufen und komplexe Aufgaben selbstständig lösen.",
            "Ein Agent is einfach ein Chatbot, der besonders schnell tippen kann."
        ],
        correct: 2,
        feedback: "Hervorragend! KI-Agenten nutzen Werkzeuge (wie APIs, Datenbankabfragen oder lokale Python-Skripte), um komplexe Aufgaben eigenständig zu planen, auszuführen und das Ergebnis zu kontrollieren."
    },
    {
        q: "Welchen unschlagbaren Kostenvorteil bieten Open-Weights-Modelle bei der Ausführung komplexer KI-Agentenschleifen?",
        options: [
            "Sie kosten im Einkauf mehr, verbrauchen dafür aber weniger Festplattenspeicher.",
            "Man bekommt vom Staat eine Prämie für jedes lokal ausgeführte Token.",
            "Lokale Modelle benötigen überhaupt keine Hardware-Ressourcen.",
            "Da Agenten in Denk-Schleifen oft dutzende API-Aufrufe pro Aufgabe tätigen, entfallen bei lokaler Ausführung jegliche Token-Gebühren komplett."
        ],
        correct: 3,
        feedback: "Absolut wahr! Eine Agenten-Schleife kann pro Aufgabe 10 bis 50 Aufrufe erzeugen. Mit lokalen Modellen wie Gemma bezahlen Sie 0€ Token-Gebühren – egal wie oft Ihr Agent nachdenkt und Tools nutzt!"
    },
    {
        q: "Warum ist die lokale Ausführung von KI-Agenten mit Open-Weights-Modellen in KMU-Sicherheitsnetzwerken besonders wertvoll?",
        options: [
            "Weil der Agent sensible lokale Firmen-Tools (wie Datenbanken oder Warenwirtschaftssysteme) völlig offline steuern kann, ohne dass Daten abfließen.",
            "Weil Agenten vollen Zugriff auf das Internet benötigen, um überhaupt zu funktionieren.",
            "Weil lokale Modelle automatisch alle Sicherheits-Updates von Windows deaktivieren.",
            "Es gibt keinen Sicherheitsvorteil gegenüber US-amerikanischen Cloud-APIs."
        ],
        correct: 0,
        feedback: "Hervorragend erkannt! Ein Agent greift oft tief in interne Systeme zu. Mit lokalen Open-Weights-Modellen bleibt diese sensible Tool-Steuerung zu 100% im geschützten Firmennetzwerk."
    }
];

let quizCurrentQuestionIdx = 0;
let quizScore = 0;
let quizSelectedOptionIdx = null;

function renderQuizQuestion() {
    const qData = quizQuestions[quizCurrentQuestionIdx];
    
    // Reset selection state
    quizSelectedOptionIdx = null;
    document.getElementById('quiz-btn-submit').disabled = true;
    document.getElementById('quiz-btn-submit').innerText = 'Antwort überprüfen';
    
    // Progress
    const progressPercent = ((quizCurrentQuestionIdx) / quizQuestions.length) * 100;
    document.getElementById('quiz-progress').style.width = `${progressPercent}%`;
    
    // Texts
    document.getElementById('quiz-q-num').innerText = `Frage ${quizCurrentQuestionIdx + 1} von ${quizQuestions.length}`;
    document.getElementById('quiz-q-text').innerText = qData.q;
    
    // Options
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    qData.options.forEach((optText, idx) => {
        optionsContainer.innerHTML += `
            <div class="quiz-option-item" id="opt-${idx}" onclick="selectQuizOption(${idx})">
                <div class="quiz-option-radio"></div>
                <span>${optText}</span>
            </div>
        `;
    });
}

function selectQuizOption(optionIdx) {
    if (document.getElementById('quiz-btn-submit').innerText === 'Nächste Frage' || 
        document.getElementById('quiz-btn-submit').innerText === 'Ergebnisse anzeigen') {
        return; // Already submitted, cannot change
    }
    
    quizSelectedOptionIdx = optionIdx;
    
    document.querySelectorAll('.quiz-option-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    const selectedItem = document.getElementById(`opt-${optionIdx}`);
    if (selectedItem) selectedItem.classList.add('selected');
    
    document.getElementById('quiz-btn-submit').disabled = false;
}

function submitQuizAnswer() {
    const qData = quizQuestions[quizCurrentQuestionIdx];
    const submitBtn = document.getElementById('quiz-btn-submit');
    
    if (submitBtn.innerText === 'Nächste Frage') {
        quizCurrentQuestionIdx++;
        renderQuizQuestion();
        return;
    }
    
    if (submitBtn.innerText === 'Ergebnisse anzeigen') {
        showQuizResults();
        return;
    }
    
    // Evaluate answer
    const isCorrect = (quizSelectedOptionIdx === qData.correct);
    if (isCorrect) quizScore++;
    
    // Apply visual feedback classes
    qData.options.forEach((_, idx) => {
        const item = document.getElementById(`opt-${idx}`);
        item.classList.remove('selected');
        if (idx === qData.correct) {
            item.classList.add('correct');
        } else if (idx === quizSelectedOptionIdx) {
            item.classList.add('incorrect');
        }
    });
    
    // Append feedback box inside options list dynamically
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML += `
        <div class="quiz-feedback-box ${isCorrect ? 'correct-fb' : 'incorrect-fb'}" style="display: block;">
            <div class="quiz-feedback-title ${isCorrect ? 'correct-fb' : 'incorrect-fb'}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    ${isCorrect ? 
                      '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>' : 
                      '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>'}
                </svg>
                <strong>${isCorrect ? 'Richtig beantwortet!' : 'Nicht ganz richtig...'}</strong>
            </div>
            <p class="quiz-feedback-text">${qData.feedback}</p>
        </div>
    `;
    
    // Transition submit button action
    if (quizCurrentQuestionIdx === quizQuestions.length - 1) {
        submitBtn.innerText = 'Ergebnisse anzeigen';
    } else {
        submitBtn.innerText = 'Nächste Frage';
    }
}

function showQuizResults() {
    document.getElementById('quiz-question-container').style.display = 'none';
    const resultsPanel = document.getElementById('quiz-results');
    resultsPanel.style.display = 'flex';
    
    // Update score text
    document.getElementById('quiz-score-val').innerText = `${quizScore}/${quizQuestions.length}`;
    document.getElementById('quiz-progress').style.width = '100%';
    
    // Change badge depending on score
    const badgeTitle = document.getElementById('quiz-badge-title');
    const badgeDesc = document.getElementById('quiz-badge-desc');
    
    if (quizScore === quizQuestions.length) {
        badgeTitle.innerText = "Souveräner KI-Meister 👑";
        badgeDesc.innerText = "Perfekt! Sie haben sämtliche Fachfragen fehlerfrei beantwortet. Sie verstehen den Wert von Open-Weights, die Macht lokaler RAG-Systeme und verfügen über die optimalen theoretischen Grundlagen.";
    } else if (quizScore >= 3) {
        badgeTitle.innerText = "Datensouveränitäts-Experte 🛡️";
        badgeDesc.innerText = "Klasse Leistung! Sie haben die wesentlichen Konzepte rund um lokale KI-Sicherheit und das Zusammenspiel aus Ollama und uv hervorragend verstanden. Sie sind bereit für die Praxis!";
    } else {
        badgeTitle.innerText = "KI-Entdecker 🌱";
        badgeDesc.innerText = "Ein guter Einstieg! Sie haben die Grundlagen kennengelernt. Wiederholen Sie das Lab oder lesen Sie die Handbücher noch einmal, um Ihr Wissen weiter zu festigen.";
    }
    
    // Trigger certificate displays
    updateCertificateName();
}

function updateCertificateName() {
    const inputVal = document.getElementById('participant-name').value.trim();
    const displayName = inputVal || "Workshop-Teilnehmer/in";
    document.getElementById('cert-name-display').innerText = displayName;
}

function resetQuiz() {
    quizCurrentQuestionIdx = 0;
    quizScore = 0;
    quizSelectedOptionIdx = null;
    
    document.getElementById('quiz-question-container').style.display = 'block';
    document.getElementById('quiz-results').style.display = 'none';
    
    renderQuizQuestion();
}

function copyCode(btn) {
    const container = btn.closest('.code-container') || btn.parentElement.parentElement;
    const codeEl = container.querySelector('code') || container.querySelector('pre');
    if (codeEl) {
        const text = codeEl.innerText;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = btn.innerText;
            btn.innerText = 'Kopiert!';
            btn.style.color = 'var(--color-success)';
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Fehler beim Kopieren: ', err);
        });
    }
}

// 8. Global Initializers on load
window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateWeightsVisuals();
    selectSvgNode('docs');
    updateStepperVisuals();
    renderQuizQuestion();
});
