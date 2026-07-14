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

// 6. RAG Simulator Logic
const mockFiles = [
    { id: 0, name: "ISO_Norm_Ventil_X_2026.pdf", size: "14.2 MB", selected: true },
    { id: 1, name: "Wartung_Vakuumpumpe_2025.pdf", size: "4.8 MB", selected: true },
    { id: 2, name: "Betriebs_Sicherheitsleitfaden.pdf", size: "1.2 MB", selected: false }
];

const mockKnowledge = {
    toleranz: {
        file: "ISO_Norm_Ventil_X_2026.pdf (Seite 42)",
        chunk: "ISO-2026-V-X (Gehäuse & Teller): Für die Ventil-Baugruppe X gelten im Maschinenbau-Segment strenge Toleranzmaße. Das fertige Gehäuse darf ein Abweichungsmaß von maximal +0,02 mm nicht überschreiten. Für den zugehörigen Ventilteller der Ventil-Baugruppe X gilt ein minimales Toleranzmaß von -0,01 mm.",
        gemma: "Basierend auf der Werksnorm ISO_Norm_Ventil_X_2026.pdf (Seite 42) gelten für die Ventil-Baugruppe X folgende exakte Toleranzmaße:\n\n" +
               "1. Gehäuse: Das maximale zulässige Abweichungsmaß beträgt +0,02 mm.\n" +
               "2. Ventilteller: Das minimale zulässige Abweichungsmaß beträgt -0,01 mm.\n\n" +
               "Hinweis: Diese Maße sind für die präzise Montage im Maschinenbau-Segment zwingend einzuhalten, um die Dichtigkeit des Gesamtsystems offline zu garantieren."
    },
    wartung: {
        file: "Wartung_Vakuumpumpe_2025.pdf (Seite 7)",
        chunk: "Wartungs-Intervalle Vakuumpumpe Typ Y: Um einen dauerhaften und sicheren Betrieb der Pumpe Typ Y zu gewährleisten, ist die Schmierung zwingend alle 250 Betriebsstunden durchzuführen. Eine vollständige mechanische Revision und Inspektion der Lager muss nach 2000 Betriebsstunden erfolgen.",
        gemma: "Laut dem offiziellen Handbuch Wartung_Vakuumpumpe_2025.pdf (Seite 7) müssen für die Vakuumpumpe Typ Y folgende Intervalle exakt eingehalten werden:\n\n" +
               "- Schmierung: Alle 250 Betriebsstunden erforderlich.\n" +
               "- Vollständige Revision (Lagerinspektion): Alle 2000 Betriebsstunden fällig.\n\n" +
               "Bitte tragen Sie jede durchgeführte Wartung im lokalen Maschinennachweis ein, um die ISO-9001-Zertifizierung nicht zu gefährden."
    },
    sicherheit: {
        file: "Betriebs_Sicherheitsleitfaden.pdf (Seite 12)",
        chunk: "Sicherheit am Arbeitsplatz - Schutzausrüstung (PSA): Beim Betreten der Fertigungshalle 3 und beim Arbeiten an rotierenden Spindelwerkzeugen ist das Tragen einer EN-zertifizierten Schutzbrille sowie von Sicherheitsschuhen der Klasse S3 jederzeit absolute Pflicht.",
        gemma: "Gemäß dem Betriebs_Sicherheitsleitfaden.pdf (Seite 12) gilt für alle Mitarbeiter folgende verbindliche Regelung bezüglich der Schutzausrüstung:\n\n" +
               "- Pflichtbereiche: Fertigungshalle 3 sowie alle Arbeiten an rotierenden Spindelwerkzeugen.\n" +
               "- Vorgeschriebene PSA:\n" +
               "  1. EN-zertifizierte Schutzbrille\n" +
               "  2. Sicherheitsschuhe der Klasse S3\n\n" +
               "Zuwiderhandlungen werden im Interesse des Arbeitsschutzes abgemahnt."
    }
};

