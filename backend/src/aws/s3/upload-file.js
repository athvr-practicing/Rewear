const { PutObjectCommand, ListObjectsCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { configDotenv } = require("dotenv");
const { default: client } = require("../awsClient"); 

configDotenv();

async function putFileURL(key) {
  try {
    if (!process.env.BUCKET_NAME) throw new Error("BUCKET_NAME is not defined in .env");

    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      ContentType: ["image/jpeg"], 
    });

    const url = await getSignedUrl(client, command, { expiresIn: 120 });
    return url;
  } catch (err) {
    console.error("Error generating presigned URL:", err.message);
    throw err;
  }
}

module.exports = putFileURL;