import { v2 as cloudinary, UploadApiOptions } from "cloudinary";
import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import streamifier from "streamifier"
import dotenv from "dotenv";

export class CloudinaryClient {
  private static instance: CloudinaryClient;
  private settings: Map<string, any> = new Map();

  private constructor() {}

  public static getInstance(): CloudinaryClient {
    if (!CloudinaryClient.instance) {
      CloudinaryClient.instance = new CloudinaryClient();
      dotenv.config();
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
        secure: true,
      });
    }
    return CloudinaryClient.instance;
  }

  public async upload_img(
    buffer: Buffer
  ): Promise<UploadApiResponse | UploadApiErrorResponse | string | any> {
    try {
      console.log('Envoi de l image sur le cloud')
      const result = await new Promise<UploadApiResponse | UploadApiErrorResponse | string>(
        (resolve) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "uploads",
              transformation: [{ width: 300, height: 300, crop: "fill" }],
            },
            (error, result) => {
              if (error) return resolve(error);
              if (!result) return resolve("Unexpected error, no result");
              resolve(result);
            }
          );

          streamifier.createReadStream(buffer).pipe(uploadStream);
        }
      );
      return result;
    } catch (err) {
      return err;
    }
  }
}
