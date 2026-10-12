// app/api/admin/cloudinary/delete/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { publicId, url } = await request.json();
    const target = publicId || url;

    if (!target) {
      return NextResponse.json({ error: "No publicId or url provided" }, { status: 400 });
    }

    const result = await deleteFromCloudinary(target);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Cloudinary delete failed:", err);
    return NextResponse.json(
      { error: err.message || "Delete failed" },
      { status: 500 }
    );
  }
}
