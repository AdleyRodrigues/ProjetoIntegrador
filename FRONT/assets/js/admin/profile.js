document.getElementById("profile_image").setAttribute("src", `http://localhost:3000/${usuario.avatar}`);
document.getElementById("profile_image").setAttribute("alt", usuario.name);

document.getElementById("mudar_perfil").addEventListener("click", function (event) {
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
    formData.append('id', usuario.id);
    formData.append('name', document.getElementById("name_create").value);
    formData.append('avatar', document.getElementById("avatar_create").files[0]);
    formData.append('email', document.getElementById("email_create").value);
    formData.append('password', document.getElementById("password_create").value);
    
    axios.put("http://localhost:3000/api/accounts/edit", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        auth: {
            username: usuario.email,
            password: usuario.password
        }
    })
    .then((response) => {
        if (response.data.error) {
            alert(response.data.error);
        } else {
            window.sessionStorage.setItem('usuario', JSON.stringify(response.data));
            alert('Usuário atualizado com sucesso.');
            window.location.href = "index.html";
        }
    })
    .catch((error) => {
        alert(error);
    });
});

document.getElementById("open_modal_perfil").addEventListener("click", function (event) {
    event.preventDefault();

    document.getElementById("name_create").value = usuario.name;
    document.getElementById("avatar_create").value = usuario.avatar;
    document.getElementById("email_create").value = usuario.email;
    document.getElementById("password_create").value = "";
});