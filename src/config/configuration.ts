import dotenv from 'dotenv';

import path from 'path';

// * load the environment variables from the .env file
dotenv.config({ path: path.join(process.cwd(), '.env') });

const configuration = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  resendAPIKey: process.env.RESEND_API_KEY,
  resendFromEmail: process.env.RESEND_FROM_EMAIL,
  contactFormEmail: process.env.CONTACT_FORM_EMAIL,
  cloudinaryName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryKey: process.env.CLOUDINARY_API_KEY,
  cloudinarySecret: process.env.CLOUDINARY_API_SECRET,
  geminiAPIKey: process.env.GEMINI_API_KEY,
};

export default configuration;
