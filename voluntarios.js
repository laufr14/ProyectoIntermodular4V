const voluntarios = [
    { nombre: "Andrea Ruiz", edad: 18, curso: "1º DAM", disponibilidad: "Lunes - Mañana", estado: "Activo", foto: "https://randomuser.me/api/portraits/women/44.jpg" },
    { nombre: "Carlos Molina", edad: 19, curso: "2º ASIR", disponibilidad: "Martes - Tarde", estado: "Pendiente", foto: "https://randomuser.me/api/portraits/men/32.jpg" },
    { nombre: "Lucía Torres", edad: 20, curso: "1º CEGFS", disponibilidad: "Miércoles - Mañana", estado: "Inactivo", foto: "https://randomuser.me/api/portraits/women/68.jpg" },
    { nombre: "Sergio Fernández", edad: 18, curso: "2º DAM", disponibilidad: "Jueves - Tarde", estado: "Activo", foto: "https://randomuser.me/api/portraits/men/45.jpg" },
    { nombre: "Marina Alonso", edad: 17, curso: "1º ASIR", disponibilidad: "Viernes - Mañana", estado: "Pendiente", foto: "https://randomuser.me/api/portraits/women/51.jpg" },
    { nombre: "David Gil", edad: 21, curso: "2º CEGFS", disponibilidad: "Lunes - Tarde", estado: "Activo", foto: "https://randomuser.me/api/portraits/men/29.jpg" }
  ];
  
  function getEstadoClass(estado) {
    switch (estado) {
      case "Activo": return "is-success is-light";
      case "Pendiente": return "is-warning is-light";
      case "Inactivo": return "is-danger is-light";
      default: return "";
    }
  }
  
  function renderVoluntarios(lista) {
    const tbody = document.getElementById("tabla-voluntarios");
    tbody.innerHTML = "";
    lista.forEach((v, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${v.foto}" class="avatar"></td>
        <td>${v.nombre}</td>
        <td>${v.edad}</td>
        <td>${v.curso}</td>
        <td>${v.disponibilidad}</td>
        <td><span class="tag ${getEstadoClass(v.estado)}">${v.estado}</span></td>
        <td><button class="button is-small is-link is-light" onclick="verVoluntario(${i})"><i class="fas fa-eye"></i></button></td>
      `;
      tbody.appendChild(row);
    });
  }
  
  function filtrarVoluntarios() {
    const curso = document.getElementById("filtro-curso").value;
    const estado = document.getElementById("filtro-estado").value;
    const resultado = voluntarios.filter(v => {
      return (curso === "" || v.curso === curso) && (estado === "" || v.estado === estado);
    });
    renderVoluntarios(resultado);
  }
  
  function verVoluntario(index) {
    const v = voluntarios[index];
    const contenido = `
      <figure class="image is-128x128 mb-4">
        <img class="is-rounded" src="${v.foto}" alt="Foto de ${v.nombre}">
      </figure>
      <p><strong>Nombre:</strong> ${v.nombre}</p>
      <p><strong>Edad:</strong> ${v.edad} años</p>
      <p><strong>Curso:</strong> ${v.curso}</p>
      <p><strong>Disponibilidad:</strong> ${v.disponibilidad}</p>
      <p><strong>Estado:</strong> <span class="tag ${getEstadoClass(v.estado)}">${v.estado}</span></p>
    `;
    document.getElementById("contenido-voluntario").innerHTML = contenido;
    document.getElementById("modal-voluntario").classList.add("is-active");
  }
  
  function cerrarModalVoluntario() {
    document.getElementById("modal-voluntario").classList.remove("is-active");
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    renderVoluntarios(voluntarios);
  });