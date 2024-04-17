import Cookies from 'js-cookie';
import { TOKEN_COOKIE_NAME } from '../lib/jwt.ts';
import type { APIContext } from 'astro';

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

export type ApiReturn<ResponseType, ErrorType> = {
  response?: ResponseType;
  error?: ErrorType | FetchError;
};

export function api(context: APIContext) {
  const token = context.cookies.get(TOKEN_COOKIE_NAME)?.value;

  async function apiCall<ResponseType = AppResponse, ErrorType = AppError>(
    url: string,
    options?: HttpOptionsType,
  ): Promise<ApiReturn<ResponseType, ErrorType>> {
    try {
      const response = await fetch(url, {
        credentials: 'include',
        ...options,
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(options?.headers ?? {}),
        }),
      });

      // @ts-ignore
      const doesAcceptHtml = options?.headers?.['Accept'] === 'text/html';

      const data = doesAcceptHtml
        ? await response.text()
        : await response.json();

      if (response.ok) {
        return {
          response: data as ResponseType,
          error: undefined,
        };
      }

      // Logout user if token is invalid
      if (data.status === 401) {
        context.cookies.delete(TOKEN_COOKIE_NAME);
        context.redirect(context.request.url);

        return { response: undefined, error: data as ErrorType };
      }

      if (data.status === 403) {
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

  return {
    get: function apiGet<ResponseType = AppResponse, ErrorType = AppError>(
      url: string,
      queryParams?: Record<string, any>,
      options?: HttpOptionsType,
    ): Promise<ApiReturn<ResponseType, ErrorType>> {
      const searchParams = new URLSearchParams(queryParams).toString();
      const queryUrl = searchParams ? `${url}?${searchParams}` : url;

      return apiCall<ResponseType, ErrorType>(queryUrl, {
        ...options,
        method: 'GET',
      });
    },
    post: async function apiPost<
      ResponseType = AppResponse,
      ErrorType = AppError,
    >(
      url: string,
      body: Record<string, any>,
      options?: HttpOptionsType,
    ): Promise<ApiReturn<ResponseType, ErrorType>> {
      return apiCall<ResponseType, ErrorType>(url, {
        ...options,
        method: 'POST',
        body: JSON.stringify(body),
      });
    },
    patch: async function apiPatch<
      ResponseType = AppResponse,
      ErrorType = AppError,
    >(
      url: string,
      body: Record<string, any>,
      options?: HttpOptionsType,
    ): Promise<ApiReturn<ResponseType, ErrorType>> {
      return apiCall<ResponseType, ErrorType>(url, {
        ...options,
        method: 'PATCH',
        body: JSON.stringify(body),
      });
    },
    put: async function apiPut<
      ResponseType = AppResponse,
      ErrorType = AppError,
    >(
      url: string,
      body: Record<string, any>,
      options?: HttpOptionsType,
    ): Promise<ApiReturn<ResponseType, ErrorType>> {
      return apiCall<ResponseType, ErrorType>(url, {
        ...options,
        method: 'PUT',
        body: JSON.stringify(body),
      });
    },
    delete: async function apiDelete<
      ResponseType = AppResponse,
      ErrorType = AppError,
    >(
      url: string,
      options?: HttpOptionsType,
    ): Promise<ApiReturn<ResponseType, ErrorType>> {
      return apiCall<ResponseType, ErrorType>(url, {
        ...options,
        method: 'DELETE',
      });
    },
  };
}
