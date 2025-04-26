import Navbar from "@/components/Navbar";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black text-gray-100">
      <Navbar />
      {children}
    </div>
  );
}