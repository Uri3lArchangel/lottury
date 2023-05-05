import React from 'react'
import htp from '../../../styles/htp.module.css'
import StepsApp from './StepsApp'

interface htpProps{
  address:string | undefined
}
function HowToPlay({address}:htpProps) {
  return (
    <article className={htp.HTP} id='howtoplay'>
        <StepsApp address={address} />
    </article>
  )
}

export default HowToPlay