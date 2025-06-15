const relogioDigital = document.querySelector('#relogio-digital');
const hourHand = document.querySelector('#hour');
const minuteHand = document.querySelector('#minute');
const secondHand = document.querySelector('#second');

export function relogio() {
  const now = new Date();

  // Pega as horas, minutos e segundos
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  // Atualiza relógio digital
  const horaFormatada = String(hours).padStart(2, '0');
  const minutoFormatado = String(minutes).padStart(2, '0');
  const segundoFormatado = String(seconds).padStart(2, '0');
  relogioDigital.textContent = `${horaFormatada}:${minutoFormatado}:${segundoFormatado}`;

  // Cálculo dos ângulos dos ponteiros
  const secondsDegrees = (seconds / 60) * 360 + 90;
  const minutesDegrees = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
  const hoursDegrees = (hours % 12) / 12 * 360 + (minutes / 60) * 30 + 90;

  // Atualiza a rotação dos ponteiros
  secondHand.style.transform = `translateX(-50%) rotate(${secondsDegrees}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minutesDegrees}deg)`;
  hourHand.style.transform = `translateX(-50%) rotate(${hoursDegrees}deg)`;
}

// Atualiza o relógio a cada segundo
setInterval(relogio, 1000);