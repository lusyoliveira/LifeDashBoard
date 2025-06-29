import { readFile } from 'fs/promises';
import { converteData } from "./js/metodoData.js";

const endpoint = './json/Agenda.json';

let agenda = [];
let agendaConvertida = [];

async function buscarAgenda() {
    try {
        const conteudo = await readFile(endpoint, 'utf-8');
        agenda = JSON.parse(conteudo);

        agendaConvertida = agenda.map(compromisso => {
            return {
                ...compromisso,
                Data: converteData(compromisso.Data)
            };
        });

        console.table(agendaConvertida);
    } catch (erro) {
        console.error("Erro ao buscar agenda:", erro.message);
    }
}

buscarAgenda();