function toggleFileSelection(fileId) {
    const file = mockFiles.find(f => f.id === fileId);
    if (!file) return;
    
    file.selected = !file.selected;
    const fileEl = document.getElementById(`file-${fileId}`);
    if (fileEl) {
        if (file.selected) {
            fileEl.classList.add('selected');
        } else {
            fileEl.classList.remove('selected');
        }
    }
    
    // Log file adjustment to terminal
    const term = document.getElementById('sim-terminal');
    const time = new Date().toLocaleTimeString();
    term.innerHTML += `<div class="terminal-line info">[${time}] Dokumentenauswahl geändert: ${file.name} ist nun ${file.selected ? 'aktiviert' : 'deaktiviert'}.</div>`;
    term.scrollTop = term.scrollHeight;
}

function startIndexing() {
    const activeFiles = mockFiles.filter(f => f.selected);
    const btnIndex = document.getElementById('btn-index');
    const term = document.getElementById('sim-terminal');
    
    if (activeFiles.length === 0) {
        alert("Bitte wählen Sie mindestens ein PDF-Dokument aus, um es offline zu indexieren!");
        return;
    }
    
    btnIndex.disabled = true;
    btnIndex.innerText = "Indexiere...";
    term.innerHTML = `<div class="terminal-line cmd">> uv run python -c "import langchain, chroma..."</div>`;
    
    const logs = [
        { text: "[1/4] Starte Offline-Datenpipeline...", delay: 600, class: "info" },
        { text: `[2/4] Lese ${activeFiles.length} aktive PDF-Dateien ein...`, delay: 1200, class: "info" },
        ...activeFiles.map(f => ({ text: `   -> Lade Datei: ${f.name} (${f.size})`, delay: 1800, class: "info" })),
        { text: "[3/4] Generiere Text-Chunks (Größe: 500 Zeichen, Überlappung: 100)...", delay: 2600, class: "info" },
        { text: "   -> Erstelle offline Embeddings via nomic-embed-text über lokale Ollama-Schnittstelle...", delay: 3400, class: "info" },
        { text: "[4/4] Speichere Vektor-Indizes in lokaler Chroma Vektordatenbank...", delay: 4200, class: "info" },
        { text: "SUCCESS: Vektordatenbank erfolgreich befüllt! Lokale RAG-Schnittstelle bereit.", delay: 4800, class: "success" }
    ];
    
    logs.forEach(log => {
        setTimeout(() => {
            const time = new Date().toLocaleTimeString();
            term.innerHTML += `<div class="terminal-line ${log.class || ''}">[${time}] ${log.text}</div>`;
            term.scrollTop = term.scrollHeight;
        }, log.delay);
    });
    
    setTimeout(() => {
        btnIndex.innerText = "Indexierung abgeschlossen";
        // Enable query elements
        const querySelect = document.getElementById('sim-query-select');
        const askBtn = document.getElementById('btn-ask');
        
        querySelect.disabled = false;
        askBtn.disabled = false;
        
        // Populate options based on selected files
        querySelect.innerHTML = `<option value="" disabled selected>Wählen Sie eine Frage an die lokale KI...</option>`;
        
        if (mockFiles[0].selected) {
            querySelect.innerHTML += `<option value="toleranz">„Welche Toleranzmaße galten bei der Ventil-Baugruppe X aus dem Projekt von 2026?“</option>`;
        }
        if (mockFiles[1].selected) {
            querySelect.innerHTML += `<option value="wartung">„In welchen Intervallen muss die Vakuumpumpe Y gewartet werden?“</option>`;
        }
        if (mockFiles[2].selected) {
            querySelect.innerHTML += `<option value="sicherheit">„Welche Schutzausrüstung ist laut Betriebs-Sicherheitsleitfaden Pflicht?“</option>`;
        }
        
        if (querySelect.options.length === 1) {
            querySelect.innerHTML = `<option value="" disabled selected>Keine Fragen für die ausgewählten PDFs verfügbar.</option>`;
            askBtn.disabled = true;
        }
    }, 5000);
}

