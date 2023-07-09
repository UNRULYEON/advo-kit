import { NextResponse } from "next/server";
import db, { decks as dbDecks } from "@advo-kit/db";

export async function GET() {
  const decks = await db.select().from(dbDecks);

  return NextResponse.json(decks);
}
