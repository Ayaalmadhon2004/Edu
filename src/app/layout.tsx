import './globals.css';
import Navbar from "./UI/Navbar/Navbar";

export const metadata = {
  title: 'EduPath Platform',
  description: 'A simple educational platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
