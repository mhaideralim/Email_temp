import { sendTempEmail } from "./email_temp";
import { Router, Request, Response } from "express";

const userRouter: Router = Router();

export const check = async (req: Request, res: Response) => {
    try {
        const subject = "Warning";
        await sendTempEmail({
            to: "ali.pydeveloper7@gmail.com",
            subject: subject,
        });
        return res.status(200).json({
            code: 1,
            message: "Email sent successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 0,
            message: "Something went wrong",
        });
    }
};
userRouter.route("/check").get(check);
export default userRouter;
