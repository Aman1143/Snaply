import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();

const sendEmail=async(options)=>{
   const transporter=nodemailer.createTransport({
	host:"smtp.gmail.com",
	port:465,
	service:process.env.SMPT_SERVICE,
	auth:{
		user:process.env.SMPT_MAIL,
		pass:process.env.SMPT_PASSWORD,
	}
   })
   const mailOptions={
	from:process.env.SMPT_MAIL,
	to:options.email,
	subject:options.subject,
	text:options.message,
	
}

await transporter.sendMail(mailOptions);

}

export default sendEmail;