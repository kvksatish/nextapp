import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
const jwt = require('jsonwebtoken');

const cors = require('cors');

const corsOptions = {
  origin: 'https://nextapp-o1zrqv7k2-kvksatish.vercel.app',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
const token = req.headers?.authorization?.split(" ")[1];
jwt.verify(token, 'secret', function (err:any, decoded:any) {
if (err) {
res.send("Please login");
} else {
res.send(decoded);
}
});
};

export default cors(corsOptions)(handler);;





