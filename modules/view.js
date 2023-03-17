export class View {
    constructor() {
        this.app = document.getElementById('app');

        // Заголовок
        this.title = this.createElement('h1', 'title');
        this.title.textContent = 'Github Search Repositories';

        // Основной блок
        this.mainContent = this.createElement('div', 'main');

        // Список пользователей
        this.repositoriesListWrapper = this.createElement('div', 'repositories-wrapper');
        this.repositoriesList = this.createElement('ul', 'repositories');
        this.repositoriesListWrapper.append(this.repositoriesList);

        // Поле поиска
        this.searchLine = this.createElement('div', 'search-line');
        this.searchInput = this.createElement('input', 'search-input');
        this.searchInput.setAttribute('type', 'text');
        this.searchInput.setAttribute('required', '');
        this.searchBtn = this.createElement('button', 'search-btn');
        this.searchBtn.classList.add('btn');
        this.searchBtn.textContent = 'search';
        this.searchBtn.setAttribute('type', 'submit');
        this.searchCounter = this.createElement('span', 'counter');
        this.searchLine.append(this.searchInput);
        this.searchLine.append(this.searchCounter);
        this.searchLine.append(this.searchBtn);

        // Кнопка "Загрузить еще"
        this.loadMoreBtn = this.createElement('button', 'btn');
        this.loadMoreBtn.textContent = 'Загрузить еще';
        this.loadMoreBtn.style.display = 'none';
        this.repositoriesListWrapper.append(this.loadMoreBtn);

        //Добавление всех блоков в приложение
        this.app.append(this.title);
        this.app.append(this.searchLine);
        this.mainContent.append(this.repositoriesListWrapper);
        this.app.append(this.mainContent);
    }

    createElement(elementTag, elementClass) {
        const element = document.createElement(elementTag);
        if (elementClass) {
            element.classList.add(elementClass);
        }
        return element;
    }

    createRepository(repositoryData) {
        const repositoryElement = this.createElement('li', 'repository');
        repositoryElement.innerHTML = `<div class="repos-box">
        <span class="repository-prev-name">${repositoryData.name}</span>
        <span class="repository-prev-name"><a href="${repositoryData.clone_url}" target="_blank">${repositoryData.clone_url}</a></span>
        <span class="repository-prev-name">${repositoryData.language}</span>
        </div>`
        this.repositoriesList.append(repositoryElement);
    }

    toggleStateLoadMoreButton(show) {
        this.loadMoreBtn.style.display = show ? 'block' : 'none';
    }

    setCounterMessage(message) {
        this.searchCounter.textContent = message;
    }

}