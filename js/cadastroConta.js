
document.getElementById('cadastrar').addEventListener('click', function() {

    const qtdLetras = document.getElementById('email').value;
    const qtdLetras2 = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('senha2').value;



    if(qtdLetras.length == 0){
        window.alert("O campo email é obrigatorio! PREENCHA-O");
    }

    if(qtdLetras2.length == 0){
        window.alert("O campo senha é obrigatorio! PREENCHA-O");
    }
    if(qtdLetras.length != 0 || qtdLetras2.length != 0){
        if(qtdLetras.length < 6){
            window.alert("o usuario não pode ter menos que 6 caracteres!!!");
        }
    
        if(qtdLetras2.length < 8){
            window.alert("A senha não pode ter menos que 8 caracteres!!!");
        }
    }

    if(qtdLetras2 != confirmaSenha){
        window.alert("Campos de senha e confirmar senha estão diferentes");
    }
});



