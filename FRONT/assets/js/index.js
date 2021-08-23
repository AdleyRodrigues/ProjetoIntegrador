document.getElementById("login").addEventListener("click", function (event) {
    event.preventDefault();
    
    axios.post("http://localhost:3000/api/login", {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    })
    .then(function (response) {
        if (response.data.error) {
            alert(response.data.error);
        } else {
            window.location.href = "./admin/index.html";
        }
    })
    .catch(function (error) {
        alert(error);
    });
});

document.getElementById("cadastrar").addEventListener("click", function (event) {
    event.preventDefault();

    if (document.getElementById("password").value != document.getElementById("password_confirm").value) {
        alert("Senhas informadas não conferem.");
        return;
    }

    let formData = new FormData();
    formData.append('name', document.getElementById("name").value);
    formData.append('avatar', document.getElementById("avatar").files[0]);
    formData.append('email', document.getElementById("email").value);
    formData.append('password', document.getElementById("password").value);
    
    axios.post("http://localhost:3000/api/accounts/create", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(function (response) {
        if (response.data.error) {
            alert(response.data.error);
        } else {
            alert('Usuário cadastrado com sucesso.');
            window.location.href = "index.html";
        }
    })
    .catch(function (error) {
        alert(error);
    });
});