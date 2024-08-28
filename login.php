<?php
// Überprüfen, ob die .env-Datei vorhanden ist und geladen werden kann
if (file_exists(__DIR__ . '/.env')) {
    // .env Datei Zeile für Zeile auslesen
    $lines = file(__DIR__ . '/.env');
    foreach ($lines as $line) {
        // Kommentarzeilen überspringen
        if (strpos(trim($line), '#') === 0) {
            continue;
        }
        
        // Schlüssel und Wert extrahieren
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);
        
        // Variable setzen
        $_ENV[$name] = $value;
    }
} else {
    echo "Die .env Datei wurde nicht gefunden.";
    exit;
}

// Verarbeite das Login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Passwort aus der Umgebungsvariablen laden und Leerzeichen entfernen
    $storedPasswordHash = trim($_ENV['PASSWORD_HASH'] ?? '');

    // Benutzer eingeben und Leerzeichen entfernen
    $password = trim($_POST['password'] ?? '');

    // Passwort-Hash erstellen
    $passwordHash = md5($password);

    // Debugging-Ausgaben
    echo "Gespeicherter Hash: " . htmlspecialchars($storedPasswordHash) . "<br>";
    echo "Eingegebener Hash: " . htmlspecialchars($passwordHash) . "<br>";

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
