# To Do List — Angular

Prosta, w pełni funkcjonalna aplikacja To Do List napisana w Angularze 17 (standalone components, signals).

## Funkcje

- Dodawanie zadań
- Oznaczanie jako ukończone / nieukończone
- Edycja zadania (podwójne kliknięcie w tekst)
- Usuwanie zadania
- Filtrowanie: wszystkie / aktywne / ukończone
- Zaznacz / odznacz wszystkie naraz
- Czyszczenie ukończonych
- Zapis do `localStorage` — lista przetrwa odświeżenie strony

## Uruchomienie

Wymagany Node.js (18+) i npm.

```bash
npm install
npm start
```

Aplikacja uruchomi się pod adresem `http://localhost:4200`.

## Build produkcyjny

```bash
npm run build
```

Pliki wynikowe znajdą się w `dist/todo-angular`.

## Struktura projektu

```
src/
  app/
    app.component.ts     # logika (sygnały, dodawanie/edycja/usuwanie/filtrowanie)
    app.component.html   # szablon
    app.component.css    # style
  index.html
  main.ts                # bootstrap aplikacji standalone
  styles.css              # style globalne
```
