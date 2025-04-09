import { NextRequest, NextResponse } from "next/server";
import cloudinary from "../../lib/cloudinary";
import Image from "../../models/Image";
import dbConnect from "@/app/lib/connectDB";

export async function POST(req: NextRequest) {
  await dbConnect();

  const formData = await req.formData();
  const title = formData.get("title");
  const files = formData.getAll("images") as File[];

  if (!title || files.length === 0) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

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

  const savedImage = await Image.create({
    title,
    imageUrls: uploadedUrls,
  });

  return NextResponse.json({
    success: true,
    data: savedImage,
  });
}
