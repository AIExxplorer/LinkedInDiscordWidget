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

// Função para buscar dados do LinkedIn usando o access_token
const getDataFromLinkedIn = async () => {
    const accessToken = 'AQUwHw9-UxaRF02FbMgfR_MM0CGimwwiAAr5jehpKzB1xLZjHA07GmDgkTQCVG5-OXqGFSxo5G_J54ULE3WLKY-xcFMUr9DbUJwLaXdgj8beOGbMHpxelnuj8jQ8VCVK8YQk4xLqDjKTOpa0giJYpUcEGd4VPjbGnbr6L6G26hvcmBGx0ZROnPyQ2nUzLS4pU93ps8AWdMkimM5PlhcWPqhxtf1W-vwihnfoHwVBq4JcNLOharlTVi15JCsWiT7RZYQKW1m6jDM81_TuD4mk_q5OM_Yzrqi9mcaIlTrBCicHncRFl8bhVZ0xNyMLeGofsmX2j95HSJYY2c5tNddYyy12wi9dwA';

    try {
        const response = await fetch('https://api.linkedin.com/v2/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
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
