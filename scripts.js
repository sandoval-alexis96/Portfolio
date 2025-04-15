document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("neuronas-canvas");
    const ctx = canvas.getContext("2d");
  
    let width, height;
    let particles = [];
    const particleCount = 200;  // Número de partículas
    const maxDistance = 160;
  
    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
  
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
  
    function createParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.6 + 1,  // Tamaño aleatorio de las neuronas
          pulse: Math.random() * Math.PI * 2,
          redLightPosition: 0
        });
      }
    }
  
    function drawGlow(x, y, r, color) {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, r * 6);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(x, y, r * 6, 0, Math.PI * 2);
      ctx.fill();
    }
  
    function drawParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
  
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
  
          if (dist < maxDistance) {
            const opacity = 1 - dist / maxDistance;

            ctx.strokeStyle = `rgba(0,200,255,${opacity * 0.7})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            ctx.strokeStyle = `rgba(255,0,0,0.9)`;
            ctx.lineWidth = 2;

            const redLightPosition = p1.redLightPosition;
            const x1 = p1.x + (p2.x - p1.x) * redLightPosition;
            const y1 = p1.y + (p2.y - p1.y) * redLightPosition;
  
            const x2 = p1.x + (p2.x - p1.x) * (redLightPosition + 0.02);
            const y2 = p1.y + (p2.y - p1.y) * (redLightPosition + 0.02);

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            p1.redLightPosition += 0.01;
            if (p1.redLightPosition >= 1) p1.redLightPosition = 0;
  
          }
        }

        p1.pulse += 0.05;
        const pulseRadius = p1.radius + Math.sin(p1.pulse) * 0.4;
  
        ctx.fillStyle = "rgba(0,200,255,0.9)";
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, pulseRadius, 0, Math.PI * 2);
        ctx.fill();

        drawGlow(p1.x, p1.y, pulseRadius, "rgba(0,150,255,0.1)");

        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x <= 0 || p1.x >= width) p1.vx *= -1;
        if (p1.y <= 0 || p1.y >= height) p1.vy *= -1;
      }
  
      requestAnimationFrame(drawParticles);
    }
  
    createParticles();
    drawParticles();
});

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const contenedor = document.querySelector('.presentacion__contenedor');
        contenedor.style.opacity = 1;
    }, 1000);
});

//Iconos en Presentación
document.addEventListener("DOMContentLoaded", () => {
    const imagenes = document.querySelectorAll('.presentacion__iconos-fondo img');
    let indice = 0;

    function mostrarSiguienteImagen() {
        imagenes.forEach(img => img.style.opacity = '0');
        imagenes[indice].style.opacity = '0.3';
        indice = (indice + 1) % imagenes.length;
    }

    mostrarSiguienteImagen();
    setInterval(mostrarSiguienteImagen, 5000);
});

// Modal
const botones = document.querySelectorAll('.proyectos__boton');
  const modal = document.getElementById('modalImagen');
  const imagenModal = document.getElementById('imagenModal');
  const cerrarModal = document.getElementById('cerrarModal');

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      const imgSrc = boton.getAttribute('data-img');
      imagenModal.src = imgSrc;
      modal.style.display = 'flex';
    });
  });

  cerrarModal.addEventListener('click', () => {
    modal.style.display = 'none';
    imagenModal.src = '';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      imagenModal.src = '';
    }
});

