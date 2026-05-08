import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "alex.hordal@gmail.com",
      subject: `Portfolio Contact from ${name}`,
      html: `
        <h2>New Portfolio Contact</h2>

        <p>
          <strong>Name:</strong> ${name}
        </p>

        <p>
          <strong>Email:</strong> ${email}
        </p>

        <p>
          <strong>Message:</strong>
        </p>

        <p>${message}</p>
      `,
    });

    return new Response(
      JSON.stringify({
        message: "Email sent successfully. Thanks for getting in touch!",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        message: "There was an error processing your mail. Please try again.",
      }),
      {
        status: 500,
      }
    );
  }
};