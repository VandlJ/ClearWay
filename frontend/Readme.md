# Frontend

## Tests

### End-to-end tests

#### Playwright e2e tests

Playwright e2e tests can be executed (console mode) by command

```
npm run test:e2e:playwright
```

or in the UI mode

```
npm run test:e2e:playwright:ui
```

**Tip**: If you want to write e2e tests or run only some of them, consider installing VSC extensions [Playwright](https://playwright.dev/docs/getting-started-vscode#debugging-tests).

It will save you a lot of time while writing/editing/debugging tests.

Also you need to have installed dependencies - since the playwright is needed only for testing (and not deployment), it is
again just devDependency.

## Lint

- we can use the default lint provided by next that can be run via

```cmd
npm run lint
```
