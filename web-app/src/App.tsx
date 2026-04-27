import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ParallaxBackground from './components/ParallaxBackground';
import StatsBar from './components/StatsBar';
import Services from './components/Services';
import WhyNexora from './components/WhyNexora';
import Process from './components/Process';
import TechStack from './components/TechStack';
import Contact from './components/Contact';



function App() {
  return (
    <div className="App" style={{ position: 'relative' }}>
      <ParallaxBackground />
      <Navbar />
      <Hero />
      <StatsBar />
      <Services />
      <WhyNexora />
      <Process />
      <TechStack />
      <Contact />
      
      {/* Universal Cursor Effect - Placeholder for custom logic */}
      <style>{`
        body { cursor: default; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: var(--navy-deep); }
        ::-webkit-scrollbar-thumb { background: var(--navy-mid); border: 2px solid var(--navy-deep); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--cyan); }
      `}</style>
    </div>
  );
}

export default App;
