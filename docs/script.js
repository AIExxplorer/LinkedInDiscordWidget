document.getElementById('connect-discord').addEventListener('click', function() {
    fetch('https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN', {
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
            // Adiciona um efeito de feedback visual
            this.style.backgroundColor = '#00ff00';
            this.textContent = 'Conectado!';
        } else {
            alert('Erro ao conectar ao Discord. Verifique o webhook.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao conectar ao Discord. Verifique o console para mais detalhes.');
    });
});
