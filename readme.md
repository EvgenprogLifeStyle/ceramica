# Реал керамика
## 1. Сборка проекта 
   Сборка основана на GULP + NODE.JS(v.13.2.0+).

   1.1 Сборка проекта (Live reload).
   
   ```sh
   gulp img_all
   ```
   1.2 Сборка проекта (Полная сборка проекта).
   
   ```sh
   gulp build
   ```
   
   1.3 Компиляция картинок отдельно, также для изображений добавляется webP (Опциональное использование).
   
   ```sh
   gulp img_all
   ```

   1.4 Опционально, если понадобится работа с webpack 

   ```sh
   gulp webpackRun
   ```

   1.5 Генерация js документации (Добавляет в папку /dist/jsDocs/ описание js методов в виде обычных html страниц).
   
   ```sh
   jsdoc -c jsConf.json
   ```


## 2. Использование

### Папки

   **app/** - Основной источник файлов
   
   **app/css** - Скомпилированные css файлы из папки app/scss/
   
   **app/fonts** - Шрифты
   
   **app/html_blocks** - Переиспользуемые html блоки вместе со стилями и скриптами
   
   **app/js/libs** - список используемых библиотек (далеко не все используются, подключать только прописанные в footer.html)
   
   **app/js/pages** - список скриптов для отдельных страниц (практически все подключаются внутри файлов с вёрсткой снизу страницы)
   
   **app/js/scripts.js** - основной файл скриптов и точка входа для дополнительно подключаемых файлов
   
   **app/js/app.js** - импортированный слайдер используемый на проекте по средством webpack
   
   **dist/** - Скомпилированные и минифицированные файлы.

---

### Нюансы
   
   - Изменение стилей происходит посредством редактирования .scss файлов, отдельное редактирование .css файлов не рекомендуется
   - Основные скрипты находятся в footer.html, дополнительные находятся снизу страниц в папке app/*.html
   - Предполагается, что скрипты будут подгружаться в конце html документа ( по средствам настройки в адмике битрикса)
   - Яндекс карта подключена с помощью тестового ключа, для корректной работы просьба поменять на свой api-key
   - Т.к. пока нет полного взаимодействия между фронтом и беком большиство функционала основано на личном опыте т.е. к примеру весь функционал готов к ajax перезагрузке странице или каких-то определённых элементов
   - Валидация форм происходит по средствам parsley.js. В проекте пока добавлены тестовые, успешные события. Дальше можно переделать это на своё усмотрение ajax/прямой post/get запрос...
   - Из-за того, что пришлось переделать всё в один шаблон где-то функционал или вёрстка может выглядеть громоздко или не совсем логично
   - Не рекомендуется удалять верстку пустых блоков, так как они используются на мобильной версии сайта
   - Модальные окна работают с помощью плагина fancybox 3
   - При изменении размера экрана через Элементор, корретная верстка отобразится после перезагрузки страницы





