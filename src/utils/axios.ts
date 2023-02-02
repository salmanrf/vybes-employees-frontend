import axios from "axios";
import { toast } from "react-hot-toast";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error["response"] && error["response"]["data"]) {
      const data = error["response"]["data"];

      if (data["statusCode"] === 401) {
        toast.error("Sesi telah habis.");

        localStorage.removeItem("access_token");
        window.location = "/login" as any;

        throw error;
      }

      toast.error(data["message"]);
    }

    throw error;
  }
);

export default axiosInstance;
