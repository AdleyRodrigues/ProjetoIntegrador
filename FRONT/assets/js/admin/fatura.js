const usuario = JSON.parse(sessionStorage.getItem('usuario'));
var cartoes = null;

window.onload = () => {
    axios.get(`http://localhost:3000/api/cards/${usuario.id}`, {
        auth: {
            username: usuario ? usuario.email : null,
            password: usuario ? usuario.password : null
        }    
    })
    .then(function (response) {
        if (response.data.error) {
            alert(response.data.error);
        } else {
            cartoes = response.data;
            fillSelects();
        }
    })
    .catch(function (error) {
        alert(error);
    });
}

function fillSelects() {
    if (cartoes) {
        document.getElementById("card_select").innerHTML = "";
        let option = document.createElement('option');

        option.text = "Selecione um cartão";
        option.selected = true;
        option.disabled = true;
        document.getElementById("card_select").append(option);

        cartoes.forEach(cartao => {
            option = document.createElement('option');

            let flag = {
                1: "VISA",
                2: "CREDICARD",
                3: "NUBANK",
                4: "MASTERCARD",
                5: "FITBANK",
            };

            option.text = flag[cartao.flag] + " - " + cartao.number;
            option.value = cartao.id;
            document.getElementById("card_select").append(option);
        })
    } else {
        let option = document.createElement('option');
        option.text = "Nenhum cartão cadastrado";
        option.selected = true;
        document.getElementById("card_select").append(option);
    }
}

document.getElementById("card_select").addEventListener("change", () => {
    var cardNumber = document.getElementById("card_select").value;
    
    axios.get(`http://localhost:3000/api/cards/${usuario.id}/${cardNumber}`, {
        auth: {
            username: usuario ? usuario.email : null,
            password: usuario ? usuario.password : null
        }    
    })
    .then(function (response) {
        if (response.data.error) {
            alert(response.data.error);
        } else {
            cartao = response.data;
            displayInvoice(response.data);
        }
    })
    .catch(function (error) {
        alert(error);
    });
})

function displayInvoice(card, dateCombo = null) {
    if (card) {
        let month = new Date().getMonth() + 1;
        let date  = `${new Date().getFullYear()}-${month}-${card.closed_at}`;
        
        let type = {
            1: "Débito",
            2: "Crédito",
        };

        document.getElementById('invoice').removeAttribute('style');
        document.getElementById('card_select_month').value = month;
        document.getElementById('date_closed_at').innerHTML = card.closed_at;
        document.getElementById('account_name').innerHTML = usuario.name;
        document.getElementById('account_email').innerHTML = usuario.email;
        document.getElementById('card_type').innerHTML = `<span class="text-muted">Forma:</span> ${type[card.type]}`;
        document.getElementById('card_number').innerHTML = `<span class="text-muted">Nº do Cartão:</span> ${card.number}`;
        document.getElementById('card_limitt').innerHTML = `<span class="text-muted">Limite:</span> ${card.limitt}`;
        document.getElementById('card_current_value').innerHTML = `<span class="text-muted">Valor Gasto:</span> ${card.current_value}`;

        axios.get(`http://localhost:3000/api/expenses/${usuario.id}/${card.id}/${date}`, {
            auth: {
                username: usuario ? usuario.email : null,
                password: usuario ? usuario.password : null
            }    
        })
        .then(function (response) {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                getCategory(response.data, card);
            }
        })
        .catch(function (error) {
            alert(error);
        });
    }
}

function getCategory(elements, card) {
    if (elements) {
        elements.forEach(element => {
            axios.get(`http://localhost:3000/api/categories/${usuario.id}/${element.category_id}`, {
                auth: {
                    username: usuario ? usuario.email : null,
                    password: usuario ? usuario.password : null
                }    
            })
            .then(function (response) {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    console.log(response.data.name);
                    element.category_name = response.data.name;
                }
            })
            .catch(function (error) {
                alert(error);
            });
        })

        getDataParcela(elements, card);
    }
}

function getDataParcela(elements, card) {
    let date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${card.closed_at}`;
    let total = 0;

    if (elements) {
        elements.forEach(element => {
            axios.get(`http://localhost:3000/api/parcels/${element.id}/${date}`, {
                auth: {
                    username: usuario ? usuario.email : null,
                    password: usuario ? usuario.password : null
                }    
            })
            .then(function (response) {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    if (response.data) {
                        element.data = response.data;
                        total += response.data.amount;
                        mountTable(element, total);
                    }
                }
            })
            .catch(function (error) {
                alert(error);
            });
        });
    }
}

function mountTable(element, total) {
    let tableRef = document.getElementById("tbody_expenses_lista");
    let date = moment(element.date).format('DD/MM/YYYY');
    let status = element.status == 0 ? "Não Pago" : "Pago";

    tableRef.innerHTML += 
    `<tr>
        <td>${element.id}</td>
        <td>${date}</td>
        <td>${element.description}</td>
        <td>${element.category_name}</td>
        <td>${status}</td>
        <td>${element.parcel}</td>
        <td>${element.data.amount}</td>
    </tr>`;

    document.getElementById("total_amount").innerHTML = "R$ " + total;
}