
document.getElementById('opcao').style.visibility = 'hidden';

//parte do codigo feita em ajax
$("#pagamento").on('change', function(e){//aqui estou selecionando o id pagamento
    
    let s = $(this).val()//aqui estou colocando o value dentro da variavel s

    if(s == '1'){
        document.getElementById('opcao').style.visibility = 'visible';
    }else{
        document.getElementById('opcao').style.visibility = 'hidden';
    }

  });
