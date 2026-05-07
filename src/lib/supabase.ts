import { createClient } from "@supabase/supabase-js";

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env.local file.",
  );
}

// Create and export Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for your database tables
export interface GuestPhoto {
  id?: string;
  url: string;
  caption: string;
  uploaded_by: string;
  likes: number;
  created_at?: string;
}

export interface BirthdayMessage {
  id?: string;
  name: string;
  message: string;
  created_at?: string;
}

// Example: Insert a guest photo
export async function insertGuestPhoto(
  photo: Omit<GuestPhoto, "id" | "created_at">,
) {
  const { data, error } = await supabase
    .from("guest_photos")
    .insert([photo])
    .select();

  if (error) {
    console.error("Error inserting photo:", error);
    throw error;
  }

  return data;
}

// Example: Fetch all guest photos
export async function fetchGuestPhotos() {
  const { data, error } = await supabase
    .from("guest_photos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }

  return data as GuestPhoto[];
}

// Example: Insert a birthday message
export async function insertBirthdayMessage(
  message: Omit<BirthdayMessage, "id" | "created_at">,
) {
  const { data, error } = await supabase
    .from("birthday_messages")
    .insert([message])
    .select();

  if (error) {
    console.error("Error inserting message:", error);
    throw error;
  }

  return data;
}

// Example: Fetch all birthday messages
export async function fetchBirthdayMessages() {
  const { data, error } = await supabase
    .from("birthday_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }

  return data as BirthdayMessage[];
}

// Example: Update photo likes
export async function updatePhotoLikes(photoId: string, newLikeCount: number) {
  const { data, error } = await supabase
    .from("guest_photos")
    .update({ likes: newLikeCount })
    .eq("id", photoId)
    .select();

  if (error) {
    console.error("Error updating likes:", error);
    throw error;
  }

  return data;
}

// Example: Delete a message
export async function deleteBirthdayMessage(messageId: string) {
  const { error } = await supabase
    .from("birthday_messages")
    .delete()
    .eq("id", messageId);

  if (error) {
    console.error("Error deleting message:", error);
    throw error;
  }

  return true;
}

// Real-time subscription example
export function subscribeToPhotos(callback: (payload: any) => void) {
  const subscription = supabase
    .channel("guest_photos_changes")
    .on(
      "postgres_changes",
      {
        event: "*", // Listen to all events (INSERT, UPDATE, DELETE)
        schema: "public",
        table: "guest_photos",
      },
      callback,
    )
    .subscribe();

  return subscription;
}

// Upload file to Supabase Storage
export async function uploadPhoto(file: File, bucket: string = "photos") {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) {
    console.error("Error uploading file:", error);
    throw error;
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return { path: data.path, publicUrl };
}
