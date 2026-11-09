# WhatsApp Spoiler

A small React app for creating multiline WhatsApp messages that place book spoilers below a visible spoiler warning and filler lines.

## How it works

1. Enter the book name.
2. Choose whether to reference a page or a chapter, then enter its number or name.
3. Optionally enter the spoiler text.
4. Select **Gerar meu spoiler** to create the message. It contains the title, 30 lines of `=` characters, and the spoiler text at the end.
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

The build uses relative asset paths, so its contents can be hosted from a subfolder such as `whatsapp-spoiler/` on GitHub Pages. Copy the contents of `dist/` into that folder when publishing.

Run the unit tests with:

```sh
npm test
```
