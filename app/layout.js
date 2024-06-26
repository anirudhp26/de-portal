import { Inter } from "next/font/google";
import { Karla } from "next/font/google";
const barlow = Karla({
  subsets: ["latin"],
  weight: ["400", "600"],
});
import "./globals.css";
import { Provider } from "@/config/Provider";
import { getServerSession } from "next-auth";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  const session = getServerSession();
  return (
    <html lang="en">
      <body className={barlow.className}>
        <Toaster />
        <Provider session={session}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
