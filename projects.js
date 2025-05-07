
const proyectos = [
    {
      nombre: "Huerto Urbano",
      estado: "En curso",
      inicio: "2024-03-15",
      fin: "2024-06-15",
      ods: [2, 12, 13],
      actividades: ["Preparación del terreno", "Siembra", "Talleres con familias"],
      horarios: ["Lunes 10:00", "Miércoles 11:30"]
    },
    {
      nombre: "Club de Lectura Inclusiva",
      estado: "Finalizado",
      inicio: "2023-10-01",
      fin: "2024-01-20",
      ods: [4, 10],
      actividades: ["Lecturas semanales", "Encuentros intergeneracionales"],
      horarios: ["Martes 16:00"]
    },
    {
      nombre: "Reforestación Local",
      estado: "Planificado",
      inicio: "2024-09-01",
      fin: "2024-12-15",
      ods: [13, 15],
      actividades: ["Charlas de sensibilización", "Plantación", "Seguimiento de crecimiento"],
      horarios: ["Viernes 09:00"]
    }
  ];

  function getEstadoClass(estado) {
    switch (estado) {
      case "En curso": return "is-info";
      case "Finalizado": return "is-success";
      case "Planificado": return "is-warning";
      default: return "is-light";
    }
  }

  function renderProyectos() {
    const tbody = document.getElementById("tabla-proyectos");
    tbody.innerHTML = "";
    proyectos.forEach((p, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${p.nombre}</td>
        <td><span class="tag ${getEstadoClass(p.estado)}">${p.estado}</span></td>
        <td>${p.inicio}</td>
        <td>${p.fin}</td>
        <td>${p.ods.map(o => `<span class='tag is-primary is-light'>ODS ${o}</span>`).join(" ")}</td>
        <td><button class="button is-small is-link is-light" onclick="verProyecto(${i})"><i class="fas fa-eye"></i></button></td>
      `;
      tbody.appendChild(row);
    });
  }

  function verProyecto(index) {
    const p = proyectos[index];
    const contenido = `
      <p><strong>Nombre del Proyecto:</strong> ${p.nombre}</p>
      <p><strong>Estado:</strong> <span class="tag ${getEstadoClass(p.estado)}">${p.estado}</span></p>
      <p><strong>Fechas:</strong> ${p.inicio} - ${p.fin}</p>
      <p><strong>ODS:</strong> ${p.ods.map(o => `<span class='tag is-primary is-light'>ODS ${o}</span>`).join(" ")}</p>
      <hr>
      <p><strong>Actividades:</strong></p>
      <ul>${p.actividades.map(a => `<li>🔹 ${a}</li>`).join("")}</ul>
      <p class="mt-3"><strong>Horarios:</strong></p>
      <ul>${p.horarios.map(h => `<li>🕒 ${h}</li>`).join("")}</ul>
    `;
    document.getElementById("contenido-proyecto").innerHTML = contenido;
    document.getElementById("modal-proyecto").classList.add("is-active");
  }

  function cerrarModalProyecto() {
    document.getElementById("modal-proyecto").classList.remove("is-active");
  }

  renderProyectos();