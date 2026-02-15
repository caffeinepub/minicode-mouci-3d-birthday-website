import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, BookOpen } from 'lucide-react';
import { useSwipe } from '../hooks/useSwipe';
import { preloadedPhotos, photoStories } from '../content/preloadedPhotos';

const FALLBACK_IMAGE = '/assets/generated/fallback-anime-watercolor.dim_1920x1080.png';

export default function PhotosSection() {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  // Initialize with preloaded photos
  useEffect(() => {
    const validImages = preloadedPhotos.length > 0 ? preloadedPhotos : [FALLBACK_IMAGE];
    setImages(validImages);
  }, []);

  const handleImageError = (imageSrc: string) => {
    setFailedImages((prev) => new Set(prev).add(imageSrc));
  };

  const getImageSrc = (src: string) => {
    return failedImages.has(src) ? FALLBACK_IMAGE : src;
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const swipeHandlers = useSwipe({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrevious,
  });

  const currentStory = photoStories[currentIndex] || { chapter: '', caption: '' };

  return (
    <div className="space-y-8">
      {/* Storybook Introduction */}
      <div className="storybook-frame bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 border-4 border-birthday-gold/50">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-birthday-gold" />
          <h3 className="text-xl md:text-2xl font-bold text-birthday-dark">
            A Storybook of Us
          </h3>
        </div>
        <p className="text-birthday-dark/70 leading-relaxed">
          Every great friendship is a story worth telling. Here are the chapters of our journey together, 
          illustrated in the whimsical style of our favorite tales. Each moment captured here is a treasure, 
          a memory that makes our bond stronger and our hearts fuller.
        </p>
      </div>

      {/* Gallery/Slider with Storybook Frame */}
      {images.length > 0 && (
        <div className="storybook-frame bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border-4 border-birthday-gold hover:shadow-2xl transition-all duration-300">
          {/* Chapter Header */}
          <div className="bg-gradient-to-r from-birthday-gold/20 via-birthday-peach/20 to-birthday-gold/20 px-6 py-4 border-b-2 border-birthday-gold/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-birthday-dark/60 uppercase tracking-wider">
                  Chapter {currentIndex + 1}
                </span>
              </div>
              <span className="text-sm font-medium text-birthday-dark/70">
                {currentIndex + 1} of {images.length}
              </span>
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-birthday-dark mt-2">
              {currentStory.chapter}
            </h4>
          </div>

          {/* Image Display */}
          <div
            {...swipeHandlers}
            className="relative aspect-[16/10] bg-gradient-to-br from-birthday-cream/50 to-birthday-peach/30 flex items-center justify-center group"
          >
            <img
              src={getImageSrc(images[currentIndex])}
              alt={currentStory.chapter}
              className="max-w-full max-h-full object-contain transition-all duration-500 animate-fade-in"
              key={currentIndex}
              onError={() => handleImageError(images[currentIndex])}
            />

            {/* Heart overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <Heart className="w-16 h-16 text-birthday-coral/30 fill-current animate-heartbeat" />
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-birthday-gold/90 hover:bg-birthday-gold flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-100 hover:shadow-xl"
                  aria-label="Previous chapter"
                >
                  <ChevronLeft className="w-6 h-6 text-birthday-dark" />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-birthday-gold/90 hover:bg-birthday-gold flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-100 hover:shadow-xl"
                  aria-label="Next chapter"
                >
                  <ChevronRight className="w-6 h-6 text-birthday-dark" />
                </button>
              </>
            )}
          </div>

          {/* Caption */}
          <div className="px-6 py-5 bg-gradient-to-b from-birthday-cream/50 to-white/50 border-t-2 border-birthday-gold/20">
            <p className="text-center text-birthday-dark/80 italic leading-relaxed text-base md:text-lg">
              {currentStory.caption}
            </p>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="p-4 bg-birthday-gold/10 border-t border-birthday-gold/20">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide justify-center">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      idx === currentIndex
                        ? 'border-birthday-gold scale-110 shadow-lg'
                        : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
                    }`}
                    aria-label={`Go to chapter ${idx + 1}`}
                  >
                    <img 
                      src={getImageSrc(img)} 
                      alt={`Chapter ${idx + 1}`} 
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(img)}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
