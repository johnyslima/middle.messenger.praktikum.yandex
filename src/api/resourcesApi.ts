import BaseApi from "./common";

export interface IResource {
  content_size: number;
  content_type: string;
  filename: string;
  id: number;
  path: string;
  upload_date: string;
  user_id: number;
}

export default class ResourcesApi extends BaseApi {
  constructor() {
    super("/resources");
  }

  sendFile(data: FormData) {
    return this.http.post("/", data);
  }

  create = undefined;
  read = undefined;
  update = undefined;
  delete = undefined;
}
