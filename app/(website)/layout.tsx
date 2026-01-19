import Navbar from "../components/Navbar"; // Adjust import path as needed
import FooterWrapper from "../components/FooterWrapper"; // Adjust import path as needed

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <FooterWrapper />
    </>
  );
}
