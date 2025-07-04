const api = {
    async buscarDados(endpoint) {
        try {
            const response = await fetch(endpoint)
            return await response.json()
        } catch {
            alert('Erro ao buscar dados da api!')
            throw error
        }
    }
};

export default api;