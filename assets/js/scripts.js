
//let v1 = 1234;
//console.log(v1);

// Konstanten für die DOM-Elemente
const form = document.querySelector("#form_testform");
const inputField1 = document.querySelector("#fld_1");
const inputField2 = document.querySelector("#fld_2");
const resultDisplay = document.querySelector("#result");
const operatorButtons = document.querySelectorAll(".operator-btn");

// Verhindert das Standard-Absenden des Formulars (ist hier optional, da wir nur button[type="button"] verwenden)
form.addEventListener("submit", (e) => {
    e.preventDefault(); 
});

/**
 * Sendet die Berechnung an den Server und zeigt das Ergebnis an.
 * @param {string} operator - Der zu verwendende Operator (+, -, *, /)
 */
async function calculate(operator) {
    // 1. Eingabewerte holen
    const v1 = inputField1.value;
    const v2 = inputField2.value;

    // 2. Werte in Zahlen umwandeln
    // trim() entfernt Leerzeichen, um leere Felder korrekt zu prüfen
    const num1 = parseFloat(v1.trim());
    const num2 = parseFloat(v2.trim());

    // 3. Clientseitige Validierung
    if (v1.trim() === "" || v2.trim() === "") {
        resultDisplay.textContent = "Bitte beide Felder ausfüllen!";
        return;
    }
    
    if (isNaN(num1) || isNaN(num2)) {
        resultDisplay.textContent = "Bitte **gültige Zahlen** eingeben!";
        return;
    }

    // 4. AJAX Request vorbereiten
    const data = new FormData();
    data.append("v1", num1);
    data.append("v2", num2);
    data.append("operator", operator);
    
    resultDisplay.textContent = "Berechne..."; // Ladeanzeige

    try {
        // 5. Fetch-Aufruf
        const response = await fetch("server.php", {
            method: "POST",
            body: data
        });

        // 6. Antwort verarbeiten
        if (!response.ok) {
            throw new Error(`HTTP-Fehler! Status: ${response.status}`);
        }
        
        const result = await response.text();
        
        // 7. Ergebnis anzeigen
        resultDisplay.textContent = "Ergebnis: " + result;

    } catch (error) {
        // 8. Fehlerbehandlung
        console.error("Fehler bei der Berechnung:", error);
        resultDisplay.textContent = "Fehler bei der Kommunikation mit dem Server.";
    }
}

// Event-Listener für alle Operator-Buttons
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Ruft die calculate Funktion mit dem Wert des geklickten Buttons auf
        calculate(button.value);
    });
});

















