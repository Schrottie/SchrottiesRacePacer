<?php
$filename = $_GET['filename'] ?? '';

$protectedRaces = ['mwl_iuzs.json', 'mwl_ggduzs.json'];

if (in_array($filename, $protectedRaces)) {
    echo "Das Rennen $filename kann nicht gelöscht werden.";
    exit;
}

$filePath = 'races/' . $filename;

if (file_exists($filePath)) {
    unlink($filePath);
    echo "Das Rennen $filename wurde erfolgreich gelöscht.";
} else {
    echo "Die Datei $filename wurde nicht gefunden.";
}
?>
