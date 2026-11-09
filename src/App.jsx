import { useState } from 'react';

const fillerLines = Array.from({ length: 30 }, () => '='.repeat(12)).join('\n');

export default function App() {
  const [bookTitle, setBookTitle] = useState('');
  const [pageNumber, setPageNumber] = useState('');

  const titleLine = `[SPOILER][Livro: ${bookTitle}][Página: ${pageNumber}]`;
  const message = `${titleLine}\n${fillerLines}`;

  return (
    <main className="page">
      <h1>Gerar mensagem com spoiler</h1>

      <form className="spoiler-form" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="book-title">Nome do livro</label>
        <input
          id="book-title"
          name="bookTitle"
          type="text"
          value={bookTitle}
          onChange={(event) => setBookTitle(event.target.value)}
          placeholder="Ex.: Dom Casmurro"
          required
        />

        <label htmlFor="page-number">Número da página</label>
        <input
          id="page-number"
          name="pageNumber"
          type="number"
          min="1"
          value={pageNumber}
          onChange={(event) => setPageNumber(event.target.value)}
          placeholder="Ex.: 42"
          required
        />
      </form>

      <section className="preview" aria-live="polite">
        <label htmlFor="message-output">Mensagem</label>
        <textarea
          id="message-output"
          value={message}
          readOnly
          rows={3}
        />
        <button
          className="copy-button"
          type="button"
          onClick={() => navigator.clipboard.writeText(message)}
        >
          Copie o texto
        </button>
      </section>
    </main>
  );
}
