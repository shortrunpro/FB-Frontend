import Medusa from '@medusajs/js-sdk';

// Defaults to standard port for Medusa server
export const MEDUSA_BACKEND_URL =
  process.env.MEDUSA_BACKEND_URL ??
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ??
  '';
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME;
export const BRAND_PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER;

export const IS_STAGING =
  process.env.NEXT_PUBLIC_IS_STAGING === 'true' ||
  process.env.NEXT_PUBLIC_BASE_URL?.includes('staging') ||
  false;

export const ROBOTS_METADATA = IS_STAGING
  ? {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      }
    }
  : {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large' as const,
        'max-video-preview': -1,
        'max-snippet': -1
      }
    };

export const ROBOTS_SEO_STRING = IS_STAGING ? 'noindex, nofollow' : 'index, follow';

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === 'development',
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
});
export const BRAND_LOGO = '/federal-brace-logo.jpg';

type FetchQueryOptions = Omit<RequestInit, 'headers' | 'body'> & {
  headers?: Record<string, string | null | { tags: string[] }>;
  query?: Record<string, string | number>;
  body?: Record<string, any> | any;
  contentType?: string;
};

export async function fetchQuery(url: string, { method, query, headers, body }: FetchQueryOptions) {
  const params = Object.entries(query || {}).reduce((acc, [key, value], index) => {
    if (value && value !== undefined) {
      const queryLength = Object.values(query || {}).filter(i => !!i).length;
      acc += `${key}=${value}${index + 1 <= queryLength ? '&' : ''}`;
    }
    return acc;
  }, '');
  const res = await fetch(`${MEDUSA_BACKEND_URL}${url}${params && `?${params}`}`, {
    method,
    headers: {
      'x-publishable-api-key': process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY as string,
      ...headers
    },
    body: headers && headers['Content-Type'] === 'application/json' ? JSON.stringify(body) : body
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = { message: res.statusText || 'Unknown error' };
  }

  return {
    ok: res.ok,
    status: res.status,
    error: res.ok ? null : { message: data?.message },
    data: res.ok ? data : null
  };
}
