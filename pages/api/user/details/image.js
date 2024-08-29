import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';
import { connectToDatabase } from '@/api-lib/mongodb';
import User from 'backend/models/user.model';

// Load service account credentials
const KEYFILE_PATH = path.join(process.cwd(), 'medichat-storage.json');
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const BASE_URL = 'https://drive.google.com/uc?export=view&id=';
const auth = new google.auth.GoogleAuth({
  credentials: {
    type: process.env.GOOGLE_TYPE,
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: process.env.GOOGLE_AUTH_URI,
    token_uri: process.env.GOOGLE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
  },
  scopes: SCOPES,
});


const drive = google.drive({ version: 'v3', auth });

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadFileToDrive = async (file, username, type) => {
  await connectToDatabase();

  // Search for an existing file with the same name
  const fileName = `${username}-${type}`;
  let fileId = null;
  let fileURL = null;

  try {
    const listResponse = await drive.files.list({
      q: `name = '${fileName}' and '1ZQNai34oH_rvoxi12rWi9HaiG1sS7rAz' in parents`,
      fields: 'files(id)',
      spaces: 'drive',
    });

    const existingFile = listResponse.data.files[0];

    if (existingFile) {
      fileId = existingFile.id;
    }

    if (fileId) {
      fileURL = await overRideExistingFile(file, fileId);
    } else {
      fileURL = await uploadNewFile(file, fileName);
    }
    return fileURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

const setPublicAccess = async (fileId) => {
  try {
    await drive.permissions.create({
      fileId,
      resource: {
        type: 'anyone',
        role: 'reader',
      },
    });
  } catch (error) {
    console.error('Error setting public access:', error);
    throw error;
  }
};

const overRideExistingFile = async (file, fileId) => {
  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.filepath),
  };

  await drive.files.update({
    fileId,
    media,
    fields: 'id, webViewLink, webContentLink',
  });

  await setPublicAccess(fileId);

  const updatedFile = await drive.files.get({
    fileId,
    fields: 'id',
  });

  return `${BASE_URL}${updatedFile.data.id}`;
};

const uploadNewFile = async (file, fileName) => {
  const fileMetadata = {
    name: fileName,
    parents: ['1ZQNai34oH_rvoxi12rWi9HaiG1sS7rAz'],
  };

  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.filepath),
  };

  const createResponse = await drive.files.create({
    resource: fileMetadata,
    media,
    fields: 'id',
  });

  await setPublicAccess(createResponse.data.id);

  return `${BASE_URL}${createResponse.data.id}`;
};

// Handler function
const uploadUserImage = async (req, res) => {
  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Error parsing the file' });
      return;
    }
    try {
      const username = fields.username[0];
      const fieldName = fields.field[0];
      const file = Array.isArray(files.file) ? files.file[0] : files.file;
      if (!file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
      }

      const urlResponse = await uploadFileToDrive(file, username, fieldName);

      res.status(200).json({
        message: `${username} - ${fieldName} successfully uploaded`,
        fileURL: urlResponse,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Error uploading file' });
    }
  });
};

const getCurrentUserImage = async (req, res) => {
  try {
    const username = req.query.username;
    const response = await drive.files.list({
      auth,
      q: `name contains '${username}-' and mimeType contains 'image/'`,
      fields: 'files(id, name, webViewLink)',
      pageSize: 2,
    });

    const files = response.data.files;

    if (files.length === 0) {
      res.status(404).json({ error: 'File not found' });
      return;
    }

    res.status(200).json(files);
  } catch (error) {
    console.error('Error retrieving file from Google Drive:', error);
    res.status(500).json({ error: 'Error retrieving file' });
  }
};

const handlers = {
  POST: uploadUserImage,
  GET: getCurrentUserImage,
};

export default async function handler(req, res) {
  const methodHandler = handlers[req.method];
  if (methodHandler) {
    return methodHandler(req, res);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
