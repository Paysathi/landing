import { describe, expect, it, vi } from 'vitest';
import {
  buildDemoBookingPayload,
  DEMO_PHONE_STORAGE_KEY,
  DEMO_TIMESTAMP_STORAGE_KEY,
  submitDemoBooking,
  validateIndianMobileNumber,
  sanitizePhoneInput,
} from './demoBooking';
import { hasDemoBookingBackend, resolveDemoBookingConfig } from '../config/demoBooking';

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
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, status: 200, text: vi.fn() });

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

  it('prefers runtime overrides and can fall back to the production booking config', () => {
    const runtimeOverrideConfig = resolveDemoBookingConfig({
      env: {},
      runtime: {
        __BOOKING_FUNCTION_URL__: 'https://runtime.supabase.co/functions/v1/paysaathi-booking',
        __SUPABASE_ANON_KEY__: 'runtime-key',
      },
      includeProductionFallback: false,
    });

    expect(runtimeOverrideConfig).toEqual({
      functionUrl: 'https://runtime.supabase.co/functions/v1/paysaathi-booking',
      anonKey: 'runtime-key',
    });
    expect(hasDemoBookingBackend(runtimeOverrideConfig)).toBe(true);

    const productionFallbackConfig = resolveDemoBookingConfig({
      env: {},
      runtime: {},
      includeProductionFallback: true,
    });

    expect(productionFallbackConfig.functionUrl).toContain('cuwdhditjhocntmxdqiz.supabase.co');
    expect(productionFallbackConfig.anonKey.length).toBeGreaterThan(20);
    expect(hasDemoBookingBackend(productionFallbackConfig)).toBe(true);
  });

  it('throws when the booking backend configuration is missing', async () => {
    const storage = { setItem: vi.fn() };
    const fetchImpl = vi.fn();

    await expect(
      submitDemoBooking({
        phone: '9876543210',
        pageUrl: 'https://takkada.com',
        timestamp: '2026-03-09T06:00:00.000Z',
        storage,
        fetchImpl,
        config: {
          functionUrl: '',
          anonKey: '',
        },
      })
    ).rejects.toThrow('Booking backend configuration is missing');

    expect(fetchImpl).not.toHaveBeenCalled();
    expect(storage.setItem).toHaveBeenCalledTimes(2);
  });
});
