const urlBase = 'http://localhost:3000'

const api = {
    async buscarDados(endpoint) {
        try {
            //const response = await fetch(endpoint)
            const response = await fetch(`${urlBase}/${endpoint}`)
            return await response.json()
        } catch {
            alert('Erro ao buscar dados da API!')
            throw error
        }
    },
    async salvarDados(dados, endpoint) {
        try {
            const response = await fetch(`${urlBase}/${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)                
            })
            return await response.json()
        } catch {
            alert('Erro ao salvar dados na API!')
            throw error
        }
    },

    async buscarDadosPorId(id, endpoint) {
        try {
            const response = await fetch(`${urlBase}/${endpoint}/${id}`)
            return await response.json()
        } catch {
            alert('Erro ao buscar o dado na API!')
            throw error
        }
    },

    async atualizarDados(dados, endpoint) {
        try {
            const response = await fetch(`${urlBase}/${endpoint}/${dados.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            })
            return await response.json()
        } catch {
            alert('Erro ao atualizar os dados na API!')
            throw error
        }
    },

    async excluirDados(id) {
        try {
            const response = await fetch(`${urlBase}/${endpoint}/${id}`, {
                method: "DELETE"
            })
        } catch {
            alert('Erro ao excluir um dado da API!')
            throw error
        }
    }
};

export default api;