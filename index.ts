// @ts-ignore
import express, { Request, Response, NextFunction } from "express";
import config from "./src/config";
import userRouter from "./src/route";
const port = config.port as number;
const host = config.host as string;


const app = express();


app.use("/api", userRouter);

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
    res.json({
        Welcome: "Welcome to Email temp ",
    });
});

app.listen(port, host, () => {
    console.log(`Server listening at http://${host}:${port}`);
});
