import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Toolbox from "./components/Toolbox";
import Writing from "./components/Writing";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-20">
        <Hero />
        <Toolbox />
        <Writing />
      </main>
      <Footer />
    </div>
  );
}
