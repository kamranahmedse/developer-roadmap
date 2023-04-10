import Cookies from 'js-cookie';
import { TOKEN_COOKIE_NAME } from './constants';

type AppResponse = Record<string, any>;

type ApiReturn<ResponseType> = {
  response?: ResponseType;
  error?: {
    status: number;
    message: string;
    errors?: { message: string; location: string }[];
  };
};

/**
 * Wrapper around fetch to make it easy to handle errors
 *
 * @param url
 * @param options
 */
export async function callApi<ResponseType = AppResponse>(
  url: string,
  options?: RequestInit
): Promise<ApiReturn<ResponseType>> {
  try {
    const response = await fetch(url, {
      credentials: 'include',
      ...options,
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${Cookies.get(TOKEN_COOKIE_NAME)}`,
        ...(options?.headers ?? {}),
      }),
    });

    const data = await response.json();
    if (response.ok) {
      return {
        response: data as ResponseType,
        error: undefined,
      };
    }

    return {
      response: undefined,
      error: {
        status: response.status,
        message: data.message || 'Something went wrong. Please try again later.',
        errors: data.errors,
      },
    };
  } catch (error: any) {
    return {
      response: undefined,
      error: {
        status: 0,
        message: error.message,
        errors: [],
      },
    };
  }
}

export async function callPostApi<ResponseType = AppResponse>(
  url: string,
  body: Record<string, any>,
  options?: RequestInit
): Promise<ApiReturn<ResponseType>> {
  return callApi<ResponseType>(url, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function callGetApi<ResponseType = AppResponse>(
  url: string,
  queryParams?: Record<string, any>,
  options?: RequestInit
): Promise<ApiReturn<ResponseType>> {
  const searchParams = new URLSearchParams(queryParams).toString();
  const queryUrl = searchParams ? `${url}?${searchParams}` : url;

  return callApi<ResponseType>(queryUrl, {
    credentials: 'include',
    method: 'GET',
    ...options,
  });
}

export async function callPatchApi<ResponseType = AppResponse>(
  url: string,
  body: Record<string, any>,
  options?: RequestInit
): Promise<ApiReturn<ResponseType>> {
  return callApi<ResponseType>(url, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

export async function callPutApi<ResponseType = AppResponse>(
  url: string,
  body: Record<string, any>,
  options?: RequestInit
): Promise<ApiReturn<ResponseType>> {
  return callApi<ResponseType>(url, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export async function callDeleteApi<ResponseType = AppResponse>(
  url: string,
  options?: RequestInit
): Promise<ApiReturn<ResponseType>> {
  return callApi<ResponseType>(url, {
    ...options,
    method: 'DELETE',
  });
}
