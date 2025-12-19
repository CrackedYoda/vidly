import jwt from "jsonwebtoken";
import config from "config";


const userAuth = (req, res, next) => {
    const token = req.cookies.usertoken;
    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }

    const decoded = jwt.verify(token, config.get("JWT_SECRET"));
    console.log(decoded);
    req.user = {id: decoded.id}
    next();
    // const authHeader = req.headers.authorization;
    // if(!authHeader){
    //     return  res.status(401).send("Access denied. No token provided.");
    // }
    // const token = authHeader.split(' ')[1];
    

}

export default userAuth;