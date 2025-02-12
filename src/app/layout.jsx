import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin', 'japanese'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
});


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${notoSansJP.className} antialiased bg-gray-400`}
      >
        {children}
      </body>
    </html>
  );
}
