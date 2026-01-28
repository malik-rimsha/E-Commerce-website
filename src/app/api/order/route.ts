import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@sanity/client";

const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN, 
    apiVersion: '2023-05-03',
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        // Destructure payload matching the checkout page
        const { customerInfo, cartItems, totalPrice, paymentMethod, transactionId } = body;

        // 1. Sanity mein Order save karna
        await sanityClient.create({
            _type: 'order',
            customerName: customerInfo.name,
            phone: customerInfo.phone,
            address: customerInfo.address,
            city: customerInfo.city,
            totalPrice: totalPrice,
            paymentMethod: paymentMethod,
            transactionId: transactionId,
            status: 'Pending',
            cartItems: cartItems.map((item: any) => ({
                _type: 'object',
                _key: item._key || Math.random().toString(36).substring(7),
                productName: item.productName,
                quantity: item.quantity || 1,
                price: item.price
            })),
            orderDate: new Date().toISOString()
        });

        // 2. Email Notification setup
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "rdorganichairoil@gmail.com",
                pass: "qlfg ikhh bnay reuq", 
            },
        });

        const itemsList = cartItems.map((item: any) => `<li>${item.productName} (x${item.quantity}) - Rs. ${item.price}</li>`).join("");

        await transporter.sendMail({
            from: `"${customerInfo.name}" <rdorganichairoil@gmail.com>`,
            to: "rdorganichairoil@gmail.com",
            subject: `🛒 New Order: Rs. ${totalPrice} (${paymentMethod})`,
            html: `<h2>New Order Received</h2>
                   <p><b>Name:</b> ${customerInfo.name}</p>
                   <p><b>Phone:</b> ${customerInfo.phone}</p>
                   <p><b>Address:</b> ${customerInfo.address}, ${customerInfo.city}</p>
                   <p><b>TID:</b> <span style="color:red; font-weight:bold;">${transactionId}</span></p>
                   <h3>Items:</h3>
                   <ul>${itemsList}</ul>
                   <p>Check Sanity Admin for full details.</p>`,
        });

        return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Failed to process order" }, { status: 500 });
    }
}