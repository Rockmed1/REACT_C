import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";
import Header from "@/app/_components/Header";
//FONT: 3 steps to implement
//1-import : from google or anywhere, even local
import { Josefin_Sans } from "next/font/google";

//2- create an object to configure it
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

import "@/app/_styles/globals.css"; //to make tailwind work
import { ReservationProvider } from "./_components/ReservationContext";

// this is instead of the <head></head>. place all data in a metadata object instead. this can be placed in the rootlayout here and it will take effect on every page unless it is overwritten on a specific page

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },

  //description for SEO
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests ",

  //favicion can be any image named icon.xxx in the app folder
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body /* 3-font: add it in the className */
        className={`${josefin.className} bg-primary-950 text-primary-100 relative flex min-h-screen flex-col antialiased`}
      >
        <Header />
        <div className="grid flex-1 px-8 py-12">
          <main className="mx-auto w-full max-w-7xl">
            {/* That's the only way we can use the context API in NEXTJS. only the client components will be able to use the context*/}
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
