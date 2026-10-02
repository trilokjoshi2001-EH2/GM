'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import type { Service } from '@/lib/services';
import { serviceEnquiryDraftKey, type ServiceEnquiryDraft } from '@/lib/service-enquiry-draft';

export default function ServiceEnquiryForm({ service }: { service: Service }) {
  const router = useRouter();
  const [symptomId, setSymptomId] = useState('');
  const [packageId, setPackageId] = useState('');

  function continueToEnquiry(form: HTMLFormElement) {
    const data = new FormData(form);
    const answers = Object.fromEntries(service.questions.map((question) => [question.id, String(data.get(question.id) ?? '')]));
    const draft: ServiceEnquiryDraft = {
      service: service.slug,
      packageId,
      symptomId,
      name: String(data.get('name') ?? ''),
      phone: String(data.get('phone') ?? ''),
      vehicle: String(data.get('vehicle') ?? ''),
      details: String(data.get('details') ?? ''),
      answers,
    };

    window.sessionStorage.setItem(serviceEnquiryDraftKey, JSON.stringify(draft));
    const params = new URLSearchParams({ service: service.slug });
    if (symptomId) params.set('symptom', symptomId);
    if (packageId) params.set('package', packageId);
    router.push(`/enquire?${params.toString()}`);
  }

  return (
    <section className="section service-enquiry-section" id="service-enquiry" aria-labelledby="service-enquiry-title">
      <div className="service-enquiry-intro">
        <p className="eyebrow">Tell us about your car</p>
        <h2 id="service-enquiry-title">A CLEARER<br /><span>STARTING POINT.</span></h2>
        <p>Share the essentials for {service.name.toLowerCase()}. We will carry these details into your enquiry, ready for you to review and copy.</p>
        <div className="service-enquiry-privacy"><CheckCircle2 size={17} /> Nothing is sent from this form.</div>
      </div>

      <form className="service-detail-form" onSubmit={(event) => { event.preventDefault(); continueToEnquiry(event.currentTarget); }}>
        <div className="service-detail-form-grid">
          <label>Your name<input name="name" autoComplete="name" required maxLength={80} placeholder="Full name" /></label>
          <label>Phone number<input name="phone" type="tel" autoComplete="tel" required pattern="[+0-9 ()-]{7,20}" maxLength={20} placeholder="Your contact number" /></label>
          <label className="service-detail-form-wide">Your car<input name="vehicle" required maxLength={100} placeholder="Make, model and year (if known)" /></label>
          <label>What are you noticing?<select value={symptomId} onChange={(event) => setSymptomId(event.target.value)}><option value="">Choose a symptom or goal (optional)</option>{service.symptoms.map((symptom) => <option key={symptom.id} value={symptom.id}>{symptom.label}</option>)}</select></label>
          {service.questions.map((question) => <label key={question.id}>{question.label}<small>{question.hint}</small><select name={question.id} required><option value="">Choose an answer</option>{question.options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>)}
        </div>

        <fieldset className="service-scope-picker">
          <legend>Preferred starting scope <span>(optional)</span></legend>
          <div>{service.packages.map((item) => <label key={item.id}><input type="radio" name="package" value={item.id} checked={packageId === item.id} onChange={() => setPackageId(item.id)} /><span><strong>{item.name}</strong>{item.text}</span></label>)}</div>
        </fieldset>

        <label>Anything else we should know?<textarea name="details" rows={4} maxLength={1200} placeholder="Symptoms, service history, timing, or a question" /></label>
        <button className="button" type="submit">Continue to enquiry <ArrowUpRight size={19} /></button>
      </form>
    </section>
  );
}
