document.getElementById('login').addEventListener('click', function() {

    const qtdLetras = document.getElementById('email').value;
    const qtdLetras2 = document.getElementById('senha').value;

    if(qtdLetras.length == 0){
        window.alert("Como que você quer logar sem ter um usuário meu amigo");
    }

    if(qtdLetras2.length == 0){
        window.alert("Como que você quer logar sem ter uma senha meu amigo");
    }


    if(qtdLetras2 != confirmaSenha){
        window.alert("Campos de senha e confirmar senha estão diferentes");
    }
});

function Logar(){
    var email = "admin";
    var senha = "admin";

    var caixa1 = document.querySelector("#email").value;
    var caixa2 = document.querySelector("#senha").value;


    if(caixa1.length != 0 || caixa2.length != 0){
        if(caixa1 == email && caixa2 == senha){
            window.open("file:///C:/Users/Adley%20Rodrigues/Desktop/ProjetoWEB/homeDespesa.html");
            //window.open("../homeDespesa.html", "_self");
            //window.location.href = "file:///C:/Users/Adley%20Rodrigues/Desktop/ProjetoWEB/homeDespesa.html";
        }else{
           window.alert("Login ou senha incorretos");
        }
    }


}