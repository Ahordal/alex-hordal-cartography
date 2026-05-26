import { Resend } from 'resend';

const prerender = false;
const resend = new Resend("re_ENe2FejR_HUbBdRWz3ruv3wuKRoUR31k2");
const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim();
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: "Please fill out all fields." }),
        { status: 400 }
      );
    }
    const { error } = await resend.emails.send({
      from: "contact@alexhordal.ca",
      // Once your domain is verified, use e.g., "contact@yourdomain.com"
      to: "alex.hordal@gmail.com",
      replyTo: email,
      // This allows you to click 'Reply' in Gmail to reach the sender
      subject: `Portfolio Contact from ${name}`,
      html: `
        <div>
          <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">New Portfolio Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #ccc;">
            <p style="margin-top: 0;"><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `
    });
    if (error) {
      console.error("Resend Error:", error);
      throw new Error("Failed to send email via Resend.");
    }
    return new Response(
      JSON.stringify({ message: "Success! Your message has been sent." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Submission Error:", error);
    return new Response(
      JSON.stringify({ message: "Server error. Please try again later." }),
      { status: 500 }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
