
function calcularHidratacion() {
    const peso = parseFloat(document.getElementById("peso").value);
    let metodo;
    let volumenDiario;
    let mantenimiento;
    let mm2;
    let volumenDiario1500;
    let volumenDiario2000;
  
    // si el peso administrado en kg es igual o menor a 30 KG se utilzara el metodo de Holliday-Segar
    // si el peso es mayor que 30 KG utilizar el calculo basado en la superficie corporal
  
    if (peso <= 30) {
      metodo = "Holliday-Segar";
      if (peso <= 10) {
        volumenDiario = peso * 100;
      } else if (peso <= 20) {
        volumenDiario = 1000 + (peso - 10) * 50;
      } else {
        volumenDiario = 1000 + 500 + (peso - 20) * 20;
      }
      mantenimiento = volumenDiario / 24;
      mm2 = mantenimiento * 1.5;
    } else {
      metodo = "Superficie Corporal";
      const superficieCorporal = (peso * 4 + 7) / (peso + 90);
      // Este resultado se multiplica por 1500 o por 2000 para hallar el valor del volumen diario en cc
      // y el medico decide cual de los dos resultados utilizar.
      volumenDiario1500 = superficieCorporal * 1500;
      volumenDiario2000 = superficieCorporal * 2000;
    }
    
    // Cambiar el contenido del h2 con los resultados
    const resultadoH2 = document.getElementById("resultadoH2");
    resultadoH2.textContent = `Paciente: ${peso} kg`;
  
    // Ocultar el icono SVG 
    const iconoSVG = document.getElementById("icono");
    iconoSVG.style.display = "none";
  
    // Mostrar resultados en el div 'resultado'
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `<h2>Resultados</h2>
          <p> <strong>Método utilizado:</strong>  ${metodo}</p>`;
  
    if (metodo === "Holliday-Segar") {
      resultadoDiv.innerHTML += `<p><strong>Volumen Diario:</strong> ${volumenDiario} cc</p>
          <p><strong>Mantenimiento:</strong> ${mantenimiento} cc/hr</p>
          <p><strong>Mantenimiento + Medio Mantenimiento (m+m/2):</strong> ${mm2} cc/hr</p>`;
    } else if (metodo === "Superficie Corporal") {
      resultadoDiv.innerHTML += `<p><strong>Volumen Diario (1500):</strong> ${volumenDiario1500} cc</p>
          <p><strong>Volumen Diario (2000):</strong> ${volumenDiario2000} cc</p>`;
    } else {
  
      // Aparece en el caso en que no se pueda determinar el metodo adecuado para calcular
      // Es una forma de manejar situaciones inesperadas o errores en el proceso de calculo.
      resultadoDiv.innerHTML += `<p>No se pudo determinar el método</p>`;
    }
  }
    
