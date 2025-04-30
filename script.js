// Script para el menú de navegación
document.addEventListener('DOMContentLoaded', () => {
  // Código para abrir/cerrar el menú hamburguesa
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});


//Funcionalidades para crear, editar y eliminar proyectos 

let proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
let proyectoEditando = null;

function cerrarModal() {
  document.getElementById('modal-crear-proyecto').classList.remove('is-active');
  proyectoEditando = null;
  document.getElementById('btn-guardar-proyecto').textContent = 'Guardar';
}

function mostrarMensaje(texto, tipo = 'is-success') {
  const mensaje = document.getElementById('mensaje-alerta');
  mensaje.className = `notification ${tipo} is-light mt-3`;
  mensaje.textContent = texto;
  mensaje.style.display = 'block';
  setTimeout(() => {
    mensaje.style.display = 'none';
  }, 3000);
}

document.getElementById('btn-guardar-proyecto').addEventListener('click', function () {
  const formulario = document.getElementById('formulario-proyecto');

  const nombre = formulario.querySelector('#nombre').value;
  const descripcion = formulario.querySelector('#descripcion').value;
  const fechaInicio = formulario.querySelector('#fecha-inicio').value;
  const fechaFin = formulario.querySelector('#fecha-fin').value;

  if (proyectoEditando) {
    proyectoEditando.nombre = nombre;
    proyectoEditando.descripcion = descripcion;
    proyectoEditando.fechaInicio = fechaInicio;
    proyectoEditando.fechaFin = fechaFin;
    mostrarMensaje('Proyecto actualizado con éxito');
  } else {
    const nuevoProyecto = {
      id: Date.now(),
      nombre,
      descripcion,
      fechaInicio,
      fechaFin,
      ods: ['ODS 13', 'ODS 15'],
      participantes: '18/25',
      estado: 'Activo'
    };
    proyectos.push(nuevoProyecto);
    mostrarMensaje('Proyecto creado con éxito');
  }

  localStorage.setItem('proyectos', JSON.stringify(proyectos));
  mostrarProyectos();
  cerrarModal();
  formulario.reset();
  cargarProyectos();
});

