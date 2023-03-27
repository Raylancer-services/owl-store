const IsAdmin = (req, res, next) => {
    if (req.user.role === 'ROLE_ADMIN') {
      // console.log("Is seller is seller middleware", req.user.role);
      next();
    }
  //   return res.status(401).send("Unauthorized! Login with a seller account to create a product.");

};
module.exports = IsAdmin;
