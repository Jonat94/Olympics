[![forthebadge](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNjAuMzU2NTEwMTYyMzUzNTIiIGhlaWdodD0iMzUiIHZpZXdCb3g9IjAgMCAxNjAuMzU2NTEwMTYyMzUzNTIgMzUiPjxyZWN0IHdpZHRoPSI2Mi42NTk3MjUxODkyMDg5ODQiIGhlaWdodD0iMzUiIGZpbGw9IiMzMjkzZGMiLz48cmVjdCB4PSI2Mi42NTk3MjUxODkyMDg5ODQiIHdpZHRoPSI5Ny42OTY3ODQ5NzMxNDQ1MyIgaGVpZ2h0PSIzNSIgZmlsbD0iI2U2MzUwNiIvPjx0ZXh0IHg9IjMxLjMyOTg2MjU5NDYwNDQ5MiIgeT0iMTcuNSIgZm9udC1zaXplPSIxMiIgZm9udC1mYW1pbHk9IidSb2JvdG8nLCBzYW5zLXNlcmlmIiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgbGV0dGVyLXNwYWNpbmc9IjIiPk1BREU8L3RleHQ+PHRleHQgeD0iMTExLjUwODExNzY3NTc4MTI1IiB5PSIxNy41IiBmb250LXNpemU9IjEyIiBmb250LWZhbWlseT0iJ01vbnRzZXJyYXQnLCBzYW5zLXNlcmlmIiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iOTAwIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgbGV0dGVyLXNwYWNpbmc9IjIiPkFOR1VMQVI8L3RleHQ+PC9zdmc+)](https://forthebadge.com)

# OlympicsV2

Olympic is a front-end application designed to graphically present the results obtained at the Olympic Games by a set of countries. access to each country's data can be done locally via a Json file or through a REST API providing the same data structure.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## DataSet

The data are included inside the `olympic.json` (`/src/assets/mock/`).
You can find the base url for the data loading, http request, in the file `environnements.ts` located in `/src/environnements/`

## Folder architecture

- `components` folder: contains every reusable components
- `pages` folder: contains components used for routing
- `core` folder: contains the business logic (`services` and `models` folders)
