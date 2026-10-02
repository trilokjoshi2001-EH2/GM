'use client';

import Link from 'next/link';
import { ArrowUpRight, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { services } from '@/lib/services';

export default function ServiceDirectory() {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('All');
  const tags = ['All', ...new Set(services.map((service) => service.tag))];
  const visibleServices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return services.filter((service) => {
      const searchable = [service.name, service.tag, service.short, ...service.symptoms.map((symptom) => symptom.label)].join(' ').toLowerCase();
      return (tag === 'All' || service.tag === tag) && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [query, tag]);

  return (
    <>
      <div className="directory-controls" aria-label="Filter services">
        <label className="directory-search"><Search size={18} /><span className="sr-only">Search services</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by service or symptom" /></label>
        <div className="directory-tags" aria-label="Service categories">
          {tags.map((item) => <button key={item} type="button" aria-pressed={tag === item} onClick={() => setTag(item)}>{item}</button>)}
        </div>
      </div>
      <div className="service-directory">
        {visibleServices.map((service) => (
          <Link href={`/services/${service.slug}`} key={service.slug}>
            <span className="service-tag">{service.tag}</span>
            <h2>{service.name}</h2>
            <p>{service.short}</p>
            <ArrowUpRight size={30} />
          </Link>
        ))}
      </div>
      {visibleServices.length === 0 && <p className="directory-empty">No service matches that search. <Link href="/enquire">Tell us what you are noticing instead.</Link></p>}
    </>
  );
}
