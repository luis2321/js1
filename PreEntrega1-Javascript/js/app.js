// Función para registrar alumnos
function registrarAlumnos() {
    let respuesta = true;
    while (respuesta) {
      const alumno = prompt("Ingrese el nombre del alumno:");
      if (!alumno) {
        alert("Por favor, ingrese un alumno.");
      } else if (notasAlumnos[alumno]) {
        alert("Alumno ya ingresado.");
      } else {
        notasAlumnos[alumno] = {};
        respuesta = confirm("Desea registrar otro alumno?");
      }
    }
  }
  
// Objeto para almacenar notas de alumnos
const notasAlumnos = {};
const materias = [];

// Función para registrar materias
function registrarMaterias() {
  let respuesta = true;
  while (respuesta) {
    const materia = prompt("Ingrese la materia:");
    if (!materia) {
      alert("Por favor, ingrese una materia.");
    } else if (materias.includes(materia)) {
      alert("Materia ya ingresada.");
    } else {
      materias.push(materia);
      respuesta = confirm("Desea registrar otra materia?");
    }
  }
}

// Función para registrar notas
function registrarNotas() {
  for (const alumno in notasAlumnos) {
    for (const materia of materias) {
      let nota;
      do {
        nota = parseFloat(prompt(`Ingrese la nota de ${alumno} en ${materia} (0-100):`));
        if (isNaN(nota) || nota < 0 || nota > 100) {
          alert("Nota inválida. Por favor, ingrese una nota entre 0 y 100.");
        }
      } while (isNaN(nota) || nota < 0 || nota > 100);

      if (!notasAlumnos[alumno][materia]) {
        notasAlumnos[alumno][materia] = nota;
      }
    }
  }
}


// Función para calcular notas finales
function calcularNotasFinales() {
  let contenido = "";
  let sumaTotales = 0;
  let contadorAlumnos = 0;

  for (const alumno in notasAlumnos) {
    const notas = notasAlumnos[alumno];
    let sumaNotas = 0;
    let contadorMaterias = 0;
    contenido += `${alumno}:\n`;

    for (const materia of materias) {
      if (!notas[materia]) {
        contenido += `  - ${materia}: No ingresada\n`;
      } else {
        sumaNotas += notas[materia];
        contadorMaterias++;
        contenido += `  - ${materia}: ${notas[materia].toFixed(2)}\n`;
      }
    }

    if (contadorMaterias > 0) {
      const notaFinal = sumaNotas / contadorMaterias;
      contenido += `  - Promedio: ${notaFinal.toFixed(2)}\n\n`;
      sumaTotales += notaFinal;
      contadorAlumnos++;
    } else {
      contenido += `  - Promedio: No calculable\n\n`;
    }
  }

  if (contadorAlumnos > 0) {
    const promedioGeneral = sumaTotales / contadorAlumnos;
    contenido += `Promedio general: ${promedioGeneral.toFixed(2)}`;
  } else {
    contenido += "No se puede calcular promedio general.";
  }

  alert(contenido);
}
// Iniciar registro de alumnos
registrarAlumnos();

// Iniciar registro de materias
registrarMaterias();

// Iniciar registro de notas
registrarNotas();

// Calcular notas finales
calcularNotasFinales();