import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import  UserModel  from "../../../Models/User";
import connectDB from "../../../Middleware/mongoose";
const cors = require('cors');

const corsOptions = {
  origin: 'https://nextapp-o1zrqv7k2-kvksatish.vercel.app',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
let { email, password } = req.body;
let user = await UserModel.findOne({ email });
let hash = user?.password;

bcrypt.compare(password, hash, function (err:any, result:any) {
if (result) {
let token = jwt.sign({ email }, 'secret');
console.log(token);
res.send({ "msg": "Login success", "token": token });
} else {
res.send("Login Failed");
}
});
};

export default cors(corsOptions)(connectDB(handler));