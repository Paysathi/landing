const readEnvValue = (value) => (typeof value === 'string' ? value.trim() : '');

export const demoBookingConfig = Object.freeze({
  functionUrl: readEnvValue(import.meta.env.VITE_SUPABASE_FUNCTION_URL),
  anonKey: readEnvValue(import.meta.env.VITE_SUPABASE_ANON_KEY),
});

export function hasDemoBookingBackend(config = demoBookingConfig) {
  return Boolean(config.functionUrl && config.anonKey);
}
