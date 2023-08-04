// named exports
export const register = async (req, res, next) => {
    try {
        const { name, email, picture, status, password } = req.body;
    } catch (error) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {

    } catch (error) {
        next(err);
    }
}

export const logout = async (req, res, next) => {
    try {

    } catch (error) {
        next(err);
    }
}

export const refreshToken = async (req, res, next) => {
    try {

    } catch (error) {
        next(err);
    }
}