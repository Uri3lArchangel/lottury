import React from "react";
import about from "../../../styles/about.module.css";

function About() {
  return (
    <section className={about.About} id="about">
      <div>
        <aside>
          <h1>ABOUT LOTTURY</h1>
        </aside>
        <article>
          After a player has purchased a number tickets, one or more, unique
          ID&apos;s would be assigned to each ticket. After every 24 hours a draw
          function is called, this function would be called every 24 hours and a
          random number would be generated offchain, this number would be chosen
          as winner and given 90% of the prize pool. In the eventuality that all
          the tickets in the draw belong to only one player, the draw would be
          held.
        </article>
      </div>
    </section>
  );
}

export default About;
