export default function MessagePreview({ message }) {
  if (!message) return null;

  return (
    <section className="preview" aria-live="polite">
      <label htmlFor="message-output">Mensagem</label>
      <textarea id="message-output" value={message} readOnly rows={8} />
      <button
        className="copy-button"
        type="button"
        onClick={() => navigator.clipboard.writeText(message)}
      >
        Copie o texto
      </button>
    </section>
  );
}
