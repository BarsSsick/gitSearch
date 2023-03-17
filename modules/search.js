export class Search {

    setCurrentPage(pageNumber) {
        this.currentPage = pageNumber;
    }

    setRepositoriesCount(count) {
        this.repositoriesCount = count
    }

    constructor(view, api, log) {
        this.view = view;
        this.api = api;
        this.log = log;
        this.view.searchBtn.addEventListener('click', this.loadRepositories.bind(this));
        // this.view.searchInput.addEventListener('keypress', );
        this.view.loadMoreBtn.addEventListener('click', this.loadMoreRepositories.bind(this));
        this.currentPage = 1;
        this.repositoriesCount = 0;
    }

    loadRepositories() {
        this.setCurrentPage(1);
        this.view.setCounterMessage('');
        if (this.view.searchInput.value) {
            this.clearRepositories();
            this.repositoriesRequest(this.view.searchInput.value);
        } else {
            this.clearRepositories();
            this.view.toggleStateLoadMoreButton(false);
        }
    }

    loadMoreRepositories() {
        this.setCurrentPage(this.currentPage + 1);
        this.repositoriesRequest(this.view.searchInput.value);
    }

    async repositoriesRequest(searchValue) {
        let totalCount;
        let repositories;
        let message;
        try {
            await this.api.loadRepositories(searchValue, this.currentPage).then((res) => {
                res.json().then(res => {
                    repositories = res.items;
                    totalCount = res.total_count;
                    message = this.log.counterMessage(totalCount)
                    this.setRepositoriesCount(this.repositoriesCount + res.items.length)
                    this.view.setCounterMessage(message);
                    this.view.toggleStateLoadMoreButton(totalCount > 10 && this.repositoriesCount !== totalCount);
                    repositories.forEach(repository => this.view.createRepository(repository))
                })
            })
        } catch (e) {
            console.log('Error:' + e);
        }

    }

    clearRepositories() {
        this.view.repositoriesList.innerHTML = '';
    }

}