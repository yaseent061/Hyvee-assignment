import "./globals.css";

export const metadata = {
  title: "Hyvee Assignment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
