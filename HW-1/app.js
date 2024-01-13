// Урок 1. Dom-дерево

// Вы разрабатываете веб-страницу для отображения расписания занятий в спортивном клубе. Каждое занятие имеет название, время проведения, максимальное количество участников и текущее количество записанных участников.

// 1. Создайте веб-страницу с заголовком "Расписание занятий" и областью для отображения занятий.

// 2. Загрузите информацию о занятиях из предоставленных JSON-данных. Каждое занятие должно отображаться на странице с указанием его названия, времени проведения, максимального количества участников и текущего количества записанных участников.

// 3. Пользователь может нажать на кнопку "Записаться" для записи на занятие. Если максимальное количество участников уже достигнуто, кнопка "Записаться" становится неактивной.

// 4. После успешной записи пользователя на занятие, обновите количество записанных участников и состояние кнопки "Записаться".

// Загрузка JSON-данных
fetch("schedule.json")
  .then((response) => response.json())
  .then((data) => {
    // Получение элемента для отображения расписания
    const scheduleElement = document.getElementById("schedule");

    // Отображение каждого занятия
    data.forEach((lesson) => {
      // Создание элементов
      const lessonElement = document.createElement("div");
      const titleElement = document.createElement("h2");
      const timeElement = document.createElement("p");
      const maxParticipantsElement = document.createElement("p");
      const currentParticipantsElement = document.createElement("p");
      const buttonElement = document.createElement("button");

      // Добавление классов
      buttonElement.classList.add("btn", "btn-reset");
      lessonElement.classList.add("lesson");
      titleElement.classList.add("title");
      timeElement.classList.add("time");
      maxParticipantsElement.classList.add("max");
      currentParticipantsElement.classList.add("current");

      // Заполнение элементов
      titleElement.textContent = lesson.title;
      timeElement.textContent = `Время проведения: ${lesson.time}`;
      maxParticipantsElement.textContent = `Максимальное количество участников: ${lesson.maxParticipants}`;
      currentParticipantsElement.textContent = `Текущее количество записанных участников: ${lesson.currentParticipants}`;
      buttonElement.textContent = "Записаться";

      // Проверка, достигнуто ли максимальное количество участников при загрузке данных
      if (lesson.currentParticipants >= lesson.maxParticipants) {
        buttonElement.disabled = true;
        buttonElement.classList.add("btn-limit");
      }

      // Обработчик
      buttonElement.addEventListener("click", () => {
        // Проверка, достигнуто ли максимальное количество участников
        if (lesson.currentParticipants < lesson.maxParticipants) {
          // Обновление текущего количества записанных участников
          lesson.currentParticipants++;
          currentParticipantsElement.textContent = `Текущее количество записанных участников: ${lesson.currentParticipants}`;

          // Проверка, достигнуто ли максимальное количество участников после записи
          if (lesson.currentParticipants >= lesson.maxParticipants) {
            buttonElement.disabled = true;
            buttonElement.classList.add("btn-limit");
          }
        }
      });

      // Добавление элементов на страницу
      lessonElement.appendChild(titleElement);
      lessonElement.appendChild(timeElement);
      lessonElement.appendChild(maxParticipantsElement);
      lessonElement.appendChild(currentParticipantsElement);
      lessonElement.appendChild(buttonElement);
      scheduleElement.appendChild(lessonElement);
    });
  });
