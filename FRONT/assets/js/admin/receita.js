const usuario = JSON.parse(localStorage.getItem('usuario'));

window.onload = () => {
    getAll();
}

document.getElementById("cadastrar_receita").addEventListener("click", function (event) {
    event.preventDefault();
    
    axios.post("http://localhost:3000/api/incomings/create", {
        date: document.getElementById("receita_date").value,
        amount: document.getElementById("receita_value").value,
        account_id: usuario ? usuario.id : null
    }, {
        auth: {
            name: usuario ? usuario.email : null,
            pass: usuario ? usuario.password : null
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
});

function getAll() {
    axios.get(`http://localhost:3000/api/incomings/${usuario.id}`, {
        auth: {
            name: usuario ? usuario.email : null,
            pass: usuario ? usuario.password : null
        }    
    })
    .then(function (response) {
        if (response.data.error) {
            alert(response.data.error);
        } else {
            if (response.data.length > 0) {
                tableBodyElements(response.data);
            } else {
                alert("Nenhum registro encontrado");
            }
            
        }
    })
    .catch(function (error) {
        alert(error);
    });
}

function getById(id) {
    axios.get(`http://localhost:3000/api/incomings/${id}`, {
        auth: {
            name: usuario ? usuario.email : null,
            pass: usuario ? usuario.password : null
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
    
    tableRef.innerHTML = "";
    //tableRef.removeChild();
    //tableRef.remove();

    elements.forEach(element => {
        let id = element.id;
        let date = moment(element.date).format('DD/MM/YYYY');
        let amount = element.income;
        
        tableRef.innerHTML += 
        `<tr>
            <td>${id}</td><td>${date}</td><td>${amount}</td>
            <td>
                <button onclick="edit(${id})" data-toggle="tooltip" title="Editar" data-placement="top">
                    <i class="bi bi-pencil-square" style="color: blue;"></i>
                </button>
            </td>
            <td>
                <button onclick="remove(${id})" data-toggle="tooltip" title="Remover" data-placement="top">
                    <i class="bi bi-trash" style="color: red;"></i>
                </button>
            </td>
        </tr>`;
    });
}

function remove(id) {    
    axios.delete("http://localhost:3000/api/incomings/" + id, {}, {
        auth: {
            name: usuario ? usuario.email : null,
            pass: usuario ? usuario.password : null
        }   
    })
    .then(function (response) {
        if (response.data.error) {
            alert(response.data.error);
        } else {
            getAll();
            alert(response.data);
        }
    })
    .catch(function (error) {
        alert(error);
    });
}

function edit(id) {
    income = getById(id);

    if (income) {
        $('#modalNovaReceita').modal('show');
        $('#receita_date').val(income.date);
        $('#receita_value').val(income.income);
    }
    
    axios.put("http://localhost:3000/api/incomings/", {
        id: income.id,
        date: $('#receita_date').val(),
        amount: $('#receita_value').val(),
        account_id: usuario ? usuario.id : null
    }, {
        auth: {
            name: usuario ? usuario.email : null,
            pass: usuario ? usuario.password : null
        }   
    })
    .then(function (response) {
        if (response.data.error) {
            alert(response.data.error);
        } else {
            getAll();
            alert(response.data);
        }
    })
    .catch(function (error) {
        alert(error);
    });
}