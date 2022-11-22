import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000/",
});

// export const api = axios.create({
//   baseURL:
//     "https://my-json-server.typicode.com/Borek78/json-server-for-contact-manager/",
// });
