// module imports
import { sign } from "../utils/token.util";

// named exports
export const generateToken = async (payload, expiresIn, secret) => {
    let token = await signgn(payload, expiresIn, secret);
    return token;
}