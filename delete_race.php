<?php
$filename = $_GET['filename'] ?? '';
$raceFilePath = 'races/' . $filename;

// Funktion, um den Inhalt der JSON-Datei zu überprüfen
function isRacePinned($filePath) {
    if (!file_exists($filePath)) {
        return false; // Datei existiert nicht
    }

    $content = file_get_contents($filePath);
    $data = json_decode($content, true);

    // Überprüfen, ob das pinned-Flag gesetzt ist
    return isset($data['pinned']) && $data['pinned'];
}

// Überprüfen, ob das Rennen gepinnt ist
if (isRacePinned($raceFilePath)) {
    echo "Das Rennen $filename kann nicht gelöscht werden, da es als geschützt markiert ist.";
    exit;
}

// Wenn die Datei existiert, löschen
if (file_exists($raceFilePath)) {
    unlink($raceFilePath);
    echo "Das Rennen $filename wurde erfolgreich gelöscht.";
} else {
    echo "Die Datei $filename wurde nicht gefunden.";
}
?>

