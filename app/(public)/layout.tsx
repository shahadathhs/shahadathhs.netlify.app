import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/nav/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto px-2 lg:px-4 min-h-screen">
      {/* navbar */}
      <Navbar />

      {/* main content */}
      <div className="min-h-screen">{children}</div>

      {/* footer */}
      <Footer />
    </main>
  );
}
