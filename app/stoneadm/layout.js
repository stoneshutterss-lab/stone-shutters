// app/stoneadm/layout.js
import "./admin.css";

export const metadata = {
  title: "Stone Shutters | Studio Admin",
};

export default function AdminLayout({ children }) {
  return (
    <div
      className="font-['Poppins',_'Open_Sans',_sans-serif] bg-[#f8fafc] min-h-screen text-slate-800 antialiased"
      style={{
        fontFamily: "'Poppins', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {children}
    </div>
  );
}
