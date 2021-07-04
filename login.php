<!DOCTYPE html>
<html lang="pt-br" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Tela Login</title> 
    <link rel="stylesheet" href="css/login.css">
  </head>
  <body>

<form class="box" action="" method="post">
  <h1>Login</h1> <hr><br>
  Nome: <input type="text" id="email" autofocus>
  Senha: <input type="password" id="senha">

  <input type="button" onclick="Logar()" id="login" value="Login">
  <br/><br/>

  <a class="pag" href="cadastroConta.php">Não tem login? cadastre-se aqui</a><br/><br>
  <a class="home" href="home.php">Pagina Principal</a>

</form>

<script src="js/login.js"></script>
  </body>
</html>
