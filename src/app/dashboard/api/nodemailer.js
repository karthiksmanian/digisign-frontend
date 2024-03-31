// const nodemailer = require("nodemailer");

// const email = process.env.EMAIL
// const password = process.env.EMAIL_PASS

// export const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: email,
//     pass: password,
//     subject: 'Invite from PSG Tech Digi Sign'
//   }
// })

// export const mailOptions = {
//   from: email,
//   to: 'abishek20030324@gmail.com',
// }

// CONTENTS TO BE IN share-model.tsx

// const sendEmail = async () => {
//   try {
//     await transporter.sendMail({
//       ...mailOptions,
//       text: "Greetings! You have a document to sign...",
//       html: "<h1>PSG Tech Digi Sign</h1><p>" + fileId + filename + "</p>"
//     });
//     toast.success('Invite sent successfully!')
//   } catch(error: any) {
//     toast.error(error);
//   } 
// }