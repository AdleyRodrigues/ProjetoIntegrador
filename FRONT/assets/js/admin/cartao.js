const usuario = JSON.parse(sessionStorage.getItem('usuario'));

window.onload = () => {
    getAll();
}

document.getElementById("cadastrar_cartao").addEventListener("click", function (event) {
    event.preventDefault();

    if (document.getElementById("cartao_id").value == "") {
        axios.post("http://localhost:3000/api/cards/create", {
            number: document.getElementById("card_number").value,
            limitt: document.getElementById("card_limit").value,
            closed_at: document.getElementById("card_closed_at").value,
            type: document.getElementById("card_type").value,
            flag: document.getElementById("card_flag").value,
            current_value: 0,
            account_id: usuario ? usuario.id : null
        }, {
            auth: {
                username: usuario ? usuario.email : null,
                password: usuario ? usuario.password : null
            }
        })
            .then(function (response) {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    getAll();
                    $('#modalCartao').modal('hide');
                }
            })
            .catch(function (error) {
                alert(error);
            });
    } else {
        axios.put("http://localhost:3000/api/cards/edit", {
            id: document.getElementById("cartao_id").value,
            number: document.getElementById("card_number").value,
            limitt: document.getElementById("card_limit").value,
            closed_at: document.getElementById("card_closed_at").value,
            type: document.getElementById("card_type").value,
            flag: document.getElementById("card_flag").value,
            current_value: document.getElementById("cartao_current_value").value,
            account_id: usuario ? usuario.id : null
        }, {
            auth: {
                username: usuario ? usuario.email : null,
                password: usuario ? usuario.password : null
            }
        })
            .then(function (response) {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    getAll();
                    $('#modalCartao').modal('hide');
                    setTimeout(() => {
                        alert("Cartão atualizado.");
                    }, 200);
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
});

function getAll() {
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
                tableBodyElements(response.data);
            }
        })
        .catch(function (error) {
            alert(error);
        });
}

function getById(id) {
    return axios.get(`http://localhost:3000/api/cards/${usuario.id}/${id}`, {
        auth: {
            username: usuario ? usuario.email : null,
            password: usuario ? usuario.password : null
        }
    })
        .then(function (response) {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                return response.data;
            }
        })
        .catch(function (error) {
            alert(error);
        });
}

function tableBodyElements(elements) {
    let tableRef = document.getElementById("lista_cartoes");
    document.getElementById("lista_cartoes").innerHTML = "";

    if (elements) {
        elements.forEach(element => {
            let id = element.id;
            let number = element.number;
            let limitt = element.limitt;
            let closed_at = element.closed_at;
            let type = element.type == 1 ? "Débito" : "Crédito";
            let current_value = element.current_value;

            let flag = {
                1: "VISA",
                2: "CREDICARD",
                3: "NUBANK",
                4: "MASTERCARD",
                5: "FITBANK",
            };

            tableRef.innerHTML +=
                `<tr>
                <td>${id}</td>
                <td>${number}</td>
                <td>${type}</td>
                <td>${flag[element.flag]}</td>
                <td>${limitt}</td>
                <td>${closed_at}</td>
                <td>${current_value}</td>
                <td>
                    <a onclick="edit(${id})" data-toggle="tooltip" title="Editar" data-placement="top" style="cursor: pointer;">
                        <i class="bi bi-pencil-square" style="color: blue;"></i>
                    </a>
                </td>
                <td>
                    <a onclick="remove(${id})" data-toggle="tooltip" title="Remover" data-placement="top" style="cursor: pointer;">
                        <i class="bi bi-trash" style="color: red;"></i>
                    </a>
                </td>
            </tr>`;
        });
    }
}

function remove(id) {
    axios.delete(`http://localhost:3000/api/cards/${id}`, {
        auth: {
            username: usuario ? usuario.email : null,
            password: usuario ? usuario.password : null
        }
    })
        .then(function (response) {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                getAll();
            }
        })
        .catch(function (error) {
            alert(error);
        });
}

function edit(id) {
    getById(id).then((result) => {
        $('#modalCartao').modal('show');
        $('#cartao_id').val(result.id);
        $('#card_number').val(result.number);
        $('#card_limit').val(result.limitt);
        $('#card_closed_at').val(result.closed_at);
        $('#card_type').val(result.type);
        $('#card_flag').val(result.flag);
        $('#cartao_current_value').val(result.current_value);
    });
}

document.getElementById("novo_cartao").addEventListener("click", function (event) {
    $('#modalCartao').modal('show');
    $('#cartao_id').val("");
    $('#card_number').val("");
    $('#card_limit').val("");
    $('#card_closed_at').val("");
    $('#card_type').val("");
    $('#card_flag').val("");
    $('cartao_current_value').val("");
});