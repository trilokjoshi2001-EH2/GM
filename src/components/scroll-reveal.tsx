'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type ScrollRevealProps = {
  children: ReactNode;
  className: string;
  id?: string;
};

export default function ScrollReveal({ children, className, id }: ScrollRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.16 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return <section ref={sectionRef} id={id} className={`${className} scroll-reveal${isVisible ? ' is-visible' : ''}`}>
    {children}
  </section>;
}
