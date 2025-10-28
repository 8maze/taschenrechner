<?php
// Setze den Header, um sicherzustellen, dass die Antwort als reiner Text gesendet wird
header('Content-Type: text/plain');

// Prüfen, ob alle notwendigen POST-Werte gesetzt sind
if (isset($_POST['v1']) && isset($_POST['v2']) && isset($_POST['operator'])) {

    $v1 = $_POST['v1'];
    $v2 = $_POST['v2'];
    $operator = $_POST['operator'];

    // Serverseitige Validierung: Sicherstellen, dass es gültige Zahlen sind
    if (!is_numeric($v1) || !is_numeric($v2)) {
        http_response_code(400); // Bad Request
        echo "Ungültige Eingabe: Es wurden keine gültigen Zahlen übermittelt.";
        exit;
    }

    // Konvertiere zu Gleitkommazahlen (Floats) für die Berechnung
    $num1 = floatval($v1);
    $num2 = floatval($v2);

    $result = null;

    // Berechnung basierend auf dem Operator
    switch ($operator) {
        case '+':
            $result = $num1 + $num2;
            break;
        case '-':
            $result = $num1 - $num2;
            break;
        case '*':
            $result = $num1 * $num2;
            break;
        case '/':
            if ($num2 != 0) {
                $result = $num1 / $num2;
            } else {
                // Fehler bei Division durch Null
                $result = "Fehler: Division durch 0 ist nicht erlaubt.";
                http_response_code(400); // Bad Request
            }
            break;
        default:
            // Unbekannter Operator
            $result = "Unbekannter Operator.";
            http_response_code(400); // Bad Request
    }

    // Ausgabe des Ergebnisses (wird als Text an den Client gesendet)
    echo $result;

} else {
    // Wenn POST-Daten fehlen
    http_response_code(400); // Bad Request
    echo "Fehler: Es fehlen notwendige Daten für die Berechnung.";
}
?>

