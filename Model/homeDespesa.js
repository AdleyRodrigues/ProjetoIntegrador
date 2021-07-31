const PopUps = {
    open(){
        // Abrir modal
        // Adicionar a class active ao modal
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')

    },
    close(){
        // fechar o modal
        // remover a class active do modal
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    }
}
class Despesa {

    despesa;
    data;
    descricao;
    categoria;
    pagamento;
    parcelas;
    pago;

    constructor(despesa, data, descricao, categoria,
        pagamento, parcelas, pago) {

            this.despesa = despesa;
            this.data = data;
            this.descricao = descricao;
            this.categoria = categoria;
            this.pagamento = pagamento;
            this.parcelas = parcelas;
            this.pago = pago;
    }
}
function getInput(){
    var despesa = document.getElementById("despesa").value;
    var data = document.getElementById("data").value;
    var descricao = document.getElementById("descricao").value;
    var categoria = document.getElementById("categoria").value;
    var pagamento = document.getElementById("pagamento").value;
    var pago = document.getElementById("pago").value;
    
 
    obj = new Despesa(despesa,data,descricao,categoria,pagamento,pago);
    return obj;
}
function inserir(){
    var listagemDespesa = document.querySelector('tbody');

    var trElement = document.createElement('tr');
    const Despesa = getInput();

    var tdDescricao = document.createElement('td');
    var descricaoElement = document.createTextNode(`${Despesa.descricao}`);
    tdDescricao.appendChild(descricaoElement);
    trElement.appendChild(tdDescricao);

    var tdDespesa = document.createElement('td');
    var despesaElement = document.createTextNode(`R$ ${Despesa.despesa},00`);
    tdDespesa.appendChild(despesaElement);
    trElement.appendChild(tdDespesa);

    var tdCategoria = document.createElement('td');
    var categoriaElement = document.createTextNode(`${Despesa.categoria}`);
    tdCategoria.appendChild(categoriaElement);
    trElement.appendChild(tdCategoria);

    var tdPagamento = document.createElement('td');
    var pagamentoElement = document.createTextNode(`${Despesa.pagamento}`);
    tdPagamento.appendChild(pagamentoElement);
    trElement.appendChild(tdPagamento);

    var tdData = document.createElement('td');
    var dataElement = document.createTextNode(`${Despesa.data.toString()}`);
    tdData.appendChild(dataElement);
    trElement.appendChild(tdData);

    var tdPago = document.createElement('td');
    var pagoElement = document.createTextNode(`${Despesa.pago}`);
    tdPago.appendChild(pagoElement);
    trElement.appendChild(tdPago);
     
   
    listagemDespesa.appendChild(trElement);
}