window.onload = () => {
    let usuario = JSON.parse(localStorage.getItem('usuario'));

    axios.get(`http://localhost:3000/api/accounts/${usuario.id}`, {
        auth: {
            username: usuario.email,
            password: usuario.password
        }    
    })
    .then(function (response) {
        if (response.data.error) {
            alert(response.data.error);
        } else {
            document.getElementById("id").innerHTML = response.data.id;
            document.getElementById("name").innerHTML = response.data.name;
            document.getElementById("avatar").setAttribute("src", `http://127.0.0.1:3000/api/${response.data.avatar}`);
            document.getElementById("avatar").setAttribute("alt", response.data.name);
            document.getElementById("email").innerHTML = response.data.email;
        }
    })
    .catch(function (error) {
        alert(error);
    });
}