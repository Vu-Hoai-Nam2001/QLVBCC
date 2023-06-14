
import { google } from 'googleapis';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

export default async function googledrive(req, res) {
   console.log(req.body)
    // const {parents} = JSON.parse(req.body);
    // const mang = [parents]
    const CLIENT_ID = '902250048761-1jvo7q1ldckm56t3vdi6bpsttj2fqchu.apps.googleusercontent.com';
    const CLIENT_SECRET = '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';
    const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
    const REFRESH_TOKEN = '1//04wU_uRrfp_c1CgYIARAAGAQSNwF-L9IrA6hLgKeeShDYX1Rw8HDMT1GA1iOEuJGZDqTPeYHOnc9Mmwvr2fEK05ec4pO27iCBNgs';

    const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const drive = google.drive({
        version: 'v3',
        auth: oauth2Client,
    });

    // Get the current module's directory path
    const moduleDirPath = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(moduleDirPath, 'HPU.pdf');

    async function uploadFile() {
        try {
            const response = await drive.files.create({
                requestBody: {
                    name: 'HPU', // This can be the name of your choice
                    mimeType: 'application/pdf',
                    parents: ['1VhNbZF6gKSgc79pitfXxoJJPnabMkl98'],
                },
                media: {
                    mimeType: 'application/pdf',
                    body: fs.createReadStream(filePath),
                },
            });
            res.status(200).json({result:response.data})
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    uploadFile();
}


// import { google } from 'googleapis';

// export default async function googledrive(req, res) {
//     const { parents, file } = JSON.parse(req.body);
//     const mang = [parents];
//     const CLIENT_ID = '902250048761-1jvo7q1ldckm56t3vdi6bpsttj2fqchu.apps.googleusercontent.com';
//     const CLIENT_SECRET = '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';
//     const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
//     const REFRESH_TOKEN = '1//04wU_uRrfp_c1CgYIARAAGAQSNwF-L9IrA6hLgKeeShDYX1Rw8HDMT1GA1iOEuJGZDqTPeYHOnc9Mmwvr2fEK05ec4pO27iCBNgs';

//     const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
//     oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

//     const drive = google.drive({
//         version: 'v3',
//         auth: oauth2Client,
//     });

//     async function uploadFile() {
//         try {
//             const response = await drive.files.create({
//                 requestBody: {
//                     name: 'HPU', // This can be the name of your choice
//                     mimeType: 'application/pdf',
//                     parents: mang,
//                 },
//                 media: {
//                     mimeType: 'application/pdf',
//                     body: file, 
//                 },
//             });
//             res.status(200).json({ result: response.data });
//             console.log(response.data);
//         } catch (error) {
//             console.log(error.message);
//         }
//     }

//     uploadFile();
// }


//////////////////////////////////