let organizaciones = JSON.parse(localStorage.getItem("organizaciones")) || [];
  let editandoIndex = null;

  function guardarOrganizaciones() {
    localStorage.setItem("organizaciones", JSON.stringify(organizaciones));
    mostrarOrganizaciones();
  }

  function mostrarOrganizaciones() {
    const tbody = document.getElementById("tabla-organizaciones");
    tbody.innerHTML = "";

    organizaciones.forEach((org, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td><strong>${org.nombre}</strong></td>
        <td>${org.tipo}</td>
        <td>${org.email}</td>
        <td>${org.telefono}</td>
        <td>
          <button class="button is-small is-light" onclick="verOrganizacion(${index})">👁️</button>
          <button class="button is-small is-light" onclick="editarOrganizacion(${index})">✏️</button>
          <button class="button is-small is-danger is-light" onclick="eliminarOrganizacion(${index})">🗑️</button>
        </td>
      `;
      tbody.appendChild(fila);
    });

    document.getElementById("total-organizaciones").textContent =
      `Total: ${organizaciones.length} organizaciones`;
  }

  function registrarOrganizacion(event) {
    event.preventDefault();

    const nombre = document.querySelector("input[placeholder='Nombre']").value.trim();
    const tipo = document.querySelector("select").value;
    const email = document.querySelector("input[type='email']").value.trim();
    const telefono = document.querySelector("input[type='tel']").value.trim();

    if (!nombre || tipo === "Seleccionar tipo") {
      alert("Por favor, completa el nombre y selecciona un tipo.");
      return;
    }

    const nuevaOrg = { nombre, tipo, email, telefono };

    if (editandoIndex !== null) {
      organizaciones[editandoIndex] = nuevaOrg;
      editandoIndex = null;
    } else {
      organizaciones.push(nuevaOrg);
    }

    guardarOrganizaciones();
    document.getElementById("form-organizacion").reset();
  }
 
  function verOrganizacion(index) {
    const org = organizaciones[index];
    document.getElementById("modal-org-nombre").textContent = org.nombre;
    document.getElementById("modal-org-tipo").textContent = org.tipo;
    document.getElementById("modal-org-email").textContent = org.email || "No indicado";
    document.getElementById("modal-org-telefono").textContent = org.telefono || "No indicado";
    document.getElementById("modal-ver-org").classList.add("is-active");
  }

  function cerrarModalVer() {
    document.getElementById("modal-ver-org").classList.remove("is-active");
  }

  function editarOrganizacion(index) {
    const org = organizaciones[index];
    editandoIndex = index;

    document.getElementById("editar-nombre").value = org.nombre;
    document.getElementById("editar-tipo").value = org.tipo;
    document.getElementById("editar-email").value = org.email;
    document.getElementById("editar-telefono").value = org.telefono;

    document.getElementById("modal-editar-org").classList.add("is-active");
  }

  function guardarCambiosEdicion() {
    const nombre = document.getElementById("editar-nombre").value.trim();
    const tipo = document.getElementById("editar-tipo").value;
    const email = document.getElementById("editar-email").value.trim();
    const telefono = document.getElementById("editar-telefono").value.trim();

    if (!nombre || tipo === "Seleccionar tipo") {
      alert("Por favor, completa los campos requeridos.");
      return;
    }

    const nuevaOrg = { nombre, tipo, email, telefono };

    if (editandoIndex !== null) {
      organizaciones[editandoIndex] = nuevaOrg;
      editandoIndex = null;
      guardarOrganizaciones();
      cerrarModalEditar();
    }
  }

  function cerrarModalEditar() {
    document.getElementById("modal-editar-org").classList.remove("is-active");
  }

  function eliminarOrganizacion(index) {
    if (confirm(`¿Deseas eliminar la organización "${organizaciones[index].nombre}"?`)) {
      organizaciones.splice(index, 1);
      guardarOrganizaciones();
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    mostrarOrganizaciones();
    document.getElementById("form-organizacion").addEventListener("submit", registrarOrganizacion);
  });

  
  // Validaciones al guardar voluntario
document.querySelector('#modal-voluntario .button.is-success').addEventListener('click', function (e) {
  // Limpiar errores
  document.querySelectorAll('#form-voluntario .help.is-danger').forEach(p => p.textContent = '');

  let valido = true;

  // Obtener campos
  const nombre = document.getElementById('nombre-voluntario');
  const correo = document.getElementById('correo-voluntario');
  const curso = document.getElementById('curso-voluntario');
  const disponibilidad = document.getElementById('disponibilidad-voluntario');
  const proyectos = document.getElementById('proyectos-voluntario');
  const estado = document.getElementById('estado-voluntario');
  const foto = document.getElementById('foto-voluntario');

  // Función para mostrar errores
  function mostrarError(campo, mensaje) {
    const errorEl = campo.parentElement.querySelector('.help.is-danger');
    if (errorEl) errorEl.textContent = mensaje;
  }

  // Validar campos
  if (nombre.value.trim().length < 3) {
    mostrarError(nombre, 'El nombre debe tener al menos 3 caracteres.');
    valido = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo.value.trim())) {
    mostrarError(correo, 'Correo electrónico no válido.');
    valido = false;
  }

  if (curso.value.trim().length < 2) {
    mostrarError(curso, 'Curso demasiado corto.');
    valido = false;
  }

  if (disponibilidad.value.trim().length < 3) {
    mostrarError(disponibilidad, 'Disponibilidad muy corta.');
    valido = false;
  }

  if (proyectos.value.trim().length === 0) {
    mostrarError(proyectos, 'Indica al menos un proyecto.');
    valido = false;
  }

  if (!['Activo', 'Pendiente', 'Inactivo'].includes(estado.value)) {
    mostrarError(estado, 'Selecciona un estado válido.');
    valido = false;
  }

  // Solo pedir foto si es nuevo
  if (!voluntarioEditando && (!foto.files || foto.files.length === 0)) {
    mostrarError(foto, 'Debes subir una foto.');
    valido = false;
  }

  // Ejecutar guardarVoluntario solo si es válido
  if (valido) {
    guardarVoluntario(); // tu función existente
  }
});


  //Sección para añadir, modificar y eliminar voluntarios
  let voluntarioEditando = null;
let imagenBase64 = "";

document.getElementById('foto-voluntario').addEventListener('change', function(e) {
  const reader = new FileReader();
  reader.onload = function(event) {
    imagenBase64 = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);
});

function abrirModalVoluntario() {
  document.getElementById('modal-voluntario').classList.add('is-active');
}

function cerrarModalVoluntario() {
  document.getElementById('modal-voluntario').classList.remove('is-active');
  document.getElementById('form-voluntario').reset();
  imagenBase64 = "";
  voluntarioEditando = null;
}

function guardarVoluntario() {
  const nombre = document.getElementById('nombre-voluntario').value;
  const correo = document.getElementById('correo-voluntario').value;
  const curso = document.getElementById('curso-voluntario').value;
  const disponibilidad = document.getElementById('disponibilidad-voluntario').value;
  const proyectos = document.getElementById('proyectos-voluntario').value;
  const estado = document.getElementById('estado-voluntario').value;

  if (voluntarioEditando) {
    voluntarioEditando.querySelector('.foto img').src = imagenBase64 || voluntarioEditando.querySelector('.foto img').src;
    voluntarioEditando.querySelector('.nombre').textContent = nombre;
    voluntarioEditando.querySelector('.correo').textContent = correo;
    const celdas = voluntarioEditando.querySelectorAll('td');
    celdas[3].textContent = curso;
    celdas[4].textContent = disponibilidad;
    celdas[5].textContent = proyectos;
    celdas[6].innerHTML = `<span class="tag is-${estado === 'Activo' ? 'success' : estado === 'Pendiente' ? 'warning' : 'danger'}">${estado}</span>`;
  } else {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td class="foto"><img src="${imagenBase64}" alt="Foto" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;"></td>
      <td><strong class="nombre">${nombre}</strong></td>
      <td><small class="correo">${correo}</small></td>
      <td>${curso}</td>
      <td>${disponibilidad}</td>
      <td>${proyectos}</td>
      <td><span class="tag is-${estado === 'Activo' ? 'success' : estado === 'Pendiente' ? 'warning' : 'danger'}">${estado}</span></td>
      <td>
        <button class="button is-small is-info" onclick="editarVoluntario(this)">Editar</button>
        <button class="button is-small is-danger" onclick="eliminarVoluntario(this)">Eliminar</button>
      </td>
    `;
    document.getElementById('tabla-voluntarios-body').appendChild(fila);
  }

  cerrarModalVoluntario();
}

function editarVoluntario(btn) {
  const fila = btn.closest('tr');
  document.getElementById('nombre-voluntario').value = fila.querySelector('.nombre').textContent;
  document.getElementById('correo-voluntario').value = fila.querySelector('.correo').textContent;
  const celdas = fila.querySelectorAll('td');
  document.getElementById('curso-voluntario').value = celdas[3].textContent;
  document.getElementById('disponibilidad-voluntario').value = celdas[4].textContent;
  document.getElementById('proyectos-voluntario').value = celdas[5].textContent;
  document.getElementById('estado-voluntario').value = celdas[6].textContent.trim();
  imagenBase64 = fila.querySelector('img').src;

  voluntarioEditando = fila;
  abrirModalVoluntario();
}

function eliminarVoluntario(btn) {
  const fila = btn.closest('tr');
  fila.remove();
}

