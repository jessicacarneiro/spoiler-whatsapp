import { useState } from 'react';
import MessagePreview from './components/MessagePreview.jsx';
import SpoilerForm from './components/SpoilerForm.jsx';

const fillerLines = Array.from({ length: 100 }, () => '='.repeat(12)).join('\n');

export default function App() {
  const [bookTitle, setBookTitle] = useState('');
  const [referenceType, setReferenceType] = useState('page');
  const [referenceValue, setReferenceValue] = useState('');
  const [spoilerText, setSpoilerText] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');

  function handleReferenceTypeChange(type) {
    setReferenceType(type);
    setReferenceValue('');
  }

  function handleGenerate(event) {
    event.preventDefault();
    const referenceLabel = referenceType === 'page' ? 'Página' : 'Capítulo';
    const titleLine = `[SPOILER][Livro: ${bookTitle}][${referenceLabel}: ${referenceValue}]`;
    const spoilerSuffix = spoilerText ? `\n${spoilerText}` : '';
    setGeneratedMessage(`${titleLine}\n${fillerLines}${spoilerSuffix}`);
  }

  return (
    <main className="page">
      <h1>Gerar mensagem com spoiler</h1>
      <SpoilerForm
        bookTitle={bookTitle}
        onBookTitleChange={setBookTitle}
        referenceType={referenceType}
        onReferenceTypeChange={handleReferenceTypeChange}
        referenceValue={referenceValue}
        onReferenceValueChange={setReferenceValue}
        spoilerText={spoilerText}
        onSpoilerTextChange={setSpoilerText}
        onGenerate={handleGenerate}
      />
      <MessagePreview message={generatedMessage} />
    </main>
  );
}
