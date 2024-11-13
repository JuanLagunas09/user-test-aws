import jwt from "jsonwebtoken";

const createTokenConnect = async (KEY_CONNECT: string, JWT_SECRET_CONNECT: string) => {
  const token = jwt.sign(
    {
      token_connect: KEY_CONNECT,
    },
    JWT_SECRET_CONNECT
  );
  return token;
};

export default createTokenConnect;
