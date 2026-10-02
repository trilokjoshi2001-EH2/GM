'use client';

import { useEffect, useState } from 'react';
import { getService, getServicePackage, services } from '@/lib/services';
import { serviceEnquiryDraftKey, type ServiceEnquiryDraft } from '@/lib/service-enquiry-draft';

type EnquiryProps = { initialService: string; initialPackage: string; initialSymptom: string; };
type ContactDetails = { name: string; phone: string; vehicle: string; details: string; };

export default function Enquiry({ initialService, initialPackage, initialSymptom }: EnquiryProps) {
  const initial = getService(initialService);
  const validInitialPackage = getServicePackage(initial, initialPackage)?.id ?? '';
  const validInitialSymptom = initial?.symptoms.find((symptom) => symptom.id === initialSymptom)?.id ?? '';
  const [serviceSlug, setServiceSlug] = useState(initial?.slug ?? '');
  const [packageId, setPackageId] = useState(validInitialPackage);
  const [symptomId, setSymptomId] = useState(validInitialSymptom);
  const [contact, setContact] = useState<ContactDetails>({ name: '', phone: '', vehicle: '', details: '' });
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [draftImported, setDraftImported] = useState(false);
  const [summary, setSummary] = useState('');
  const [copied, setCopied] = useState(false);
  const service = getService(serviceSlug);
  const servicePackage = getServicePackage(service, packageId);
  const symptom = service?.symptoms.find((item) => item.id === symptomId);

  useEffect(() => {
    const rawDraft = window.sessionStorage.getItem(serviceEnquiryDraftKey);
    if (!rawDraft || !initial || initial.slug !== initialService) return;

    try {
      const draft = JSON.parse(rawDraft) as ServiceEnquiryDraft;
      if (draft.service !== initial.slug) return;
      setContact({ name: draft.name ?? '', phone: draft.phone ?? '', vehicle: draft.vehicle ?? '', details: draft.details ?? '' });
      setAnswers(draft.answers ?? {});
      setPackageId(getServicePackage(initial, draft.packageId)?.id ?? validInitialPackage);
      setSymptomId(initial.symptoms.some((item) => item.id === draft.symptomId) ? draft.symptomId : validInitialSymptom);
      setDraftImported(true);
      window.sessionStorage.removeItem(serviceEnquiryDraftKey);
    } catch {
      window.sessionStorage.removeItem(serviceEnquiryDraftKey);
    }
  }, [initial, initialService, validInitialPackage, validInitialSymptom]);

  function updateContact(field: keyof ContactDetails, value: string) {
    setContact((current) => ({ ...current, [field]: value }));
    setSummary('');
  }

  function chooseService(nextSlug: string) {
    setServiceSlug(nextSlug);
    setPackageId('');
    setSymptomId('');
    setAnswers({});
    setSummary('');
  }

  function createSummary(form: HTMLFormElement) {
    if (!service) return;
    const data = new FormData(form);
    const serviceAnswers = service.questions.map((question) => {
      const value = data.get(question.id);
      return value ? `${question.label}: ${value}` : '';
    }).filter(Boolean);

    setSummary([
      'Automechnics service enquiry',
      `Name: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      `Vehicle: ${data.get('vehicle')}`,
      data.get('area') ? `Area or postcode: ${data.get('area')}` : '',
      `Service: ${service.name}`,
      symptom ? `What I noticed: ${symptom.label}` : '',
      servicePackage ? `Preferred starting scope: ${servicePackage.name}` : 'Preferred starting scope: Please advise',
      data.get('visit') ? `Preferred next step: ${data.get('visit')}` : '',
      data.get('date') ? `Preferred date: ${data.get('date')}` : '',
      data.get('time') ? `Preferred time: ${data.get('time')}` : '',
      data.get('contact-method') ? `Preferred contact method: ${data.get('contact-method')}` : '',
      ...serviceAnswers,
      `Additional details: ${data.get('details') || 'Please advise.'}`,
    ].filter(Boolean).join('\n'));
    setCopied(false);
  }

  return <div className="enquiry-form">
    <form onSubmit={(event) => { event.preventDefault(); createSummary(event.currentTarget); }}>
      {draftImported && <p className="draft-imported" role="status">Your service-page details have been added below.</p>}
      <label>Your name<input name="name" autoComplete="name" required maxLength={80} value={contact.name} onChange={(event) => updateContact('name', event.target.value)} placeholder="Full name" /></label>
      <label>Phone number<input name="phone" type="tel" autoComplete="tel" required pattern="[+0-9 ()-]{7,20}" maxLength={20} value={contact.phone} onChange={(event) => updateContact('phone', event.target.value)} placeholder="Your contact number" /></label>
      <label>Your car<input name="vehicle" required maxLength={100} value={contact.vehicle} onChange={(event) => updateContact('vehicle', event.target.value)} placeholder="Make, model and year (if known)" /></label>
      <fieldset className="booking-preferences">
        <legend>Plan your next step <span>(optional)</span></legend>
        <div>
          <label>Area or postcode<input name="area" maxLength={80} placeholder="Where should the workshop be convenient?" /></label>
          <label>How would you like to continue?<select name="visit"><option value="">Choose a preference</option><option>Workshop visit</option><option>Pick-up and drop-off</option><option>Please advise me</option></select></label>
          <label>Preferred date<input name="date" type="date" /></label>
          <label>Preferred time<select name="time"><option value="">Choose a time</option><option>Morning</option><option>Afternoon</option><option>Evening</option><option>Flexible</option></select></label>
          <label>Preferred contact<select name="contact-method"><option value="">Choose a contact method</option><option>Phone call</option><option>WhatsApp</option><option>Email</option></select></label>
        </div>
      </fieldset>
      <label>What needs attention?<select name="service" value={serviceSlug} onChange={(event) => chooseService(event.target.value)} required><option value="" disabled>Choose a service</option>{services.map((item) => <option value={item.slug} key={item.slug}>{item.name}</option>)}</select></label>
      {service && <>
        <label>What are you noticing?<select name="symptom" value={symptomId} onChange={(event) => { setSymptomId(event.target.value); setSummary(''); }}><option value="">Choose a symptom or goal (optional)</option>{service.symptoms.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
        <fieldset className="package-picker"><legend>Choose a starting scope <span>(optional)</span></legend><p>The final scope is confirmed after the workshop understands your vehicle.</p>{service.packages.map((item) => <label key={item.id}><input type="radio" name="package" value={item.id} checked={packageId === item.id} onChange={() => { setPackageId(item.id); setSummary(''); }} /><span><strong>{item.name}</strong>{item.text}</span></label>)}</fieldset>
        {service.questions.map((question) => <label key={question.id}>{question.label}<small>{question.hint}</small><select name={question.id} value={answers[question.id] ?? ''} onChange={(event) => { setAnswers((current) => ({ ...current, [question.id]: event.target.value })); setSummary(''); }}><option value="">Choose an answer (optional)</option>{question.options.map((option) => <option key={option}>{option}</option>)}</select></label>)}
      </>}
      <label>Anything else we should know?<textarea name="details" rows={3} maxLength={1200} value={contact.details} onChange={(event) => updateContact('details', event.target.value)} placeholder="Symptoms, service history, or a question" /></label>
      <button className="button" type="submit" disabled={!service}>Prepare my enquiry ↗</button>
      <p className="form-note">Your details stay in this browser preview. Nothing is sent.</p>
    </form>
    {summary && <div className="enquiry-summary" role="status"><h3>Your enquiry is ready to copy.</h3><pre>{summary}</pre><button className="button" onClick={async () => { try { await navigator.clipboard.writeText(summary); setCopied(true); } catch { setCopied(false); } }}>{copied ? 'Copied' : 'Copy enquiry'}</button><p>You can also select the text above to copy it manually.</p></div>}
  </div>;
}
