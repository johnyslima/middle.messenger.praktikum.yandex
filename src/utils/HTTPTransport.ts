import { Url } from "../typings/url";

const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

interface Options {
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
  responseType?: ResponseType;
  method?: string;
}

type HTTPMethod = (url: string, data?: Options) => Promise<unknown>;

export default class HTTPTransport {
  static BASE_URL = Url.BASE;
  protected _baseUrl: string;

  constructor(url: string) {
    this._baseUrl = `${HTTPTransport.BASE_URL}${url}`;
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

  public get: HTTPMethod = (url, options = {}) => {
    return this.request(
      !!options.data
        ? `${this._baseUrl + url}${HTTPTransport.queryStringify(options.data)}`
        : this._baseUrl + url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };

  public post: HTTPMethod = (url, options = {}) => {
    console.log(this._baseUrl, url, options);
    return this.request(
      this._baseUrl + url,
      {
        method: METHODS.POST,
        data: options,
      },
      options.timeout
    );
  };

  public put: HTTPMethod = (url, options = {}) => {
    console.log(this._baseUrl, url, options);
    return this.request(
      this._baseUrl + url,
      {
        method: METHODS.PUT,
        data: options,
      },
      options.timeout
    );
    // return this.request(
    //   url,
    //   { ...options, method: METHODS.PUT },
    //   options.timeout
    // );
  };

  public delete: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  // private request = (url: string, options: Options = {}, timeout = 5000) => {
  //   const { headers = {}, method, data } = options;
  //   console.log(options);
  //   return new Promise((resolve, reject) => {
  //     if (!method) {
  //       reject("No method");
  //       return;
  //     }

  //     const xhr = new XMLHttpRequest();
  //     const isGet = method === METHODS.GET;

  //     xhr.open(method, url);
  //     console.log(xhr, url);

  //     Object.keys(headers).forEach((key) => {
  //       xhr.setRequestHeader(key, headers[key]);
  //     });

  //     xhr.onload = function () {
  //       resolve(xhr);
  //     };

  //     xhr.onabort = reject;
  //     xhr.onerror = reject;

  //     xhr.timeout = timeout;
  //     xhr.ontimeout = reject;
  //     xhr.withCredentials = true;
  //     xhr.responseType = "json";

  //     // const qwe = {login:"Berdyeman84", password: "Asdqwsaaze22"}

  //     if (data instanceof FormData === false) {
  //       xhr.setRequestHeader("Content-Type", "application/json");
  //     }

  //     if (isGet || !data) {
  //       xhr.send();
  //     } else {
  //       xhr.send(
  //         data instanceof FormData === false ? JSON.stringify(data) : data
  //       );
  //     }
  //   });
  // };
  private request<Response>(url: string, options: Options = {method: METHODS.GET}, timeout = 5000): Promise<Response> {
    const {method, data, headers} = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onreadystatechange = (e) => {

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

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send( (data instanceof FormData) === false ? JSON.stringify(data) : data);
      }
    });
  }
}
