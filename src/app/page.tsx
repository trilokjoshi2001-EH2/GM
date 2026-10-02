import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CarFront, ClipboardCheck, MessageCircleMore, Snowflake, Wrench } from 'lucide-react';
import ScrollReveal from '@/components/scroll-reveal';

const steps = [
  { number: '01', title: 'Tell us what you notice', text: 'Start with the sound, feeling, warning light or repair you have in mind.', Icon: MessageCircleMore },
  { number: '02', title: 'Choose a service', text: 'Browse the useful starting point, without needing to name the exact repair.', Icon: Wrench },
  { number: '03', title: 'Prepare your enquiry', text: 'Bring the details together for a clearer conversation with a workshop.', Icon: ClipboardCheck },
];

const featuredServices = [
  { name: 'Car service', detail: 'Keep everyday maintenance on track.', href: '/services/car-service', image: '/images/services/car-service.png', Icon: CarFront },
  { name: 'AC service', detail: 'A cooler cabin for every drive.', href: '/services/ac-service', image: '/images/services/ac-service.png', Icon: Snowflake },
];

export default function Home() {
  return (
    <main id="main" className="calm-home">
      <section className="calm-hero">
        <div className="calm-hero-copy">
          <p className="calm-kicker"><span /> TRUSTED AUTO CARE</p>
          <h1>CAR CARE,<br />MADE <em>CLEAR.</em></h1>
          <p className="calm-lead">Clear advice, straightforward enquiries and a team that keeps you moving.</p>
          <div className="calm-actions">
            <Link className="calm-primary" href="/enquire">Start an enquiry <ArrowUpRight size={19} /></Link>
            <Link className="calm-secondary" href="/services">See services <ArrowUpRight size={18} /></Link>
          </div>
        </div>
        <div className="calm-hero-image">
          <Image src="/images/calm-workshop-hero.png" alt="Mechanic inspecting the wheel of a vehicle in a bright workshop" fill priority sizes="(max-width: 800px) 100vw, 59vw" />
          <span className="calm-photo-note">ILLUSTRATIVE WORKSHOP IMAGE</span>
        </div>
      </section>

      <ScrollReveal className="calm-steps" id="how-it-works">
        {steps.map(({ number, title, text, Icon }) => (
          <article key={number}>
            <div className="calm-step-icon"><Icon size={25} /></div>
            <div><span>{number}</span><h2>{title}</h2><p>{text}</p></div>
          </article>
        ))}
      </ScrollReveal>

      <ScrollReveal className="calm-services" id="help">
        <div className="calm-services-heading">
          <div><p className="calm-kicker"><span /> POPULAR STARTING POINTS</p><h2>CARE FOR THE<br /><em>ROAD AHEAD.</em></h2></div>
          <p>Start with a familiar service, or browse every option to find the right next step for your car.</p>
        </div>
        <div className="calm-service-list">
          {featuredServices.map(({ name, detail, href, image, Icon }, index) => (
            <Link href={href} key={name} className="calm-service-row">
              <span className="calm-service-number">0{index + 1}</span>
              <span className="calm-service-icon"><Icon size={27} /></span>
              <span className="calm-service-copy"><strong>{name}</strong><small>{detail}</small></span>
              <span className="calm-service-image"><Image src={image} alt="" fill sizes="(max-width: 800px) 42vw, 28vw" /></span>
              <ArrowUpRight className="calm-service-arrow" size={21} />
            </Link>
          ))}
        </div>
        <Link className="calm-all-services" href="/services">View all services <ArrowUpRight size={18} /></Link>
      </ScrollReveal>

      <ScrollReveal className="calm-explainer">
        <div className="calm-explainer-copy">
          <p className="calm-kicker"><span /> A BETTER FIRST CONVERSATION</p>
          <h2>LESS GUESSWORK.<br /><em>MORE CLARITY.</em></h2>
          <p>We help you put the useful details in one place. You choose a service or describe what you have noticed, then prepare a message that is ready to share.</p>
          <Link className="calm-secondary" href="/enquire">Prepare an enquiry <ArrowUpRight size={18} /></Link>
        </div>
        <div className="calm-explainer-list">
          <div><b>01</b><span>Start with a symptom or service</span></div>
          <div><b>02</b><span>Add your vehicle details</span></div>
          <div><b>03</b><span>Take a prepared enquiry to the workshop</span></div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="calm-closing">
        <p>WHEN YOU ARE READY</p><h2>LET’S START WITH<br /><em>YOUR CAR.</em></h2>
        <Link className="calm-primary" href="/enquire">Start an enquiry <ArrowUpRight size={19} /></Link>
      </ScrollReveal>
    </main>
  );
}
