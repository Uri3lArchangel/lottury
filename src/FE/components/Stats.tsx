import React from "react";
import stats from "../../../styles/stats.module.css";
import { Props } from "@/pages";
import Web3 from "web3";



function Stats({prizePot,ticketCount,playersCount}:Props) {
  return (
    <section className={stats.Stats} id="stats">
        <div className={stats.Container}>
      <div className={stats.pot}>
        <h4> Prize Pot:</h4>
        <p>{prizePot?Web3.utils.fromWei(`${prizePot}`):0} bnb</p>
        </div>

        <div className={stats.part}>
            <h4>No. of players</h4>
          <p>{playersCount}</p>
          </div>
          <div className={stats.tickets}>

          <h4>Total tickets bought</h4>
          <p>{ticketCount}</p>
          </div>
          </div>
    </section>
  );
}

export default Stats;
