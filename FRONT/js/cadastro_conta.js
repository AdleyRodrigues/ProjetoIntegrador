document.getElementById("login").addEventListener("click", function (event) {
    event.preventDefault();

    axios({
        method: 'post',
        url: 'http://localhost:3000/api/accounts/create',
        responseType: 'json',
        data: {
            name: document.getElementById("name").value,
            avatar: document.getElementById("avatar").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        }
    })
    .then(function (response) {
        if (response.data.error) {
           window.alert("Preencha os campos obrigatorios");
            // document.getElementById('alert').innerHTML = response.data.error;
        } else {
            //document.getElementById('alert').innerHTML = 'Usuário cadastrado com sucesso. Redirecionando...';
            window.alert("Usuario Cadastrado Com sucecsso!");
            setTimeout(function() {
                window.location.href = "index.html";
            }, 1000);
        }
    })
    .catch(function (error) {
        document.getElementById('alert').innerHTML = error;
    });
});