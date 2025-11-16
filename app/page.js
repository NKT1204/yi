import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import OurServices from "@/components/OurServices";
import AmazingInitiatives from "@/components/AmazingInitiatives";
import Testimonials from "@/components/Testimonials";
import WhatWeBring from "@/components/WhatWeBring";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <OurServices />
      <AmazingInitiatives />
      <WhatWeBring />
      <Testimonials />
      <Footer />
    </>
  );
}
