import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from './App.jsx';

describe('spoiler message form', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders the message title in the requested format and updates it from the form', () => {
    render(<App />);

    const message = screen.getByLabelText('Mensagem');
    const initialMessage = message.value.split('\n');
    expect(initialMessage[0]).toBe('[SPOILER][Livro: ][Página: ]');
    expect(initialMessage).toHaveLength(31);
    expect(initialMessage.slice(1)).toEqual(Array(30).fill('============'));

    fireEvent.change(screen.getByLabelText('Nome do livro'), {
      target: { value: 'Dom Casmurro' },
    });
    fireEvent.change(screen.getByLabelText('Número da página'), {
      target: { value: '42' },
    });

    expect(message.value.split('\n')[0]).toBe(
      '[SPOILER][Livro: Dom Casmurro][Página: 42]',
    );

    fireEvent.change(screen.getByLabelText('Texto do spoiler'), {
      target: { value: 'Capitu foi embora.' },
    });
    expect(message.value.endsWith('\nCapitu foi embora.')).toBe(true);
  });

  it('copies the current message when the copy button is clicked', async () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('Nome do livro'), {
      target: { value: 'A Hora da Estrela' },
    });
    fireEvent.change(screen.getByLabelText('Número da página'), {
      target: { value: '17' },
    });
    fireEvent.change(screen.getByLabelText('Texto do spoiler'), {
      target: { value: 'A personagem era o narrador.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Copie o texto' }));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      `[SPOILER][Livro: A Hora da Estrela][Página: 17]\n${Array(30)
        .fill('============')
        .join('\n')}\nA personagem era o narrador.`,
    );
  });
});
