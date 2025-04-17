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

// Sección de actividades que se añaden a los proyectos
let actividades = JSON.parse(localStorage.getItem('actividades')) || [];

function cargarProyectos() {
  const select = document.getElementById('select-proyecto');
  select.innerHTML = '';
  const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
  proyectos.forEach(p => {
    const option = document.createElement('option');
    option.value = p.id;
    option.textContent = p.nombre;
    select.appendChild(option);
  });

  const seleccionado = JSON.parse(localStorage.getItem('proyectoSeleccionado'));
  if (seleccionado) {
    select.value = seleccionado.id;
    localStorage.removeItem('proyectoSeleccionado');
  }
}

function renderizarActividades() {
  const tabla = document.querySelector('#tabla-actividades tbody');
  if (!tabla) return;
  tabla.innerHTML = "";

  actividades.forEach((act, index) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${act.nombreProyecto}</td>
      <td>${act.nombre}</td>
      <td>${act.horario}</td>
      <td>
        <button class="button is-small is-light" onclick="editarActividad(${index})">✏️</button>
        <button class="button is-small is-danger" onclick="eliminarActividad(${index})">🗑</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

document.getElementById('form-actividad')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const select = document.getElementById('select-proyecto');
  const nombreProyecto = select.options[select.selectedIndex].text;
  const idProyecto = select.value;
  const nombre = document.getElementById('nombre-actividad').value;
  const horario = document.getElementById('horario-actividad').value;

  actividades.push({ idProyecto, nombreProyecto, nombre, horario });
  localStorage.setItem('actividades', JSON.stringify(actividades));

  renderizarActividades();
  e.target.reset();
});

function editarActividad(index) {
  const act = actividades[index];
  document.getElementById('select-proyecto').value = act.idProyecto;
  document.getElementById('nombre-actividad').value = act.nombre;
  document.getElementById('horario-actividad').value = act.horario;

  actividades.splice(index, 1);
  renderizarActividades();
}

function eliminarActividad(index) {
  actividades.splice(index, 1);
  localStorage.setItem('actividades', JSON.stringify(actividades));
  renderizarActividades();
}

// Inicialización condicional para evitar errores en páginas sin los elementos
if (document.getElementById('tabla-proyectos')) mostrarProyectos();
cargarProyectos();
renderizarActividades();

// Script para testimonios
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

