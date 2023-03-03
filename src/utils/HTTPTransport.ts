const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

interface Options {
  data?: any
  headers?: Record<string, string>
  timeout?: number
  responseType?: ResponseType
  method?: string
}

export class HTTPTransport {
  private readonly _baseUrl: string;

  constructor(url: string) {
    this._baseUrl = url;
  }

  static isObject(value: any) {
    return Object.prototype.toString.call(value) === '[object Object]';
  }

  static queryStringify(data: any): string {
    if (!this.isObject(data)) {
        throw new Error('Data must be an object')
    }

    const keys = Object.keys(data)
    return keys.reduce((result, key, index) => {
        const value = data[key]
        const end = index < keys.length - 1 ? '&' : ''
        return `${ result }${ key }=${ value }${ end }`;
    }, '?')
}
  

  get = (url: string, options: Options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };

  post = (url: string, options: Options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };

  put = (url: string, options: Options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };

  delete = (url: string, options: Options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  request = (url: string, options: Options = {}, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise( (resolve, reject) => {
      if (!method) {
        reject("No method");
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${HTTPTransport.queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
