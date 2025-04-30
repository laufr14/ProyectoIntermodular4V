 // Función para validar el correo de Gmail
 function validarGmail() {
    const correoInput = document.getElementById('correo-login');
    const errorDiv = document.getElementById('email-error');

    const correo = correoInput.value.trim();
    const regexGmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (correo === "") {
      errorDiv.innerText = "El correo no puede estar vacío.";
      errorDiv.style.display = "block";
      return true;
    } else if (!regexGmail.test(correo)) {
      errorDiv.innerText = "Debe ser un correo válido de Gmail (ej: usuario@gmail.com)";
      errorDiv.style.display = "block";
      return true;
    } else {
      errorDiv.style.display = "none";
      return false;
    }
  }

  // Función para validar la contraseña
  function validarLogin(event) {
    event.preventDefault();

    const usuario = document.getElementById('correo-login').value.trim();
    const clave = document.getElementById('password-login').value;
    const passwordError = document.getElementById('password-error');

    const simboloValido = /[@#!¡¿?.,;:\-_<>\*\/\+\-=\$%&()]/;

    const cumpleSeguridad = clave.length >= 8 &&
                            /[A-Z]/.test(clave) &&
                            /[a-z]/.test(clave) &&
                            /\d/.test(clave) &&
                            simboloValido.test(clave);

    let error = false;

    if (!cumpleSeguridad) {
      passwordError.innerText = "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";
      passwordError.style.display = "block";
      error = true;
    } else {
      passwordError.style.display = "none";
    }

    // Validación ficticia de acceso
    if (!error) {
      if (usuario.toLowerCase() === "admin@gmail.com" && clave === "Admin123!") {
        alert("¡Acceso correcto!");
      } else {
        alert("Usuario o contraseña incorrectos.");
        error = true;
      }
    }

    return !error;
  }

  // Evento al enviar el formulario
  document.getElementById("loginForm").addEventListener("submit", function(event) {
    const errorCorreo = validarGmail();
    const errorLogin = validarLogin(event);
    if (errorCorreo || errorLogin) {
      event.preventDefault();
    }
  });