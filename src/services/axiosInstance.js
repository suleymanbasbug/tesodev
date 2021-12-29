import axios from "axios";

export default axios.create({
  baseURL: "https://api.jsonbin.io/v3/b/61cb73c6ea3bf56821393ed4/latest",
  headers: {
    "X-Master-Key":
      "$2b$10$FA6Z.yunw/blrj8yaa.BmuvNpqwpZ8GkX58TrXN6p36BcPw4tsq0y",
  },
});
