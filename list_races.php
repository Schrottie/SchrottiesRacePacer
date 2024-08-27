<?php
$directory = 'races/';
$files = array_diff(scandir($directory), array('..', '.'));

$raceFiles = array();

foreach ($files as $file) {
    if (pathinfo($file, PATHINFO_EXTENSION) === 'json') {
        $raceFiles[] = array(
            'filename' => $file,
            'fullName' => pathinfo($file, PATHINFO_FILENAME)
        );
    }
}

header('Content-Type: application/json');
echo json_encode($raceFiles);
?>
