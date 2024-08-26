<?php
header('Content-Type: application/json');

$directory = 'races';
$files = array_diff(scandir($directory), array('..', '.'));
$response = array();

foreach ($files as $file) {
    if (pathinfo($file, PATHINFO_EXTENSION) === 'js') {
        // Versuche, den ersten Kommentar aus der Datei zu extrahieren
        $filePath = $directory . '/' . $file;
        $fileContent = file_get_contents($filePath);
        $firstLine = strtok($fileContent, "\n");
        $fullName = trim(substr($firstLine, 2)); // Entferne "//" vom Kommentar

        $response[] = array(
            'filename' => $file,
            'fullName' => $fullName
        );
    }
}

echo json_encode($response);
?>
