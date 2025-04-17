 // Menu del móvil
 const menuBtn = document.getElementById('menu-btn');
 const mobileMenu = document.getElementById('mobile-menu');
 
 menuBtn.addEventListener('click', () => {
     const isOpen = mobileMenu.classList.contains('translate-y-0');
     
     if (isOpen) {
         mobileMenu.classList.remove('translate-y-0');
         mobileMenu.classList.add('-translate-y-full');
         menuBtn.innerHTML = '<i class="ri-menu-line ri-lg"></i>';
     } else {
         mobileMenu.classList.remove('-translate-y-full');
         mobileMenu.classList.add('translate-y-0');
         menuBtn.innerHTML = '<i class="ri-close-line ri-lg"></i>';
     }
 });

 // Filtros de proyectos
 const projectFilters = document.querySelectorAll('.project-filter');
 
 projectFilters.forEach(filter => {
     filter.addEventListener('click', () => {
         // Remove active class from all filters
         projectFilters.forEach(f => {
             f.classList.remove('bg-primary', 'text-white');
             f.classList.add('text-gray-700', 'hover:bg-gray-200');
         });
         
         // Add active class to clicked filter
         filter.classList.remove('text-gray-700', 'hover:bg-gray-200');
         filter.classList.add('bg-primary', 'text-white');
     });
 });

 // Counter animation
 const counters = document.querySelectorAll('.counter-value');
 const counterValues = [1250, 78, 45, 25000]; // Values for each counter
 
 const startCounters = () => {
     counters.forEach((counter, index) => {
         const target = counterValues[index];
         const duration = 2000; // 2 seconds
         const startTime = performance.now();
         
         const updateCounter = (currentTime) => {
             const elapsedTime = currentTime - startTime;
             const progress = Math.min(elapsedTime / duration, 1);
             
             // Use easeOutQuad for smoother animation
             const easeProgress = 1 - (1 - progress) * (1 - progress);
             
             const currentValue = Math.floor(easeProgress * target);
             counter.textContent = currentValue.toLocaleString();
             
             if (progress < 1) {
                 requestAnimationFrame(updateCounter);
             } else {
                 counter.textContent = target.toLocaleString();
             }
         };
         
         requestAnimationFrame(updateCounter);
     });
 };
 
 // Start counters when they come into view
 const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             startCounters();
             observer.disconnect(); // Only trigger once
         }
     });
 }, { threshold: 0.5 });
 
 if (counters.length > 0) {
     observer.observe(counters[0].parentElement.parentElement);
 }

 // Página de administrador 
 // Gráfico de registros de voluntarios
const registrosChart = echarts.init(document.getElementById('registros-chart'));
const registrosOption = {
animation: false,
tooltip: {
trigger: 'axis',
backgroundColor: 'rgba(255, 255, 255, 0.8)',
borderColor: '#e2e8f0',
textStyle: {
color: '#1f2937'
}
},
grid: {
top: 10,
right: 10,
bottom: 30,
left: 50
},
xAxis: {
type: 'category',
data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
axisLine: {
lineStyle: {
color: '#d1d5db'
}
},
axisLabel: {
color: '#1f2937'
}
},
yAxis: {
type: 'value',
axisLine: {
lineStyle: {
color: '#d1d5db'
}
},
axisLabel: {
color: '#1f2937'
},
splitLine: {
lineStyle: {
color: '#e5e7eb'
}
}
},
series: [
{
name: 'Nuevos Voluntarios',
type: 'line',
smooth: true,
data: [5, 8, 12, 19, 23, 26, 30, 24, 18, 15, 10, 24],
itemStyle: {
color: 'rgba(87, 181, 231, 1)'
},
lineStyle: {
width: 3
},
showSymbol: false,
areaStyle: {
color: {
type: 'linear',
x: 0,
y: 0,
x2: 0,
y2: 1,
colorStops: [{
offset: 0, color: 'rgba(87, 181, 231, 0.2)'
}, {
offset: 1, color: 'rgba(87, 181, 231, 0.05)'
}]
}
}
}
]
};
registrosChart.setOption(registrosOption);
// Gráfico de distribución por ODS
const odsChart = echarts.init(document.getElementById('ods-chart'));
const odsOption = {
animation: false,
tooltip: {
trigger: 'item',
backgroundColor: 'rgba(255, 255, 255, 0.8)',
borderColor: '#e2e8f0',
textStyle: {
color: '#1f2937'
},
formatter: '{b}: {c} ({d}%)'
},
legend: {
orient: 'vertical',
right: 10,
top: 'center',
textStyle: {
color: '#1f2937'
}
},
series: [
{
name: 'Distribución ODS',
type: 'pie',
radius: ['40%', '70%'],
center: ['40%', '50%'],
avoidLabelOverlap: false,
itemStyle: {
borderRadius: 8,
borderColor: '#fff',
borderWidth: 2
},
label: {
show: false
},
emphasis: {
label: {
show: true,
fontSize: '12',
fontWeight: 'bold'
}
},
labelLine: {
show: false
},
data: [
{ value: 28, name: 'ODS 4: Educación', itemStyle: { color: 'rgba(87, 181, 231, 1)' } },
{ value: 22, name: 'ODS 13: Clima', itemStyle: { color: 'rgba(141, 211, 199, 1)' } },
{ value: 18, name: 'ODS 10: Desigualdad', itemStyle: { color: 'rgba(251, 191, 114, 1)' } },
{ value: 15, name: 'ODS 3: Salud', itemStyle: { color: 'rgba(252, 141, 98, 1)' } }
]
}
]
};
odsChart.setOption(odsOption);
// Asegurar que los gráficos se redimensionen cuando cambie el tamaño de la ventana
window.addEventListener('resize', function() {
registrosChart.resize();
odsChart.resize();
});

//Botón de "Crear proyecto"

  document.getElementById('crearProyectoBtn').addEventListener('click', function () {
    document.getElementById('formularioProyecto').style.display = 'block';
    // Si quieres ocultar la tabla mientras tanto:
    // document.getElementById('tablaProyectos').style.display = 'none';
  });

