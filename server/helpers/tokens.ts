import jwt from "jsonwebtoken";

const config = useRuntimeConfig();

export const createAccessToken = (userId: number) => {
  const token = jwt.sign({ id: userId }, config.JWT_ACCESS_KEY, {
    expiresIn: "3h",
  });

  return token;
};

export const createActivationToken = (userEmail: string) => {
  const token = jwt.sign({ email: userEmail }, config.JWT_VERIFYACC_KEY, {
    expiresIn: "30m",
  });

  return token;
};

export const verifyAccessToken = (token: string) => {


};

export const verifyActivationToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, config.JWT_VERIFYACC_KEY);
    return decoded;
  } catch (error) {
    throw error;
  }
};
