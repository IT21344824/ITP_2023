const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp()

const SEND_EMAIL = "itp.2ndyear.project@gmail.com";
const SEND_PASS = "Itp2ndYear_4";

exports.sendEmailNotification = functions.firestore.document('contactUs/{docId}')
    .onCreate((snap, ctx) => {
        const data = snap.data();

        let authData = nodemailer.createTransport({
            host: 'itp.2ndyear.project@gmail.com',
            port: 456,
            secure: true,
            auth: {
                user: SEND_EMAIL,
                pass: SEND_PASS
            }
        });

        authData.sendMail({
            from: 'YOUR_EMAIL_ADDRESS',
            to: 'RECIPIENT_EMAIL_ADDRESS',
            subject: 'New Contact Us Message Received',
            text: `${data.email} `,
            html:`${data.email}`,
        }).then(res=>console.log('sucess')).catch(err=>console.log(err));

    })

