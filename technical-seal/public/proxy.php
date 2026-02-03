<?php
// proxy.php - Penyelamat dari masalah CORS di cPanel
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$url = $_GET['url'];

if (!$url) {
    echo json_encode(["error" => "No URL provided"]);
    exit;
}

// Pastikan hanya bisa panggil API berita saja demi keamanan
if (strpos($url, 'https://berita-indo-api-next.vercel.app') !== 0) {
    echo json_encode(["error" => "Invalid target URL"]);
    exit;
}

// Ambil data pakai file_get_contents (Standard cPanel PHP)
$data = file_get_contents($url);

if ($data === false) {
    // Kalau gagal, coba pakai cURL (Alternatif)
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $data = curl_exec($ch);
    curl_close($ch);
}

echo $data;
