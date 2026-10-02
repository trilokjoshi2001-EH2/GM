import Enquiry from '@/components/enquiry';

export const metadata = { title: 'Service enquiry' };

export default async function Page({ searchParams }: {
  searchParams: Promise<{ service?: string; package?: string; symptom?: string }>
}) {
  const params = await searchParams;

  return <main id="main" className="section enquiry-page">
    <div>
      <p className="eyebrow">Your next step</p>
      <h1>LET’S TALK<br /><span>ABOUT YOUR CAR.</span></h1>
      <p className="intro">Choose the service or symptom that fits, then add the details that help the workshop prepare.</p>
      <div className="preview-note"><strong>Enquiry preview</strong><p>Prepare and copy your enquiry here. Online delivery will be connected once the workshop contact details are available.</p></div>
      <section className="enquiry-journey" aria-labelledby="enquiry-journey-title">
        <p id="enquiry-journey-title">WHAT HAPPENS NEXT</p>
        <ol>
          <li><b>01</b><span><strong>Prepare the useful details</strong>Tell us about your car, concern, location and preferred next step.</span></li>
          <li><b>02</b><span><strong>Review your enquiry</strong>Check the information before you copy or share it with a workshop.</span></li>
          <li><b>03</b><span><strong>Confirm the work together</strong>Use the enquiry as a clearer starting point for timing, inspection and final scope.</span></li>
        </ol>
      </section>
    </div>
    <Enquiry initialService={params.service ?? ''} initialPackage={params.package ?? ''} initialSymptom={params.symptom ?? ''} />
  </main>;
}
