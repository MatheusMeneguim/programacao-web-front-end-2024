const form = document.getElementById('userForm');
const listaUsuarios = document.getElementById('listaUsuarios');
const limparCamposBtn = document.getElementById('limparCampos');
const excluirTodosBtn = document.getElementById('excluirTodos');
const pesquisaInput = document.getElementById('pesquisa');
const pesquisarBtn = document.getElementById('pesquisarBtn');

// Carregar usuários do Local Storage ao iniciar
window.onload = () => {
    carregarUsuarios();
};

// Evento de submissão do formulário
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const data = new Date().toLocaleString();

    const usuario = { data, nome, email };

    salvarUsuario(usuario);
    exibirUsuario(usuario);
    form.reset();
});

// Salva o usuário no Local Storage
function salvarUsuario(usuario) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Exibe um usuário na lista
function exibirUsuario(usuario) {
    const li = document.createElement('li');
    li.innerHTML = `
        <strong>Data:</strong> ${usuario.data}, 
        <strong>Nome:</strong> ${usuario.nome}, 
        <strong>E-mail:</strong> ${usuario.email}
        <button class="excluir-item">Excluir</button>
    `;

    // Botão para excluir individualmente
    li.querySelector('.excluir-item').addEventListener('click', () => {
        excluirUsuario(usuario);
        li.remove();
    });

    listaUsuarios.appendChild(li);
}

// Carrega todos os usuários salvos
function carregarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    listaUsuarios.innerHTML = '';
    usuarios.forEach(exibirUsuario);
}

// Exclui todos os usuários
excluirTodosBtn.addEventListener('click', () => {
    if (confirm('Tem certeza que deseja excluir todos os usuários?')) {
        localStorage.removeItem('usuarios');
        listaUsuarios.innerHTML = '';
    }
});

// Exclui um usuário específico
function excluirUsuario(usuarioExcluido) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios = usuarios.filter(usuario => usuario.data !== usuarioExcluido.data);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Botão de limpar campos
limparCamposBtn.addEventListener('click', () => {
    form.reset();
});

// Pesquisa na lista de usuários
pesquisarBtn.addEventListener('click', () => {
    const termo = pesquisaInput.value.toLowerCase();
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const resultados = usuarios.filter(usuario =>
        usuario.nome.toLowerCase().includes(termo) ||
        usuario.email.toLowerCase().includes(termo)
    );

    listaUsuarios.innerHTML = '';
    resultados.forEach(exibirUsuario);
});
