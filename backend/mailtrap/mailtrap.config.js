// import { MailtrapClient } from "mailtrap";
// import dotenv from "dotenv";
// dotenv.config();

// const TOKEN = process.env.MAILTRAP_TOKEN;
// const ENDPOINT = "https://send.api.mailtrap.io/";

// const client = new MailtrapClient({
//   token: TOKEN,
//   endpoint: ENDPOINT,
// });

// const sender = {
//   email: "hello@smyweb.xyz",
//   name: "Greetings from Smyweb",
// };
// const recipients = [
//   {
//     email: "fobawen566@exitbit.com",
//   }
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);

import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.TOKEN;
const ENDPOINT = "https://send.api.mailtrap.io/";

export const mailtrapClient = new MailtrapClient({
    token: TOKEN,
    endpoint: ENDPOINT,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Greetings",
};

// const recipients = [
//   {
//     email: "fobawen566@exitbit.com",
//   }
// ];
