import express, { Request, Response } from "express";
import { create, settle, showLog } from "./es";


const app = express();



app.get('/:method', (req: Request, res: Response) => {
   switch (req.params.method) {
      case "create": {
         create();
         res.sendStatus(201);
         break;
      }
      case "edit": {
         create();
         res.sendStatus(200);
         break;
      }
      case "settle": {
         settle();
         res.sendStatus(200);
         break;
      }
      case "showlog": {
         showLog();
         res.sendStatus(200);
         break;
      }
      default: {
         res.sendStatus(404);
         break;
      }
   }
});

app.use((req: Request, res: Response) => {
   res.status(404).send({ errors: ['not found'] });
});


/**
 * Starting app server.
 */
app.listen(3011, () => {
   console.log('Server started with port 3011');
})