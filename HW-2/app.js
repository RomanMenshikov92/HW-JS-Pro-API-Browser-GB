// Урок 2. События, формы
// Вашей задачей является создание веб-слайдера для отображения изображений на веб-странице. Слайдер должен позволять переключаться между изображениями и отображать их в центре экрана.

// 1. Создайте интерфейс веб-страницы, который включает в себя следующие элементы:

// a. Контейнер для отображения текущего изображения.
// b. Кнопки "Предыдущее изображение" и "Следующее изображение" для переключения между изображениями.
// c. Навигационные точки (индикаторы) для быстрого переключения между изображениями.

// 2. Используйте HTML для создания элементов интерфейса.

// 3. Используйте JavaScript для обработки событий:

// a. При клике на кнопку "Предыдущее изображение" должно отображаться предыдущее изображение.
// b. При клике на кнопку "Следующее изображение" должно отображаться следующее изображение.
// c. При клике на навигационные точки, слайдер должен переключаться к соответствующему изображению.



// Получение ссылок на элементы интерфейса
const currentImage = document.getElementById("current-image");
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
const indicatorsContainer = document.getElementById("indicators-container");

// Создание массива для хранения ссылок на изображения
let images = [];

// Функция для получения случайных изображений с API
async function getRandomImages() {
  try {
    const key = "_Ow_T_z0wtqO71-qptEElRKJHhE3Q3LgqK1EdkYrUWY"
    const response = await fetch(`https://api.unsplash.com/photos/random?count=5&client_id=${key}`);
    const data = await response.json();
    images = data.map((item) => item.urls.regular);
    // Установка первого изображения при загрузке страницы
    currentImage.src = images[0];
    // Создание индикаторов
    createIndicators();
  } catch (error) {
    console.log(error);
  }
}

// Вызов функции для получения случайных изображений
getRandomImages();

// Установка текущего индекса изображения
let currentImageIndex = 0;

// Обработчик клика на кнопку "Предыдущее изображение"
previousButton.addEventListener("click", function () {
  if (currentImageIndex > 0) {
    currentImageIndex--;
  } else {
    currentImageIndex = images.length - 1;
  }
  currentImage.src = images[currentImageIndex];
  updateIndicators();
});

// Обработчик клика на кнопку "Следующее изображение"
nextButton.addEventListener("click", function () {
  if (currentImageIndex < images.length - 1) {
    currentImageIndex++;
  } else {
    currentImageIndex = 0;
  }
  currentImage.src = images[currentImageIndex];
  updateIndicators();
});

// Функция для создания индикаторов
function createIndicators() {
  for (let i = 0; i < images.length; i++) {
    const indicator = document.createElement("div");
    indicator.classList.add("indicator");
    if (i === currentImageIndex) {
      indicator.classList.add("active");
    }
    indicator.addEventListener("click", function () {
      currentImageIndex = i;
      currentImage.src = images[currentImageIndex];
      updateIndicators();
    });
    indicatorsContainer.appendChild(indicator);
  }
}

// Функция для обновления индикаторов
function updateIndicators() {
  const indicators = document.querySelectorAll(".indicator");
  indicators.forEach(function (indicator, index) {
    if (index === currentImageIndex) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });
}