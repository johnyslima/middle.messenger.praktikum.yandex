import { IFile } from "../typings";

export function contentType(file: IFile | null | undefined) {
  if(!file) {
      return null;
  }

  return file?.content_type.split('/', 3)[0]
}
