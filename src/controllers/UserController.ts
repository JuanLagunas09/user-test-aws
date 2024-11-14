import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import createTokenConnect from "../utils/TokenConnect";
import { config } from "../config/config";

const userService = new UserService();

export const getHelloAuth = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getHelloAuth = await userService.getHelloAuth();
    res.status(200).json(getHelloAuth);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await createTokenConnect(
      config.KEY_CONNECT!,
      config.JWT_SECRET_CONNECT!
    );
    console.log("regiter...");
    const resAuth = await userService.store(req.body, token);
    console.log(resAuth);
    res.json(resAuth);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: any = req.headers.authorization;

    if (!token) {
      throw new Error("Token or user not found");
    }

    const data = await userService.show(token);

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
