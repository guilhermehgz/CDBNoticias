document.addEventListener('DOMContentLoaded', () => {
  const newsContainer = document.querySelector('.news-grid-carousel');
  const toggleButton = document.querySelector('.toggle-theme');

  // Função: Alternar entre tema claro e escuro
  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    toggleButton.textContent = document.body.classList.contains('dark-theme') ? '🌙' : '☀️';
  });

  // Função: Carregar as 6 notícias mais recentes de noticias.json
  fetch('/cdbnoticias/noticias.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo de notícias.');
      }
      return response.json();
    })
    .then(data => {
      const ultimas6 = data.slice(0, 6); // Pega as 6 primeiras notícias (mais recentes)

      ultimas6.forEach(noticia => {
        const div = document.createElement('div');
        div.className = 'noticia';

        div.innerHTML = `
          <img src="${noticia.imagem}" alt="${noticia.titulo}" class="noticia-img">
          <h3 class="noticia-titulo">${noticia.titulo}</h3>
          <p class="noticia-resumo">${noticia.resumo}</p>
          <a class="noticia-link" href="${noticia.link}">Leia mais</a>
        `;

        newsContainer.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar as notícias:', error);
      newsContainer.innerHTML = `<p>Não foi possível carregar as notícias no momento.</p>`;
    });
});
