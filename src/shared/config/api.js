function normalizeApiUrl(url) {
  if (!url) {
    return "http://codzilla-school-backend.local";
  }

  const normalizedUrl = url.replace(/\/+$/, "");

  if (/^https?:\/\//.test(normalizedUrl)) {
    return normalizedUrl;
  }

  return `https://${normalizedUrl}`;
}

export const API_URL = normalizeApiUrl(process.env.NEXT_PUBLIC_API_URL);
