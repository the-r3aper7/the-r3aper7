"use server";

import { MongoDB } from "../mongodb";
import { ObjectId } from "mongodb";

const totalViewDocumentId = process.env
  .WEBSITE_VIEWS_DOCUMENT_ID! as unknown as ObjectId;

export async function incrementWebsiteViews(): Promise<void> {
  try {
    const client = await MongoDB;
    const db = client.db("website-stats");

    await db.collection("views").updateOne(
      { _id: totalViewDocumentId },
      { $inc: { count: 1 } },
      { upsert: true },
    );
  } catch (error) {
    console.error("Database operation failed:", error);
  }
}

export async function fetchWebsiteViews(): Promise<number> {
  try {
    const client = await MongoDB;
    const db = client.db("website-stats");

    const result = await db.collection("views").findOne({
      _id: totalViewDocumentId,
    });
    return result?.count || 0;
  } catch (error) {
    console.error("Failed to fetch views:", error);
    return 0;
  }
}
