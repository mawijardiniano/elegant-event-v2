import React from "react";
import Hero from "./component/hero";
import Contact from "./component/contact";
import Venue from "./component/venue";
import Services from "./component/service";
import Layout from "../../components/layout/layout";

export default function Home() {
  return (
    <Layout>
      <section>
        <Hero />
      </section>
      <section className="mt-10">
        <Venue />
      </section>
      <section>
        <Services />
      </section>

      <section>
        <Contact />
      </section>
    </Layout>
  );
}
