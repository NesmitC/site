document.addEventListener('DOMContentLoaded', function () {
    // Функция для обновления счета
    function updateScoreDisplay() {
        const savedScore = localStorage.getItem('userScore');
        const scoreContainer = document.querySelector('.score-container');
        const scoreValue = document.querySelector('.score-value');

        console.log('Текущий счет:', savedScore); // Отладка

        if (scoreContainer && scoreValue) {
            if (savedScore && savedScore > 0) {
                scoreValue.textContent = savedScore;
                scoreContainer.style.display = 'block';
                console.log('Счет отображен:', savedScore);
            } else {
                scoreContainer.style.display = 'none';
                console.log('Счет скрыт');
            }
        } else {
            console.error('Элементы счета не найдены!');
        }
    }

    // Проверяем счет при загрузке
    updateScoreDisplay();

    // Также проверяем при возвращении на страницу
    window.addEventListener('pageshow', updateScoreDisplay);

    const emblems = document.querySelectorAll('.emblem');
    const transitionOverlay = document.querySelector('.transition-overlay');
    const page = document.querySelector('.page');

    // Функция для плавного перехода на другую страницу
    function navigateToPage(pageUrl, emblem) {
        emblems.forEach(e => e.style.pointerEvents = 'none');
        emblem.classList.add('emblem-clicked');

        setTimeout(() => {
            page.classList.add('fade-out');
            setTimeout(() => {
                transitionOverlay.classList.add('active');
                setTimeout(() => {
                    window.location.href = pageUrl;
                }, 800);
            }, 400);
        }, 300);
    }

    // Добавляем обработчики клика на эмблемы
    emblems.forEach(emblem => {
        emblem.addEventListener('click', function (e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            if (targetPage) {
                navigateToPage(targetPage, this);
            }
        });
    });

    // Предзагрузка страниц
    function preloadPages() {
        emblems.forEach(emblem => {
            const pageUrl = emblem.getAttribute('data-page');
            if (pageUrl) {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = pageUrl;
                link.as = 'document';
                document.head.appendChild(link);
            }
        });
    }

    window.addEventListener('load', preloadPages);
});