const solicitudes = [
    {
      nombre: "Laura Martínez",
      correo: "laura@example.com",
      curso: "2º DAM",
      disponibilidad: "Lunes - Mañana",
      motivacion: "Me encanta colaborar en causas sociales y quiero ganar experiencia."
    },
    {
      nombre: "Iván Pérez",
      correo: "ivan@example.com",
      curso: "1º ASIR",
      disponibilidad: "Viernes - Tarde",
      motivacion: "Busco aportar mi tiempo en actividades sociales."
    },
    {
      nombre: "Carmen López",
      correo: "carmen@example.com",
      curso: "2º ASIR",
      disponibilidad: "Martes - Mañana",
      motivacion: "Quiero participar en proyectos con impacto en la comunidad."
    },
    {
      nombre: "Mario Sánchez",
      correo: "mario@example.com",
      curso: "1º DAM",
      disponibilidad: "Miércoles - Tarde",
      motivacion: "Me interesa el voluntariado enfocado en la educación."
    },
    {
      nombre: "Julia Torres",
      correo: "julia@example.com",
      curso: "1º CEFGS",
      disponibilidad: "Jueves - Mañana",
      motivacion: "Tengo experiencia previa y me gustaría seguir ayudando."
    },
    {
      nombre: "David Romero",
      correo: "david@example.com",
      curso: "1º DAM",
      disponibilidad: "Viernes - Mañana",
      motivacion: "Estoy interesado en el voluntariado digital."
    }
  ];

  let solicitudActual = -1;

  function verSolicitud(index) {
    solicitudActual = index;
    const s = solicitudes[index];
    const contenido = `
      <p><strong>Nombre:</strong> ${s.nombre}</p>
      <p><strong>Correo:</strong> ${s.correo}</p>
      <p><strong>Curso:</strong> ${s.curso}</p>
      <p><strong>Disponibilidad:</strong> ${s.disponibilidad}</p>
      <p><strong>Motivación:</strong> ${s.motivacion}</p>
    `;
    document.getElementById("contenido-solicitud").innerHTML = contenido;
    document.getElementById("modal-solicitud").classList.add("is-active");
  }

  function cerrarModal() {
    document.getElementById("modal-solicitud").classList.remove("is-active");
  }

  function mostrarMensaje(texto, tipo = "is-success") {
    const aviso = document.createElement("div");
    aviso.className = `notification ${tipo}`;
    aviso.style.position = "fixed";
    aviso.style.bottom = "20px";
    aviso.style.right = "20px";
    aviso.style.zIndex = "1000";
    aviso.innerHTML = `${texto} <button class='delete'></button>`;

    aviso.querySelector(".delete").addEventListener("click", () => aviso.remove());
    document.body.appendChild(aviso);

    setTimeout(() => aviso.remove(), 4000);
  }

  function aceptarSolicitud() {
    mostrarMensaje("Solicitud aceptada.", "is-success");
    cerrarModal();
  }

  function rechazarSolicitud() {
    mostrarMensaje("Solicitud rechazada.", "is-danger");
    cerrarModal();
  }