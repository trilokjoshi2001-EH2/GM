import type { LucideIcon } from 'lucide-react';
import { Battery, Cog, Paintbrush, PanelsTopLeft, ScanLine, Snowflake, Sparkles, Wrench } from 'lucide-react';
import type { Service } from '@/lib/services';

const icons: Record<string, LucideIcon> = {
  'car-service': Wrench,
  'denting-painting': Paintbrush,
  'ac-service': Snowflake,
  'car-spa': Sparkles,
  batteries: Battery,
  'car-inspection': ScanLine,
  'clutch-service': Cog,
  'windshield-service': PanelsTopLeft,
};

export default function ServiceVisual({ service }: { service: Service }) {
  const Icon = icons[service.slug] ?? Wrench;
  return <div className="service-visual" data-service={service.slug} aria-hidden="true"><span>{service.tag}</span><Icon strokeWidth={1.1} /><strong>{service.name}</strong><i /></div>;
}
