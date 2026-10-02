import Link from 'next/link';
import { ArrowUpRight, Check, ChevronRight } from 'lucide-react';
import { getService, services } from '@/lib/services';
import { notFound } from 'next/navigation';
import ServiceVisual from '@/components/service-visual';
import ServiceEnquiryForm from '@/components/service-enquiry-form';

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  return { title: service?.name ?? 'Service', description: service?.description };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return <main id="main">
    <section className="detail-hero section">
      <div>
        <div className="breadcrumbs"><Link href="/services">Services</Link><ChevronRight size={14} /><span>{service.name}</span></div>
        <p className="eyebrow">{service.tag}</p>
        <h1>{service.name.toUpperCase()}<span>.</span></h1>
        <h2>{service.intro}</h2>
        <p className="intro">{service.description}</p>
        <Link className="button" href={`/enquire?service=${service.slug}`}>Enquire about {service.name.toLowerCase()} <ArrowUpRight size={18} /></Link>
      </div>
      <ServiceVisual service={service} />
    </section>

    <section className="section symptom-section" aria-labelledby="symptom-title">
      <div className="section-heading"><div><p className="eyebrow">Start with what you notice</p><h2 id="symptom-title">A USEFUL FIRST CLUE.</h2></div><p>Choose the closest symptom to prepare a more useful enquiry.</p></div>
      <div className="symptom-list">
        {service.symptoms.map((symptom, index) => <Link key={symptom.id} href={`/enquire?service=${service.slug}&symptom=${symptom.id}`}><span>0{index + 1}</span>{symptom.label}<ArrowUpRight size={20} /></Link>)}
      </div>
    </section>

    <section className="section package-section">
      <div className="section-heading"><div><p className="eyebrow">Choose a starting scope</p><h2>START WITH THE RIGHT SCOPE.</h2></div><p>Final inclusions, timing and pricing are confirmed after understanding your vehicle.</p></div>
      <div className="packages">
        {service.packages.map((servicePackage, index) => <article key={servicePackage.id}><span className="service-tag">{index === 0 ? 'Start here' : index === 1 ? 'A closer look' : 'More considered care'}</span><h3>{servicePackage.name}</h3><p>{servicePackage.text}</p><ul>{servicePackage.includes.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul><Link className="text-link" href={`/enquire?service=${service.slug}&package=${servicePackage.id}`}>Discuss this option <ArrowUpRight size={18} /></Link></article>)}
      </div>
    </section>

    <ServiceEnquiryForm service={service} />

    <section className="section scope-note"><h2>CLEAR BEFORE WE BEGIN.</h2><p>Your estimate should explain the agreed work, parts, labour and any additional requirements. Ask about availability, timing and applicable warranty terms when discussing your vehicle.</p></section>
    <section className="section faq"><h2>A USEFUL THING TO KNOW.</h2><details open><summary>{service.faq}</summary><p>{service.answer}</p></details></section>
    <section className="closing compact"><h2>LET’S TAKE A CLOSER LOOK.</h2><Link className="button light" href={`/enquire?service=${service.slug}`}>Prepare your enquiry <ArrowUpRight size={20} /></Link></section>
  </main>;
}
