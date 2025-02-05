// Função para registrar um usuário
function registerUser() {
    const username = document.getElementById("register-username").value.trim();
    const password = document.getElementById("register-password").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const name = document.getElementById("register-name").value.trim();
    const age = document.getElementById("register-age").value.trim();

    // Validações específicas
    if (username === "" || password === "" || email === "" || name === "" || age === "") {
        alert("Todos os campos são obrigatórios!");
        return;
    }

     if (age  < 12 || age > 123) {
        alert("A idade deve estar entre 12 e 123 anos.");
        return; // Impede o envio do formulário
    }

    if (!email.includes("@")) {
        alert("E-mail inválido! Certifique-se de que contém '@'.");
        return;
    }

    // Recupera usuários cadastrados
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Verifica se o e-mail já está cadastrado
    if (users.some(user => user.email === email)) {
        alert("Este e-mail já está cadastrado! Tente outro.");
        return;
    }

    // Salva novo usuário
    users.push({ username, password, email, name, age });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registro realizado com sucesso! Faça login agora.");
    window.location.href = "login.html";
}

// Função para login
function loginUser() {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Salva usuário logado
        localStorage.setItem("loggedUser", JSON.stringify(user));

        alert(`Bem-vindo, ${user.username}!`);
        window.location.href = "inicial.html";
    } else {
        alert("Usuário ou senha inválidos!");
    }
}

// Função para verificar se o usuário está logado
function checkLogin() {
    const user = JSON.parse(localStorage.getItem("loggedUser"));

    if (user) {
        document.getElementById("welcome-message").innerText = `Bem-vindo, ${user.name}!`;
    } else {
        alert("Você não tem permissão para acessar esta página. Redirecionando...");
        window.location.href = "login.html";
    }
}

// Função para logout
function logout() {
    localStorage.removeItem("loggedUser");
    alert("Você saiu da conta.");
    window.location.href = "login.html";
}
