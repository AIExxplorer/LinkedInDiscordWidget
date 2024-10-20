const fetch = require('node-fetch');

// URL e credenciais LinkedIn
const linkedInTokenURL = 'https://www.linkedin.com/oauth/v2/accessToken';
const clientId = process.env.LINKEDIN_CLIENT_ID;
const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
const redirectUri = process.env.LINKEDIN_REDIRECT_URI;

// Função para obter novo access token usando refresh token
async function refreshAccessToken(refreshToken) {
    try {
        const response = await fetch(linkedInTokenURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Novo access token gerado:', data.access_token);
            // Atualiza a variável de ambiente com o novo token (temporariamente, para uso neste contexto)
            process.env.LINKEDIN_ACCESS_TOKEN = data.access_token;
            return data.access_token;
        } else {
            console.error('Erro ao renovar access token:', data);
            throw new Error('Erro ao renovar access token');
        }
    } catch (error) {
        console.error('Erro:', error);
        throw new Error('Erro ao fazer refresh do access token');
    }
}

// Função principal que busca dados do LinkedIn
exports.handler = async (event) => {
    let accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    const refreshToken = process.env.LINKEDIN_REFRESH_TOKEN;

    try {
        let response = await fetch('https://api.linkedin.com/v2/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        // Verifica se o token expirou ou se há outro problema de autorização
        if (response.status === 401 || response.status === 403) {
            console.log('Token expirado ou inválido, tentando renovar...');
            accessToken = await refreshAccessToken(refreshToken);
            
            // Refaz a requisição com o novo access token
            response = await fetch('https://api.linkedin.com/v2/me', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
        }

        if (response.ok) {
            const data = await response.json();
            return {
                statusCode: 200,
                body: JSON.stringify(data),
            };
        } else {
            const errorText = await response.text();
            console.error('Erro na requisição LinkedIn:', response.status, errorText);
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: 'Erro ao buscar dados do LinkedIn', status: response.status, details: errorText }),
            };
        }
    } catch (error) {
        console.error('Erro interno:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erro interno ao acessar o LinkedIn', details: error.toString() }),
        };
    }
};
