// Отзывы
const reviewForm = document.getElementById('review-form');
const reviewsContainer = document.getElementById('reviews-container');

// Загрузка отзывов из localStorage при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    savedReviews.forEach((review) => {
        addReviewToPage(review.username, review.text);
    });

    // Обновление времени в реальном времени
    updateTime();
    setInterval(updateTime, 1000); // Обновлять каждую секунду
});

// Сохранение отзыва и обновление localStorage
if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const reviewText = document.getElementById('review').value.trim();

        if (!username || !reviewText) {
            alert('Пожалуйста, заполните все поля для отправки отзыва.');
            return;
        }

        const newReview = { username, text: reviewText };

        // Добавление нового отзыва на страницу
        addReviewToPage(username, reviewText);

        // Сохранение в localStorage
        const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
        savedReviews.push(newReview);
        localStorage.setItem('reviews', JSON.stringify(savedReviews));

        // Очистка формы
        reviewForm.reset();
    });
}

// Функция для добавления отзыва на страницу
function addReviewToPage(username, reviewText) {
    const review = document.createElement('div');
    review.classList.add('review');
    review.innerHTML = `<strong>${username}</strong><p>${reviewText}</p>`;
    reviewsContainer.appendChild(review);
}

// Анимация при наведении на ссылки
const links = document.querySelectorAll('a');
links.forEach((link) => {
    link.addEventListener('mouseenter', () => {
        link.style.color = '#ff69b4';
        link.style.transition = 'color 0.3s';
    });
    link.addEventListener('mouseleave', () => {
        link.style.color = '';
    });
});

// Обновление времени в реальном времени
function updateTime() {
    const timeContainer = document.getElementById('time');
    if (timeContainer) {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString();
        timeContainer.textContent = `Текущее время: ${formattedTime}`;
    }
}

// Переключение темы (светлая/тёмная)
const themeToggleButton = document.getElementById('theme-toggle');
if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDarkTheme = document.body.classList.contains('dark-theme');
        themeToggleButton.textContent = isDarkTheme ? 'Светлая тема' : 'Тёмная тема';
    });
}

// Пример модального окна
const modal = document.getElementById('modal');
const openModalButton = document.getElementById('open-modal');
const closeModalButton = document.getElementById('close-modal');

if (openModalButton && closeModalButton && modal) {
    openModalButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}
