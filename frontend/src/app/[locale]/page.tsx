import Title from "@/app/[locale]/components/Title";
import Menu from "@/app/[locale]/components/Menu"
import Navbar from "@/app/[locale]/components/Navbar";

export default function Home() {
  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-col flex-1">
        <Title />
        <Menu />
      </div>
    </main>
  );
}