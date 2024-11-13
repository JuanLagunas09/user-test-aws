import boom from "@hapi/boom";
import * as authConnection from "./RemoteConnection";
import { AppDataSource as dbC } from "../config/db";
import { User } from "../entity/User";
import { ISignUp, IStoreUser } from "../interfaces/IUser";

export class UserService {
  private dbConnection: any;

  constructor() {
    this.dbConnection = dbC.getRepository(User);
  }

  async getHelloAuth() {
    try {
      const resultAuth = await authConnection.getHelloAuth();
      return resultAuth;
    } catch (error) {
      console.log(error);
      throw boom.badRequest("Error in hello user service");
    }
  }

  async store(data: ISignUp, token: string) {
    try {
      const signupCognito = await authConnection.signupCognito(data, token);
      // get id cognito
      if (
        signupCognito &&
        signupCognito.$metadata.httpStatusCode == 200 &&
        signupCognito.UserSub
      ) {
        const userStore: IStoreUser = {
          name: data.name,
          lastname: data.lastname,
          adress: data.adress,
          phone: data.phone,
          role: "user",
          id_cognito: signupCognito.UserSub,
        };
        const user = this.dbConnection.save(userStore);
        return user;
      }

      throw boom.badRequest("Error in register user");
    } catch (error: any) {
      console.log(error);
      throw boom.badRequest("Error in signupCognito");
    }
  }
}
