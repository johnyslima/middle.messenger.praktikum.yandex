import HTTPTransport from '../utils/HTTPTransport';

export default abstract class BaseApi {
  protected http: HTTPTransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }

  public create?(data: unknown): Promise<unknown>;
  public read?(identifier?: string): Promise<unknown>;
  public update?(data: unknown): Promise<unknown>;
  public delete?(identifier: unknown): Promise<unknown>;
}
