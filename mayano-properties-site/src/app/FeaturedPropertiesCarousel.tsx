'use client';
import React, { useState } from 'react';
import properties from './properties.json';

const placeholderImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80',
];

export default function FeaturedPropertiesCarousel() {
  const featured = properties.filter((p) => p.featured);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isAnimating, setIsAnimating] = useState(false);

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrent((c) => (c === 0 ? featured.length - 1 : c - 1));
    setTimeout(() => setIsAnimating(false), 1000);
  };
  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrent((c) => (c === featured.length - 1 ? 0 : c + 1));
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const property = featured[current];
  const image = property.image || placeholderImages[current % placeholderImages.length];

  return (
    <>
      <div className="w-full max-w-xl mx-auto mt-8">
        <div className="relative rounded-lg overflow-hidden shadow-lg bg-white">
          <div className="relative w-full h-64">
            {featured.map((p, idx) => {
              const img = p.image || placeholderImages[idx % placeholderImages.length];
              const isCurrent = idx === current;
              
              // Calculate the position of each slide relative to the current one
              let position = idx - current;
              if (position < -featured.length / 2) position += featured.length;
              if (position > featured.length / 2) position -= featured.length;
              
              // Calculate translateX based on position and direction
              let translateX;
              if (direction === 0) {
                // Initial position
                translateX = `${position * 100}%`;
              } else if (direction === 1) {
                // Moving right (next)
                translateX = `${(position - 1) * 100}%`;
              } else {
                // Moving left (prev)
                translateX = `${(position + 1) * 100}%`;
              }
              
              return (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
                    Math.abs(position) <= 1 ? 'z-10' : 'z-0'
                  }`}
                  style={{
                    transform: `translateX(${translateX})`,
                  }}
                >
                  <img
                    src={img}
                    alt={p.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
                    <h2 className="text-2xl font-bold mb-1">{p.title}</h2>
                    <p className="text-sm mb-1">{p.location}</p>
                    <p className="text-sm">{p.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-lavender opacity-40 rounded-full p-2 shadow hover:opacity-80 text-black z-20"
            aria-label="Previous"
          >
            &#8592;
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-lavender opacity-40 rounded-full p-2 shadow hover:opacity-80 text-black z-20"
            aria-label="Next"
          >
            &#8594;
          </button>
        </div>
        <div className="flex justify-center items-center mt-4 space-x-2">
          {featured.map((_, idx) => (
            <button
              key={idx}
              className={`rounded-full ${idx === current ? 'bg-lavender w-3 h-3' : 'bg-gray-300 w-2 h-2'}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
} 