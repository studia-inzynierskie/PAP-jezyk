# Jeżyk - serwis z grami planszowymi

Inspiracją do aplikacji jeżyk jest popularny serwis z grami - kurnik. Na początek planujemy dodać proste gry karciane, np. "wojna", "makao", "pan". W zależności od tempa realizacji mogą pojawić się również inne gry.

## Funkcjonowanie strony

#### Pasek nawigacji
Element każdego widoku.

Zawartość:
  - Przycisk powrotu do aktywnej gry
  - Dla gości:
    - Przycisk logowania
  - Dla zalogowanych:
    - Przycisk wylogowania
    - Link do strony użytkownika

#### Strona główna
Zawartość:
  - Lista odnośników do stron najpopularniejszych gier
  - Najbardziej ogólne LeaderBoardsy
  - About Us
  - Buttony do przejścia do pełnych stron

#### Strona gry
Dla każdej obsługiwanej gry.

Zawartość:
  - Przeglądanie pokojów
  - Tworzenie pokoju
  - Opis i zasady
  - LeaderBoardsy gry

#### Widok meczu
  - Aktualizowany na żywo
  - ChatBox
  - Opcja poddania się

#### Strona użytkownika
  - XPBar
  - Historia gier
  - Achievementy
  - Ustawienia

## Stos technologiczny
**Frontend:** React
  - Koponenty reactowe w pliku komponenty_react.md
  - styled-components
  - Playwright, React Testing library

**Backend:** Flask
  - Flask-SQLAlchemy
  - pytest
  - Oparty na blueprintach

**Baza danych:** SQLite3

#### Potencjalne bardziej zaawansowane technologie
**Frontend:**
  - Next.js
  - Formik

**Backend:**
  - Flask-marshmallow
  - APIFairy

**Baza danych:** PostgreSQL

**Deployment:** Docker

## Podział prac
**Frontend:**
  - Jakub Sarna
  - Tomasz Świderski

**Backend i baza danych:**
  - Aleksander Sabak
  - Bartłomiej Rodzik

**Dokumentacja:**
  - Wszyscy członkowie

Wszelkie nowe funkcjonalności i pomysły będą dopisywane na bieżąco.