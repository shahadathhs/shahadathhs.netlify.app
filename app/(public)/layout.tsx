import Navbar from "@/components/shared/nav/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      {/* navbar */}
      <Navbar />

      {/* main content */}
      {children}

      {/* footer */}
      {/* <Footer /> */}
    </main>
  );
}
