<?php

$username = 'b83571dc6d5fc4';
$senha = '90ed83fc';
$database = 'heroku_8e53453ac7a4cef';
$host = 'us-cdbr-east-05.cleardb.net';

$mysqli = new mysqli( $host, $username, $senha, $database );

if($mysqli -> error) {
    die("Falha ao conectar: " . $mysqli->error);
} 
