import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  console.time("TOTAL");

  try {
    console.time("FORMDATA");
    const formData = await request.formData();
    console.timeEnd("FORMDATA");

    const file = formData.get("file");

    console.time("ARRAYBUFFER");
    const bytes = await file.arrayBuffer();
    console.timeEnd("ARRAYBUFFER");

    const buffer = Buffer.from(bytes);

    console.time("CLOUDINARY");

    const result = await new Promise((resolve, reject) => {
  cloudinary.uploader.upload_stream(
    {
      folder: "stone-shutters",
      resource_type: "image",

      use_filename: true,
      unique_filename: true,
      overwrite: false,

      chunk_size: 6000000,
    },
    (error, result) => {
      if (error) reject(error);
      else resolve(result);
    }
  ).end(buffer);
});

    console.timeEnd("CLOUDINARY");
    console.timeEnd("TOTAL");

    return NextResponse.json({
      secure_url: result.secure_url,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}