function askSimulator() {
    const select = document.getElementById('sim-query-select');
    const queryKey = select.value;
    const term = document.getElementById('sim-terminal');
    const chunkBox = document.getElementById('retrieved-chunk');
    const answerBox = document.getElementById('llm-answer');
    const askBtn = document.getElementById('btn-ask');
    
    if (!queryKey) {
        alert("Bitte wählen Sie zuerst eine Frage aus der Liste aus!");
        return;
    }
    
    const data = mockKnowledge[queryKey];
    if (!data) return;
    
    askBtn.disabled = true;
    chunkBox.innerHTML = `<span style="color: var(--text-secondary); font-style: italic;">Suche in Vektordatenbank läuft...</span>`;
    answerBox.innerHTML = `<span style="color: var(--text-secondary); font-style: italic;">Generiere Antwort via Gemma 4 12B Unified...</span>`;
    
    const time = new Date().toLocaleTimeString();
    term.innerHTML += `<div class="terminal-line cmd">> [ANFRAGE] ${select.options[select.selectedIndex].text}</div>`;
    term.scrollTop = term.scrollHeight;
    
    // Simulate vector similarity search delay
    setTimeout(() => {
        term.innerHTML += `<div class="terminal-line info">[${new Date().toLocaleTimeString()}] Cosinus-Ähnlichkeit berechnet. Bester Treffer gefunden in: ${data.file}</div>`;
        term.scrollTop = term.scrollHeight;
        
        chunkBox.innerHTML = `
            <div class="source-chunk-highlight">
                <strong>Gefundenes Textsegment aus:</strong> ${data.file}<br>
                "${data.chunk}"
            </div>
        `;
    }, 1200);
    
    // Simulate Gemma 4 text streaming response
    setTimeout(() => {
        term.innerHTML += `<div class="terminal-line success">[${new Date().toLocaleTimeString()}] Gemma 4 12B Unified streamt Antwort (Lokal)...</div>`;
        term.scrollTop = term.scrollHeight;
        
        answerBox.innerHTML = `<div class="ai-answer-stream" id="streaming-text"></div><div class="ai-source-ref">Quelle: ${data.file}</div>`;
        
        const textTarget = document.getElementById('streaming-text');
        const textToStream = data.gemma;
        let words = textToStream.split(' ');
        let wordIdx = 0;
        
        function streamNextWord() {
            if (wordIdx < words.length) {
                textTarget.innerHTML += words[wordIdx] + ' ';
                wordIdx++;
                setTimeout(streamNextWord, 45); // Typing speed
            } else {
                askBtn.disabled = false;
                term.innerHTML += `<div class="terminal-line info">[${new Date().toLocaleTimeString()}] Offline-Synthese abgeschlossen.</div>`;
                term.scrollTop = term.scrollHeight;
            }
        }
        
        streamNextWord();
    }, 2000);
}

