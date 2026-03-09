import { describe, expect, it, vi } from 'vitest';
import {
  buildDemoBookingPayload,
  DEMO_PHONE_STORAGE_KEY,
  DEMO_TIMESTAMP_STORAGE_KEY,
  sanitizePhoneInput,
  submitDemoBooking,
  validateIndianMobileNumber,
} from './demoBooking';

describe('demoBooking helpers', () => {
  it('sanitizes phone input to a 10 digit numeric string', () => {
    expect(sanitizePhoneInput('98 76a54-32109')).toBe('9876543210');
  });

  it('validates Indian mobile numbers', () => {
    expect(validateIndianMobileNumber('')).toBe('Please enter your phone number');
    expect(validateIndianMobileNumber('1234567890')).toBe('Enter a valid 10-digit Indian mobile number');
    expect(validateIndianMobileNumber('9876543210')).toBe('');
  });

  it('builds the booking payload shape expected by the backend', () => {
    expect(
      buildDemoBookingPayload({
        phone: '9876543210',
        pageUrl: 'https://takkada.com',
        timestamp: '2026-03-09T06:00:00.000Z',
      })
    ).toEqual({
      phone: '+919876543210',
      source: 'landing_page',
      page_url: 'https://takkada.com',
      timestamp: '2026-03-09T06:00:00.000Z',
    });
  });

  it('stores the lead locally and submits it to the configured backend', async () => {
    const storage = { setItem: vi.fn() };
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, status: 200 });

    await submitDemoBooking({
      phone: '9876543210',
      pageUrl: 'https://takkada.com',
      timestamp: '2026-03-09T06:00:00.000Z',
      storage,
      fetchImpl,
      config: {
        functionUrl: 'https://demo.supabase.co/functions/v1/paysaathi-booking',
        anonKey: 'public-key',
      },
    });

    expect(storage.setItem).toHaveBeenNthCalledWith(1, DEMO_PHONE_STORAGE_KEY, '9876543210');
    expect(storage.setItem).toHaveBeenNthCalledWith(2, DEMO_TIMESTAMP_STORAGE_KEY, '2026-03-09T06:00:00.000Z');
    expect(fetchImpl).toHaveBeenCalledWith(
      'https://demo.supabase.co/functions/v1/paysaathi-booking',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          apikey: 'public-key',
          Authorization: 'Bearer public-key',
        }),
      })
    );
  });

  it('skips the network request when env config is missing', async () => {
    const storage = { setItem: vi.fn() };
    const fetchImpl = vi.fn();

    const result = await submitDemoBooking({
      phone: '9876543210',
      pageUrl: 'https://takkada.com',
      timestamp: '2026-03-09T06:00:00.000Z',
      storage,
      fetchImpl,
      config: {
        functionUrl: '',
        anonKey: '',
      },
    });

    expect(result).toEqual({
      skipped: true,
      timestamp: '2026-03-09T06:00:00.000Z',
    });
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(storage.setItem).toHaveBeenCalledTimes(2);
  });
});
