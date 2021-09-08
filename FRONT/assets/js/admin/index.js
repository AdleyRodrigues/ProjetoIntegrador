const usuario = JSON.parse(sessionStorage.getItem('usuario'));

window.onload = () => {
    document.getElementById("name").innerHTML = usuario.name;
    document.getElementById("avatar").setAttribute("src", `http://localhost:3000/${usuario.avatar}`);
    document.getElementById("avatar").setAttribute("alt", usuario.name);
    document.getElementById("email").innerHTML = usuario.email;
}