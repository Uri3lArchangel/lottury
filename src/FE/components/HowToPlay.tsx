import React from 'react'
import htp from '../../../styles/htp.module.css'
import StepsApp from './StepsApp'


function HowToPlay() {
  return (
    <article className={htp.HTP} id='howtoplay'>
        <StepsApp />
    </article>
  )
}

export default HowToPlay