const basePath = "/api";

const api = {
  get: (endpoint: string) => fetch(`${basePath}/${endpoint}`),
  post: (endpoint: string, body: any) =>
    fetch(`${basePath}/${endpoint}`, {
      method: "POST",
      body: body && JSON.stringify(body),
    }),
  put: (endpoint: string, body: any) =>
    fetch(`${basePath}/${endpoint}`, {
      method: "PUT",
      body: body && JSON.stringify(body),
    }),
  delete: (endpoint: string) =>
    fetch(`${basePath}/${endpoint}`, {
      method: "DELETE",
    }),
};

export { api };
