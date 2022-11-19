import * as express from 'express'
const app = express();
app.use('/', (req: express.Request, res: express.Response) => res.send("dsfdHello world!"));
app.use('/login', (req: express.Request, res: express.Response) => res.send("DLSLKD!"));
app.listen(3000, () => console.log("Listening"));

