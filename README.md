# DatX in Angular example project

This project demonstrates how to use [DatX 2](https://datx.dev/) in [Angular](https://angular.io/).

## Required steps

1. Add `@datx/core`, `@datx/jsonapi`, `@datx/jsonapi-angular` and `mobx`.
2. In `src/main.ts` import `@datx/core/disable-mobx`.
3. Implement a custom fetch function. Have a look at `src/app/services/custom-fetch`.
4. Configure DatX to use the custom fetch function. Have a look at `helpers/init-datx`. Add other configuration parameters as well.
5. Collections, models and services can now be created. Have a look at `src/app/collections` and `src/app/models`.

## Development server

Run `npm run dev` for a dev server. This will run both the Angular application as well as a fake [JSON:API](https://jsonapi.org/) server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## License

The [MIT License](LICENSE)

## Credits

This project is maintained and sponsored by
[Infinum](https://www.infinum.com).

<img src="https://infinum.com/infinum.png" width="264">
