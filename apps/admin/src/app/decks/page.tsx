import DecksTable from "@/components/DecksTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Decks | Admin | Communikit",
};

export default async function Home() {
  return (
    <>
      <DecksTable />
    </>
  );
}
