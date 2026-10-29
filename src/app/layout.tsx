import type { Metadata } from "next";
import { Lora, Marck_Script } from "next/font/google";
import "./globals.css";

const serif = Lora({
  variable: "--font-serif",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const script = Marck_Script({
  variable: "--font-script",
  subsets: ["latin", "cyrillic"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Приглашение на свадьбу",
  description: "Мы будем рады видеть вас в наш особенный день",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${serif.variable} ${script.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
