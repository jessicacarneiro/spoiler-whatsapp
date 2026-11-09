export default function SpoilerForm({
  bookTitle,
  onBookTitleChange,
  referenceType,
  onReferenceTypeChange,
  referenceValue,
  onReferenceValueChange,
  spoilerText,
  onSpoilerTextChange,
  onGenerate,
}) {
  return (
    <form className="spoiler-form" onSubmit={onGenerate}>
      <label htmlFor="book-title">Nome do livro</label>
      <input
        id="book-title"
        name="bookTitle"
        type="text"
        value={bookTitle}
        onChange={(event) => onBookTitleChange(event.target.value)}
        placeholder="Ex.: Dom Casmurro"
        required
      />

      <label htmlFor="reference-type">Referência</label>
      <select
        id="reference-type"
        name="referenceType"
        value={referenceType}
        onChange={(event) => onReferenceTypeChange(event.target.value)}
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
        onChange={(event) => onReferenceValueChange(event.target.value)}
        placeholder={referenceType === 'page' ? 'Ex.: 42' : 'Ex.: 3'}
        required
      />

      <label htmlFor="spoiler-text">Texto do spoiler</label>
      <textarea
        id="spoiler-text"
        name="spoilerText"
        rows={5}
        value={spoilerText}
        onChange={(event) => onSpoilerTextChange(event.target.value)}
        placeholder="Digite o spoiler aqui"
      />

      <button className="generate-button" type="submit">
        Gerar meu spoiler
      </button>
    </form>
  );
}
