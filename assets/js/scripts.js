
//let v1 = 1234;
//console.log(v1);

document.querySelector("#form_testform").addEventListener("submit", function(e) {
    e.preventDefault(); // verhindert, dass das Formular normal abgeschickt wird
});


function checkNumber() {
    const v1 = document.querySelector("#fld_1").value;
    const v2 = document.querySelector("#fld_2").value;

    const num1 = parseFloat(v1);
    const num2 = parseFloat(v2);

    if (v1.trim() !== "" && isNaN(num1)) {
        console.log("fld_1 ist keine gültige Zahl!");
    }

    if (v2.trim() !== "" && isNaN(num2)) {
        console.log("fld_2 ist keine gültige Zahl!");
    }
}

// Operator-Buttons abfangen
document.querySelectorAll(".operator-btn").forEach(button => {
    button.addEventListener("click", () => {
        const v1 = document.querySelector("#fld_1").value;
        const v2 = document.querySelector("#fld_2").value;
        const operator = button.value;

        const num1 = parseFloat(v1);
        const num2 = parseFloat(v2);

        if (isNaN(num1) || isNaN(num2)) {
            document.querySelector("#result").textContent = "Bitte gültige Zahlen eingeben!";
            return;
        }

        // AJAX Request an server.php
        const data = new FormData();
        data.append("v1", num1);
        data.append("v2", num2);
        data.append("operator", operator);

        fetch("server.php", {
            method: "POST",
            body: data
        })
        .then(response => response.text())
        .then(result => {
            document.querySelector("#result").textContent = "Ergebnis: " + result;
        })
        .catch(error => {
            console.error("Fehler:", error);
            document.querySelector("#result").textContent = "Fehler bei der Berechnung.";
        });
    });
});



















