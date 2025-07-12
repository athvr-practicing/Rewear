const { PutObjectCommand, ListObjectsCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { configDotenv } = require("dotenv");
const client = require("../awsClient"); 

configDotenv();

async function putFileURL(key, contentType = "image/jpeg") {
  try {
    console.log("🔧 Generating presigned URL for key:", key);
    console.log("🔧 Content type:", contentType);
    console.log("🔧 Bucket:", process.env.BUCKET_NAME);
    console.log("🔧 AWS Region:", process.env.AWS_REGION);
    
    if (!process.env.BUCKET_NAME) throw new Error("BUCKET_NAME is not defined in .env");
    if (!process.env.AWS_REGION) throw new Error("AWS_REGION is not defined in .env");
    if (!process.env.AWS_ACCESS_KEY_ID) throw new Error("AWS_ACCESS_KEY_ID is not defined in .env");
    if (!process.env.AWS_SECRET_ACCESS_KEY) throw new Error("AWS_SECRET_ACCESS_KEY is not defined in .env");

    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    });

    const url = await getSignedUrl(client, command, { expiresIn: 120 });
    console.log("✅ Successfully generated presigned URL");
    console.log("🔗 URL preview:", url.substring(0, 100) + "...");
    return url;
  } catch (err) {
    console.error("❌ Error generating presigned URL:", err.message);
    console.error("❌ Full error:", err);
    throw err;
  }
}

module.exports = putFileURL;