const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const client = require("../awsClient"); 

const { configDotenv } = require("dotenv");
configDotenv()

async function getFile(key) {
    if (!process.env.BUCKET_NAME) throw new Error("BUCKET_NAME is not defined in .env")
    try {
        console.log('🔧 Getting file from S3 with key:', key);
        console.log('🔧 Bucket:', process.env.BUCKET_NAME);
        
        const command = new GetObjectCommand({
                Bucket: process.env.BUCKET_NAME,
                Key: key,
        })
        const url = await getSignedUrl(client, command, {expiresIn: 3600})
        console.log('✅ Generated GET presigned URL:', url.substring(0, 100) + '...');
        return url;
    } catch (error) {
        console.error("❌ Error getting signed URL:", error);
        console.error("❌ Key:", key);
        console.error("❌ Bucket:", process.env.BUCKET_NAME);
        throw error;
    }
}

module.exports = getFile;