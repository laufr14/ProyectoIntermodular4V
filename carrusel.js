// Carrusel de imágenes con JavaScript 


  document.addEventListener("DOMContentLoaded", () => {
    const testimonios = [
      {
        img: "Imagenes/imagenpersona.jpeg",
        name: "Carlos Mendoza",
        role: "Voluntario desde 2022",
        text: "Participar en el proyecto de reforestación fue una experiencia increíble. Ver cómo un terreno degradado se transforma en un bosque lleno de vida es algo que no tiene precio.",
        stars: "★★★★★"
      },
      {
        img: "Imagenes/imagenpersona2.jpeg",
        name: "Ana Rodríguez",
        role: "Voluntaria desde 2023",
        text: "Gracias a este proyecto aprendí mucho sobre sostenibilidad. Además, conocí personas maravillosas con las que comparto valores.",
        stars: "★★★★★"
      },
      {
        img: "Imagenes/imagenpersona3.jpeg",
        name: "Luis García",
        role: "Voluntario desde 2021",
        text: "Una de las mejores experiencias de mi vida. Poder ayudar y aprender a la vez fue muy gratificante.",
        stars: "★★★★☆"
      }
    ];

    let currentIndex = 0;
    const imgEl = document.getElementById("testimonial-img");
    const nameEl = document.getElementById("testimonial-name");
    const roleEl = document.getElementById("testimonial-role");
    const textEl = document.getElementById("testimonial-text");
    const dots = document.querySelectorAll(".dot");

    function showTestimonial(index) {
      const t = testimonios[index];
      imgEl.src = t.img;
      nameEl.textContent = t.name;
      roleEl.textContent = t.role;
      textEl.textContent = t.text;
      document.querySelector(".mt-4 span").innerHTML = t.stars;

      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === index);
      });
    }

    function nextTestimonial() {
      currentIndex = (currentIndex + 1) % testimonios.length;
      showTestimonial(currentIndex);
    }

    function prevTestimonial() {
      currentIndex = (currentIndex - 1 + testimonios.length) % testimonios.length;
      showTestimonial(currentIndex);
    }

    document.querySelector(".next").addEventListener("click", nextTestimonial);
    document.querySelector(".prev").addEventListener("click", prevTestimonial);

    // Auto-play cada 5 segundos
    setInterval(nextTestimonial, 5000);

    showTestimonial(currentIndex);
  });
