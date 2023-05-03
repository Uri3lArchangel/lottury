import React from "react";
import layout from "../../../../styles/layouts/fullLayout/layout.module.css";
import { IoHome } from "react-icons/io5";
import { GiHelp } from "react-icons/gi";
import { CgDatabase } from "react-icons/cg";
import Image from "next/image";
import { Button } from "antd";
import logo from "../../../../public/lotterylogo.png";
import CarouselApp from "../CarouselApp";
import Link from "next/link";
import { BsGraphUpArrow } from "react-icons/bs";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
}
function Layout({ children }: LayoutProps) {
  
  
  function onClickScroll(e:React.MouseEvent<HTMLAnchorElement>){
    e.preventDefault()
  let id =(e.currentTarget.href.split('#')[1])
    let loc = (document.getElementById(id) as HTMLDivElement)
    loc.scrollIntoView({behavior:'smooth'});
    let links = (document.querySelectorAll("#navlink"))
    for(let i=0;i<links.length;i++){
      links[i].classList.remove('active')
    }
    e.currentTarget.classList.add('active')
  }

  return (
    <article className={layout.Page}>
      <header className={layout.Header}>
        <figure>
          <Image src={logo} alt="lottury logo" />
        </figure>
        <button>Connect Wallet</button>
      </header>
      <aside className={layout.sideNav}>
        <ul>
          <li >
            <Link id="navlink"  onClick={onClickScroll} href={"#home"}>
              <IoHome size={25} />
            </Link>
            <p>Home</p>
          </li>
          <li>
            <Link id="navlink" onClick={onClickScroll} href={"#howtoplay"}>
              <GiHelp size={25} />
            </Link>
            <p>How To Play</p>
          </li>
          <li>
            <Link id="navlink" onClick={onClickScroll} href={"#stats"}>
              <BsGraphUpArrow size={25} />
            </Link>
            <p>Lottery Stats</p>
          </li>
          <li>
            <Link id="navlink" onClick={onClickScroll} href={"#about"}>
              <CgDatabase size={25} />
            </Link>
            <p>About</p>
          </li>
        </ul>
      </aside>
      <CarouselApp />
      <main>
        <section className={layout.Other}>{children}</section>
        <section className={layout.Play}>
          <div>
            <aside>5$ / ticket</aside>
            <input type="number" placeholder="Input ticket amounts" />
            <button>Buy</button>
          </div>
        </section>
      </main>
      <footer className={layout.Footer}></footer>
    </article>
  );
}

export default Layout;
