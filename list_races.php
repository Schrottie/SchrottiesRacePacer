<?php
$directory = 'races/';
$files = array_diff(scandir($directory), array('..', '.'));

$raceFiles = array();

foreach ($files as $file) {
    if (pathinfo($file, PATHINFO_EXTENSION) === 'json') {
        $filePath = $directory . $file;
        $fileContents = file_get_contents($filePath);
        $jsonData = json_decode($fileContents, true);

        // Verwende den Titel aus dem JSON
        $raceFiles[] = array(
            'filename' => $file,
            'fullName' => isset($jsonData['title']) ? $jsonData['title'] : pathinfo($file, PATHINFO_FILENAME)
        );
    }
}

header('Content-Type: application/json');
echo json_encode($raceFiles);
?>
