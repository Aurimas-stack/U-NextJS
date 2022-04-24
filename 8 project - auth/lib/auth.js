import {hash, compare} from "bcryptjs";

export const hashPassword = async (password) => {
   const hashedPassowrd = await hash(password, 12);
   return hashedPassowrd;
}

export const verifyPassword = async (password, hashedPassword) => {
   const isValid = await compare(password, hashedPassword);
   return isValid;
}