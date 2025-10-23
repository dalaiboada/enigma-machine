const $textoPlano = document.getElementById('texto-plano');

const manejarInputTeclado = event => {
  const tecla = event.key;
  let textoActual = $textoPlano.innerText;

  switch (tecla) {
    case 'Backspace':
      $textoPlano.innerText = textoActual.slice(0, -1); break;
    case 'Enter':
      $textoPlano.innerText += '\n'; break;
    case ' ': 
      $textoPlano.innerText += ' '; break;

    default:
      if (tecla.length === 1 && /^[a-zA-Z0-9.,!\-() ]$/.test(tecla)) {
        $textoPlano.innerText += tecla.toUpperCase();
      }
      break;
  }
}

document.addEventListener('keydown', manejarInputTeclado);