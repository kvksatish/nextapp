import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
const bcrypt = require('bcrypt');
import  UserModel  from "../../../Models/User";
import connectDB from "../../../Middleware/mongoose";
import cors from '../../../Middleware/cors'


const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    cors(req,res)
    //console.log(req.body)
    let { email, password, name } = req.body

    console.log(email,password,name)

    // Check if the email is valid
    if (!validateEmail(email)) {
        console.log("invalidemail")
        res.status(400).json({ message: 'Invalid email' });
        return;
    }

    // Check if the password meets the requirements
    if (!validatePassword(password)) {
        console.log("invalid pass")
        res.status(400).json({ message: 'Invalid password' });
        return;
    }

    bcrypt.hash(password, 6).then(async function (hash:any) {
        console.log(hash)
        const user = new UserModel({ email, password: hash, name })
        await user.save()

        res.send("Signup Successfull")
    }).catch((err:any) => {
        if (err) {
            console.log(err)
            res.json({ message: 'Something went wrong, please try again later' });
        }
    })
};

// Validate email
const validateEmail = (email: string): boolean => {
    const re = /\S+@\S+\.\S+/;
    console.log(re.test(email))
    return re.test(email);
}

// Validate password
const validatePassword = (password: string): boolean => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    console.log(re.test(password))
    return re.test(password);
}

export default cors(corsOptions)(connectDB(handler));
