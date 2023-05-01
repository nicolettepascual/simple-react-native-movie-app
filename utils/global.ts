import { endpoints } from "./endpoints";

export function getAvatarPath(path: string | undefined) {
  if (!path) return "undefined";
  if (path.substring(0, 9) !== "/https://") return `${endpoints.images}${path}`;
  else return path.substring(1);
}
