import React, {useEffect} from "react";
import Hero from "./component/hero";
import Contact from "./component/contact";
import Venue from "./component/venue";
import Services from "./component/service";
import Package from "./component/package";
import Layout from "../../components/layout/layout";
import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const sectionId = location.state?.scrollTo;
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100); 
      }
    }
  }, [location]);
  return (
    <Layout>
      <section>
        <Hero />
      </section>
      <section className="mt-10">
        <Venue />
      </section>
      <section id="service">
        <Services />
      </section>
      <section>
        <Package />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </Layout>
  );
}
