# Jeżyk API

### Uruchamianie środowiska deweloperskiego

##### Za pierwszym razem:

1. Utwórz środowisko wirtualne

   Linux:
   ```
   mkdir venv
   python3 -m venv venv
   ```

   Windows:
   Utwórz folder `venv`
   ```
   python -m venv venv
   ```

2. Uruchom środowisko wirtualne

   Linux:
   ```
   source venv/bin/activate
   ```

   Windows:
   ```
   venv/Scripts/activate.bat
   ```

3. Zainstaluj paczki pythonowe

   ```
   pip install -r requirements.txt
   ```

4. Skopiuj zawartość folderu `sample instance` do nowego folderu `instance`

5. Zmień zawartość pliku `instance/config.py` tak aby odpowiadał Twojej konfiguracji.

   W szczególności: **Zmień wartość parametru `SECRET_KEY`!**

6. Jeżeli używasz innej niż domyślna bazy danych upewnij się że jest ona poprawnie
   skonfigurowana i wywołaj polecenie `flask init-db`

7. Wywołaj polecenie `flask run`

8. Jeżeli wszystko działa powinna być dostępna strona `localhost:5000/hello`.

##### Za kolejnymi razami:

1. Uruchom środowisko wirtualne (patrz pkt. 2 powyżej)

2. Zinstaluj nowe paczki pthonowe jeżeli się zmieniły (patrz pkt. 3 powyżej)

3. Wywołaj polecenie `flask run`

4. Jeżeli wszystko działa powinna być dostępna strona `localhost:5000/hello`.

### Interfejs linii poleceń

Aplikacja implementuje jedną komendę CLI:

- `flask init-db [--reset | --no-reset] [--populate | --no-populate]`

  Tworzy tabele opisane w `app/model.py`. Jeżeli podana zostanie opcja `reset`
  usuwa wszystkie istniejące w bazie tabele przed zainicjowaniem. Jeżeli
  podana zostanie opcja `populate` dodaje do bazy gry i osiągnięcia.
  Domyślnie: `no-reset`, `no-populate`.

- `flask add-game <name> <description> <min_players:int> <max_players:int>`

  Dodaje grę o podanej nazwie, opisie i dostępnych liczbach graczy.

- `flask add-achievement <name> <description>

  Dodaje osiągnięcie o podanej nazwie i opisie

### Testowanie

W celu przetestowania aplikacji należy wywołać polecenie:
```
coverage run -m pytest
```
Potem można wygenerować dane dotyczące pokrycia:
```
coverage html
```
Dane będą dostępne w postaci strony internetowej w folderze `htmlcov`.
