# Backend

Lorem ipsum

## How to run unit tests?

- first of all, make sure you have installed framework `jest`
- if not, you can install it via `npm i jest --save-dev`
  - This framework is only dev dependency - we need him only during testing, not during the application deployment, it would be useless and take a space
- after that, run command `npm run test` - it will automatically execute all tests (currently in folder `utils`)

## How to run lint?

Again, just run

```cmd Running lint on the backend files
npm run lint
```

- the lint rules are in `eslint.config.mjs`
- lint is again dev dependency - so it will not be installed during deployment - only during testing!
