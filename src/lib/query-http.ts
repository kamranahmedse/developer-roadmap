import Cookies from 'js-cookie';
import fp from '@fingerprintjs/fingerprintjs';
import { TOKEN_COOKIE_NAME, removeAuthToken } from './jwt.ts';

type HttpOptionsType = RequestInit;

type AppResponse = Record<string, any>;

export class FetchError extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }

  static isFetchError(error: any): error is FetchError {
    return error instanceof FetchError;
  }
}

type AppError = {
  status: number;
  message: string;
  errors?: { message: string; location: string }[];
};

type ApiReturn<ResponseType> = ResponseType;

/**
 * Wrapper around fetch to make it easy to handle errors
 *
 * @param url
 * @param options
 */
export async function httpCall<ResponseType = AppResponse>(
  url: string,
  options?: HttpOptionsType,
): Promise<ApiReturn<ResponseType>> {
  const fullUrl = url.startsWith('http')
    ? url
    : `${import.meta.env.PUBLIC_API_URL}${url}`;
  try {
    const fingerprintPromise = await fp.load();
    const fingerprint = await fingerprintPromise.get();

    const isMultiPartFormData = options?.body instanceof FormData;

    const headers = new Headers({
      Accept: 'application/json',
      Authorization: `Bearer ${Cookies.get(TOKEN_COOKIE_NAME)}`,
      fp: fingerprint.visitorId,
      ...(options?.headers ?? {}),
    });

    if (!isMultiPartFormData) {
      headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(fullUrl, {
      credentials: 'include',
      ...options,
      headers,
    });

    // @ts-ignore
    const doesAcceptHtml = options?.headers?.['Accept'] === 'text/html';

    const data = doesAcceptHtml ? await response.text() : await response.json();

    // Logout user if token is invalid
    if (data?.status === 401) {
      removeAuthToken();
      window.location.href = '/login';
      return null as unknown as ApiReturn<ResponseType>;
    }

    if (!response.ok) {
      if (data.errors) {
        throw new FetchError(response?.status, data.message);
      } else {
        throw new Error('An unexpected error occurred');
      }
    }

    return data as ResponseType;
  } catch (error: any) {
    throw error;
  }
}

export async function httpPost<ResponseType = AppResponse>(
  url: string,
  body: Record<string, any>,
  options?: HttpOptionsType,
): Promise<ApiReturn<ResponseType>> {
  return httpCall<ResponseType>(url, {
    ...options,
    method: 'POST',
    body: body instanceof FormData ? body : JSON.stringify(body),
  });
}

export async function httpGet<ResponseType = AppResponse>(
  url: string,
  queryParams?: Record<string, any>,
  options?: HttpOptionsType,
): Promise<ApiReturn<ResponseType>> {
  const searchParams = new URLSearchParams(queryParams).toString();
  const queryUrl = searchParams ? `${url}?${searchParams}` : url;

  return httpCall<ResponseType>(queryUrl, {
    credentials: 'include',
    method: 'GET',
    ...options,
  });
}

export async function httpPatch<ResponseType = AppResponse>(
  url: string,
  body: Record<string, any>,
  options?: HttpOptionsType,
): Promise<ApiReturn<ResponseType>> {
  return httpCall<ResponseType>(url, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

export async function httpPut<ResponseType = AppResponse>(
  url: string,
  body: Record<string, any>,
  options?: HttpOptionsType,
): Promise<ApiReturn<ResponseType>> {
  return httpCall<ResponseType>(url, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export async function httpDelete<ResponseType = AppResponse>(
  url: string,
  options?: HttpOptionsType,
): Promise<ApiReturn<ResponseType>> {
  return httpCall<ResponseType>(url, {
    ...options,
    method: 'DELETE',
  });
}
