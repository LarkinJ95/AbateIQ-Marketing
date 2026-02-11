import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Problem from './sections/Problem';
import Solution from './sections/Solution';
import Demo from './sections/Demo';
import Pricing from './sections/Pricing';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Demo />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
