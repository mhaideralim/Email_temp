import * as fs from 'fs';
import * as path from 'path';
// @ts-ignore
import nodemailer from 'nodemailer';
import { Request, Response } from 'express';

interface EmailParams {
    to: string;
    subject: string;
}

export const sendTempEmail = async ({ to, subject }: EmailParams) => {
    try {
        console.log(`User-Email => ${to}`);

        const EMAIL_FROM = process.env.EMAIL || 'm.haideralimughal.m@gmail.com';
        const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com';
        const APP_NAME = process.env.APP_NAME || 'Finders Seat';
        const EMAIL_PORT = 587; //2525;

        const SENDER_USERNAME = process.env.EMAIL_USERNAME || 'm.haideralimughal.m@gmail.com';
        const SENDER_PASSWORD = process.env.EMAIL_PASSWORD || 'fkahummsbzeohqgp';

        // Read the email template file
        const templatePath = path.join(__dirname, 'Confirmation email.html');
        const emailTemplate = await fs.promises.readFile(templatePath, 'utf-8');

        // Create transporter
        const transporter = nodemailer.createTransport({
            port: EMAIL_PORT,
            service: 'gmail',
            secure: false,
            auth: {
                user: SENDER_USERNAME,
                pass: SENDER_PASSWORD,
            },
        });

        const msg = {
            from: `"${APP_NAME}" <${EMAIL_FROM}>`,
            to: to,
            subject: subject,
            html: emailTemplate, // Use the email template as HTML content
        };

        return await transporter.sendMail(msg);
    } catch (err) {
        console.log('Error occurred while sending email =>', err);
        throw err;
    }
};
