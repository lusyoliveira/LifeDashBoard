const inputTitulo = document.getElementById('Titulo');

export function adicionarEvento() {
    if (inputTitulo.value === "") {
        alert('É necessário inserir um evento!');
        return
    }

    const divConteudo = document.createElement('div');
    divConteudo.classList.add('conteudo-dia');
    const divDia = document.createElement('div');
    divDia.classList.add('text-end');
    const divEvento = document.createElement('div');
    divEvento.classList.add('badge', 'bg-body-secondary', 'text-start', 'p-3');    
    const pEvento = document.createElement('p');    
    const spanTag = document.createElement('span');
    spanTag.classList.add('badge', 'text-bg-info'); 

    //divConteudo.appendChild(divDia);
    divConteudo.appendChild(divEvento);
    divEvento.appendChild(pEvento);
    divEvento.appendChild(spanTag);

    return divConteudo
}