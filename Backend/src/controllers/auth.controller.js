// named exports
export const register = async (req, res, next) => {
    try {
        res.send({
            'name': req.body.name
        })
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

    }catch(error){
        next(err);
    }
}