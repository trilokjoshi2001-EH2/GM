import ServiceDirectory from '@/components/service-directory';
export const metadata={title:'Our services'};
export default function Services(){return <main id="main" className="section service-index"><p className="eyebrow">Our services</p><h1>EVERY PART.<br/><span>CONSIDERED.</span></h1><p className="intro">Maintenance, repairs and a little extra attention. Search by the service you need or the symptom you have noticed.</p><ServiceDirectory/></main>}
