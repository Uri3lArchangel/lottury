import About from '@/src/FE/components/About'
import Home from '@/src/FE/components/Home'
import HowToPlay from '@/src/FE/components/HowToPlay'
import Stats from '@/src/FE/components/Stats'
import Layout from '@/src/FE/components/layouts/Layout'
import React, { useEffect, useState } from 'react'


function index() {
return(
  <Layout>
    <div>
      <Home />
      <HowToPlay />
      <Stats />
      <About />
    </div>
  </Layout>
)
}

export default index