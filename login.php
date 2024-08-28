<?php
// Lade die Umgebungsvariablen
require 'vendor/autoload.php'; // Wenn du Composer verwendest

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Verarbeite das Login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Passwort aus der Umgebungsvariable laden
    $storedPasswordHash = $_ENV['PASSWORD_HASH'];

    // Benutzer eingeben
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
