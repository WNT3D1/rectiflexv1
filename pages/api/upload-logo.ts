import { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// AWS S3 configuration
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Disable default body parsing to handle file uploads
export const config = {
    api: {
        bodyParser: false,
    },
};

async function uploadLogo(req: NextApiRequest, res: NextApiResponse) {
    const form = formidable({ multiples: false }); // Initialize formidable

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Error parsing the file:', err);
            return res.status(400).json({ message: 'Error parsing the file' });
        }

        const file = files.logo;  // Change to correct file reference
        const safeDir = '/tmp/uploads';  // Define a safe directory for uploads
        const resolvedPath = path.resolve(safeDir, path.basename(file.filepath));
        if (!resolvedPath.startsWith(safeDir)) {
            console.error('Invalid file path:', file.filepath);
            return res.status(400).json({ message: 'Invalid file path' });
        }
        const fileStream = fs.createReadStream(resolvedPath);

        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: `logos/${file.originalFilename}`,
            Body: fileStream,
            ContentType: file.mimetype,
            ACL: 'public-read',
        };

        try {
            const data = await s3.upload(params).promise();
            return res.status(200).json({ logoUrl: data.Location });
        } catch (uploadError) {
            console.error('Error uploading to S3:', uploadError);
            return res.status(500).json({ message: 'Error uploading logo' });
        }
    });
}

export default uploadLogo;
