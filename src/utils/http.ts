import axios, { AxiosError, AxiosInstance, HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { AuthResponse } from "../types/auth.type";
import {
  clearLS,
  getAccessTokenFromLS,
  saveAccessTokenToLS,
  saveProfileToLS,
} from "./auth";

class Http {
  instance: AxiosInstance;
  private accessToken: string;
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.instance = axios.create({
      baseURL: "https://api-ecom.duthanhduoc.com/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;

        if (url === "login" || url === "register") {
          const data = response.data as AuthResponse;
          this.accessToken = data.data.access_token;

          saveAccessTokenToLS(this.accessToken);
          saveProfileToLS(data.data.user);
        } else if (url === "logout") {
          this.accessToken = "";
          clearLS();
        }
        return response;
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data;
          const message = data.message || error.message;
          toast.error(message);
        }
        return Promise.reject(error);
      }
    );
  }
}
const http = new Http().instance;

export default http;
