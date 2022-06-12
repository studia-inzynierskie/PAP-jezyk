# Jeżyk (PAP22L-Z13)

Papjeżyk jest innowacyjnym serwisem internetowym pozwalającym na rozgrywkę w gry karciane wielu graczom jednocześnie. Na stronie możliwe jest stworzenie pokoju z grą lub dołączenia do istniejącego. Dodatkową możliwością jest założenie konta, dzięki czemu można zbierać osiągnięcia, zdobywać poziomy i rywalizować z innymi graczami w rankingu.

## Dokumentacja

`README.md` zawiera tylko podstawowe informacje na temat projektu. Dokładniejszą dokumentację można znaleźć w folderze `Dokumentacja`.

## Instalacja
Klonowanie repozytorium w systemie Linux:
1. Przejdź do folderu w którym ma się znaleźć folder z projektem
2. Wywołaj komendę:
```
git clone https://gitlab-stud.elka.pw.edu.pl/pap-jezyk/pap22l-z13.git
```

Klonowanie repozytorium w systemie Windows:
1. Zainstaluj program [git for windows](https://gitforwindows.org)
2. Otwórz w eksploratorze plików folder w którym ma się znaleźć folder z projektem
3. Kliknij prawym przyciskiem myszy na tło eksploratora i wybierz "Git Bash here"
4. Wywołaj komendę:
```
git clone https://gitlab-stud.elka.pw.edu.pl/pap-jezyk/pap22l-z13.git
```

Szczegóły instalacji API są w pliku README.md w folderze `flask_api`

### Instalacja z użyciem docker-compose
1. `docker-compose up -d`
2. W obrazie "api" wywołaj polecenie:
```
flask init-db --reset --populate
```

## Użycie

W folderze flask_api

## Autorzy
Bartłomiej Rodzik,
Aleksander Sabak,
Jakub Sarna,
Tomasz Świderski,
