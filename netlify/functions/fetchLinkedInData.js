const fetch = require('node-fetch');

async function refreshToken() {
    const refreshToken = process.env.LINKEDIN_REFRESH_TOKEN;
    const clientId = process.env.LINKEDIN_CLIENT_ID;
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
    const redirectUri = process.env.LINKEDIN_REDIRECT_URI;

    try {
        const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri
            })
        });

        if (response.ok) {
            const data = await response.json();
            // Atualiza os tokens nas variáveis de ambiente
            process.env.LINKEDIN_ACCESS_TOKEN = data.access_token;
            process.env.LINKEDIN_REFRESH_TOKEN = data.refresh_token;

            console.log('Tokens atualizados com sucesso!');
        } else {
            console.error('Erro ao atualizar o token:', response.status, await response.text());
        }
    } catch (error) {
        console.error('Erro ao atualizar o token:', error);
    }
}

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
            // Se o token estiver expirado, tenta renovar usando o refresh token
            if (response.status === 401) {
                await refreshToken();
                // Tenta buscar os dados novamente
                return exports.handler(event);
            } else {
                return {
                    statusCode: response.status,
                    body: JSON.stringify({ error: 'Erro ao buscar dados do LinkedIn', status: response.status })
                };
            }
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
