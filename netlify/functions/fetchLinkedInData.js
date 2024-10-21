const fetch = require('node-fetch');

exports.handler = async function(event) {
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    
    // Configure a URL para a API do LinkedIn
    const url = 'https://api.linkedin.com/v2/me';
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'x-li-format': 'json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na API LinkedIn: ${response.statusText}`);
        }

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error('Erro ao buscar dados do LinkedIn:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erro ao buscar dados do LinkedIn' })
        };
    }
};
