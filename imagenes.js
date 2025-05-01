
document.addEventListener("DOMContentLoaded", () => {
    const hero = document.getElementById("hero");

    const backgrounds = [
      "Imagenes/imagen_1_Inicio.jpg",
      "Imagenes/imagen_2_Inicio.jpg",
      "Imagenes/imagen_3_Inicio.jpg"
    ];

    let index = 0;

    function changeBackground() {
      hero.style.backgroundImage = `url('${backgrounds[index]}')`;
      index = (index + 1) % backgrounds.length;
    }

    // Inicializar con la primera imagen
    changeBackground();

    // Cambiar cada 5 segundos
    setInterval(changeBackground, 5000);
  });

