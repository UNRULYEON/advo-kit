import Dropdown from "@/components/Dropdown";
import Splashscreen from "@/components/Splashscreen";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main>
      <Suspense>
        {/* @ts-expect-error Server Component */}
        <Splashscreen>
          <div>top section</div>
          <div>boxes</div>
          <div>bottom section</div>
        </Splashscreen>
      </Suspense>
    </main>
  );
}
