// module imports
import { sign } from "../utils/token.util.js";

// named exports
export const generateToken = async (payload, expiresIn, secret) => {
    let token = await sign(payload, expiresIn, secret);
    return token;
}