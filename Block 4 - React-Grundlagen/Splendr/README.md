# Splendr

```sh
npm run server  # startet den api-server
npm start       # startet den react-dev-server
```

## Backend

Der API-Server läuft auf Port `3001` und lässt folgende Anfragen zu:

| HTTP     | Pfad   | Aktion |
| -------- | ------ | ------ |
| `GET`    | `/`    | Gibt alle Produkte zurück |
| `GET`    | `/:id` | Gibt ein Produkt zurück |
| `POST`   | `/`    | Legt ein neues Produkt an |
| `PUT`    | `/:id` | Ändert ein Produkt |
| `DELETE` | `/:id` | Löscht ein Produkt |

Ein Produkt muss dabei als JSON-Objekt übergeben werden und kann die Schlüssel `name`, `url`, `image` und `price` enthalten. Beim Erstellen werden automatisch `id` und `timestamp` beigefügt.

## Frontend

Das Frontend ist eine React-SPA, die mit Create React App aufgesetzt wurde.
