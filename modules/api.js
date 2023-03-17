const URL = 'https://api.github.com/';

export class Api{
    async loadRepositories(value, page){
        return await fetch(`${URL}search/repositories?q=${value}&per_page=10&page=${page}`)
    }
}