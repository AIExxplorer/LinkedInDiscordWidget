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
