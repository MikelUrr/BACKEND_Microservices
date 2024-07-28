import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';



@Injectable()
export class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

}

    async sendEmail(email: string, subject: string, text: string) {
        try {
            await this.transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject,
                text,
            });
        } catch (error) {
            console.error(error);
        }
    }
}