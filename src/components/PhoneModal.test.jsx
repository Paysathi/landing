import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import PhoneModal from './PhoneModal';
import * as demoBooking from '../lib/demoBooking';

describe('PhoneModal', () => {
  const submitDemoBookingSpy = vi.spyOn(demoBooking, 'submitDemoBooking');
  const originalWindowOpen = window.open;

  beforeEach(() => {
    submitDemoBookingSpy.mockResolvedValue({ skipped: false, timestamp: '2026-03-09T06:00:00.000Z' });
    window.open = vi.fn();
  });

  afterEach(() => {
    cleanup();
    if (vi.isFakeTimers()) {
      vi.runOnlyPendingTimers();
      vi.useRealTimers();
    }
    submitDemoBookingSpy.mockReset();
    window.open = originalWindowOpen;
  });

  it('shows a validation error before submitting', async () => {
    render(<PhoneModal isOpen onClose={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /continue to book/i }));

    expect(screen.getByText('Please enter your phone number')).toBeInTheDocument();
    expect(submitDemoBookingSpy).not.toHaveBeenCalled();
  });

  it('submits a valid phone number, opens the calendar, and closes the modal', async () => {
    const onClose = vi.fn();
    vi.useFakeTimers();

    render(<PhoneModal isOpen onClose={onClose} />);

    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '98 76a54-32109' },
    });
    fireEvent.click(screen.getByRole('button', { name: /continue to book/i }));

    await act(async () => {
      await Promise.resolve();
    });

    expect(submitDemoBookingSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        phone: '9876543210',
      })
    );

    expect(window.open).toHaveBeenCalledWith(
      'https://calendar.notion.so/meet/ronakmalu/takkada',
      '_blank',
      'noopener,noreferrer'
    );

    await act(async () => {
      vi.advanceTimersByTime(800);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('shows an error and does not redirect when backend capture fails', async () => {
    vi.useFakeTimers();
    submitDemoBookingSpy.mockRejectedValue(new Error('booking failed'));

    render(<PhoneModal isOpen onClose={vi.fn()} />);

    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '9876543210' },
    });
    fireEvent.click(screen.getByRole('button', { name: /continue to book/i }));

    await act(async () => {
      await Promise.resolve();
    });

    expect(window.open).not.toHaveBeenCalled();
    expect(screen.getByText('Could not save your number. Please try again.')).toBeInTheDocument();
  });
});
