
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WaitlistRequest {
  email: string;
  firstName: string;
  lastName: string;
  prompt?: string;
}

const brevoApiKey = Deno.env.get("BREVO_API_KEY");
const brevoApiUrl = "https://api.brevo.com/v3/smtp/email";
const senderEmail = "taas@techrealm.online";
const senderName = "TaaS TechRealm";

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: WaitlistRequest = await req.json();
    const { email, firstName, lastName, prompt } = requestData;

    if (!email || !firstName || !lastName) {
      return new Response(
        JSON.stringify({ error: "Email, first name, and last name are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Use the template from Supabase Storage as specified by the user
    const waitlistTemplateUrl = "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos//test.html";
    const waitlistTemplateResponse = await fetch(waitlistTemplateUrl);

    if (!waitlistTemplateResponse.ok) {
      console.error("Failed to fetch waitlist template. Status:", waitlistTemplateResponse.status);
      throw new Error("Failed to fetch waitlist template");
    }

    let htmlTemplate = await waitlistTemplateResponse.text();

    // Replace all occurrences of placeholders with actual values
    htmlTemplate = htmlTemplate.replace(/\{\{firstName\}\}/g, firstName);
    htmlTemplate = htmlTemplate.replace(/\{\{lastName\}\}/g, lastName);
    htmlTemplate = htmlTemplate.replace(/\{\{fullName\}\}/g, `${firstName} ${lastName}`);
    htmlTemplate = htmlTemplate.replace(/\{\{email\}\}/g, email);
    
    if (prompt) {
      htmlTemplate = htmlTemplate.replace(/\{\{prompt\}\}/g, prompt);
    } else {
      htmlTemplate = htmlTemplate.replace(/\{\{prompt\}\}/g, "No prompt provided");
    }

    // Current date for the email
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    htmlTemplate = htmlTemplate.replace(/\{\{submissionDate\}\}/g, formattedDate);

    // Generate a simple unique reference number
    const uniqueRef = `TAAS-${Math.floor(100000 + Math.random() * 900000)}`;
    htmlTemplate = htmlTemplate.replace(/\{\{uniqueId\}\}/g, uniqueRef);

    // Prepare the email payload for Brevo API
    const emailPayload = {
      sender: {
        name: senderName,
        email: senderEmail,
      },
      to: [
        {
          email: email,
          name: `${firstName} ${lastName}`,
        },
      ],
      subject: "Welcome to TaaS Waitlist!",
      htmlContent: htmlTemplate,
    };

    // Send the email using Brevo API
    const response = await fetch(brevoApiUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": brevoApiKey || "",
      },
      body: JSON.stringify(emailPayload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Brevo API error:", responseData);
      throw new Error(`Failed to send email: ${JSON.stringify(responseData)}`);
    }

    console.log("Email sent successfully:", responseData);

    return new Response(
      JSON.stringify({ success: true, messageId: responseData.messageId }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error sending waitlist email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
