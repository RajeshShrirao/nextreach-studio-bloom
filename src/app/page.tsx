import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Process from "@/components/Process";
import Integrations from "@/components/Integrations";
import Testimonials from "@/components/Testimonials";
import ComparisonTable from "@/components/ComparisonTable";
import Benefits from "@/components/Benefits";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/chatbot/ChatWidget";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <Process />
      <Integrations />
      <Testimonials />
      <ComparisonTable />
      <Benefits />
      <FAQ />
      <Footer />
      <ChatWidget />
    </>
  );
}
