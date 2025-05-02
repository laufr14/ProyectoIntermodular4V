document.getElementById('btn-guardar-proyecto').addEventListener('click', function () {
    // Limpiar errores anteriores
    document.querySelectorAll('#formulario-proyecto .help.is-danger').forEach(p => p.textContent = '');
  
    let valido = true;
  
    const nombre = document.getElementById('nombre');
    const descripcion = document.getElementById('descripcion');
    const fechaInicio = document.getElementById('fecha-inicio');
    const fechaFin = document.getElementById('fecha-fin');
    const cupo = document.getElementById('cupo-voluntarios');
    const categoria = document.getElementById('categoria');
  
    // Función para mostrar errores
    function mostrarError(elemento, mensaje) {
      const help = elemento.parentElement.querySelector('.help.is-danger');
      if (help) help.textContent = mensaje;
    }
  
    // Validaciones
    if (nombre.value.trim().length < 3) {
      mostrarError(nombre, 'El nombre debe tener al menos 3 caracteres.');
      valido = false;
    }
  
    if (descripcion.value.trim().length < 10) {
      mostrarError(descripcion, 'La descripción debe tener al menos 10 caracteres.');
      valido = false;
    }
  
    if (!fechaInicio.value) {
      mostrarError(fechaInicio, 'Indica la fecha de inicio.');
      valido = false;
    }
  
    if (!fechaFin.value) {
      mostrarError(fechaFin, 'Indica la fecha de fin.');
      valido = false;
    }
  
    if (fechaInicio.value && fechaFin.value && fechaFin.value < fechaInicio.value) {
      mostrarError(fechaFin, 'La fecha de fin no puede ser anterior a la de inicio.');
      valido = false;
    }
  
    if (!cupo.value || isNaN(cupo.value) || parseInt(cupo.value) <= 0) {
      mostrarError(cupo, 'Introduce un cupo válido (mayor que 0).');
      valido = false;
    }
  
    if (!categoria.value || categoria.value === '') {
      mostrarError(categoria, 'Selecciona una categoría.');
      valido = false;
    }
  
    // Resultado final
    if (valido) {
      document.getElementById('mensaje-alerta').textContent = '✅ Proyecto registrado correctamente.';
      document.getElementById('mensaje-alerta').style.display = 'block';
      document.getElementById('formulario-proyecto').reset();
    }
  });
  