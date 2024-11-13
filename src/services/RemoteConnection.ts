import axios from "axios";
import { config } from "../config/config";

export const getHelloAuth = async () => {
  const response = await axios({
    method: "GET",
    url: `${config.URL_AUTH_MSV}/hello`,
  });

  return response.data;
};

export const signupCognito = async (data: any, token: string) => {
  const response = await axios({
    method: "POST",
    url: `${config.URL_AUTH_MSV}/signup`,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
