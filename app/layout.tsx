import Dropdown from "@/components/Dropdown";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <main>
          <div>
            <Dropdown
              currentItem={{ id: "name", name: "name" }}
              items={[]}
              label="Choose your kit"
            />
          </div>
          <div>{children}</div>
          <div>bottom section</div>
        </main>
      </body>
    </html>
  );
}
