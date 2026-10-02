'use client';

import Link from 'next/link';
import { ArrowUpRight, Paintbrush, Sparkles, Wrench } from 'lucide-react';
import { useState } from 'react';
import { services } from '@/lib/services';

const paths = [
  { id: 'care', number: '01', title: 'Routine care', label: 'Keep it running', text: 'Keep your everyday drive feeling right.', icon: Wrench, services: ['car-service', 'car-inspection', 'batteries'] },
  { id: 'repair', number: '02', title: 'Something feels wrong', label: 'Find the cause', text: 'Start with the symptom that needs attention.', icon: Sparkles, services: ['ac-service', 'clutch-service', 'windshield-service'] },
  { id: 'appearance', number: '03', title: 'Refresh the finish', label: 'Restore the detail', text: 'Give the exterior or cabin some attention.', icon: Paintbrush, services: ['denting-painting', 'car-spa'] },
] as const;

export default function ServiceFinder() {
  const [activeId, setActiveId] = useState<(typeof paths)[number]['id']>('care');
  const activePath = paths.find((path) => path.id === activeId) ?? paths[0];
  const suggestedServices = activePath.services.map((slug) => services.find((service) => service.slug === slug)).filter(Boolean);

  return <section className="service-navigator" id="help" aria-labelledby="help-title">
    <div className="navigator-heading"><div><p className="eyebrow">A clearer starting point</p><h2 id="help-title">WHAT ARE YOU<br /><span>NOTICING?</span></h2></div><p>Choose the feeling, symptom or priority that is closest to your car today. We will show a useful next step.</p></div>
    <div className="navigator-shell"><div className="navigator-choices" role="tablist" aria-label="Choose what your car needs"><p>CHOOSE A STARTING POINT</p>{paths.map((path) => { const Icon = path.icon; const isActive = activeId === path.id; return <button key={path.id} role="tab" type="button" aria-selected={isActive} className={isActive ? 'is-active' : ''} onClick={() => setActiveId(path.id)}><span className="navigator-number">{path.number}</span><Icon size={23} strokeWidth={1.55} /><span><small>{path.label}</small><strong>{path.title}</strong></span><ArrowUpRight size={18} /></button>; })}</div><div className="navigator-result" role="tabpanel" key={activePath.id}><div className="navigator-result-top"><span>YOUR NEXT STEP</span><h3>{activePath.title}</h3><p>{activePath.text}</p></div><div className="navigator-service-list">{suggestedServices.map((service) => service && <Link key={service.slug} href={`/services/${service.slug}`}><span>{service.tag}</span><strong>{service.name}</strong><ArrowUpRight size={18} /></Link>)}</div><Link className="navigator-enquire" href="/enquire">Not sure yet? Tell us what you notice <ArrowUpRight size={18} /></Link></div></div>
  </section>;
}
