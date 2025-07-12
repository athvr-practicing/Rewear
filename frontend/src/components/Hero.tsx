import React, { useEffect, useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';

const CARD_DATA = [
  { id: 1, gradient: 'from-red-400 to-red-600', delay: 0 },
  { id: 2, gradient: 'from-blue-300 to-blue-500', delay: 0.15 },
  { id: 3, gradient: 'from-yellow-300 to-yellow-500', delay: 0.3 },
  { id: 4, gradient: 'from-pink-300 to-pink-500', delay: 0.45 },
  { id: 5, gradient: 'from-red-600 to-red-800', delay: 0.6 },
  { id: 6, gradient: 'from-green-500 to-green-700', delay: 0.75 },
];

// Reduced card size and overlap for better fit
const CARD_WIDTH = 200;
const CARD_HEIGHT = 300;
const CARD_OVERLAP = 70;

// Semi-circle orientation angles
const tiltAngles = [-25, -12, -4, 4, 12, 25];

// Calculate top offset for semi-circle
const getCardTop = (i: number) => {
  // Place cards in a semi-circle arc
  const radius = 120;
  const angle = ((i - (CARD_DATA.length - 1) / 2) * 22) * (Math.PI / 180); // 22deg spread
  return `${radius - Math.cos(angle) * radius}px`;
};

const Hero: React.FC = () => {
  const [dealt, setDealt] = useState<boolean[]>(Array(CARD_DATA.length).fill(false));
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    CARD_DATA.forEach((_, i) => {
      setTimeout(() => {
        setDealt((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 400 + i * 180);
    });
  }, []);

  // Overlap cards by shifting left for each card
  const getCardLeft = (i: number) => {
    const totalWidth = (CARD_WIDTH - CARD_OVERLAP) * (CARD_DATA.length - 1);
    return `calc(50% - ${totalWidth / 2}px + ${(CARD_WIDTH - CARD_OVERLAP) * i}px)`;
  };

  return (
    <section className="relative py-8 md:py-12 px-4 sm:px-6 lg:px-8 bg-white overflow-visible">
      <div className="max-w-7xl mx-auto">
        {/* Main heading */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-2">
            A place to display your <span className="block">masterpiece.</span>
          </h1>
        </div>

        {/* Artwork display */}
        <div className="relative mt-8 md:mt-10 mx-auto" style={{ height: `${CARD_HEIGHT + 100}px` }}>
          <div className="w-full h-full relative" style={{ height: CARD_HEIGHT + 100 }}>
            {CARD_DATA.map((card, i) => {
              const spring = useSpring({
                from: {
                  opacity: 0,
                  transform: `translateY(80px) scale(0.92) rotate(${tiltAngles[i]}deg)`,
                },
                to: {
                  opacity: dealt[i] ? 1 : 0,
                  transform: dealt[i]
                    ? hovered === i
                      ? `translateY(-30px) scale(1.04) rotate(${tiltAngles[i]}deg)`
                      : `translateY(0px) scale(1) rotate(${tiltAngles[i]}deg)`
                    : `translateY(80px) scale(0.92) rotate(${tiltAngles[i]}deg)`,
                },
                config: config.stiff,
                delay: 40 + i * 80,
              });

              return (
                <animated.div
                  key={card.id}
                  style={{
                    ...spring,
                    position: 'absolute',
                    left: getCardLeft(i),
                    top: getCardTop(i),
                    width: `${CARD_WIDTH}px`,
                    height: `${CARD_HEIGHT}px`,
                    zIndex: hovered === i ? 100 : i + 10,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className={`w-full h-full bg-gradient-to-br ${card.gradient} rounded-2xl shadow-2xl relative`}>
                    {/* Wishlist button */}
                    <button
                      className={`absolute top-3 right-3 bg-white/80 hover:bg-white text-pink-500 rounded-full p-2 shadow transition-all ${
                        hovered === i ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                      style={{ transition: 'opacity 0.2s' }}
                      aria-label="Add to wishlist"
                    >
                      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                        <path
                          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                </animated.div>
              );
            })}
          </div>
        </div>

        {/* Description text */}
        <div className="mt-20 md:mt-24 text-center">
          <animated.p
            className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600"
            style={useSpring({
              opacity: dealt[CARD_DATA.length - 1] ? 1 : 0,
              transform: dealt[CARD_DATA.length - 1] ? 'translateY(0px)' : 'translateY(20px)',
              delay: 100,
            })}
          >
            Artists can display their masterpieces, and buyers can discover and 
            purchase works that resonate with them.
          </animated.p>

          {/* CTA section */}
          <animated.div
            className="mt-8 md:mt-10 flex flex-wrap justify-center gap-4"
            style={useSpring({
              opacity: dealt[CARD_DATA.length - 1] ? 1 : 0,
              transform: dealt[CARD_DATA.length - 1] ? 'translateY(0px)' : 'translateY(20px)',
              delay: 100,
            })}
          >
            <button 
              className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              Join for $9.99/m
            </button>
            <button 
              className="text-gray-600 hover:text-gray-800 px-6 py-3 font-medium transition-colors"
            >
              Read more
            </button>
          </animated.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;