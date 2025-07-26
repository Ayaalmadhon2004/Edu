import './globals.css';
import Navbar from "./UI/Navbar/Navbar";

export const metadata = {
  title: 'EduPath Platform',
  description: 'A simple educational platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
