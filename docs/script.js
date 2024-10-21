document.getElementById('connect-discord').addEventListener('click', function() {
    fetch('https://discord.com/api/webhooks/1297124207456419851/eZ6YkUJTNnbmhddBPFZWsiIaVukSL6MjwJYmQ1uNRXqpUBwZPecfqFZ_khjDoz4NnwaD', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: "Um usuário clicou no botão de conectar!",
        }),
    })
    .then(response => {
        if (response.ok) {
            alert('Conexão bem-sucedida!');
            this.style.backgroundColor = '#00ff00';
            this.textContent = 'Conectado!';
            setTimeout(() => {
                this.style.backgroundColor = '#00aaff';
                this.textContent = 'Conectar ao Discord';
            }, 3000);
        } else {
            alert('Erro ao conectar ao Discord. Verifique o webhook.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao conectar ao Discord. Verifique o console para mais detalhes.');
    });
});

// Função para buscar dados do LinkedIn usando a função serverless no Netlify
const getDataFromLinkedIn = async () => {
    try {
        const response = await fetch('/.netlify/functions/fetchLinkedInData', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Dados do usuário LinkedIn:', data);
            // Aqui você pode manipular os dados como desejar
        } else {
            console.error('Erro na requisição LinkedIn:', response.status);
            alert('Erro ao buscar dados do LinkedIn.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar ao LinkedIn. Verifique o console para mais detalhes.');
    }
};

// Chamar a função quando necessário, por exemplo, após a autenticação
getDataFromLinkedIn();
