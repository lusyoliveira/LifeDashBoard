const data = new Date('Jun 17, 2024 04:25:00');
const dataAtual = new Date();

// Diferença em milissegundos
const diffMs = Math.abs(dataAtual - data);

// Conversões
const diffSegundos = Math.floor(diffMs / 1000);
const diffMinutos = Math.floor(diffSegundos / 60);
const diffHoras = Math.floor(diffMinutos / 60);
const diffDias = Math.floor(diffHoras / 24);

// Conversão para meses e anos 
const anos = dataAtual.getFullYear() - data.getFullYear();
const meses = anos * 12 + (dataAtual.getMonth() - data.getMonth());

console.log(`Segundos: ${diffSegundos}`);
console.log(`Minutos: ${diffMinutos}`);
console.log(`Horas: ${diffHoras}`);
console.log(`Dias: ${diffDias}`);
console.log(`Meses: ${meses}`);
console.log(`Anos: ${anos}`);


