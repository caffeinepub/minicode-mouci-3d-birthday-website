import { useState } from 'react';
import { messages } from '../content/birthdayMessages';
import { Gift, ChevronDown, Sparkles } from 'lucide-react';

export default function GiftRevealMessages() {
  const [openedGifts, setOpenedGifts] = useState<Set<number>>(new Set());

  const toggleGift = (index: number) => {
    setOpenedGifts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      {messages.map((message, index) => {
        const isOpen = openedGifts.has(index);
        return (
          <div
            key={index}
            className="gift-card bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-4 border-birthday-gold transition-all duration-500 hover:shadow-gift-glow"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <button
              onClick={() => toggleGift(index)}
              className="group w-full px-6 py-6 flex items-center justify-between text-left hover:bg-birthday-gold/10 transition-all duration-300 active:scale-[0.99]"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Gift
                    className={`w-8 h-8 text-birthday-coral transition-all duration-500 ${
                      isOpen ? 'rotate-12 scale-110' : 'group-hover:scale-110'
                    }`}
                  />
                  {!isOpen && (
                    <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-birthday-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
                <span className="text-xl md:text-2xl font-bold text-birthday-dark group-hover:text-birthday-coral transition-colors">
                  Gift {index + 1}
                </span>
              </div>
              <ChevronDown
                className={`w-6 h-6 text-birthday-gold transition-all duration-300 ${
                  isOpen ? 'rotate-180' : 'group-hover:translate-y-1'
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-6 pt-2 animate-fade-in">
                <div className="bg-gradient-to-br from-birthday-peach/30 to-birthday-rose/30 rounded-2xl p-6 border-2 border-birthday-gold/30 shadow-inner">
                  <p className="text-lg md:text-xl text-birthday-dark leading-relaxed whitespace-pre-wrap font-medium">
                    {message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
