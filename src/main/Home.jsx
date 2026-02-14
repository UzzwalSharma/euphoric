import React from 'react'
import Hero from './Hero'
import About from './info';
import InfoTapes from './Tape';
import EventsShowcase from './Eventshowcase';
import GlimpsesCarousel from './Glimpses';
function Home() {
  return (
    <div>
     <Hero />
     <About />
     <InfoTapes/>
     <EventsShowcase/>
     <GlimpsesCarousel/>
    
    </div>
  )
}

export default Home;
