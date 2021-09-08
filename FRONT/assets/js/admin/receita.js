const usuario = JSON.parse(sessionStorage.getItem('usuario'));

window.onload = () => {
    getAll();
}

document.getElementById("cadastrar_receita").addEventListener("click", function (event) {
    event.preventDefault();
    
    if (document.getElementById("receita_id").value == "") {
        axios.post("http://localhost:3000/api/incomings/create", {
            date: document.getElementById("receita_date").value,
            amount: document.getElementById("receita_value").value,
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
                $('#modalReceita').modal('hide');
            }
        })
        .catch(function (error) {
            alert(error);
        });
    } else {
        axios.put("http://localhost:3000/api/incomings/edit", {
            id: document.getElementById("receita_id").value,
            date: document.getElementById("receita_date").value,
            amount: document.getElementById("receita_value").value,
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
                $('#modalReceita').modal('hide');
                setTimeout(() => {
                    alert("Receita atualizada.");
                }, 200);
            }
        })
        .catch(function (error) {
            alert(error);
        });
    }
});

document.getElementById("filtrar_receita").addEventListener("click", function (event) {
    event.preventDefault();

    if (!document.getElementById("data_de").value && !document.getElementById("data_ate").value) {
        alert("Nenhuma data selecionada");
        return;
    }
    
    axios.post("http://localhost:3000/api/incomings/filter", {
        date_from: document.getElementById("data_de").value,
        date_to: document.getElementById("data_ate").value,
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
            tableBodyElements(response.data);
        }
    })
    .catch(function (error) {
        alert(error);
    });
});

function getAll() {
    axios.get(`http://localhost:3000/api/incomings/${usuario.id}`, {
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
    return axios.get(`http://localhost:3000/api/incomings/${usuario.id}/${id}`, {
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
    let tableRef = document.getElementById("lista_receitas");
    document.getElementById("lista_receitas").innerHTML = "";

    if (elements) {
        elements.forEach(element => {
            let id = element.id;
            let date = moment(element.date).format('DD/MM/YYYY');
            let amount = element.income;
            
            tableRef.innerHTML += 
            `<tr>
                <td>${id}</td><td>${date}</td><td>${amount}</td>
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
    axios.delete(`http://localhost:3000/api/incomings/${id}`, {
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
        $('#modalReceita').modal('show');
        $('#receita_id').val(result.id);
        $('#receita_date').val(moment(result.date).format('YYYY-MM-DD'));
        $('#receita_value').val(result.income);
    });
}

document.getElementById("nova_receita").addEventListener("click", function (event) {
    $('#modalReceita').modal('show');
    $('#receita_id').val("");
    $('#receita_date').val("");
    $('#receita_value').val("");
});