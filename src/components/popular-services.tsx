'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Battery, Paintbrush, Snowflake, Wrench } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { services } from '@/lib/services';

const popularServices = [
  { slug: 'car-service', icon: Wrench, image: '/images/services/car-service.png', alt: 'Mechanic checking engine oil in a workshop' },
  { slug: 'ac-service', icon: Snowflake, image: '/images/services/ac-service.png', alt: 'Air-conditioning diagnostic equipment connected to a car' },
  { slug: 'denting-painting', icon: Paintbrush, image: '/images/services/denting-painting.png', alt: 'Technician polishing a car door panel' },
  { slug: 'batteries', icon: Battery, image: '/images/services/batteries.png', alt: 'Technician fitting a vehicle battery' },
].map((item) => ({ ...services.find((service) => service.slug === item.slug)!, Icon: item.icon, image: item.image, alt: item.alt }));

export default function PopularServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.18 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return <section ref={sectionRef} className={`section popular-services${isVisible ? ' is-visible' : ''}`}>
    <div className="section-heading"><div><p className="eyebrow">A useful place to start</p><h2>POPULAR CARE.<br /><span>ONE CLEAR NEXT STEP.</span></h2></div><Link className="text-link" href="/services">View all services <ArrowUpRight size={20} /></Link></div>
    <div className="popular-showcase">{popularServices.map(({ Icon, image, alt, ...service }, index) => <Link key={service.slug} className={`showcase-card ${index === 0 ? 'showcase-featured' : 'showcase-compact'}`} href={`/services/${service.slug}`} style={{ '--card-index': index } as CSSProperties}><div className="showcase-image"><Image src={image} alt={alt} fill sizes={index === 0 ? '(max-width: 800px) 88vw, 50vw' : '(max-width: 800px) 88vw, 25vw'} /><span>Illustrative service image</span></div><div className="showcase-content">{index === 0 && <span className="showcase-kicker">POPULAR START</span>}<Icon size={index === 0 ? 31 : 24} strokeWidth={1.45} /><span className="service-tag">{service.tag}</span><h3>{service.name}</h3><p>{service.short}</p></div><span className="showcase-arrow"><ArrowUpRight size={21} /></span></Link>)}</div>
  </section>;
}