// 7. Interactive Quiz Engine
const quizQuestions = [
    {
        q: "Was unterscheidet ein Open-Weights-Modell im Wesentlichen von einem Closed-Source-Modell?",
        options: [
            "Das Modell hat ein sehr geringes Dateigewicht und benötigt fast keinen Festplattenspeicher.",
            "Die fertig trainierten Verbindungsgewichte (Parameter) des neuronalen Netzes sind öffentlich frei herunterladbar.",
            "Es darf im Gegensatz zu Closed-Source-Modellen nur im Freien bei kühlen Temperaturen betrieben werden.",
            "Es besitzt keine künstlichen Neuronen, sondern beruht ausschließlich auf fest einprogrammierten Wenn-Dann-Regeln."
        ],
        correct: 1,
        feedback: "Korrekt! Bei Open-Weights-Modellen (wie Googles Gemma-Familie) stellt der Entwickler die trainierten Verbindungsgewichte öffentlich zur Verfügung. Dadurch können Sie das Modell herunterladen, lokal hosten und komplett offline nutzen."
    },
    {
        q: "Welchen Hauptvorteil bietet die Offline-Nutzung lokaler Modelle für deutsche KMU?",
        options: [
            "Man spart sich den Kauf von Strom, da die Rechner im Offline-Modus ohne Stromversorgung arbeiten.",
            "Die KI lernt automatisch das geheime Wissen aller Konkurrenzunternehmen im Spreeland.",
            "100% Datensouveränität und problemlose Einhaltung der DSGVO, da sensible Betriebsdaten und Kundenakten niemals Ihren Server verlassen.",
            "Das Modell kann offline viel schneller Updates aus dem Internet herunterladen."
        ],
        correct: 2,
        feedback: "Hervorragend! Da die Daten das Unternehmen nie verlassen, gibt es keine DSGVO-Hürden und kein Risiko von Industriespionage über externe Cloud-Dienstleister."
    },
    {
        q: "Wofür steht die Abkürzung 'RAG' im Kontext von Sprachmodellen?",
        options: [
            "Retrieval-Augmented Generation (Erweiterung der KI durch gezielte Informationsabfrage aus lokalen Dokumenten).",
            "Random-Access-Generator (Ein Zufallsgenerator für besonders kreative Bildbearbeitungs-Aufgaben).",
            "Regional-Analyse-Gemeinschaft (Das Gremium zur Überwachung der KI-Sicherheit in Brandenburg).",
            "Requirements-And-Guidelines (Die rechtlichen Nutzungsbedingungen von Google-Sprachmodellen)."
        ],
        correct: 0,
        feedback: "Richtig! RAG sucht zuerst in lokalen Dokumenten nach passenden Abschnitten zur Benutzerfrage und gibt diese Abschnitte als Kontext an das LLM weiter. Dadurch antwortet die KI extrem sachlich und belegt ihre Antworten mit echten Quellen."
    },
    {
        q: "Warum ist das Tool 'uv' von Astral eine große Erleichterung für KMU-IT-Abteilungen?",
        options: [
            "Es konvertiert alten Python-Code vollautomatisch in fertige 3D-Druck-Vorlagen.",
            "Es ist ein extrem schneller, moderner Paketmanager, der Python-Abhängigkeiten in Sekunden auflöst und isolierte Umgebungen selbstständig managt.",
            "Es schützt Laptops vor Erschütterungen und Stürzen durch eine spezielle Software-Dämpfung.",
            "Es dient als offizieller Virenscanner für alle KI-Modelle der Bundesregierung."
        ],
        correct: 1,
        feedback: "Absolut! 'uv' löst Abhängigkeiten bis zu 100-mal schneller als klassische Tools auf und macht die Ausführung komplexer Python-RAG-Skripte im KMU extrem robust und reproduzierbar."
    },
    {
        q: "Welches Merkmal zeichnet die 'Unified' Architektur von Gemma 4 12B aus?",
        options: [
            "Das Modell kann nur auf genau einem einzigen Rechnertyp der Marke Google ausgeführt werden.",
            "Sie ist encoderfrei und verarbeitet Text, Bilder und Audio nativ im gleichen Einbettungsraum, was multimodal offline Latenzen stark verringert.",
            "Sie vereinheitlicht alle europäischen Sprachen zu einer einzigen künstlichen KI-Mischsprache.",
            "Sie benötigt zwingend eine dauerhafte Verbindung zu einem Großrechner, um einfache Antworten zu generieren."
        ],
        correct: 1,
        feedback: "Genau! Als unified Modell verzichtet Gemma 4 auf separate, teure Encoder für Bild und Ton. Es projiziert Bild- und Ton-Signale direkt in den Sprachmodellraum. Das spart Rechenpower und ermöglicht echte multimodale Offline-Assistenten!"
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

// 8. Global Initializers on load
window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateWeightsVisuals();
    selectSvgNode('docs');
    updateStepperVisuals();
    renderQuizQuestion();
});
