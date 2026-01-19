import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with env variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file to Cloudinary
 * @param file - The File object obtained from FormData
 * @param folder - The folder name in Cloudinary (e.g., 'clothing-store/collections')
 * @returns Promise<string> - The secure URL of the uploaded image
 */
export const uploadToCloudinary = async (
  file: File,
  folder: string
): Promise<string> => {
  // 1. Convert File to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // 2. Return a Promise that resolves with the URL
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: folder,
          resource_type: "auto", // Auto-detect (image, video, etc.)
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            reject(error);
            return;
          }

          if (result && result.secure_url) {
            resolve(result.secure_url);
          } else {
            reject(
              new Error("Cloudinary upload successful but no URL returned.")
            );
          }
        }
      )
      .end(buffer); // 3. Send the buffer to the stream
  });
};

/**
 * (Optional) Helper to delete an image if you delete a product/collection
 */
export const deleteFromCloudinary = async (imageUrl: string) => {
  try {
    // Extract public_id from URL
    // URL format: .../upload/v12345/folder/filename.jpg
    const parts = imageUrl.split("/");
    const filename = parts.pop()?.split(".")[0]; // filename without extension
    const folder = parts.pop(); // folder name

    if (filename && folder) {
      const publicId = `${folder}/${filename}`; // Adjust logic based on your exact URL structure
      await cloudinary.uploader.destroy(publicId);
    }
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
  }
};
