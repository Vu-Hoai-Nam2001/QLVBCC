// tạo file mới
import { google } from 'googleapis';
// import { fileURLToPath } from 'url';
// import path from 'path';
// import fs from 'fs';

export default async function googledrive(req, res) {
  const {name} = JSON.parse(req.body);
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
  // const moduleDirPath = path.dirname(fileURLToPath(import.meta.url));
  // const filePath = path.join(moduleDirPath, 'anh1.jpg');

  async function uploadFile() {
    try {
      const response = await drive.files.create({
        requestBody: {
          name: name, // This can be the name of your choice
          mimeType: 'application/vnd.google-apps.folder',
          parents: ['1VhNbZF6gKSgc79pitfXxoJJPnabMkl98'],
        },
        // media: {
        //   mimeType: 'image/jpg',
        //   body: fs.createReadStream(filePath),
        // },
      });

      res.status(200).json({result:response.data})
       console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  uploadFile();
  
}




