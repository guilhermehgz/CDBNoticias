document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const titleInput = document.getElementById('content_title');
    const descriptionInput = document.getElementById('description');
    const categorySelect = document.getElementById('category');
    const authorInput = document.getElementById('author');
    const contentInput = document.getElementById('content');

    // Imagem de capa
    const imageInput = document.getElementById('imagem'); // Upload de arquivo
    const imageLinkInputCapa = document.getElementById('imageLinkCapa'); // Link da imagem
    const fileOptionCapa = document.getElementById('imageFileOptionCapa');
    const linkOptionCapa = document.getElementById('imageLinkOptionCapa');
    const fileInputWrapperCapa = document.getElementById('fileInputWrapperCapa');
    const linkInputWrapperCapa = document.getElementById('linkInputWrapperCapa');

    // Imagem do conteúdo
    const imageContentInput = document.getElementById('imagem2'); // Upload de arquivo
    const imageLinkInput = document.getElementById('imageLink'); // Link da imagem
    const fileOption = document.getElementById('imageFileOption');
    const linkOption = document.getElementById('imageLinkOption');
    const fileInputWrapper = document.getElementById('fileInputWrapper');
    const linkInputWrapper = document.getElementById('linkInputWrapper');

    // Alterna entre os campos de arquivo e link para a imagem de capa
    fileOptionCapa.addEventListener('change', () => {
        fileInputWrapperCapa.style.display = 'block';
        linkInputWrapperCapa.style.display = 'none';
    });

    linkOptionCapa.addEventListener('change', () => {
        fileInputWrapperCapa.style.display = 'none';
        linkInputWrapperCapa.style.display = 'block';
    });

    // Alterna entre os campos de arquivo e link para a imagem do conteúdo
    fileOption.addEventListener('change', () => {
        fileInputWrapper.style.display = 'block';
        linkInputWrapper.style.display = 'none';
    });

    linkOption.addEventListener('change', () => {
        fileInputWrapper.style.display = 'none';
        linkInputWrapper.style.display = 'block';
    });

    form.addEventListener('submit', async (event) => {
        const action = event.submitter.value;
        event.preventDefault();

        try {
            const response = await fetch('modenews.html');
            let htmlTemplate = await response.text();

            // Processa o conteúdo
            let processedContent = contentInput.value;
            let imageTag = '';

            // Verifica se o usuário escolheu arquivo ou link para a imagem do conteúdo
            if (fileOption.checked && imageContentInput.files[0]) {
                const imageName = imageContentInput.files[0].name;
                imageTag = `<div class="content-image-wrapper"><img class="content-image" src="../img/${imageName}" alt="Imagem do Conteúdo"></div>`;
            } else if (linkOption.checked && imageLinkInput.value) {
                const imageUrl = imageLinkInput.value;
                imageTag = `<div class="content-image-wrapper"><img class="content-image" src="${imageUrl}" alt="Imagem do Conteúdo"></div>`;
            }

            // Verifica se o usuário escolheu arquivo ou link para a imagem de capa
            let imageCapaTag = '';
            if (fileOptionCapa.checked && imageInput.files[0]) {
                const imageNameCapa = imageInput.files[0].name;
                imageCapaTag = `img/${imageNameCapa}`;
            } else if (linkOptionCapa.checked && imageLinkInputCapa.value) {
                imageCapaTag = imageLinkInputCapa.value;
            }

            // Substitui o marcador [imagem] pelo conteúdo gerado
            processedContent = processedContent.replace('[imagem]', imageTag);

            // Substitui os placeholders no modelo HTML
            htmlTemplate = htmlTemplate
                .replace(/{{title}}/g, titleInput.value || 'Sem Título')
                .replace(/{{description}}/g, descriptionInput.value || 'Sem Descrição')
                .replace(/{{category}}/g, categorySelect.value || 'Sem Categoria')
                .replace(/{{author}}/g, authorInput.value || 'Anônimo')
                .replace(/{{content}}/g, processedContent || 'Sem Conteúdo')
                .replace(/{{image}}/g, imageCapaTag) // Imagem de capa
                .replace(/{{imageContent}}/g, imageTag); // Imagem do conteúdo

            if (action === 'download') {
                const blob = new Blob([htmlTemplate], { type: 'text/html' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `${titleInput.value || 'noticia'}.html`;
                link.click();
            } else if (action === 'visualizar') {
                const blob = new Blob([htmlTemplate], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                window.open(url, '_blank');
            }
        } catch (error) {
            console.error('Erro ao carregar o modelo:', error);
            alert('Não foi possível gerar o arquivo HTML.');
        }
    });
});