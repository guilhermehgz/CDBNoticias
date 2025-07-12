    document.addEventListener('DOMContentLoaded', () => {
        const form = document.querySelector('form');

        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário

            const fileInput = document.getElementById('mediaFile');
            const file = fileInput.files[0]; // Pega o primeiro arquivo selecionado

            if (!file) {
                alert('Por favor, selecione um arquivo para upload.');
                return;
            }

            const formData = new FormData();
            formData.append('mediaFile', file); // 'mediaFile' deve corresponder ao nome esperado no seu backend Node.js

            try {
                const response = await fetch('/upload', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const result = await response.json(); // Ou response.text() dependendo do que seu backend retorna
                    alert('Upload realizado com sucesso!');
                    console.log('Resposta do servidor:', result);
                    // Opcional: Redirecionar ou limpar o formulário
                    form.reset();
                } else {
                    const error = await response.text(); // Pega a mensagem de erro do backend
                    alert('Erro no upload: ' + error);
                    console.error('Erro no upload:', response.status, error);
                }
            } catch (error) {
                alert('Erro na comunicação com o servidor.');
                console.error('Erro na requisição:', error);
            }
        });
    });

