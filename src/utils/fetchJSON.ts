import axios from "axios";
class APIError extends Error {
  error: { code: number; message: string; data: any };
  constructor(code: number, message: string, data: any) {
    super(message);
    this.error = { code: code, message: message, data: data };
  }
}
interface IProps {
  method: string;
  data?: any;
  headers?: any;
}
export async function fetchJSON(
  url: string,
  { method, data, headers }: IProps
) {
  return axios(url, { method: method, data: data, headers: headers })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      if (e.response.status >= 500) {
        throw new APIError(
          e.response.status,
          `Internal error: ${e.response.status}`,
          null
        );
      }
      if (!e.response.data?.error) {
        throw new APIError(e.response.status, e.message, e.response.data);
      }
      throw new APIError(
        e.response.status,
        e.response.data.error.message,
        e.response.data.error.data
      );
    });
}
