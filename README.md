# WhatsApp Spoiler

A small React app for creating multiline WhatsApp messages that place book spoilers below a visible spoiler warning and filler lines.

## How it works

1. Enter the book name.
2. Choose whether to reference a page or a chapter, then enter its number or name.
3. Optionally enter the spoiler text.
4. Select **Gerar meu spoiler** to create the message. It contains the title, 100 lines of `=` characters, and the spoiler text at the end.
5. Select **Copie o texto** to copy the generated message.

The title uses this format, with either the page or chapter reference:

```text
[SPOILER][Livro: Nome do livro][Página: 42]
```

or:

```text
[SPOILER][Livro: Nome do livro][Capítulo: 3]
```

## Getting started

Install dependencies and start the development server:

```sh
make install
make run
```

To create a production build:

```sh
make build
```

## Publish with GitHub Pages

This repository is configured to publish automatically to [https://jessicacarneiro.github.io/spoiler-whatsapp/](https://jessicacarneiro.github.io/spoiler-whatsapp/) whenever changes are pushed to `main`. GitHub Actions runs the tests, builds the site, and deploys the `dist/` folder.

To enable publishing, open the repository's **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. After the first successful workflow run, future pushes to `main` publish automatically.

The Vite build uses the `/spoiler-whatsapp/` base path in GitHub Actions, while local development continues to use `/`.

Run all tests, or choose a test group:

```sh
make tests
make unit-tests
make integration-tests
```

Component-level unit tests live alongside the components. Integration tests cover the complete form-to-message flow.
