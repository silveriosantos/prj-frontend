// request via JavaScript ajax 4 passos
// 01 criar a váriavel
ajax = new XMLHttpRequest();
var lista;
var api = "https://silverio-santos.herokuapp.com/api/produto/";

function listar() {
    // 02 definição do nosso request (forma e endereço)
    ajax.open("GET", api);
    // 03 manda de fato a request
    ajax.send();
    // 04 execução quando tiver a devolutiva do request
    ajax.onload = function () {
        lista = this.responseText;
        // console.log(lista);
        lista = JSON.parse(lista);
        // console.log(lista);
        texto = "";
        i = 0;
        for (const u of lista) {
            texto += `<tr onclick='editar(${i})'><td>${u.nome}</td><td>${u.email}</td></tr>`;
            i++;
        }
        document.getElementById('lista').innerHTML = texto;
    }
}

function editar(i) {
    u = lista[i];
    document.getElementById("nome").value = u.nome;
    document.getElementById("email").value = u.email;
    document.getElementById("id").value = u.id;
}

function gravar() {
    //alert("Estamos dentro da function incluir");
    var usuario = {};
    usuario.nome = document.getElementById("nome").value;
    usuario.email = document.getElementById("email").value;
    // console.log(usuario);

    usuario.id = document.getElementById("id").value;
    if (usuario.id > 0) {
        acao = "PUT"; // alteração
    } else {
        acao = "POST"; // incluir
    }

    ajax.open(acao, api);
    ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    ajax.send(JSON.stringify(usuario));
    ajax.onload = function () {
        // console.log(this.responseText);
        listar();
        limpar();
    }
}

function limpar() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("id").value = "";
}

function apagar() {
    id = document.getElementById("id").value;
    ajax.open("DELETE", api + id);
    ajax.send();
    ajax.onload = function () {
        alert(this.responseText);
        listar();
        limpar();
    }
}
listar();