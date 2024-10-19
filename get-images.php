<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

$directory = 'assets/images/cara/';

if (!is_dir($directory)) {
    echo json_encode(['error' => 'Directory not found: ' . $directory]);
    exit;
}

$images = array_diff(scandir($directory), array('..', '.'));
$images = array_values(array_filter($images, function($file) {
    return preg_match('/\.(jpg|jpeg|png|gif|webp)$/i', $file);
}));

if (empty($images)) {
    echo json_encode(['error' => 'No images found in the directory: ' . $directory]);
    exit;
}

echo json_encode($images);
