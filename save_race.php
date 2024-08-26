<?php
// Verzeichnis, in dem die Datei gespeichert werden soll
$directory = 'races/';

// Sicherstellen, dass das Verzeichnis existiert, andernfalls erstellen
if (!is_dir($directory)) {
    mkdir($directory, 0777, true);
}

// Den Dateinamen und den Inhalt der Datei aus den POST-Daten abrufen
if (isset($_POST['filename']) && isset($_POST['content'])) {
    $filename = basename($_POST['filename']); // Sicherheit: basename entfernt Pfad-Trennzeichen
    $content = $_POST['content'];
    
    // Datei im angegebenen Verzeichnis speichern
    file_put_contents($directory . $filename, $content);
    
    echo 'Datei erfolgreich gespeichert.';
} else {
    echo 'Fehler: Dateiname oder Inhalt fehlt.';
}
?>