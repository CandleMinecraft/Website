"use server";

export async function verifyPassword(formData: FormData) {
  const password = formData.get("password") as string;
  const SITE_PASSWORD = process.env.SITE_PASSWORD || "candle";
  
  try {
    if (password === SITE_PASSWORD) {
      return { success: true };
    } else {
      return { success: false, error: "Invalid password" };
    }
  } catch (error) {
    return { success: false, error: "Server error. Please try again." };
  }
} 