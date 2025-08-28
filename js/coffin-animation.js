document.addEventListener('DOMContentLoaded', function () {
    const CORRECT_ANSWER = "петр и феврония".toLowerCase();

    setTimeout(function () {
        const coffin2 = document.querySelector('.coffin-2');
        const bookInput = document.querySelector('.book-input');
        const checkButton = document.querySelector('.check-button');
        const resultMessage = document.querySelector('.result-message');

        if (coffin2) {
            coffin2.classList.add('move-to-coffin1');

            setTimeout(function () {
                if (bookInput && checkButton && resultMessage) {
                    bookInput.style.display = 'block';
                    checkButton.style.display = 'block';
                    bookInput.focus();

                    // Валидация
                    bookInput.addEventListener('input', function (e) {
                        e.target.value = e.target.value
                            .replace(/[^а-яёА-ЯЁ\s]/g, '')
                            .substring(0, 100);
                    });

                    // Проверка ответа
                    checkButton.addEventListener('click', function () {
                        const userAnswer = bookInput.value.trim().toLowerCase();

                        if (!userAnswer) return;

                        if (userAnswer === CORRECT_ANSWER ||
                            userAnswer === "петр и феврония муромские" ||
                            userAnswer === "пётр и феврония" ||
                            userAnswer === "пётр и феврония муромские") {

                            showResult('Правильно +1', 'correct');

                            // ДОБАВЛЯЕМ БАЛЛ
                            const currentScore = parseInt(localStorage.getItem('userScore')) || 0;
                            localStorage.setItem('userScore', currentScore + 1);
                            console.log('Балл добавлен! Новый счет:', currentScore + 1);

                            setTimeout(function () {
                                window.location.href = 'index.html';
                            }, 1500);

                        } else {
                            showResult('Неправильно', 'incorrect');
                            bookInput.value = '';
                            bookInput.focus();
                        }
                    });

                    // Enter для проверки
                    bookInput.addEventListener('keypress', function (e) {
                        if (e.key === 'Enter') {
                            checkButton.click();
                        }
                    });

                    function showResult(text, className) {
                        resultMessage.textContent = text;
                        resultMessage.className = 'result-message ' + className;
                        resultMessage.style.display = 'block';

                        setTimeout(function () {
                            resultMessage.style.display = 'none';
                        }, 2000);
                    }
                }
            }, 3000);
        }
    }, 3000);
});