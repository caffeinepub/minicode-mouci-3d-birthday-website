import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Upload, Image as ImageIcon, Heart } from 'lucide-react';
import { useSwipe } from '../hooks/useSwipe';
import { preloadedPhotos } from '../content/preloadedPhotos';

const FALLBACK_IMAGE = '/assets/generated/fallback-anime-watercolor.dim_1920x1080.png';

export default function PhotosSection() {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  // Initialize with preloaded photos and ensure at least one valid image
  useEffect(() => {
    const validImages = preloadedPhotos.length > 0 ? preloadedPhotos : [FALLBACK_IMAGE];
    setImages(validImages);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newImages.push(event.target.result as string);
            if (newImages.length === files.length) {
              setImages((prev) => [...prev, ...newImages]);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

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

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border-4 border-birthday-gold hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
        <label
          htmlFor="photo-upload"
          className="group flex flex-col items-center justify-center gap-4 cursor-pointer"
        >
          <div className="w-20 h-20 rounded-full bg-birthday-gold/20 flex items-center justify-center group-hover:bg-birthday-gold/30 group-hover:scale-110 transition-all duration-300 group-active:scale-105">
            <Upload className="w-10 h-10 text-birthday-gold group-hover:translate-y-[-2px] transition-transform" />
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-birthday-dark group-hover:text-birthday-coral transition-colors">
              Add More Photos
            </p>
            <p className="text-sm text-birthday-dark/70 mt-2">
              Click to select multiple photos from your device
            </p>
          </div>
          <input
            id="photo-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Gallery/Slider */}
      {images.length > 0 ? (
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border-4 border-birthday-gold hover:shadow-2xl transition-all duration-300">
          <div
            {...swipeHandlers}
            className="relative aspect-[4/3] bg-birthday-dark/5 flex items-center justify-center group"
          >
            <img
              src={getImageSrc(images[currentIndex])}
              alt={`Memory ${currentIndex + 1}`}
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
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6 text-birthday-dark" />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-birthday-gold/90 hover:bg-birthday-gold flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-100 hover:shadow-xl"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6 text-birthday-dark" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="p-4 bg-birthday-gold/10">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      idx === currentIndex
                        ? 'border-birthday-gold scale-110 shadow-lg'
                        : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <img 
                      src={getImageSrc(img)} 
                      alt={`Thumbnail ${idx + 1}`} 
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(img)}
                    />
                  </button>
                ))}
              </div>
              <p className="text-center text-sm text-birthday-dark/70 mt-2 font-medium">
                {currentIndex + 1} / {images.length}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white/50 backdrop-blur-sm rounded-3xl shadow-xl p-12 border-4 border-dashed border-birthday-gold/50 text-center hover:border-birthday-gold transition-all duration-300">
          <ImageIcon className="w-16 h-16 text-birthday-gold/50 mx-auto mb-4 animate-bounce-gentle" />
          <p className="text-lg text-birthday-dark/70">No photos uploaded yet</p>
          <p className="text-sm text-birthday-dark/50 mt-2">Upload some memories to see them here!</p>
        </div>
      )}
    </div>
  );
}
