const usuario = JSON.parse(sessionStorage.getItem('usuario'));

window.onload = () => {
    getAll();
}

document.getElementById("cadastrar_categoria").addEventListener("click", function (event) {
    event.preventDefault();

    if (document.getElementById("categoria_id").value == "") {
        axios.post("http://localhost:3000/api/categories/create", {
            name: document.getElementById("categoria_nome").value,
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
                    $('#modalCategoria').modal('hide');
                }
            })
            .catch(function (error) {
                alert(error);
            });
    } else {
        axios.put("http://localhost:3000/api/categories/edit", {
            id: document.getElementById("categoria_id").value,
            name: document.getElementById("categoria_nome").value,
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
                    $('#modalCategoria').modal('hide');
                    setTimeout(() => {
                        alert("Categoria atualizada.");
                    }, 200);
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
});

function getAll() {
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
                console.log(response.data);
                if (response.data.length > 0) {
                    tableBodyElements(response.data);
                }
            }
        })
        .catch(function (error) {
            alert(error);
        });
}

function getById(id) {
    return axios.get(`http://localhost:3000/api/categories/${usuario.id}/${id}`, {
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
    let tableRef = document.getElementById("lista_categorias");
    tableRef.innerHTML = "";

    if (elements) {
        elements.forEach(element => {
            let id = element.id;
            let name = element.name;

            tableRef.innerHTML +=
                `<tr>
                <td>${id}</td>
                <td>${name}</td>
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
    axios.delete(`http://localhost:3000/api/categories/${id}`, {
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
                setTimeout(() => {
                    alert(response.data);
                }, 100);
            }
        })
        .catch(function (error) {
            alert(error);
        });
}

function edit(id) {
    getById(id).then((result) => {
        $('#modalCategoria').modal('show');
        $('#categoria_id').val(result.id);
        $('#categoria_nome').val(result.name);
    });
}

document.getElementById("nova_categoria").addEventListener("click", function (event) {
    $('#modalCategoria').modal('show');
    $('#categoria_id').val("");
    $('#categoria_nome').val("");
});