<?php
$directory = 'races/';
$files = array_diff(scandir($directory), array('..', '.'));

$raceFiles = array();

foreach ($files as $file) {
    if (pathinfo($file, PATHINFO_EXTENSION) === 'json') {
        $filePath = $directory . $file;
        $fileContents = file_get_contents($filePath);
        $jsonData = json_decode($fileContents, true);

        // Verwende den Titel und das pinned-Flag aus dem JSON
        $raceFiles[] = array(
            'filename' => $file,
            'fullName' => isset($jsonData['title']) ? $jsonData['title'] : pathinfo($file, PATHINFO_FILENAME),
            'pinned' => isset($jsonData['pinned']) ? $jsonData['pinned'] : false // Hinzufügen des pinned-Flags
        );
    }
}

header('Content-Type: application/json');
echo json_encode($raceFiles);
?>
