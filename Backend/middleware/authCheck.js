import cookieParser from "cookie-parser"
export const authCheck = (req, res, next) => {
  try {
    if(!req.cookie.accessToken){
        return res.status(404).send("No access-token")
    }
    res.status(200).send("access-Token is available")
    next()
  } 
  catch (err) {}
};
