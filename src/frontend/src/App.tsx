import { useState, useRef, useEffect } from 'react';
import BirthdayScene3D from './components/BirthdayScene3D';
import GiftRevealMessages from './components/GiftRevealMessages';
import PhotosSection from './components/PhotosSection';
import { Gift, Heart, Sparkles } from 'lucide-react';

function App() {
  const [showContent, setShowContent] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioStarted, setAudioStarted] = useState(false);

  // Initialize background audio
  useEffect(() => {
    const audio = new Audio('/assets/audio/tamil-friendship-song.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    // Try autoplay (will be blocked by most browsers)
    const tryAutoplay = async () => {
      try {
        await audio.play();
        setAudioStarted(true);
      } catch (error) {
        // Autoplay blocked, will start on user interaction
        console.log('Autoplay blocked, waiting for user interaction');
      }
    };

    tryAutoplay();

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const handleOpenGifts = async () => {
    setShowContent(true);
    
    // Start background music on first user interaction if not already playing
    if (audioRef.current && !audioStarted) {
      try {
        audioRef.current.currentTime = 0; // Start from beginning
        await audioRef.current.play();
        setAudioStarted(true);
      } catch (error) {
        console.error('Failed to play audio:', error);
      }
    }

    // Smooth scroll to content after a brief delay for the reveal animation
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-birthday-cream via-birthday-peach to-birthday-rose">
      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <BirthdayScene3D />
        </div>
        
        <div className="relative z-10 text-center space-y-8 max-w-5xl mx-auto">
          <div className="animate-float">
            <h1 className="hero-headline text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-birthday-gold drop-shadow-2xl">
              happy birthday minicode mouciiii
            </h1>
          </div>
          
          <div className="flex items-center justify-center gap-4 text-birthday-coral text-2xl md:text-3xl animate-pulse-gentle">
            <Heart className="w-8 h-8 fill-current animate-heartbeat" />
            <Gift className="w-8 h-8 animate-bounce-gentle" />
            <Heart className="w-8 h-8 fill-current animate-heartbeat" style={{ animationDelay: '0.5s' }} />
          </div>

          <button
            onClick={handleOpenGifts}
            className="group mt-12 px-8 py-4 bg-birthday-gold text-birthday-dark rounded-full text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-105 relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Open Your Birthday Gifts
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-birthday-coral/20 to-birthday-rose/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      {showContent && (
        <main ref={contentRef} className="relative z-20 bg-birthday-cream animate-fade-in-up">
          {/* Gift Messages Section */}
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-center text-birthday-gold mb-12 drop-shadow-lg animate-slide-in-down">
                Special Messages for You
              </h2>
              <GiftRevealMessages />
            </div>
          </section>

          {/* Photos Section */}
          <section className="py-16 px-4 bg-gradient-to-b from-birthday-cream to-birthday-peach">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-center text-birthday-gold mb-12 drop-shadow-lg animate-slide-in-down">
                Our Memories Together
              </h2>
              <PhotosSection />
            </div>
          </section>

          {/* Footer */}
          <footer className="py-8 px-4 bg-birthday-dark text-birthday-cream text-center">
            <p className="text-sm flex items-center justify-center gap-2 flex-wrap">
              Built with <Heart className="w-4 h-4 fill-current text-birthday-coral animate-heartbeat" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'minicode-mouci-birthday'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-birthday-gold transition-colors duration-200"
              >
                caffeine.ai
              </a>
            </p>
            <p className="text-xs mt-2 text-birthday-cream/70">
              © {new Date().getFullYear()} • Made with love for Minicode Mouci
            </p>
          </footer>
        </main>
      )}
    </div>
  );
}

export default App;
