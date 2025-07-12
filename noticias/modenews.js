// Alternância de Tema (Modo Claro/Escuro)
const toggleThemeButton = document.querySelector('.toggle-theme'); // Seleciona o botão de alternância de tema

// Verifica o tema salvo no localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode'); // Aplica o modo escuro
        toggleThemeButton.textContent = '🌙'; // Atualiza o ícone
    } else {
        toggleThemeButton.textContent = '☀️'; // Atualiza o ícone para modo claro
    }
});

toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode'); // Alterna a classe 'dark-mode' no body

    // Atualiza o ícone do botão com base no tema atual
    if (document.body.classList.contains('dark-mode')) {
        toggleThemeButton.textContent = '🌙'; // Ícone para modo escuro
        localStorage.setItem('theme', 'dark'); // Salva o tema no localStorage
    } else {
        toggleThemeButton.textContent = '☀️'; // Ícone para modo claro
        localStorage.setItem('theme', 'light'); // Salva o tema no localStorage
    }
});

// Seleciona os anúncios verticais
const adVerticalLeft = document.querySelector('.ad-vertical-left');
const adVerticalRight = document.querySelector('.ad-vertical-right');

// Função para alternar a visibilidade dos anúncios verticais
function toggleAds() {
    if (adVerticalLeft) adVerticalLeft.classList.toggle('hidden'); // Alterna a classe 'hidden' no anúncio esquerdo
    if (adVerticalRight) adVerticalRight.classList.toggle('hidden'); // Alterna a classe 'hidden' no anúncio direito
}

// Adiciona um botão para alternar a visibilidade dos anúncios
const toggleAdsButton = document.createElement('button'); // Cria o botão dinamicamente
toggleAdsButton.textContent = 'Alternar Anúncios'; // Define o texto do botão
toggleAdsButton.style.position = 'fixed'; // Posiciona o botão fixo na tela
toggleAdsButton.style.bottom = '20px'; // Define a distância da parte inferior
toggleAdsButton.style.right = '20px'; // Define a distância da borda direita
toggleAdsButton.style.padding = '10px 15px'; // Define o espaçamento interno do botão
toggleAdsButton.style.backgroundColor = '#007BFF'; // Define a cor de fundo do botão
toggleAdsButton.style.color = '#fff'; // Define a cor do texto do botão
toggleAdsButton.style.border = 'none'; // Remove a borda do botão
toggleAdsButton.style.borderRadius = '5px'; // Adiciona bordas arredondadas
toggleAdsButton.style.cursor = 'pointer'; // Define o cursor como ponteiro ao passar o mouse
toggleAdsButton.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)'; // Adiciona sombra ao botão
document.body.appendChild(toggleAdsButton); // Adiciona o botão ao corpo da página

toggleAdsButton.addEventListener('click', toggleAds); // Adiciona o evento de clique para alternar os anúncios

// Compartilhar nas Redes Sociais
const socialLinks = document.querySelectorAll('.social-link'); // Seleciona todos os links de compartilhamento
if (socialLinks.length > 0) {
    socialLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Evita o comportamento padrão do link

            // Remove o feedback visual temporário, pois agora usamos data-platform
            // link.textContent = 'Compartilhando...';
            // setTimeout(() => {
            //     const platform = link.textContent.trim().toLowerCase();
            //     link.textContent = platform.charAt(0).toUpperCase() + platform.slice(1);
            // }, 2000);

            // Obtém a plataforma do atributo data-platform
            const platform = link.getAttribute('data-platform');

            const pageUrl = encodeURIComponent(window.location.href); // Codifica a URL da página atual
            const pageTitle = encodeURIComponent(document.title); // Codifica o título da página

            let shareUrl = ''; // Inicializa a variável para a URL de compartilhamento

            // Define a URL de compartilhamento para cada plataforma
            if (platform === 'instagram') {
                alert('O Instagram não suporta compartilhamento direto via URL.'); // Exibe alerta para Instagram
                return;
            } else if (platform === 'twitter') {
                shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`; // URL para Twitter
            } else if (platform === 'whatsapp') {
                shareUrl = `https://wa.me/?text=${pageTitle} ${pageUrl}`; // URL para WhatsApp
            } else {
                alert(`Compartilhar no ${platform} ainda não está implementado.`); // Exibe alerta para plataformas não implementadas
                return;
            }

            // Abre a URL de compartilhamento em uma nova janela
            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });
}

// Exemplo de funcionalidade para anúncios horizontais
const adHorizontal = document.querySelector('.ad-horizontal'); // Seleciona o anúncio horizontal
if (adHorizontal) {
    adHorizontal.addEventListener('mouseenter', () => {
        adHorizontal.style.backgroundColor = '#e0e0e0'; // Muda a cor ao passar o mouse
    });

    adHorizontal.addEventListener('mouseleave', () => {
        adHorizontal.style.backgroundColor = '#f5f5f5'; // Restaura a cor original ao sair do mouse
    });
}
/**
 * Carrega as notícias do servidor e as exibe no carrossel.
 */
document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".news-grid-carousel");
    console.log("Container encontrado:", container); // Verifica se o container foi encontrado

    // Faz uma requisição para a API de notícias
    fetch('/api/noticias')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar as notícias'); // Lança um erro se a resposta não for bem-sucedida
            }
            return response.json(); // Converte a resposta para JSON
        })
        .then(noticias => {
            console.log("Notícias carregadas:", noticias); // Exibe as notícias carregadas no console
            if (container) {
                container.innerHTML = ''; // Limpa o container antes de adicionar as notícias

                // Adiciona cada notícia ao container
                noticias.forEach(noticia => {
                    const newsBox = document.createElement("div");
                    newsBox.classList.add("news-box"); // Adiciona a classe para estilização

                    // Cria o conteúdo HTML da notícia
                    newsBox.innerHTML = `
                        <img src="${noticia.link.replace('.html', '.jpg')}" alt="Imagem da ${noticia.titulo}" />
                        <h3>${noticia.titulo}</h3>
                        <p>${new Date(noticia.data).toLocaleDateString()}</p>
                        <a href="${noticia.link}" class="read-more">Ler Mais</a>
                    `;

                    container.appendChild(newsBox); // Adiciona a notícia ao container
                });
            }
        })
        .catch(error => {
            console.error('Erro ao carregar as notícias:', error); // Exibe o erro no console
        });
});

// Inicia o servidor na porta 3000
// app.listen(3000, () => {
//   console.log("Servidor rodando em http://localhost:3000");
// });
