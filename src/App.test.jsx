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

    expect(screen.queryByLabelText('Mensagem')).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Nome do livro'), {
      target: { value: 'Dom Casmurro' },
    });
    fireEvent.change(screen.getByLabelText('Número da página'), {
      target: { value: '42' },
    });

    expect(screen.queryByLabelText('Mensagem')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Gerar meu spoiler' }));

    const message = screen.getByLabelText('Mensagem');
    const generatedLines = message.value.split('\n');
    expect(generatedLines[0]).toBe('[SPOILER][Livro: Dom Casmurro][Página: 42]');
    expect(generatedLines).toHaveLength(31);
    expect(generatedLines.slice(1)).toEqual(Array(30).fill('============'));

    expect(message.value.split('\n')[0]).toBe(
      '[SPOILER][Livro: Dom Casmurro][Página: 42]',
    );

    fireEvent.change(screen.getByLabelText('Texto do spoiler'), {
      target: { value: 'Capitu foi embora.' },
    });
    expect(message.value.endsWith('\nCapitu foi embora.')).toBe(false);
    fireEvent.click(screen.getByRole('button', { name: 'Gerar meu spoiler' }));
    expect(message.value.endsWith('\nCapitu foi embora.')).toBe(true);
  });

  it('uses either the page or chapter reference in the title, never both', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('Nome do livro'), {
      target: { value: 'Kindred' },
    });
    fireEvent.change(screen.getByLabelText('Número da página'), {
      target: { value: '81' },
    });
    fireEvent.change(screen.getByLabelText('Referência'), {
      target: { value: 'chapter' },
    });

    expect(screen.queryByLabelText('Número da página')).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Capítulo'), {
      target: { value: '4' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Gerar meu spoiler' }));

    const title = screen.getByLabelText('Mensagem').value.split('\n')[0];
    expect(title).toBe('[SPOILER][Livro: Kindred][Capítulo: 4]');
    expect(title).not.toContain('[Página:');
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
    fireEvent.click(screen.getByRole('button', { name: 'Gerar meu spoiler' }));
    fireEvent.click(screen.getByRole('button', { name: 'Copie o texto' }));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      `[SPOILER][Livro: A Hora da Estrela][Página: 17]\n${Array(30)
        .fill('============')
        .join('\n')}\nA personagem era o narrador.`,
    );
  });
});
