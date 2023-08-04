export enum Method {
  Get = 'Get',
  Post = 'Post',
  Put = 'Put',
  Patch = 'Patch',
  Delete = 'Delete'
}

type Options = {
  method: Method;
  data?: any;
  headers?:any;
};

export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  static isObject(value: unknown) {
    return Object.prototype.toString.call(value) === "[object Object]";
  }

  static queryStringify(data: any): string {
    if (!this.isObject(data)) {
      throw new Error("Data must be an object");
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
      const value = data[key];
      const end = index < keys.length - 1 ? "&" : "";
      return `${result}${key}=${value}${end}`;
    }, "?");
  }

  public get<Response>(path = '/', data?: unknown): Promise<Response> {
    return this.request<Response>(
      !!data 
      ? `${this.endpoint + path}${HTTPTransport.queryStringify(data)}`
      : this.endpoint + path);
  }

  public post<Response = void>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Post,
      data,
    });
  }

  public put<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      data,
      method: Method.Put, 
    });
  }

  public patch<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Patch,
      data,
    });
  }

  public delete<Response>(path: string, data: any): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Delete,
      data
    });
  }

  private request<Response>(url: string, options: Options = {method: Method.Get}): Promise<Response> {
    const {method, data} = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onreadystatechange = () => {

        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({reason: 'abort'});
      xhr.onerror = () => reject({reason: 'network error'});
      xhr.ontimeout = () => reject({reason: 'timeout'});

      if( (data instanceof FormData) === false) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      } 

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === Method.Get || !data) {
        xhr.send();
      } else {  
        xhr.send( (data instanceof FormData) === false ? JSON.stringify(data) : data);
      }
    });
  }
}
