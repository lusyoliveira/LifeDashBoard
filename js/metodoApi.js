const api = {
    async buscarDados(endpoint) {
        try {
            const response = await fetch(endpoint)
            return await response.json()
        } catch {
            alert('Erro ao buscar dados da api!')
            throw error
        }
    },
    async salvarDados(dados, endpoint) {
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)                
            })
            return await response.json()
        } catch {
            alert('Erro ao salvar dados!')
            throw error
        }
    }
};

export default api;