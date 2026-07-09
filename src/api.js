const DEFAULT_PRODUCTION_API = 'https://limpacao-web-2-production.up.railway.app';

const getFallbackApi = () => {
  if (typeof window === 'undefined') {
    return 'http://localhost:3001';
  }

  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:3001';
  }

  return DEFAULT_PRODUCTION_API;
};

export const API = import.meta.env.VITE_API_URL || getFallbackApi();
