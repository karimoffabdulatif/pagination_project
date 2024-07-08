import http from "./config";

const client = {
  get: (params) => http.get("/client/all", { params }),
};
export default client;
