import axios from "axios";
import { config } from "../config/config";
import boom from "@hapi/boom";

export const getHelloAuth = async () => {
  const response = await axios({
    method: "GET",
    url: `${config.URL_AUTH_MSV}/hello`,
  });

  return response.data;
};

export const signupCognito = async (data: any, token: string) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${config.URL_AUTH_MSV}/signup`,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw boom.badRequest("Error in signupCognito " + error);
  }
};

export const getUserCognito = async (token: string) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${config.URL_AUTH_MSV}/profile-cognito`,
      headers: {
        Authorization: `${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response.statusText === "Unauthorized") {
      throw boom.unauthorized("Token expired, user unauthorized");
    }
    throw new Error("Unauthorized cognito");
  }
};
