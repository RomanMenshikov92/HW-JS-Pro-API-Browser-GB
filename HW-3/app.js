// Урок 3. Сетевые запросы

// Цель: Разработать веб-приложение, которое каждый день будет отображать новое случайное изображение из коллекции Unsplash, давая пользователю возможность узнать больше о фотографе и сделать "лайк" изображению.

// Регистрация на Unsplash:

// • Перейдите на веб-сайт Unsplash (https://unsplash.com/).
// • Зарегистрируйтесь или войдите в свой аккаунт. (если у вас не было регистрации до этого, новый аккаунт создавать не нужно).

// Создание приложения:

// • Перейдите на страницу разработчика Unsplash (https://unsplash.com/developers).
// • Нажмите "New Application".
// • Заполните необходимую информацию о приложении (можете использовать http://localhost для тестирования).
// • Получите свой API-ключ после создания приложения.

// Разработка веб-приложения:

// • Создайте HTML-страницу с элементами: изображение, имя фотографа, кнопка "лайк" и счетчик лайков.
// • Используя JavaScript и ваш API-ключ, получите случайное изображение из Unsplash каждый раз, когда пользователь загружает страницу.
// • Отобразите информацию о фотографе под изображением.

// * Дополнительные задачи (по желанию):

// • Реализуйте функционал "лайка". Каждый раз, когда пользователь нажимает кнопку "лайк", счетчик должен увеличиваться на единицу.
// • Добавьте функцию сохранения количества лайков в локальное хранилище, чтобы при новой загрузке страницы счетчик не сбрасывался.
// • Реализуйте возможность просмотра предыдущих "фото дня" с сохранением их в истории просмотров.

document.addEventListener("DOMContentLoaded", function () {
  // ключ api Unsplash
  const apiKey = "anN7W6vRo9gIwhRd-4aX509sOBeN8dfKXQUDKPMNDSU";

  // Получение элементов DOM
  const photoContainer = document.getElementById("photoContainer");
  const photo = document.getElementById("photo");
  const photographerName = document.getElementById("photographerName");
  const likeButton = document.getElementById("likeButton");
  const likeCount = document.getElementById("likeCount");
  const photoOfDayButton = document.getElementById("photoOfDayButton");
  const likedPhotosContainer = document.getElementById("likedPhotosContainer");

  // Переменные для отслеживания лайков и сохраненных фотографий
  let likes = 0;
  let likedPhotos = [];

  // Функция для получения случайной фотографии из Unsplash
  function getRandomPhoto() {
    fetch(`https://api.unsplash.com/photos/random?client_id=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        const imageUrl = data.urls.regular;
        const name = data.user.name;

        // Обновление элементов DOM с информацией о фотографии
        photo.src = imageUrl;
        photographerName.textContent = `Photographer: ${name}`;
      })
      .catch((error) => console.error("Error fetching random photo:", error));
  }

  // Функция для обновления счетчика лайков
  function updateLikes() {
    likeCount.textContent = `Likes: ${likes}`;
  }

  // Функция для сохранения лайков и фотографий в локальное хранилище
  function saveToLocalStorage() {
    localStorage.setItem("likes", likes.toString());
    localStorage.setItem("likedPhotos", JSON.stringify(likedPhotos));
  }

  // Функция для загрузки лайков и фотографий из локального хранилища
  function loadFromLocalStorage() {
    const savedLikedPhotos = localStorage.getItem("likedPhotos");

    if (savedLikedPhotos) {
      likedPhotos = JSON.parse(savedLikedPhotos);

      // Очистка контейнера перед отображением сохраненных фотографий
      likedPhotosContainer.innerHTML = "";

      // Отображение сохраненных фотографий в контейнере
      likedPhotos.forEach((photoUrl) => {
        const likedPhoto = document.createElement("img");
        likedPhoto.src = photoUrl;
        likedPhotosContainer.appendChild(likedPhoto);
      });
    }
  }

  // Обработчик события для кнопки "Лайк"
  likeButton.addEventListener("click", function () {
    likes++;
    updateLikes();
    likedPhotos.push(photo.src); // Сохранение URL лайкнутой фотографии
    saveToLocalStorage();
  });

  // Обработчик события для кнопки "Фото дня"
  photoOfDayButton.addEventListener("click", function () {
    // Очистка контейнера перед отображением сохраненных фотографий
    likedPhotosContainer.innerHTML = "";

    // Отображение лайкнутых фотографий в отдельном контейнере
    likedPhotos.forEach((photoUrl) => {
      const likedPhoto = document.createElement("img");
      likedPhoto.src = photoUrl;
      likedPhotosContainer.appendChild(likedPhoto);
    });
  });

  // Загрузка случайной фотографии и лайков из локального хранилища при загрузке страницы
  getRandomPhoto();
  loadFromLocalStorage();
});
