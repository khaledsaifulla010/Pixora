import { NextRequest, NextResponse } from "next/server";
import cloudinary from "../../lib/cloudinary";


export async function POST(req: NextRequest) {


  const formData = await req.formData();
  const title = formData.get("title");
  const createdAt = formData.get("createdAt");
  const files = formData.getAll("images") as File[];

  const uploadedUrls: string[] = [];

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "uploads",
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        )
        .end(buffer);
    });

    uploadedUrls.push(uploadResult.secure_url);
  }

  return NextResponse.json({
    success: true,
    title,
    createdAt,
    urls: uploadedUrls,
  });
}
