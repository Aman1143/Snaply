import jwt from 'jsonwebtoken';

export const isAuthendicated=async(req,res,next)=>{
	const secret = process.env.JWT_KEY;
    try {
		const token = req.headers.authorization.split(' ')[1];
		if (token) {
		  const decoded = jwt.verify(token, secret);
		  req.body._id = decoded?.id;
		}
		next();
	  } catch (error) {
		console.log(error);
	  }
}