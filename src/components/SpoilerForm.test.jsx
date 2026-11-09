import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import SpoilerForm from './SpoilerForm.jsx';

afterEach(cleanup);

function renderSpoilerForm(overrides = {}) {
  const props = {
    bookTitle: '',
    onBookTitleChange: vi.fn(),
    referenceType: 'page',
    onReferenceTypeChange: vi.fn(),
    referenceValue: '',
    onReferenceValueChange: vi.fn(),
    spoilerText: '',
    onSpoilerTextChange: vi.fn(),
    onGenerate: vi.fn((event) => event.preventDefault()),
    ...overrides,
  };

  const { rerender } = render(<SpoilerForm {...props} />);
  return { props, rerender };
}

describe('SpoilerForm', () => {
  it('shows the page field by default and forwards field changes', () => {
    const { props, rerender } = renderSpoilerForm();

    expect(screen.getByLabelText('Número da página')).toHaveAttribute(
      'type',
      'number',
    );
    expect(screen.queryByLabelText('Capítulo')).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Nome do livro'), {
      target: { value: 'Kindred' },
    });
    fireEvent.change(screen.getByLabelText('Referência'), {
      target: { value: 'chapter' },
    });
    rerender(<SpoilerForm {...props} referenceType="chapter" />);
    fireEvent.change(screen.getByLabelText('Capítulo'), {
      target: { value: '4' },
    });
    fireEvent.change(screen.getByLabelText('Texto do spoiler'), {
      target: { value: 'A reveal' },
    });

    expect(props.onBookTitleChange).toHaveBeenCalledWith('Kindred');
    expect(props.onReferenceTypeChange).toHaveBeenCalledWith('chapter');
    expect(props.onReferenceValueChange).toHaveBeenCalledWith('4');
    expect(props.onSpoilerTextChange).toHaveBeenCalledWith('A reveal');
  });

  it('submits when the generate button is pressed', () => {
    const { props } = renderSpoilerForm();

    fireEvent.submit(screen.getByRole('button', { name: 'Gerar meu spoiler' }).closest('form'));

    expect(props.onGenerate).toHaveBeenCalledOnce();
  });
});
