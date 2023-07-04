import nodemailer from "nodemailer";

import { EMAIL_HOST, EMAIL, GOOGLE_GEN_PASSWORD, FROM_EMAIL } from "../../config";

const sendEmail = async (email: string, subject: string, text: string) => {
    try {
        const transporter = nodemailer.createTransport({
            host: EMAIL_HOST,
            port: 465,
            auth: {
                user: EMAIL,
                pass: GOOGLE_GEN_PASSWORD,
            },
        });

        transporter.sendMail({
            from: FROM_EMAIL,
            to: email,
            subject: subject,
            text: text
        });
    } catch (err) {
        return err;
    }
};

export default sendEmail;
