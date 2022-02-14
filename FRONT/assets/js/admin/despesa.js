const usuario = JSON.parse(sessionStorage.getItem('usuario'));
var cartoes = null;
var categorias = null;
var fllag = {
    1: "VISA",
    2: "CREDICARD",
    3: "NUBANK",
    4: "MASTERCARD",
    5: "FITBANK"
};

window.onload = () => {
    axios.get(`http://localhost:3000/api/categories/${usuario.id}`, {
        auth: {
            username: usuario ? usuario.email : null,
            password: usuario ? usuario.password : null
        }
    })
        .then(function (response) {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                if (response.data.length > 0) {
                    categorias = response.data;
                }
            }
        })
        .catch(function (error) {
            alert(error);
        });

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
                if (response.data.length > 0) {
                    cartoes = response.data;
                }
            }
        })
        .catch(function (error) {
            alert(error);
        });

    getAll();
}

document.getElementById("cadastrar_despesa").addEventListener("click", function (event) {
    event.preventDefault();

    if (document.getElementById("despesa_id").value == "") {
        axios.post("http://localhost:3000/api/expenses/create", {
            amount: document.getElementById("despesa_valor").value,
            date: document.getElementById("despesa_date").value,
            description: document.getElementById("despesa_descricao").value,
            parcel: document.getElementById("despesa_parcela").value,
            status: document.getElementById("despesa_status").checked ? 1 : 0,
            category_id: $("#despesa_categoria option:selected").val(),
            card_id: $("#despesa_cartao option:selected").val(),
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
                    $('#modalDespesa').modal('hide');
                }
            })
            .catch(function (error) {
                alert(error);
            });
    } else {
        axios.put("http://localhost:3000/api/expenses/edit", {
            id: document.getElementById("despesa_id").value,
            amount: document.getElementById("despesa_valor").value,
            date: document.getElementById("despesa_date").value,
            description: document.getElementById("despesa_descricao").value,
            parcel: document.getElementById("despesa_parcela").value,
            status: document.getElementById("despesa_status").checked ? 1 : 0,
            category_id: $("#despesa_categoria option:selected").val(),
            card_id: $("#despesa_cartao option:selected").val(),
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
                    $('#modalDespesa').modal('hide');
                    setTimeout(() => {
                        alert("Despesa atualizada.");
                    }, 200);
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
});

function getAll() {
    axios.get(`http://localhost:3000/api/expenses/${usuario.id}`, {
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
    return axios.get(`http://localhost:3000/api/expenses/${usuario.id}/${id}`, {
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
    let tableRef = document.getElementById("lista_despesas");
    tableRef.innerHTML = "";

    if (elements) {
        elements.forEach(element => {
            let id = element.id;
            let amount = element.amount;
            let date = moment(element.date).format('DD/MM/YYYY');
            let description = element.description;
            let parcel = element.parcel;
            let status = element.status == 0 ? 'Não Pago' : 'Pago';
            let category_id = categorias.find(cat => {
                if (cat.id == element.category_id) {
                    return cat.name;
                }
            });

            let card;

            if (cartoes) {
                card = element.card_id ? cartoes.find(cartao => {
                    if (cartao.id == element.card_id) {
                        return cartao;
                    }
                }) : null;
            }

            tableRef.innerHTML +=
                `<tr>
                <td>${id}</td>
                <td>${amount}</td>
                <td>${date}</td>
                <td>${description}</td>
                <td>${parcel}</td>
                <td>${status}</td>
                <td>${category_id.name}</td>
                <td>${card ? `${fllag[card.flag]} - ${card.number}` : "A VISTA"}</td>
                <td>
                    <a onclick="parcels(${id})" data-toggle="tooltip" title="Ver parcelas" data-placement="top" style="cursor: pointer;">
                        <i class="bi bi-eye-fill" style="color: black;"></i>
                    </a>
                </td>
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

function parcels(id) {
    axios.get(`http://localhost:3000/api/parcels/${id}`, {
        auth: {
            username: usuario ? usuario.email : null,
            password: usuario ? usuario.password : null
        }
    })
        .then(function (response) {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                $('#modalParcelas').modal('show');
                let tableRef = document.getElementById("lista_parcelas");
                tableRef.innerHTML = "";

                response.data.forEach(element => {
                    tableRef.innerHTML +=
                        `<tr>
                    <td>${element.id}</td>
                    <td>${moment(element.due_date).format('DD-MM-YYYY')}</td>
                    <td>${element.amount}</td>
                </tr>`;
                });
            }
        })
        .catch(function (error) {
            alert(error);
        });
}

function remove(id) {
    axios.delete(`http://localhost:3000/api/expenses/${id}`, {
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
    fillSelects();

    getById(id).then((result) => {
        $('#modalDespesa').modal('show');
        $('#despesa_id').val(result.id);
        $('#despesa_valor').val(result.amount);
        $('#despesa_date').val((moment(result.date).format('YYYY-MM-DD')));
        $('#despesa_descricao').val(result.description);
        $('#despesa_parcela').val(result.parcel);
        result.status == 0 ? $('#despesa_status').attr("checked", false) : $('#despesa_status').attr("checked", true);
        $('#despesa_categoria').val(result.category_id);
        $('#despesa_cartao').val(result.card_id);
    });
}

document.getElementById("nova_despesa").addEventListener("click", function (event) {
    $('#modalDespesa').modal('show');
    $('#despesa_id').val("");
    $('#despesa_valor').val("");
    $('#despesa_data').val("");
    $('#despesa_descricao').val("");
    $('#despesa_status').val("");

    fillSelects();
});

function fillSelects() {
    if (categorias) {
        document.getElementById("despesa_categoria").innerHTML = ""
        let option = document.createElement('option');
        option.text = "";
        option.selected = true;
        option.disabled = true;
        document.getElementById("despesa_categoria").append(option);

        categorias.forEach(categoria => {
            option = document.createElement('option');
            option.text = categoria.name;
            option.value = categoria.id;
            document.getElementById("despesa_categoria").append(option);
        })
    } else {
        let option = document.createElement('option');
        option.text = "Nenhuma categoria cadastrada";
        option.selected = true;
        document.getElementById("despesa_categoria").append(option);
    }

    document.getElementById("despesa_cartao").innerHTML = "";
    let option = document.createElement('option');
    option.text = "A VISTA";
    option.selected = true;
    option.value = 6;
    document.getElementById("despesa_cartao").append(option);

    if (cartoes) {
        cartoes.forEach(cartao => {
            option = document.createElement('option');
            option.text = `${fllag[cartao.flag]} - ${cartao.number}`;
            option.value = cartao.id;
            document.getElementById("despesa_cartao").append(option);
        })
    }
}

$(".org").click(function (event) {
    event.preventDefault();
    let option = $(this).attr("data-type");

    axios.get(`http://localhost:3000/api/expenses/filter/${usuario.id}/${option}`, {
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
})