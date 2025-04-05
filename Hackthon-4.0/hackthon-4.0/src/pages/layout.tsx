import "./globals.css";
import { ThemeProvider } from "next-themes";
import ThemeSwitcher from "@/Components/ThemeSwicher/ThemeSwithcher";

export const metadata = {
  title: "My App",
  description: "Using theme switcher",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <header className="p-4">
            <ThemeSwitcher /> {/* 👈 Global switcher */}
          </header>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
