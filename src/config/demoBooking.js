const PRODUCTION_PROJECT_REF = 'cuwdhditjhocntmxdqiz';
const PUBLIC_PRODUCTION_BOOKING_CONFIG = Object.freeze({
  functionUrl: `https://${PRODUCTION_PROJECT_REF}.supabase.co/functions/v1/paysaathi-booking`,
  anonKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1d2RoZGl0amhvY250bXhkcWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzOTc4NzQsImV4cCI6MjA3MTk3Mzg3NH0.LWsuvqLWGqW4LbX0qzyEmd2AeuzgZUuKndfJQCcPt-Y',
});

const readConfiguredValue = (value) => (typeof value === 'string' ? value.trim() : '');

const firstConfiguredValue = (...values) => values.find(Boolean) || '';

export function resolveDemoBookingConfig({
  env = import.meta.env,
  runtime = globalThis,
  includeProductionFallback = import.meta.env.PROD,
} = {}) {
  const runtimeFunctionUrl = readConfiguredValue(runtime?.__BOOKING_FUNCTION_URL__);
  const runtimeAnonKey = readConfiguredValue(runtime?.__SUPABASE_ANON_KEY__);
  const envFunctionUrl = readConfiguredValue(env?.VITE_SUPABASE_FUNCTION_URL);
  const envAnonKey = readConfiguredValue(env?.VITE_SUPABASE_ANON_KEY);
  const fallbackFunctionUrl = includeProductionFallback ? PUBLIC_PRODUCTION_BOOKING_CONFIG.functionUrl : '';
  const fallbackAnonKey = includeProductionFallback ? PUBLIC_PRODUCTION_BOOKING_CONFIG.anonKey : '';

  return Object.freeze({
    functionUrl: firstConfiguredValue(runtimeFunctionUrl, envFunctionUrl, fallbackFunctionUrl),
    anonKey: firstConfiguredValue(runtimeAnonKey, envAnonKey, fallbackAnonKey),
  });
}

export const demoBookingConfig = resolveDemoBookingConfig();

export function hasDemoBookingBackend(config = demoBookingConfig) {
  return Boolean(
    config.functionUrl &&
    config.functionUrl.includes('supabase.co/functions/') &&
    config.anonKey &&
    !config.anonKey.startsWith('YOUR_')
  );
}
