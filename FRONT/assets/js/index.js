document.getElementById("login").addEventListener("click", function (event) {
    event.preventDefault();
    
    axios.post("http://localhost:3000/api/login", {
        email: document.getElementById("email_login").value,
        password: document.getElementById("password_login").value
    })
    .then(function (response) {
        if (response.data.error) {
            alert(response.data.error);
        } else {
            window.localStorage.setItem('usuario', JSON.stringify(response.data));
            window.location.href = "./admin/index.html";
        }
    })
    .catch(function (error) {
        alert(error);
    });
});

document.getElementById("cadastrar").addEventListener("click", function (event) {
    event.preventDefault();

    if (document.getElementById("password_create").value == "" || document.getElementById("password_confirm").value == "") {
        alert("Campo senha ou confirmar senha vazios");
        return;
    }

    if (document.getElementById("password_create").value != document.getElementById("password_confirm").value) {
        alert("Senhas informadas não conferem.");
        return;
    }

    let formData = new FormData();
    formData.append('name', document.getElementById("name").value);
    formData.append('avatar', document.getElementById("avatar").files[0]);
    formData.append('email', document.getElementById("email_create").value);
    formData.append('password', document.getElementById("password_create").value);
    
    axios.post("http://localhost:3000/api/accounts/create", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then((response) => {
        if (response.data.error) {
            alert(response.data.error);
        } else {
            alert('Usuário cadastrado com sucesso.');
            window.location.href = "index.html";
        }
    })
    .catch((error) => {
        alert(error);
    });
});