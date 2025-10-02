import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Framework from './components/Framework';
import Roadmap from './components/Roadmap';
import UseCaseLibrary from './components/UseCaseLibrary';
import ROICalculator from './components/ROICalculator';
import ToolsGuide from './components/ToolsGuide';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="bg-gray-50">
        <Hero />

        <Framework />
        <Roadmap />
        <UseCaseLibrary />
        <ROICalculator />
        <ToolsGuide />

        <section id="speaker-notes" className="min-h-screen bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Speaker Notes</h2>
            <p className="text-gray-600">Component coming soon...</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} AI Automation Hub. All resources for training purposes.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
