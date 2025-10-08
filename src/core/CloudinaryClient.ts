import { v2 as cloudinary, UploadApiOptions } from "cloudinary";
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
                api_secret: process.env.API_SECRET,
                secure: true,
            })
        }
        return CloudinaryClient.instance;
    }

    public uploadImage = async (imagePath:string) => {
        // Use the uploaded file's name as the asset's public ID and 
        // allow overwriting the asset with new versions
        const options:  UploadApiOptions = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        };

        try {
            // Upload the image
            const result = await cloudinary.uploader.upload(imagePath, options);
            console.log(result);
            return result.public_id;
        } catch (error) {
            console.error('[CLOUDINARY ERROR ] : ' ,error);
        }
    };

}