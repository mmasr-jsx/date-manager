'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import sample1 from '../../public/sample1-removebg-preview.png';
import sample2 from '../../public/sample2-removebg-preview.png';
import sample3 from '../../public/sample3-removebg-preview.png';

const slides = [
  {
    id: 1,
    image: sample1,
    title: 'Titulo 1 - Diapositiva 1 mostrandose',
    description: 'Creando Experiencias de Alta Gama',
  },
  {
    id: 2,
    image: sample2,
    title: 'indeed 2! - Titulo y diapositiva 2',
    description: 'Su Proveedor de Peluqueria Integral',
  },
  {
    id: 3,
    image: sample3,
    title: 'Diablo 2! - Diapositiva 3 mostrandose',
    description:
      'Si los elementos tienen opacity: 0 durante la mayoría del tiempo de animación, puede parecer que no ocurre nada. Puedes modificar temporalmente las propiedades de opacidad para depurar, Comprueba si los nombres de las animaciones (glitch-anim-2, glitch-anim-3, glitch-anim-4, glitch-anim-flash) están definidos y corresponden correctamente a las reglas @keyframes.',
  },
];

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3500); // Change slide every 3.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-1/5 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-detail-0 flex">
            <div className="w-3/5 flex items-center justify-center text-white">
              <div className="text-center p-8">
                <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl">{slide.description}</p>
              </div>
            </div>
            <div className="w-2/5 relative h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                layout="fill"
                className="z-0 object-contain"
              />
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-accent-500' : 'bg-primary-300'
            }`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}