function mostrarProyectos() {
  const tabla = document.getElementById('tabla-proyectos');
  tabla.innerHTML = '';

  proyectos.forEach(proyecto => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <strong>${proyecto.nombre}</strong><br>
        <small>${proyecto.descripcion}</small>
      </td>
      <td>
        ${proyecto.ods.map(o => `<span class="tag is-success">${o}</span>`).join(' ')}
      </td>
      <td>${proyecto.fechaInicio} - ${proyecto.fechaFin}</td>
      <td>${proyecto.participantes}</td>
      <td><span class="tag is-success">${proyecto.estado}</span></td>
      <td>
        <button class="button is-small is-light" onclick="verProyecto(${proyecto.id})">👁</button>
        <button class="button is-small is-light" onclick="editarProyecto(${proyecto.id})">✏️</button>
        <button class="button is-small is-light" onclick="eliminarProyecto(${proyecto.id})">🗑️</button>
        <button class="button is-small is-primary" onclick="redirigirActividad(${proyecto.id})">➕ Añadir actividad</button>
      </td>
    `;
    tabla.appendChild(tr);
  });
}

function eliminarProyecto(id) {
  proyectos = proyectos.filter(p => p.id !== id);
  localStorage.setItem('proyectos', JSON.stringify(proyectos));
  mostrarProyectos();
  mostrarMensaje('Proyecto eliminado con éxito', 'is-danger');
}

function editarProyecto(id) {
  const proyecto = proyectos.find(p => p.id === id);
  if (!proyecto) return;

  const formulario = document.getElementById('formulario-proyecto');
  formulario.querySelector('#nombre').value = proyecto.nombre;
  formulario.querySelector('#descripcion').value = proyecto.descripcion;
  formulario.querySelector('#fecha-inicio').value = proyecto.fechaInicio;
  formulario.querySelector('#fecha-fin').value = proyecto.fechaFin;

  proyectoEditando = proyecto;
  document.getElementById('modal-crear-proyecto').classList.add('is-active');
  document.getElementById('btn-guardar-proyecto').textContent = 'Guardar cambios';
}

function verProyecto(id) {
  const proyecto = proyectos.find(p => p.id === id);
  if (!proyecto) return;

  alert(`
    Proyecto: ${proyecto.nombre}
    Descripción: ${proyecto.descripcion}
    Fechas: ${proyecto.fechaInicio} - ${proyecto.fechaFin}
    ODS: ${proyecto.ods.join(', ')}
    Participantes: ${proyecto.participantes}
    Estado: ${proyecto.estado}
  `);
}

function redirigirActividad(id) {
  const proyecto = proyectos.find(p => p.id === id);
  if (!proyecto) return;
  localStorage.setItem('proyectoSeleccionado', JSON.stringify(proyecto));
  window.location.href = 'actividades.html';
}

// Script para testimonios --EDITAR
//Revisar
  const testimonials = [
    {
      img: "https://via.placeholder.com/128",
      name: "Carlos Mendoza",
      role: "Voluntario desde 2022",
      text: "Participar en el proyecto de reforestación fue una experiencia increíble. Ver cómo un terreno degradado se transforma en un bosque lleno de vida es algo que no tiene precio. El equipo de coordinación es excelente y siempre te hacen sentir que tu contribución es valiosa."
    },
    {
      img: "https://via.placeholder.com/128/007bff/ffffff",
      name: "Laura Gómez",
      role: "Voluntaria desde 2021",
      text: "Ser parte de los proyectos de educación ambiental cambió mi perspectiva. Enseñar a las nuevas generaciones el valor de la naturaleza ha sido una experiencia enriquecedora."
    },
    {
      img: "https://via.placeholder.com/128/ff8800/ffffff",
      name: "Andrés Pérez",
      role: "Voluntario desde 2023",
      text: "Contribuir en iniciativas de acción climática me ha dado un propósito más grande. Cada pequeño esfuerzo que hacemos suma para un futuro mejor."
    }
  ];

  let currentTestimonial = 0;

  const imgElement = document.getElementById("testimonial-img");
  const nameElement = document.getElementById("testimonial-name");
  const roleElement = document.getElementById("testimonial-role");
  const textElement = document.getElementById("testimonial-text");
  const dots = document.querySelectorAll(".dot");

  function updateTestimonial() {
    const testimonial = testimonials[currentTestimonial];
    imgElement.src = testimonial.img;
    nameElement.textContent = testimonial.name;
    roleElement.textContent = testimonial.role;
    textElement.textContent = testimonial.text;
    updateDots();
  }

  function updateDots() {
    dots.forEach((dot, index) => {
      if (index === currentTestimonial) {
        dot.classList.add("is-active");
      } else {
        dot.classList.remove("is-active");
      }
    });
  }

  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial();
  }

  // Iniciar
  updateTestimonial();

  // Cambiar automáticamente cada 5 segundos
  setInterval(nextTestimonial, 5000);

//Efecto scroll en la sección de noticias 

  document.addEventListener('DOMContentLoaded', () => {
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, appearOptions);

    faders.forEach(fader => {
      appearOnScroll.observe(fader);
    });
  });

//Funcionalidad de los botones de voluntario y organización

// Script para cambiar entre Voluntario y Organización
document.addEventListener("DOMContentLoaded", function() {
  const voluntarioBtn = document.getElementById("voluntarioBtn");
  const organizacionBtn = document.getElementById("organizacionBtn");
  const voluntarioForm = document.getElementById("voluntarioForm");
  const organizacionForm = document.getElementById("organizacionForm");

  voluntarioBtn.addEventListener("click", () => {
    voluntarioBtn.classList.add("is-primary");
    voluntarioBtn.classList.remove("is-light");
    organizacionBtn.classList.remove("is-primary");
    organizacionBtn.classList.add("is-light");
    voluntarioForm.style.display = "block";
    organizacionForm.style.display = "none";
  });

  organizacionBtn.addEventListener("click", () => {
    organizacionBtn.classList.add("is-primary");
    organizacionBtn.classList.remove("is-light");
    voluntarioBtn.classList.remove("is-primary");
    voluntarioBtn.classList.add("is-light");
    organizacionForm.style.display = "block";
    voluntarioForm.style.display = "none";
  });
});

// Script para abrir y cerrar el modal de Iniciar Sesión

// Función para abrir el modal
function abrirModalLogin() {
  document.getElementById('modal-login').classList.add('is-active');
}

// Función para cerrar el modal
function cerrarModalLogin() {
  document.getElementById('modal-login').classList.remove('is-active');
}

// Opcional: código para activar/desactivar menú hamburguesa en móviles
document.addEventListener('DOMContentLoaded', () => {
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});












// Cambiar de formulario
function mostrarFormulario(tipo) {
  const formVoluntario = document.getElementById('form-voluntario');
  const formOrganizacion = document.getElementById('form-organizacion');
  const btnVoluntario = document.getElementById('btn-voluntario');
  const btnOrganizacion = document.getElementById('btn-organizacion');

  if (tipo === 'voluntario') {
    formVoluntario.classList.add('activo');
    formOrganizacion.classList.remove('activo');
    btnVoluntario.classList.add('boton-activo');
    btnOrganizacion.classList.remove('boton-activo');
  } else {
    formOrganizacion.classList.add('activo');
    formVoluntario.classList.remove('activo');
    btnOrganizacion.classList.add('boton-activo');
    btnVoluntario.classList.remove('boton-activo');
  }
}

// Validación de correo
function validarCorreo(correo) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(correo);
}

// Validar Voluntario
document.getElementById('form-voluntario').addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre-voluntario');
  const correo = document.getElementById('correo-voluntario');
  const telefono = document.getElementById('telefono-voluntario');

  let valido = true;

  if (nombre.value.trim() === "") {
    mostrarError('error-nombre-voluntario', 'Introduce tu nombre completo.');
    valido = false;
  } else {
    limpiarError('error-nombre-voluntario');
  }

  if (!validarCorreo(correo.value.trim())) {
    mostrarError('error-correo-voluntario', 'Introduce un correo electrónico válido.');
    valido = false;
  } else {
    limpiarError('error-correo-voluntario');
  }

  if (telefono.value.trim() === "") {
    mostrarError('error-telefono-voluntario', 'Introduce tu teléfono de contacto.');
    valido = false;
  } else {
    limpiarError('error-telefono-voluntario');
  }

  if (valido) {
    alert('Formulario de voluntario enviado correctamente.');
    this.submit();
  }
});

// Validar Organización
document.getElementById('form-organizacion').addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre-organizacion');
  const correo = document.getElementById('correo-organizacion');
  const telefono = document.getElementById('telefono-organizacion');
  const descripcion = document.getElementById('descripcion-organizacion');

  let valido = true;

  if (nombre.value.trim() === "") {
    mostrarError('error-nombre-organizacion', 'Introduce el nombre de la organización.');
    valido = false;
  } else {
    limpiarError('error-nombre-organizacion');
  }

  if (!validarCorreo(correo.value.trim())) {
    mostrarError('error-correo-organizacion', 'Introduce un correo electrónico válido.');
    valido = false;
  } else {
    limpiarError('error-correo-organizacion');
  }

  if (telefono.value.trim() === "") {
    mostrarError('error-telefono-organizacion', 'Introduce un número de teléfono.');
    valido = false;
  } else {
    limpiarError('error-telefono-organizacion');
  }

  if (descripcion.value.trim().length < 10) {
    mostrarError('error-descripcion-organizacion', 'La descripción debe tener al menos 10 caracteres.');
    valido = false;
  } else {
    limpiarError('error-descripcion-organizacion');
  }

  if (valido) {
    alert('Formulario de organización enviado correctamente.');
    this.submit();
  }
});

// Funciones de error
function mostrarError(id, mensaje) {
  document.getElementById(id).textContent = mensaje;
}

function limpiarError(id) {
  document.getElementById(id).textContent = '';
}

//Validaciones adicionales en el formulario de voluntarios

document.getElementById('form-voluntario').addEventListener('submit', function(e) {
  e.preventDefault();

  let valido = true;

  const nombre = document.getElementById('nombre-voluntario');
  const correo = document.getElementById('correo-voluntario');
  const telefono = document.getElementById('telefono-voluntario');
  const dias = document.querySelectorAll('input[name="dias"]:checked');
  const horarios = document.querySelectorAll('input[name="horario"]:checked');
  const motivacion = document.getElementById('motivacion-voluntario');
  const curso = document.getElementById('curso-voluntario');
  const terminos = document.getElementById('terminos-voluntario');

  limpiarErrores();

  if (nombre.value.trim() === '') {
    mostrarError('error-nombre-voluntario', 'Introduce tu nombre.');
    valido = false;
  }
  if (!validarCorreo(correo.value.trim())) {
    mostrarError('error-correo-voluntario', 'Correo inválido.');
    valido = false;
  }
  if (telefono.value.trim() === '') {
    mostrarError('error-telefono-voluntario', 'Introduce tu teléfono.');
    valido = false;
  }
  if (dias.length === 0) {
    mostrarError('error-dias-voluntario', 'Selecciona al menos un día.');
    valido = false;
  }
  if (horarios.length === 0) {
    mostrarError('error-horario-voluntario', 'Selecciona al menos un horario.');
    valido = false;
  }
  if (motivacion.value.trim().length < 10) {
    mostrarError('error-motivacion-voluntario', 'Describe tu motivación (mínimo 10 caracteres).');
    valido = false;
  }
  if (curso.value.trim() === '') {
    mostrarError('error-curso-voluntario', 'Selecciona tu curso.');
    valido = false;
  }
  if (!terminos.checked) {
    mostrarError('error-terminos-voluntario', 'Debes aceptar los términos.');
    valido = false;
  }

  if (valido) {
    alert('Formulario enviado correctamente.');
    this.submit();
  }
});

// Funciones auxiliares
function mostrarError(id, mensaje) {
  document.getElementById(id).textContent = mensaje;
}
function limpiarErrores() {
  const errores = document.querySelectorAll('.help.is-danger');
  errores.forEach(e => e.textContent = '');
}
function validarCorreo(correo) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(correo);
}

//Validación para el formulario de organización 

document.getElementById('form-organizacion').addEventListener('submit', function(e) {
  e.preventDefault();

  let valido = true;

  // Obtener campos
  const nombre = document.getElementById('nombre-organizacion');
  const tipo = document.getElementById('tipo-organizacion');
  const correo = document.getElementById('correo-organizacion');
  const telefono = document.getElementById('telefono-organizacion');
  const nombreRepresentante = document.getElementById('nombre-representante');
  const cargoRepresentante = document.getElementById('cargo-representante');
  const descripcion = document.getElementById('descripcion-organizacion');
  const actividades = document.getElementById('actividades-organizacion');
  const perfiles = document.getElementById('perfiles-voluntarios');
  const terminos = document.getElementById('terminos-organizacion');

  limpiarErrores();

  // Validaciones
  if (nombre.value.trim() === '') {
    mostrarError('error-nombre-organizacion', 'Introduce el nombre de la organización.');
    valido = false;
  }
  if (tipo.value.trim() === '') {
    mostrarError('error-tipo-organizacion', 'Selecciona el tipo de organización.');
    valido = false;
  }
  if (!validarCorreo(correo.value.trim())) {
    mostrarError('error-correo-organizacion', 'Correo electrónico inválido.');
    valido = false;
  }
  if (telefono.value.trim() === '') {
    mostrarError('error-telefono-organizacion', 'Introduce un número de teléfono.');
    valido = false;
  }
  if (nombreRepresentante.value.trim() === '') {
    mostrarError('error-nombre-representante', 'Introduce el nombre del representante.');
    valido = false;
  }
  if (cargoRepresentante.value.trim() === '') {
    mostrarError('error-cargo-representante', 'Introduce el cargo del representante.');
    valido = false;
  }
  if (descripcion.value.trim().length < 20) {
    mostrarError('error-descripcion-organizacion', 'Describe brevemente la misión de la organización (mínimo 20 caracteres).');
    valido = false;
  }
  if (actividades.value.trim().length < 20) {
    mostrarError('error-actividades-organizacion', 'Describe las principales actividades (mínimo 20 caracteres).');
    valido = false;
  }
  if (perfiles.value.trim().length < 20) {
    mostrarError('error-perfiles-voluntarios', 'Describe qué perfiles de voluntarios necesitas (mínimo 20 caracteres).');
    valido = false;
  }
  if (!terminos.checked) {
    mostrarError('error-terminos-organizacion', 'Debes aceptar los términos y condiciones.');
    valido = false;
  }

  if (valido) {
    alert('Formulario de organización enviado correctamente.');
    this.submit();
  }
});

// Funciones auxiliares (ya las teníamos antes pero por si acaso las repito)
function mostrarError(id, mensaje) {
  document.getElementById(id).textContent = mensaje;
}
function limpiarErrores() {
  const errores = document.querySelectorAll('.help.is-danger');
  errores.forEach(e => e.textContent = '');
}
function validarCorreo(correo) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(correo);
}

//Script para los botones de visualizar y editar a los voluntarios registrados 
// Botones de visualizar
document.querySelectorAll('.button-visualizar').forEach(boton => {
  boton.addEventListener('click', () => {
      alert('Aquí se mostraría la ficha del voluntario.');
      // Aquí podrías abrir un modal con más detalles
  });
});

// Botones de editar
document.querySelectorAll('.button-editar').forEach(boton => {
  boton.addEventListener('click', () => {
      alert('Aquí abrirías el formulario para editar al voluntario.');
      // Aquí podrías redirigir o abrir un formulario de edición
  });
});

//Abrir y cerrar modal de actividades
function abrirModalActividad() {
  document.getElementById('modal-crear-actividad').classList.add('is-active');
}

function cerrarModalActividad() {
  document.getElementById('modal-crear-actividad').classList.remove('is-active');
}


//Cuando alguien rellene el formulario que se almacene en LocalStorage
//document.getElementById('form-voluntario').addEventListener('submit', function(e) {
  //e.preventDefault(); // Evitar que recargue la página

  ////const voluntario = {
      //nombre: document.getElementById('nombre-voluntario').value,
      //edad: document.getElementById('edad-voluntario').value,
      //curso: document.getElementById('curso-voluntario').value,
      //experiencia: document.getElementById('experiencia-voluntario').value,
      //motivacion: document.getElementById('motivacion-voluntario').value,
      //habilidades: document.getElementById('habilidades-voluntario').value,
      ///dias: Array.from(document.querySelectorAll('input[name="error-dias-voluntario"]:checked')).map(d => d.value),
      //correo: document.getElementById('correo-voluntario').value,
      //telefono: document.getElementById('telefono-voluntario').value,
      
  //};

  //let voluntarios = JSON.parse(localStorage.getItem('voluntarios')) || [];
  //voluntarios.push(voluntario);
  //localStorage.setItem('voluntarios', JSON.stringify(voluntarios));

  //alert('¡Voluntario registrado!');
  //this.reset();
//});


//Animación para la sección de app móvil










