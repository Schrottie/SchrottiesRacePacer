<?php
// Funktion zum Einlesen der .env-Datei
function loadEnv($filePath) {
    if (!file_exists($filePath)) {
        throw new Exception('.env-Datei nicht gefunden');
    }

    $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue;
        }

        list($name, $value) = explode('=', $line, 2);
        $_ENV[trim($name)] = trim($value);
    }
}

// Lade die .env-Datei
loadEnv(__DIR__ . '/.env');

// Verarbeite das Login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Passwort aus der Umgebungsvariablen laden
    $storedPasswordHash = $_ENV['PASSWORD_HASH'];

    // Benutzer-Eingabe
    $password = $_POST['password'];

    // Passwort-Hash erstellen
    $passwordHash = md5($password);

    // Überprüfen, ob das eingegebene Passwort korrekt ist
    if ($passwordHash === $storedPasswordHash) {
        // Setze ein Cookie für 14 Tage
        setcookie('loggedIn', 'true', time() + (14 * 24 * 60 * 60), '/');
        header('Location: index.html');
        exit;
    } else {
        echo 'Falsches Passwort!';
    }
}
?>
