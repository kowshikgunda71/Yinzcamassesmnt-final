import axios from "axios";

export default {
  postMessage() {
    return {
      fetchAll: () => axios.get("/api/message/"),
      create: (newRecord) => axios.post("/api/message/postmessage", newRecord),
    };
  },
};
