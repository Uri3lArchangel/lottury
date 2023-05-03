import React from "react";
import stats from "../../../styles/stats.module.css";

function Stats() {
  return (
    <section className={stats.Stats} id="stats">
        <div className={stats.Container}>
      <div className={stats.pot}>
        <h4> Prize Pot:</h4>
        <p>100bnb</p>
        </div>

        <div className={stats.part}>
            <h4>No. of participants</h4>
          <p>100</p>
          </div>
          <div className={stats.tickets}>

          <h4>Total tickets bought</h4>
          <p>120</p>
          </div>
          </div>
    </section>
  );
}

export default Stats;
