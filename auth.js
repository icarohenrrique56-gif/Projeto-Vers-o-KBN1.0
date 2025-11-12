// auth.js
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. INICIALIZAÇÃO E ELEMENTOS ---
    const auth = firebase.auth();

    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');
    
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');

    const showRegisterBtn = document.getElementById('show-register-btn');
    const showLoginBtn = document.getElementById('show-login-btn');

    const authError = document.getElementById('auth-error');

    // --- 2. FUNÇÕES AUXILIARES ---

    function showErrorMessage(message) {
        authError.textContent = message;
        authError.classList.remove('hidden');
    }

    function clearErrorMessage() {
        authError.textContent = '';
        authError.classList.add('hidden');
    }

    function disableButtons(disabled = true) {
        loginBtn.disabled = disabled;
        registerBtn.disabled = disabled;
        loginBtn.textContent = disabled ? "Aguarde..." : "Entrar";
        registerBtn.textContent = disabled ? "Aguarde..." : "Registrar";
    }

    // --- 3. LÓGICA DE LOGIN ---
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrorMessage();
        disableButtons(true);

        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-password').value;

        try {
            await auth.signInWithEmailAndPassword(email, pass);
            // Sucesso! O onAuthStateChanged no index.html cuidará do resto
            // Mas forçamos o redirecionamento caso ele demore.
            window.location.href = 'index.html'; // Redireciona para o Kanban
        } catch (err) {
            console.error("Erro de login:", err);
            showErrorMessage(getFriendlyErrorMessage(err));
            disableButtons(false);
        }
    });

    // --- 4. LÓGICA DE REGISTRO ---
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrorMessage();
        disableButtons(true);

        const email = document.getElementById('register-email').value;
        const pass = document.getElementById('register-password').value;

        if (pass.length < 6) {
            showErrorMessage("A senha deve ter pelo menos 6 caracteres.");
            disableButtons(false);
            return;
        }

        try {
            await auth.createUserWithEmailAndPassword(email, pass);
            // Sucesso! Redireciona para o kanban
            window.location.href = 'index.html'; // Redireciona para o Kanban
        } catch (err) {
            console.error("Erro de registro:", err);
            showErrorMessage(getFriendlyErrorMessage(err));
            disableButtons(false);
        }
    });

    // --- 5. LÓGICA DE TROCA DE TELA ---
    showRegisterBtn.addEventListener('click', () => {
        clearErrorMessage();
        loginContainer.classList.add('hidden');
        registerContainer.classList.remove('hidden');
    });

    showLoginBtn.addEventListener('click', () => {
        clearErrorMessage();
        registerContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');
    });

    // --- 6. TRADUÇÃO DE ERROS (Opcional, mas recomendado) ---
    function getFriendlyErrorMessage(error) {
        switch (error.code) {
            case 'auth/invalid-email':
                return 'O formato do e-mail é inválido.';
            case 'auth/user-not-found':
                return 'Nenhum usuário encontrado com este e-mail.';
            case 'auth/wrong-password':
                return 'Senha incorreta. Tente novamente.';
            case 'auth/email-already-in-use':
                return 'Este e-mail já está sendo usado por outra conta.';
            case 'auth/weak-password':
                return 'A senha é muito fraca. Tente uma mais forte.';
            case 'auth/network-request-failed':
                return 'Erro de rede. Verifique sua conexão com a internet.';
            default:
                return 'Ocorreu um erro. Tente novamente.';
        }
    }
});