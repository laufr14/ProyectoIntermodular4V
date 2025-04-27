let actividades = JSON.parse(localStorage.getItem('actividades')) || [];
let actividadEditando = null;

document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('modal-crear-actividad');
  const btnAbrir = document.getElementById('btn-abrir-modal');
  const btnCerrar = document.getElementById('btn-cerrar-modal');
  const btnCancelar = document.getElementById('btn-cancelar-modal');
  const btnGuardar = document.getElementById('btn-guardar-actividad');
  const formulario = document.getElementById('formulario-actividad');

  function abrirModal() {
    modal.classList.add('is-active');
  }

  function cerrarModal() {
    modal.classList.remove('is-active');
    actividadEditando = null;
    formulario.reset();
    btnGuardar.textContent = 'Guardar Actividad';
  }

  function mostrarMensaje(texto, tipo = 'is-success') {
    const mensaje = document.getElementById('mensaje-alerta-actividad');
    mensaje.className = `notification ${tipo} is-light`;
    mensaje.textContent = texto;
    mensaje.style.display = 'block';
    setTimeout(() => {
      mensaje.style.display = 'none';
    }, 3000);
  }

  function mostrarActividades() {
    const tabla = document.getElementById('tabla-actividades');
    tabla.innerHTML = '';

    actividades.forEach(actividad => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${actividad.nombre}</strong></td>
        <td>${actividad.horario}</td>
        <td>${actividad.descripcion}</td>
        <td>
          <button class="button is-small is-light" onclick="verActividad(${actividad.id})">👁️</button>
          <button class="button is-small is-light" onclick="editarActividad(${actividad.id})">✏️</button>
          <button class="button is-small is-light" onclick="eliminarActividad(${actividad.id})">🗑️</button>
        </td>
      `;
      tabla.appendChild(tr);
    });
  }

  btnGuardar.addEventListener('click', function () {
    const nombre = formulario.querySelector('#nombre-actividad').value;
    const horario = formulario.querySelector('#horario-actividad').value;
    const descripcion = formulario.querySelector('#descripcion-actividad').value;

    if (!nombre || !horario || !descripcion) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (actividadEditando) {
      actividadEditando.nombre = nombre;
      actividadEditando.horario = horario;
      actividadEditando.descripcion = descripcion;
      mostrarMensaje('Actividad actualizada con éxito');
    } else {
      const nuevaActividad = {
        id: Date.now(),
        nombre,
        horario,
        descripcion
      };
      actividades.push(nuevaActividad);
      mostrarMensaje('Actividad creada con éxito');
    }

    localStorage.setItem('actividades', JSON.stringify(actividades));
    mostrarActividades();
    cerrarModal();
  });

  btnAbrir.addEventListener('click', abrirModal);
  btnCerrar.addEventListener('click', cerrarModal);
  btnCancelar.addEventListener('click', cerrarModal);

  mostrarActividades();
});

function verActividad(id) {
  const actividad = actividades.find(a => a.id === id);
  if (!actividad) return;
  alert(`Actividad: ${actividad.nombre}\nHorario: ${actividad.horario}\nDescripción: ${actividad.descripcion}`);
}

function editarActividad(id) {
  const actividad = actividades.find(a => a.id === id);
  if (!actividad) return;

  const formulario = document.getElementById('formulario-actividad');
  formulario.querySelector('#nombre-actividad').value = actividad.nombre;
  formulario.querySelector('#horario-actividad').value = actividad.horario;
  formulario.querySelector('#descripcion-actividad').value = actividad.descripcion;

  actividadEditando = actividad;
  document.getElementById('modal-crear-actividad').classList.add('is-active');
  document.getElementById('btn-guardar-actividad').textContent = 'Guardar cambios';
}

function eliminarActividad(id) {
  actividades = actividades.filter(a => a.id !== id);
  localStorage.setItem('actividades', JSON.stringify(actividades));
  document.dispatchEvent(new Event('DOMContentLoaded')); // Forzar actualización
}


// Función para asignar el proyecto principal a las actividades

// Obtener proyectos del localStorage
function cargarProyectosEnSelect() {
  const proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
  const select = document.getElementById("select-proyecto-actividad");
  select.innerHTML = '<option value="">Selecciona un proyecto</option>'; // Limpiar y agregar opción inicial

  proyectos.forEach(proyecto => {
    const option = document.createElement("option");
    option.value = proyecto.nombre;
    option.textContent = proyecto.nombre;
    select.appendChild(option);
  });
}

// Mostrar mensaje
function mostrarMensaje(mensaje) {
  const alerta = document.getElementById("mensaje-alerta-actividad");
  alerta.textContent = mensaje;
  alerta.style.display = "block";
  setTimeout(() => alerta.style.display = "none", 3000);
}

// Crear nueva actividad
function crearActividad(nombre, horario, descripcion, proyecto) {
  const tabla = document.getElementById("tabla-actividades");
  const fila = document.createElement("tr");

  fila.innerHTML = `
    <td>${nombre}</td>
    <td>${horario}</td>
    <td>${descripcion}</td>
    <td>${proyecto}</td>
    <td>
      <button class="button is-small is-info" onclick="verActividad(this)">👁</button>
      <button class="button is-small is-danger" onclick="eliminarActividad(this)">🗑️</button>
    </td>
  `;

  tabla.appendChild(fila);
}

// Ver detalles (alerta simple)
function verActividad(boton) {
  const fila = boton.closest("tr");
  const datos = fila.querySelectorAll("td");
  alert(`Actividad: ${datos[0].textContent}\nHorario: ${datos[1].textContent}\nDescripción: ${datos[2].textContent}\nProyecto: ${datos[3].textContent}`);
}

// Eliminar actividad
function eliminarActividad(boton) {
  if (confirm("¿Seguro que quieres eliminar esta actividad?")) {
    boton.closest("tr").remove();
  }
}

// Abrir modal
document.getElementById("btn-abrir-modal").addEventListener("click", () => {
  cargarProyectosEnSelect();
  document.getElementById("modal-crear-actividad").classList.add("is-active");
});

// Cerrar modal
document.getElementById("btn-cerrar-modal").addEventListener("click", () => {
  document.getElementById("modal-crear-actividad").classList.remove("is-active");
  document.getElementById("formulario-actividad").reset();
});

document.getElementById("btn-cancelar-modal").addEventListener("click", () => {
  document.getElementById("modal-crear-actividad").classList.remove("is-active");
  document.getElementById("formulario-actividad").reset();
});

// Guardar nueva actividad
document.getElementById("btn-guardar-actividad").addEventListener("click", () => {
  const nombre = document.getElementById("nombre-actividad").value.trim();
  const horario = document.getElementById("horario-actividad").value.trim();
  const descripcion = document.getElementById("descripcion-actividad").value.trim();
  const proyecto = document.getElementById("select-proyecto-actividad").value;

  if (!nombre || !horario || !descripcion || !proyecto) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  crearActividad(nombre, horario, descripcion, proyecto);
  mostrarMensaje("Actividad creada exitosamente.");
  document.getElementById("formulario-actividad").reset();
  document.getElementById("modal-crear-actividad").classList.remove("is-active");
});
