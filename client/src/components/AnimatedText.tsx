import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function AnimatedText({ text, className = "", delay = 0 }: AnimatedTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const letters = containerRef.current.querySelectorAll('.letter');
    
    // Set initial state
    gsap.set(letters, {
      y: 100,
      opacity: 0,
      scale: 0.5,
      rotation: 15
    });

    // Animate letters in
    gsap.to(letters, {
      y: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.8,
      ease: "back.out(2)",
      stagger: 0.1,
      delay: delay
    });
  }, [delay]);

  const renderLetters = () => {
    return text.split('').map((char, index) => (
      <span 
        key={index} 
        className="letter inline-block"
        style={{ 
          display: char === ' ' ? 'inline' : 'inline-block',
          width: char === ' ' ? '0.5em' : 'auto'
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <span ref={containerRef} className={className}>
      {renderLetters()}
    </span>
  );
}