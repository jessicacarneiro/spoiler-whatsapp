import { useState } from 'react';

const fillerLines = Array.from({ length: 30 }, () => '='.repeat(12)).join('\n');

export default function App() {
  const [bookTitle, setBookTitle] = useState('');
  const [referenceType, setReferenceType] = useState('page');
  const [referenceValue, setReferenceValue] = useState('');
  const [spoilerText, setSpoilerText] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');

  const referenceLabel = referenceType === 'page' ? 'Página' : 'Capítulo';
  const titleLine = `[SPOILER][Livro: ${bookTitle}][${referenceLabel}: ${referenceValue}]`;
  const message = generatedMessage;

  function handleGenerate(event) {
    event.preventDefault();
    setGeneratedMessage(
      `${titleLine}\n${fillerLines}${spoilerText ? `\n${spoilerText}` : ''}`,
    );
  }

  return (
    <main className="page">
      <h1>Gerar mensagem com spoiler</h1>

      <form className="spoiler-form" onSubmit={handleGenerate}>
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

        <label htmlFor="reference-type">Referência</label>
        <select
          id="reference-type"
          name="referenceType"
          value={referenceType}
          onChange={(event) => {
            setReferenceType(event.target.value);
            setReferenceValue('');
          }}
        >
          <option value="page">Página</option>
          <option value="chapter">Capítulo</option>
        </select>

        <label htmlFor="reference-value">
          {referenceType === 'page' ? 'Número da página' : 'Capítulo'}
        </label>
        <input
          id="reference-value"
          name="referenceValue"
          type={referenceType === 'page' ? 'number' : 'text'}
          min={referenceType === 'page' ? '1' : undefined}
          value={referenceValue}
          onChange={(event) => setReferenceValue(event.target.value)}
          placeholder={referenceType === 'page' ? 'Ex.: 42' : 'Ex.: 3'}
          required
        />

        <label htmlFor="spoiler-text">Texto do spoiler</label>
        <textarea
          id="spoiler-text"
          name="spoilerText"
          rows={5}
          value={spoilerText}
          onChange={(event) => setSpoilerText(event.target.value)}
          placeholder="Digite o spoiler aqui"
        />

        <button className="generate-button" type="submit">
          Gerar meu spoiler
        </button>
      </form>

      {message && (
        <section className="preview" aria-live="polite">
          <label htmlFor="message-output">Mensagem</label>
          <textarea
            id="message-output"
            value={message}
            readOnly
            rows={8}
          />
          <button
            className="copy-button"
            type="button"
            onClick={() => navigator.clipboard.writeText(message)}
          >
            Copie o texto
          </button>
        </section>
      )}
    </main>
  );
}
