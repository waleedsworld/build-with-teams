
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationEmailRequest {
  candidateName: string;
  email: string;
  uniqueId: string;
}

const brevoApiKey = Deno.env.get("BREVO_API_KEY");
const brevoApiUrl = "https://api.brevo.com/v3/smtp/email";
const senderEmail = "taas@techrealm.online";
const senderName = "TaaS Careers";

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: ConfirmationEmailRequest = await req.json();
    const { candidateName, email, uniqueId } = requestData;

    if (!email || !candidateName || !uniqueId) {
      return new Response(
        JSON.stringify({ error: "Email, candidate name, and uniqueId are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Processing confirmation email for: ${candidateName} (${email}) - ID: ${uniqueId}`);

    // Try multiple template URLs in order of preference
    const templateUrls = [
      "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/sign/applications/hiringbk.html?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzQ1Mjg3YmYwLTRmYzgtNDVkMi05ZDkzLWQ3MmQzZjkzZDgyZiJ9.eyJ1cmwiOiJhcHBsaWNhdGlvbnMvaGlyaW5nYmsuaHRtbCIsImlhdCI6MTc0ODI0NDI0NCwiZXhwIjoxNzc5NzgwMjQ0fQ.tOK2AzX0gkMFp1xFjohKoL9chmWWJqSZotwF3TroVMU",
      "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos//hiring.html"
    ];

    let htmlTemplate = "";
    let templateFetched = false;

    for (const templateUrl of templateUrls) {
      try {
        console.log(`Attempting to fetch template from: ${templateUrl}`);
        const templateResponse = await fetch(templateUrl);
        
        if (templateResponse.ok) {
          htmlTemplate = await templateResponse.text();
          templateFetched = true;
          console.log(`Successfully fetched template from: ${templateUrl}`);
          break;
        } else {
          console.log(`Failed to fetch from ${templateUrl}. Status: ${templateResponse.status}`);
        }
      } catch (error) {
        console.log(`Error fetching from ${templateUrl}:`, error);
        continue;
      }
    }

    // If no template was fetched, use a fallback template
    if (!templateFetched) {
      console.log("Using fallback email template");
      htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>TaaS Application Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">TaaS Careers</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Application Confirmation</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #667eea; margin-top: 0;">Hello {{firstName}}!</h2>
            
            <p>Thank you for applying to TaaS. We're excited to review your application!</p>
            
            <div style="background: #f8f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #667eea;">Application Details</h3>
              <p><strong>Name:</strong> {{candidateName}}</p>
              <p><strong>Email:</strong> {{email}}</p>
              <p><strong>Application ID:</strong> {{uniqueId}}</p>
              <p><strong>Submitted:</strong> {{submissionDate}}</p>
              <p><strong>Schedule your interview:</strong></p>
              <p><a href="https://calendly.com/acctechrealm/30min" target="_blank" rel="noopener noreferrer">
                https://calendly.com/acctechrealm/30min
              </a></p>
            </div>
            
            <p>Our team will review your application and get back to you soon. We appreciate your interest in joining TaaS!</p>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #666; font-size: 14px;">Best regards,<br>The TaaS Team</p>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    // Parse the candidate's first name
    const firstName = candidateName.split(' ')[0];

    // Replace all occurrences of placeholders with actual values
    htmlTemplate = htmlTemplate.replace(/\{\{firstName\}\}/g, firstName);
    htmlTemplate = htmlTemplate.replace(/\{\{candidateName\}\}/g, candidateName);
    htmlTemplate = htmlTemplate.replace(/\{\{email\}\}/g, email);
    htmlTemplate = htmlTemplate.replace(/\{\{uniqueId\}\}/g, uniqueId);
    
    // Current date for the email
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    htmlTemplate = htmlTemplate.replace(/\{\{submissionDate\}\}/g, formattedDate);

    // Prepare the email payload for Brevo API
    const emailPayload = {
      sender: {
        name: senderName,
        email: senderEmail,
      },
      to: [
        {
          email: email,
          name: candidateName,
        },
      ],
      subject: "Your TaaS Application Confirmation",
      htmlContent: htmlTemplate,
    };

    console.log("Sending email via Brevo API...");

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
      throw new Error(`Failed to send confirmation email: ${JSON.stringify(responseData)}`);
    }

    console.log("Confirmation email sent successfully:", responseData);

    return new Response(
      JSON.stringify({ success: true, messageId: responseData.messageId }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
