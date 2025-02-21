function mostrarFormulario(tipo) {
    // Oculta ambos formularios
    document.getElementById("formVoluntario").classList.remove("activo");
    document.getElementById("formEmpresa").classList.remove("activo");

    // Muestra el formulario seleccionado
    if (tipo === "voluntario") {
        document.getElementById("formVoluntario").classList.add("activo");
    } else {
        document.getElementById("formEmpresa").classList.add("activo");
    }
}