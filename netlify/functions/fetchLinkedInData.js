const fetch = require('node-fetch');

exports.handler = async (event) => {
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;

    try {
        const response = await fetch('https://api.linkedin.com/v2/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            // Retornar um JSON com a mensagem de erro específica
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: 'Erro ao buscar dados do LinkedIn', status: response.status })
            };
        }

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erro interno ao acessar o LinkedIn', details: error.toString() })
        };
    }
};
