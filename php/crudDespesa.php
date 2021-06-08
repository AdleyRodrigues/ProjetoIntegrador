<?php
    
//PARTE DO CRUD DE CADASTRAR CONTA
    require_once 'Connection.php';
    $conexao = Connection::open();

    $valorDespesa = $_POST['despesa'];//o que fica dentro do metodo post é o name que vem do form
    $data = $_POST['data'];
    $descricao = $_POST['descricao'];
    $categoria = $_POST['categoria'];
    $pagamento = $_POST['pagamento'];


      //var_dump($nome,$email,$senha);

    $conexao->query("insert into conta(nome,email,senha) values ('$nome','$email','$senha');");

    echo "<h1> SALVO COM SUCESSO<h1>";
    $conexao = NULL;



