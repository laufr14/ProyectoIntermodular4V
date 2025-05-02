// VALIDACIÓN FORMULARIO DE VOLUNTARIOS
function enviarSolicitudPendiente() {
    const limpiarErrores = () => {
      document.querySelectorAll('.help.is-danger').forEach(p => p.textContent = '');
    };
    limpiarErrores();
  
    let errores = 0;
  
    // Valores
    const nombre = document.getElementById("nombre-voluntario").value.trim();
    const edad = parseInt(document.getElementById("edad-voluntario").value.trim(), 10);
    const correo = document.getElementById("correo-voluntario").value.trim();
    const telefono = document.getElementById("telefono-voluntario").value.trim();
    const motivacion = document.getElementById("motivacion-voluntario").value.trim();
    const experiencia = document.getElementById("experiencia-voluntario").value.trim();
    const curso = document.getElementById("curso-voluntario").value;
    const terminos = document.getElementById("terminos-voluntario").checked;
  
    const dias = document.querySelectorAll("input[name='dias']:checked");
    const horarios = document.querySelectorAll("input[name='horario']:checked");
  
    // Validaciones básicas
    if (!nombre) {
      document.getElementById("error-nombre-voluntario").textContent = "El nombre es obligatorio.";
      errores++;
    }
  
    if (isNaN(edad) || edad < 18) {
      document.getElementById("error-edad-voluntario").textContent = "Debes tener al menos 18 años.";
      errores++;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      document.getElementById("error-correo-voluntario").textContent = "Correo inválido.";
      errores++;
    }
  
    const telefonoRegex = /^[0-9]{9}$/;
    if (!telefonoRegex.test(telefono)) {
      document.getElementById("error-telefono-voluntario").textContent = "Teléfono inválido. 9 dígitos requeridos.";
      errores++;
    }
  
    if (dias.length === 0) {
      document.getElementById("error-dias-voluntario").textContent = "Selecciona al menos un día.";
      errores++;
    }
  
    if (horarios.length === 0) {
      document.getElementById("error-horario-voluntario").textContent = "Selecciona al menos un horario.";
      errores++;
    }
  
    if (!motivacion || motivacion.length < 50) {
      document.getElementById("error-motivacion-voluntario").textContent = "La motivación debe tener al menos 50 caracteres.";
      errores++;
    }
  
    if (experiencia && experiencia.length < 30) {
      alert("La experiencia debe tener al menos 30 caracteres si se incluye.");
      errores++;
    }
  
    if (curso === "") {
      document.getElementById("error-curso-voluntario").textContent = "Selecciona tu curso.";
      errores++;
    }
  
    if (!terminos) {
      document.getElementById("error-terminos-voluntario").textContent = "Debes aceptar los términos.";
      errores++;
    }
  
    if (errores === 0) {
      alert("Formulario de voluntario enviado correctamente.");
    }
  }
  
  
  // VALIDACIÓN FORMULARIO DE ORGANIZACIÓN
  document.getElementById("form-organizacion").addEventListener("submit", function (e) {
    e.preventDefault();
    let errores = 0;
  
    const limpiarErrores = () => {
      document.querySelectorAll('#form-organizacion .help.is-danger').forEach(p => p.textContent = '');
    };
    limpiarErrores();
  
    const campos = [
      { id: "nombre-organizacion", error: "error-nombre-organizacion", mensaje: "El nombre de la organización es obligatorio." },
      { id: "tipo-organizacion", error: "error-tipo-organizacion", mensaje: "Selecciona el tipo de organización." },
      { id: "correo-organizacion", error: "error-correo-organizacion", mensaje: "Correo inválido.", tipo: "email" },
      { id: "telefono-organizacion", error: "error-telefono-organizacion", mensaje: "Teléfono inválido.", tipo: "telefono" },
      { id: "nombre-representante", error: "error-nombre-representante", mensaje: "Nombre del representante obligatorio." },
      { id: "cargo-representante", error: "error-cargo-representante", mensaje: "El cargo es obligatorio." },
      { id: "descripcion-organizacion", error: "error-descripcion-organizacion", mensaje: "La descripción debe tener mínimo 50 caracteres.", min: 50 },
      { id: "actividades-organizacion", error: "error-actividades-organizacion", mensaje: "Describe las actividades con al menos 50 caracteres.", min: 50 },
      { id: "perfiles-voluntarios", error: "error-perfiles-voluntarios", mensaje: "Describe los perfiles requeridos (mín. 30 caracteres).", min: 30 }
    ];
  
    campos.forEach(campo => {
      const valor = document.getElementById(campo.id).value.trim();
      const errorEl = document.getElementById(campo.error);
  
      if (!valor || (campo.min && valor.length < campo.min)) {
        errorEl.textContent = campo.mensaje;
        errores++;
      }
  
      if (campo.tipo === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(valor)) {
          errorEl.textContent = campo.mensaje;
          errores++;
        }
      }
  
      if (campo.tipo === "telefono") {
        const telefonoRegex = /^[0-9]{9}$/;
        if (!telefonoRegex.test(valor)) {
          errorEl.textContent = campo.mensaje;
          errores++;
        }
      }
    });
  
    const terminos = document.getElementById("terminos-organizacion").checked;
    if (!terminos) {
      document.getElementById("error-terminos-organizacion").textContent = "Debes aceptar la política de privacidad y términos.";
      errores++;
    }
  
    if (errores === 0) {
      alert("Formulario de organización enviado correctamente.");
      // Aquí puedes llamar a .submit() si es necesario
    }
  });
  
  //ABRIR Y CERRAR MODAL DE REGISTRO DE ACTIVIDADES POR PARTE DE UNA ORGANIZACIÓN
  function abrirModalActividad() {
    document.getElementById('modal-actividad').classList.add('is-active');
  }
  function cerrarModalActividad() {
    document.getElementById('modal-actividad').classList.remove('is-active');
  }

  //Validaciones para el modal de registro de actividad por parte de las organizaciones y simulación de registro de actividad 
  document.getElementById('form-actividad-organizacion').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Limpiar errores anteriores
    document.querySelectorAll('#form-actividad-organizacion .help.is-danger').forEach(p => p.textContent = '');
  
    let valido = true;
  
    // Obtener elementos
    const nombre = document.getElementById('nombre-actividad');
    const descripcion = document.getElementById('descripcion-actividad');
    const fecha = document.getElementById('fecha-actividad');
    const duracion = document.getElementById('duracion-actividad');
    const modalidad = document.getElementById('modalidad-actividad');
    const perfiles = document.getElementById('perfiles-actividad');
    const accesible = document.getElementById('accesible-actividad');
  
    // Función auxiliar para mostrar errores
    function mostrarError(input, mensaje) {
      let help = input.parentElement.querySelector('.help.is-danger');
      if (!help) {
        help = document.createElement('p');
        help.className = 'help is-danger';
        input.parentElement.appendChild(help);
      }
      help.textContent = mensaje;
    }
  
    // Validaciones
    if (nombre.value.trim().length < 3) {
      mostrarError(nombre, 'El nombre debe tener al menos 3 caracteres.');
      valido = false;
    }
  
    if (descripcion.value.trim().length < 20) {
      mostrarError(descripcion, 'La descripción debe tener al menos 20 caracteres.');
      valido = false;
    }
  
    if (!fecha.value) {
      mostrarError(fecha, 'La fecha es obligatoria.');
      valido = false;
    }
  
    if (!duracion.value || isNaN(duracion.value) || parseInt(duracion.value) <= 0) {
      mostrarError(duracion, 'Introduce una duración válida en horas.');
      valido = false;
    }
  
    if (!modalidad.value) {
      mostrarError(modalidad, 'Selecciona una modalidad.');
      valido = false;
    }
  
    if (perfiles.value.trim().length < 10) {
      mostrarError(perfiles, 'Describe los perfiles requeridos (mín. 10 caracteres).');
      valido = false;
    }
  
    // Si pasa todas las validaciones
    if (valido) {
      const odsSeleccionados = Array.from(document.querySelectorAll('input[name="ods"]:checked'))
        .map(cb => 'ODS ' + cb.value)
        .join(', ') || 'Ninguno';
  
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${nombre.value.trim()}</td>
        <td>${fecha.value}</td>
        <td>${duracion.value} h</td>
        <td>${modalidad.value}</td>
        <td>${odsSeleccionados}</td>
        <td>${accesible.checked ? 'Sí' : 'No'}</td>
      `;
  
      document.getElementById('tabla-actividades-body').appendChild(fila);
  
      document.getElementById('form-actividad-organizacion').reset();
      cerrarModalActividad();
    }
  });
  

  
  