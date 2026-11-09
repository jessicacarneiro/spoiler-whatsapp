import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import MessagePreview from './MessagePreview.jsx';

describe('MessagePreview', () => {
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

  it('renders nothing until a message is provided', () => {
    const { container } = render(<MessagePreview message="" />);

    expect(container).toBeEmptyDOMElement();
  });

  it('shows the message and copies it on request', () => {
    const message = '[SPOILER] test message';
    render(<MessagePreview message={message} />);

    expect(screen.getByLabelText('Mensagem')).toHaveValue(message);
    fireEvent.click(screen.getByRole('button', { name: 'Copie o texto' }));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(message);
  });
});
