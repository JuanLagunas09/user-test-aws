import boom from "@hapi/boom";
import * as authConnection from "./RemoteConnection";
import { AppDataSource as dbC } from "../config/db";
import { User } from "../entity/User";
import { IProfile, ISignUp, IStoreUser } from "../interfaces/IUser";

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
      console.log(signupCognito);
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
        console.log(userStore);
        const user = this.dbConnection.save(userStore);
        console.log(user);
        return user;
      }

      throw boom.badRequest("Error in register user");
    } catch (error: any) {
      console.log(error);
      throw boom.badRequest("Error in signupCognito");
    }
  }

  async show(token: string) {
    try {
      const userCognito = await authConnection.getUserCognito(token);

      if (userCognito && userCognito.UserAttributes) {
        const idUser = userCognito.UserAttributes.find(
          (attr: any) => attr.Name === "sub"
        )?.Value;

        const userSql = await this.dbConnection.findOneBy({
          id_cognito: idUser.toString(),
        });

        if (!userSql) {
          throw boom.badRequest("User not found");
        }

        const userResult: IProfile = {
          name: userSql.name,
          lastname: userSql.lastname,
          username: userCognito.Username,
          email: userCognito.UserAttributes.find((e: any) => e.Name === "email")
            ?.Value,
          phone: userSql.phone,
          adress: userSql.adress,
        };

        return userResult;
      } else {
        throw boom.badRequest("Error in show user");
      }
    } catch (error) {
      console.log(error);
      throw boom.badRequest("Error in show user");
    }
  }
}
