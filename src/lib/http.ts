import Cookies from 'js-cookie';
import fp from '@fingerprintjs/fingerprintjs';
import { TOKEN_COOKIE_NAME, removeAuthToken } from './jwt';

type HttpOptionsType = RequestInit | { headers: Record<string, any> };

type AppResponse = Record<string, any>;

export type FetchError = {
  status: number;
  message: string;
};

export type AppError = {
  status: number;
  message: string;
  errors?: { message: string; location: string }[];
};

type ApiReturn<ResponseType, ErrorType> = {
  response?: ResponseType;
  error?: ErrorType | FetchError;
};

/**
 * Wrapper around fetch to make it easy to handle errors
 *
 * @param url
 * @param options
 */
export async function httpCall<
  ResponseType = AppResponse,
  ErrorType = AppError,
>(
  url: string,
  options?: HttpOptionsType,
): Promise<ApiReturn<ResponseType, ErrorType>> {
  try {
    const fingerprintPromise = await fp.load({ monitoring: false });
    const fingerprint = await fingerprintPromise.get();

    const response = await fetch(url, {
      credentials: 'include',
      ...options,
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${Cookies.get(TOKEN_COOKIE_NAME)}`,
        fp: fingerprint.visitorId,
        ...(options?.headers ?? {}),
      }),
    });

    // @ts-ignore
    const doesAcceptHtml = options?.headers?.['Accept'] === 'text/html';

    const data = doesAcceptHtml ? await response.text() : await response.json();

    if (response.ok) {
      return {
        response: data as ResponseType,
        error: undefined,
      };
    }

    // Logout user if token is invalid
    if (data.status === 401) {
      removeAuthToken();
      window.location.reload();
      return { response: undefined, error: data as ErrorType };
    }

    if (data.status === 403) {
      // window.location.href = '/account'; // @fixme redirect option should be configurable
      return { response: undefined, error: data as ErrorType };
    }

    return {
      response: undefined,
      error: data as ErrorType,
    };
  } catch (error: any) {
    return {
      response: undefined,
      error: {
        status: 0,
        message: error.message,
      },
    };
  }
}

export async function httpPost<
  ResponseType = AppResponse,
  ErrorType = AppError,
>(
  url: string,
  body: Record<string, any>,
  options?: HttpOptionsType,
): Promise<ApiReturn<ResponseType, ErrorType>> {
  return httpCall<ResponseType, ErrorType>(url, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function httpGet<ResponseType = AppResponse, ErrorType = AppError>(
  url: string,
  queryParams?: Record<string, any>,
  options?: HttpOptionsType,
): Promise<ApiReturn<ResponseType, ErrorType>> {
  const searchParams = new URLSearchParams(queryParams).toString();
  const queryUrl = searchParams ? `${url}?${searchParams}` : url;

  return httpCall<ResponseType, ErrorType>(queryUrl, {
    credentials: 'include',
    method: 'GET',
    ...options,
  });
}

export async function httpPatch<
  ResponseType = AppResponse,
  ErrorType = AppError,
>(
  url: string,
  body: Record<string, any>,
  options?: HttpOptionsType,
): Promise<ApiReturn<ResponseType, ErrorType>> {
  return httpCall<ResponseType, ErrorType>(url, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

export async function httpPut<ResponseType = AppResponse, ErrorType = AppError>(
  url: string,
  body: Record<string, any>,
  options?: HttpOptionsType,
): Promise<ApiReturn<ResponseType, ErrorType>> {
  return httpCall<ResponseType, ErrorType>(url, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export async function httpDelete<
  ResponseType = AppResponse,
  ErrorType = AppError,
>(
  url: string,
  options?: HttpOptionsType,
): Promise<ApiReturn<ResponseType, ErrorType>> {
  return httpCall<ResponseType, ErrorType>(url, {
    ...options,
    method: 'DELETE',
  });
}
