import { Request, Response, NextFunction } from 'express';
const AppError = require("../utils/AppError");

exports.authenticate = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) return next(new AppError("Please log in.", 401));

  // verification token
//   let payload;
//   try {
//     payload = await promisify(jwt.verify)(token, config.get("JWT_KEY"));
//   } catch (er) {
//     return next(new AppError("Invalid Token", 400));
//   }
//   // check if user still exists
//   const user = await User.findById(payload.id);
//   if (!user)
//     return next(
//       new AppError(
//         "The user belonging to this token does no longer exist.",
//         401
//       )
//     );

//   req.user = user;
  next();
};

// exports.authorize = (...roles: string[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new AppError("You do not have permission to perform this action.", 403)
//       );
//     }
//     next();
//   };
// };
