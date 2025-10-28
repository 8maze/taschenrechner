<?php
var_dump($_POST);

// Prüfen, ob POST-Werte gesetzt sind
if (isset($_POST['v1']) && isset($_POST['v2']) && isset($_POST['operator'])) {

    $v1 = $_POST['v1'];
    $v2 = $_POST['v2'];
    $operator = $_POST['operator'];

    // Sicherstellen, dass es gültige Zahlen sind
    if (!is_numeric($v1) || !is_numeric($v2)) {
        echo "Ungültige Eingabe: keine Zahl";
        exit;
    }

$v1 = floatval($v1);
$v2 = floatval($v2);

    $result = null;

    switch ($operator) {
        case '+':
            $result = $v1 + $v2;
            break;
        case '-':
            $result = $v1 - $v2;
            break;
        case '*':
            $result = $v1 * $v2;
            break;
        case '/':
            if ($v2 != 0) {
                $result = $v1 / $v2;
            } else {
                $result = "Fehler: Division durch 0";
            }
            break;
        default:
            $result = "Unbekannter Operator";
    }

    echo $result;

} else {
    echo "Ungültige Eingabe: POST fehlt";
}
?>

