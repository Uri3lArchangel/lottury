import React from 'react'
import home from '../../../styles/home.module.css'
import {HiChevronDoubleDown} from 'react-icons/hi2'
import Link from 'next/link'

function Home() {
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
    <article className={home.Home} id='home'>
        <h1>
           The Blockchain Lottery System
        </h1>
        <p>buy, play, win big</p>
        <h2>Time Left: 12:40:00</h2>
        <Link href={'#howtoplay'} onClick={onClickScroll}> <h4> Learn how to play <HiChevronDoubleDown  size={27}/></h4></Link>
    </article>
  )
}

export default Home