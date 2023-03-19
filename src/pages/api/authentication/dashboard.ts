import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
const jwt = require('jsonwebtoken');
import cors from '../../../Middleware/cors'


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

export default handler;





