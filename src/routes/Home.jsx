import AppExplaination from "../ui/Home/HowItWorksSection";
import Hero from "../ui/Home/hero";
import Services from "../ui/Home/Services";
import WhyUs from "../ui/Home/Why";
import DownloadSection from "../ui/Home/Download";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <AppExplaination />
      <WhyUs />
      <DownloadSection />
    </>
  );
}
