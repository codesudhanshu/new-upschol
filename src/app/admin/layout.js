import '../../../public/css/global.css';
export default function AdminLayout({ children }) {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
