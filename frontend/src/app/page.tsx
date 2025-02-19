import Title from "@/app/components/Title";
import Menu from "@/app/components/Menu"

export default function Home() {
  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <Title />
      <Menu />
    </main>
  );
}