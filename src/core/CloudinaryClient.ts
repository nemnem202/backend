import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';
import type { Response } from "../types/general/response";

export class CloudinaryClient {

    private static instance: CloudinaryClient;
    private settings: Map<string, any> = new Map();

    private constructor() {
    }

    public static getInstance(): CloudinaryClient {
        if (!CloudinaryClient.instance) {
            CloudinaryClient.instance = new CloudinaryClient();
            dotenv.config()
            cloudinary.config({
                cloud_name: process.env.CLOUD_NAME,
                api_key: process.env.API_KEY,
                api_secret: process.env.API_SECRET // Click 'View API Keys' above to copy your API secret})
            })
        }
        return CloudinaryClient.instance;
    }

    static async upload(): Promise<{ response: Response, url?: string }> {
        const uploadResult = await cloudinary.uploader
            .upload(
                'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
                public_id: 'shoes',
            }
            )
        return { response: { success: true, message: 'Image uploadé avec succès' }, url: uploadResult.public_id };
    }
}