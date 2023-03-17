export class Log{
    counterMessage(counter){
        return counter? `Найденo ${counter} репозиториев` : 'ничего не найдено';
    }
}