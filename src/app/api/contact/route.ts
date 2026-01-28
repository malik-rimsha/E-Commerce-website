import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json();

        // Nodemailer transporter setup
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "rdorganichairoil@gmail.com",
                pass: "qlfg ikhh bnay reuq", // Aapka 16-char app password
            },
        });

        // Email sending logic
        await transporter.sendMail({
            // Yahan name variable use kiya hai taake inbox mein customer ka naam show ho
            from: `"${name}" <rdorganichairoil@gmail.com>`, 
            to: "rdorganichairoil@gmail.com", 
            replyTo: email, // Is se aap direct customer ko reply kar sakengi
            subject: `📩 New Message: ${subject}`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                    <div style="background-color: #272343; padding: 25px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 1px;">RD Organic Hair Oil</h1>
                    </div>
                    <div style="padding: 30px; color: #333; line-height: 1.6;">
                        <h2 style="color: #272343; font-size: 20px; border-bottom: 2px solid #f4f4f4; padding-bottom: 10px;">New Website Inquiry</h2>
                        <p style="margin: 15px 0;"><strong>Customer Name:</strong> ${name}</p>
                        <p style="margin: 15px 0;"><strong>Customer Email:</strong> ${email}</p>
                        <p style="margin: 15px 0;"><strong>Subject:</strong> ${subject}</p>
                        <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #272343; border-radius: 4px; margin-top: 20px; font-style: italic;">
                            "${message}"
                        </div>
                        <div style="margin-top: 35px; text-align: center;">
                            <a href="mailto:${email}" style="background-color: #272343; color: white; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reply to ${name}</a>
                        </div>
                    </div>
                    <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #888;">
                        This automated message was sent from your website's contact form.
                    </div>
                </div>
            `,
        });

        return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (error) {
        console.error("Nodemailer Error:", error);
        return NextResponse.json({ message: "Failed" }, { status: 500 });
    }
}