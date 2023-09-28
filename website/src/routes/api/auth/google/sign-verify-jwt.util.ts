import { server$ } from "@builder.io/qwik-city";
import jwt from "jsonwebtoken"

export interface JWTPayload {
  access_token: string;
  refresh_token: string;
  email: string;
  name: string;
  image: string;
}

export const signJWT = server$(async function (data: JWTPayload) {
  
  const authCookie = jwt.sign(data, process.env.AUTH_SECRET!)
  
  return authCookie

})

export const verifyJWT = server$(async function (authToken: string) {
  
  try {
    const decodedPayLoad = jwt.verify(authToken, process.env.AUTH_SECRET!) as JWTPayload
    return decodedPayLoad

  } catch (error) {
    return 'token-malformed'
  }

})