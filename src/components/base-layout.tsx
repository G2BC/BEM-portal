import { Suspense } from "react";
import { Header } from "./header";
import { Outlet } from "react-router";
import { FullScreenLoader } from "./full-screen-loader";
import { Footer } from "./footer";

export function BaseLayout() {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <main className="flex flex-col h-full min-h-screen overflow-x-hidden bg-white text-[#131313]">
        <Header />
        <div className="flex-1 bg-white">
          <Outlet />
        </div>
        <Footer />
      </main>
    </Suspense>
  );
}
