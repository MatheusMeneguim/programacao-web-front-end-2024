document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('admin-form');
    const userList = document.getElementById('user-list');
    const localStorageKey = 'userListData';

    // Função para carregar usuários salvos no Local Storage
    function loadUsers() {
        const savedUsers = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        savedUsers.forEach((user) => addUserToList(user));
    }

    // Função para adicionar um usuário à lista na interface
    function addUserToList(user) {
        const listItem = document.createElement('li');
        listItem.textContent = `Data: ${user.date}, Nome: ${user.name}, E-mail: ${user.email}`;
        userList.appendChild(listItem);
    }

    // Função para salvar usuário no Local Storage
    function saveUser(user) {
        const savedUsers = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        savedUsers.push(user);
        localStorage.setItem(localStorageKey, JSON.stringify(savedUsers));
    }

    // Evento de envio do formulário
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const date = new Date().toLocaleString();

        if (name && email) {
            const newUser = { name, email, date };
            saveUser(newUser);  // Salvar no Local Storage
            addUserToList(newUser); // Exibir na interface

            // Limpar formulário
            form.reset();
            alert('Usuário cadastrado com sucesso!');
        } else {
            alert('Por favor, preencha todos os campos!');
        }
    });

    // Carregar usuários ao inicializar
    loadUsers();
});
