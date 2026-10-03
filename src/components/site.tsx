'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Brand() {
  return <Link href="/" className="brand" aria-label="Automechnics home"><svg width="37" height="36" viewBox="0 0 40 40" aria-hidden="true"><path d="M3 33 16 7h9L12 33Zm14 0 9-18 11 18H26l-4-7-4 7Z" fill="currentColor" /></svg><span>AUTOMECHNICS<small>CAR CARE, CONSIDERED.</small></span></Link>;
}

// Temporarily disabled header scroll-car. Keep this markup for a later restore.
// function ScrollCar() {
//   return <span className="scroll-car" aria-hidden="true"><img className="scroll-car-image" src="/images/scroll-car-outline.png" alt="" /></span>;
// }

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Temporarily disabled with the header scroll-car.
  // const [scrollProgress, setScrollProgress] = useState(0);
  // const [isDriving, setIsDriving] = useState(false);
  // const driveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 16);
      // const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      // setScrollProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
      // if (fromScroll) {
      //   setIsDriving(true);
      //   if (driveTimer.current) clearTimeout(driveTimer.current);
      //   driveTimer.current = setTimeout(() => setIsDriving(false), 180);
      // }
    };
    const onScroll = () => update();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      // if (driveTimer.current) clearTimeout(driveTimer.current);
    };
  }, []);

  return <header className={`header ${pathname === '/' ? 'home-header' : ''} ${scrolled ? 'is-scrolled' : ''}`}><Brand /><nav aria-label="Main navigation" className={open ? 'nav open' : 'nav'}><Link onClick={() => setOpen(false)} href="/">Home</Link><Link onClick={() => setOpen(false)} href="/services">Our services</Link><Link onClick={() => setOpen(false)} href="/#help">Find the right service</Link><Link onClick={() => setOpen(false)} href="/#how-it-works">How it works</Link><Link onClick={() => setOpen(false)} href="/enquire" className="button small">Get an estimate <ArrowUpRight size={17} /></Link></nav><button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button>{/* Temporarily disabled header scroll-car: <span className="scroll-progress" aria-hidden="true"><ScrollCar /></span> */}</header>;
}

export function Footer() {
  return <footer><div className="footer-top"><Brand /><p>Good care. Clear conversations.<br />Better days on the road.</p><Link href="/enquire">Let’s talk about your car <ArrowUpRight size={20} /></Link></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Automechnics</span><span>Design preview · Workshop imagery is illustrative</span></div></footer>;
}
