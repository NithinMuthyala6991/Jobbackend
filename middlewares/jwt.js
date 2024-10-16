import jwt from 'jsonwebtoken';


export const createToken = (payload) => {
    return jwt.sign( payload, process.env.SECRET_KEY);
}

export const verifyToken = (req, res , next) => {
    try {
       
        const token = req?.headers?.authorization.split(' ')[1];
       
        if(!token){
            throw new Error("Token is required")
            return;
        }
        jwt.verify(token,process.env.SECRET_KEY , function(err, payload){
            if(err){
                throw new Error("Invalid token");
                return ;
            }
            req.data = payload

            next()
        })
    } catch (error) {
        res.status(401).json({success:false,message : error?.message || 'Please enter valid token'})
    }
} 