
// Lista de voluntarios de ejemplo
const voluntarios = [
    { nombre: "Ana López", curso: "1º DAM", disponibilidad: "Lunes - Mañana", estado: "Activo" },
    { nombre: "Carlos Ruiz", curso: "2º DAM", disponibilidad: "Viernes - Tarde", estado: "Pendiente" },
    { nombre: "Lucía Gómez", curso: "1º ASIR", disponibilidad: "Martes - Mañana", estado: "Activo" },
    { nombre: "Javier Martínez", curso: "2º ASIR", disponibilidad: "Fin de semana", estado: "Inactivo" },
    { nombre: "María Fernández", curso: "1º CEFGS", disponibilidad: "Jueves - Tarde", estado: "Activo" }
  ];
  
  // Función para mostrar voluntarios en la tabla
  function mostrarVoluntarios(lista) {
    const tbody = document.getElementById("tbody-voluntarios");
    tbody.innerHTML = "";
  
    if (lista.length === 0) {
      tbody.innerHTML = "<tr><td colspan='4'>No se encontraron resultados.</td></tr>";
      return;
    }
  
    lista.forEach(v => {
      const row = `<tr>
        <td>${v.nombre}</td>
        <td>${v.curso}</td>
        <td>${v.disponibilidad}</td>
        <td>${v.estado}</td>
      </tr>`;
      tbody.insertAdjacentHTML("beforeend", row);
    });
  }
  
  // Filtros y eventos
  document.addEventListener("DOMContentLoaded", () => {
    const nombreInput = document.getElementById("filtro-nombre");
    const cursoSelect = document.getElementById("filtro-curso");
    const disponibilidadSelect = document.getElementById("filtro-disponibilidad");
    const estadoSelect = document.getElementById("filtro-estado");
  
    const btnAplicar = document.getElementById("btn-aplicar");
    const btnResetear = document.getElementById("btn-resetear");
  
    // Mostrar todos al iniciar
    mostrarVoluntarios(voluntarios);
  
    // Aplicar filtros
    btnAplicar.addEventListener("click", () => {
      const nombre = nombreInput.value.trim().toLowerCase();
      const curso = cursoSelect.value;
      const disponibilidad = disponibilidadSelect.value;
      const estado = estadoSelect.value;
  
      const filtrados = voluntarios.filter(v => {
        return (
          (nombre === "" || v.nombre.toLowerCase().includes(nombre)) &&
          (curso === "Todos los cursos" || v.curso === curso) &&
          (disponibilidad === "Cualquier disponibilidad" || v.disponibilidad === disponibilidad) &&
          (estado === "Todos los estados" || v.estado === estado)
        );
      });
  
      mostrarVoluntarios(filtrados);
    });
  
    // Resetear filtros
    btnResetear.addEventListener("click", () => {
      nombreInput.value = "";
      cursoSelect.selectedIndex = 0;
      disponibilidadSelect.selectedIndex = 0;
      estadoSelect.selectedIndex = 0;
      mostrarVoluntarios(voluntarios);
    });
  });
  



