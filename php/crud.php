<?php
    require_once 'Connection.php';
    $conexao = Connection::open();

    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    //var_dump($nome,$email,$senha);

    $conexao->query("insert into conta(nome,email,senha) values ('$nome','$email','$senha');");

    echo "<h1> SALVO COM SUCESSO<h1>";
    $conexao = NULL;
