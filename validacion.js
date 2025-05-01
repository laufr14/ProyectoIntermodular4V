// Este archivo contiene la validación del modal de inicio de sesión

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('correo-login');
  const passwordInput = document.getElementById('password-login');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError.textContent = 'Correo electrónico no válido';
      emailError.style.display = 'block';
      isValid = false;
    } else {
      emailError.textContent = '';
      emailError.style.display = 'none';
    }

    if (password.length < 6) {
      passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres';
      passwordError.style.display = 'block';
      isValid = false;
    } else {
      passwordError.textContent = '';
      passwordError.style.display = 'none';
    }

    if (isValid) {
      if (email === "admin@email.com" && password === "123456") {
        // Simulación login exitoso
        passwordError.textContent = '';
        emailError.textContent = '';
        window.location.href = "admin.html";
        document.getElementById("modal-login").classList.remove("is-active");
      } else {
        passwordError.textContent = 'Correo o contraseña incorrectos';
        passwordError.style.display = 'block';
      }
    }
  });
});