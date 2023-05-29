import jwt from "jsonwebtoken";
import type { UserRole } from "~/types/core";

const config = useRuntimeConfig();

export const createAccessToken = (
  groupId: number,
  role: UserRole,
  studentId?: number
) => {
  const token = jwt.sign({ groupId, role, studentId }, config.JWT_ACCESS_KEY, {
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
  try {
    const decoded = jwt.verify(token, config.JWT_ACCESS_KEY);
    return decoded;
  } catch (error) {
    throw error;
  }
};

export const verifyActivationToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, config.JWT_VERIFYACC_KEY);
    return decoded;
  } catch (error) {
    throw error;
  }
};
