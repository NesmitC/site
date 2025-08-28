document.addEventListener('DOMContentLoaded', function () {
    const emblems = document.querySelectorAll('.emblem');
    const transitionOverlay = document.querySelector('.transition-overlay');
    const page = document.querySelector('.page');

    // Функция для плавного перехода на другую страницу
    function navigateToPage(pageUrl, emblem) {
        // Блокируем дальнейшие клики
        emblems.forEach(e => e.style.pointerEvents = 'none');

        // Добавляем класс анимации для эмблемы
        emblem.classList.add('emblem-clicked');

        // Запускаем анимацию исчезания страницы
        setTimeout(() => {
            page.classList.add('fade-out');

            // Активируем красный overlay
            setTimeout(() => {
                transitionOverlay.classList.add('active');

                // Переходим на новую страницу после завершения анимации
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

    // Предзагрузка страниц для более плавного перехода
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

    // Запускаем предзагрузку после загрузки страницы
    window.addEventListener('load', preloadPages);
});