import axios from "axios";

export const fetchMessage = async (params) => {
  const res = await axios.get("api/hello", { params });
  return res.data;
};
