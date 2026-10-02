export type ServiceQuestion = {
  id: string;
  label: string;
  hint: string;
  options: readonly string[];
};

export type ServicePackage = {
  id: string;
  name: string;
  text: string;
  includes: readonly string[];
};

export type Service = {
  slug: string;
  name: string;
  short: string;
  tag: string;
  intro: string;
  description: string;
  items: readonly string[];
  symptoms: readonly { id: string; label: string }[];
  packages: readonly ServicePackage[];
  questions: readonly ServiceQuestion[];
  faq: string;
  answer: string;
};

export const services: readonly Service[] = [
  {
    slug: 'car-service', name: 'Car service', short: 'Keep every kilometre running right.', tag: 'Maintenance',
    intro: 'Good maintenance starts with a closer look.',
    description: 'Explore routine servicing for your engine, fluids, filters and the everyday parts that keep your car moving.',
    items: ['Engine oil & filters', 'Fluid checks', 'Brake inspection', 'Routine health checks'],
    symptoms: [{ id: 'service-due', label: 'My routine service is due' }, { id: 'mileage-check', label: 'I want a general health check' }, { id: 'before-trip', label: 'I am preparing for a trip' }],
    packages: [
      { id: 'essential', name: 'Essential service', text: 'Routine oil, filter and fluid care.', includes: ['Engine oil and oil filter assessment', 'Fluid level inspection', 'Battery and tyre inspection'] },
      { id: 'complete', name: 'Complete service', text: 'A broader look at everyday performance.', includes: ['Essential service checks', 'Air and cabin filter assessment', 'Brake, belt and suspension inspection'] },
      { id: 'comprehensive', name: 'Comprehensive care', text: 'A detailed inspection for your next chapter.', includes: ['Complete service checks', 'Diagnostic assessment', 'Road-test findings and repair recommendations'] },
    ],
    questions: [{ id: 'mileage', label: 'Approximate mileage', hint: 'This helps us plan the right service checks.', options: ['Under 10,000 km', '10,000–50,000 km', '50,000–100,000 km', 'Over 100,000 km', 'I am not sure'] }],
    faq: 'Which service does my car need?', answer: 'Your vehicle, mileage, service history and manufacturer schedule help determine the right scope. An inspection confirms the final estimate.',
  },
  {
    slug: 'denting-painting', name: 'Denting & painting', short: 'Bring the finish back to form.', tag: 'Bodywork',
    intro: 'Every panel deserves a considered finish.',
    description: 'From a small scratch to a damaged panel, begin with an assessment of the bodywork and finish.',
    items: ['Dent assessment', 'Panel painting', 'Scratch restoration', 'Full-body paint enquiries'],
    symptoms: [{ id: 'scratch', label: 'I have a scratch or paint damage' }, { id: 'dent', label: 'I have a dent or damaged panel' }, { id: 'restore-finish', label: 'I want to restore the overall finish' }],
    packages: [
      { id: 'scratch-dent', name: 'Scratch & dent assessment', text: 'Understand the damage before choosing the repair.', includes: ['Affected panel inspection', 'Paint condition assessment', 'Repair scope and estimate'] },
      { id: 'panel-restoration', name: 'Panel restoration', text: 'Focused work for an affected area.', includes: ['Surface preparation assessment', 'Colour matching discussion', 'Finishing and inspection'] },
      { id: 'full-body', name: 'Full-body restoration', text: 'A considered approach to a complete finish.', includes: ['Full-body inspection', 'Preparation and paint plan', 'Final finish review'] },
    ],
    questions: [{ id: 'damage-area', label: 'Where is the damage?', hint: 'Choose the closest area so the team can prepare.', options: ['Front bumper or bonnet', 'Door or side panel', 'Rear bumper or boot', 'Roof', 'More than one area', 'I am not sure'] }],
    faq: 'Can I get an estimate from photos?', answer: 'Photos help us understand the affected area. A workshop inspection may still be needed to confirm damage and the final scope.',
  },
  {
    slug: 'ac-service', name: 'AC service', short: 'A cooler cabin. A better drive.', tag: 'Cooling',
    intro: 'Get comfortable behind the wheel again.',
    description: 'Start with the symptoms, then identify the right cleaning, diagnosis or repair for your air conditioning.',
    items: ['Cooling inspection', 'Leak diagnosis', 'Filter & vent care', 'Component assessment'],
    symptoms: [{ id: 'weak-cooling', label: 'The AC is not cooling well' }, { id: 'no-airflow', label: 'There is little or no airflow' }, { id: 'ac-odour', label: 'There is an unusual smell from the vents' }],
    packages: [
      { id: 'inspection', name: 'AC inspection', text: 'Find the cause of poor cooling.', includes: ['Cooling performance check', 'Visible system inspection', 'Recommended next steps'] },
      { id: 'cleaning-service', name: 'AC cleaning & service', text: 'Care for the airflow through your cabin.', includes: ['Vent and filter assessment', 'Condenser cleaning assessment', 'Refrigerant requirements check'] },
      { id: 'repair-assessment', name: 'AC repair assessment', text: 'A closer look at system components.', includes: ['Leak diagnosis', 'Compressor and cooling component assessment', 'Parts and labour estimate'] },
    ],
    questions: [{ id: 'ac-behaviour', label: 'When does the issue happen?', hint: 'This gives the technician a useful starting point.', options: ['It is weak all the time', 'It cools only while driving', 'It cools at first, then becomes warm', 'There is no cooling at all', 'I am not sure'] }],
    faq: 'Does weak cooling always need a gas refill?', answer: 'No. Weak cooling can have several causes, including leaks, airflow restrictions or component faults. Diagnosis should come before the repair.',
  },
  {
    slug: 'car-spa', name: 'Car spa', short: 'Fresh outside. Refreshed inside.', tag: 'Cleaning',
    intro: 'A little care you can feel on every drive.',
    description: 'Choose a cleaning scope that suits your car, from everyday exterior care to a deeper interior refresh.',
    items: ['Exterior wash', 'Interior cleaning', 'Deep cleaning', 'Polishing assessment'],
    symptoms: [{ id: 'interior-refresh', label: 'The interior needs a refresh' }, { id: 'exterior-clean', label: 'The exterior needs attention' }, { id: 'deep-clean', label: 'I want a deeper clean inside and out' }],
    packages: [
      { id: 'exterior-care', name: 'Exterior care', text: 'A clean start for the road ahead.', includes: ['Body wash', 'Wheel cleaning', 'Glass cleaning'] },
      { id: 'interior-refresh', name: 'Interior refresh', text: 'Give your everyday space some attention.', includes: ['Vacuuming', 'Surface cleaning', 'Upholstery assessment'] },
      { id: 'deep-care', name: 'Deep care', text: 'A more detailed clean, inside and out.', includes: ['Interior and exterior assessment', 'Deep-cleaning scope', 'Polishing options'] },
    ],
    questions: [{ id: 'spa-priority', label: 'What matters most?', hint: 'Choose one focus; you can add more detail below.', options: ['Interior cleaning', 'Exterior wash and finish', 'Stains or odour', 'Full interior and exterior clean', 'I am not sure'] }],
    faq: 'Can every stain be removed?', answer: 'Results depend on the material, stain and age. The team should assess the affected area and explain realistic expectations before cleaning.',
  },
  {
    slug: 'batteries', name: 'Batteries', short: 'Start your day with confidence.', tag: 'Electrical',
    intro: 'The right power for your next start.',
    description: 'Check battery condition and vehicle compatibility before choosing a replacement.',
    items: ['Battery health check', 'Charging-system assessment', 'Compatible replacements', 'Installation enquiry'],
    symptoms: [{ id: 'slow-start', label: 'My car is slow to start' }, { id: 'battery-warning', label: 'I see a battery warning light' }, { id: 'battery-replace', label: 'I need a compatible replacement battery' }],
    packages: [
      { id: 'battery-check', name: 'Battery check', text: 'Understand your battery condition.', includes: ['Battery condition assessment', 'Terminal inspection', 'Charging-system check'] },
      { id: 'replacement', name: 'Replacement enquiry', text: 'Find an option that fits your vehicle.', includes: ['Vehicle compatibility check', 'Available brand and capacity options', 'Manufacturer warranty details'] },
      { id: 'installation', name: 'Installation assessment', text: 'Prepare for a dependable replacement.', includes: ['Battery fitment assessment', 'Terminal care', 'Post-installation checks'] },
    ],
    questions: [{ id: 'starting-behaviour', label: 'What happens when you start the car?', hint: 'A quick symptom check helps identify the next step.', options: ['It starts slowly', 'It clicks but does not start', 'It does not start at all', 'It starts, but a warning light stays on', 'I only need a replacement'] }],
    faq: 'Which battery fits my car?', answer: 'Battery type, dimensions, capacity and terminal position depend on your vehicle. Share the make, model and variant for a compatibility check.',
  },
  {
    slug: 'car-inspection', name: 'Car inspection', short: 'Know your car. Know your next step.', tag: 'Diagnostics',
    intro: 'A clearer picture of what is under the bonnet.',
    description: 'Make informed decisions with a defined inspection scope and understandable findings.',
    items: ['General health check', 'Used-car inspection', 'Pre-trip checks', 'Diagnostic assessment'],
    symptoms: [{ id: 'used-car', label: 'I am considering a used car' }, { id: 'warning-light', label: 'A warning light or fault concerns me' }, { id: 'trip-check', label: 'I want a pre-trip check' }],
    packages: [
      { id: 'health-check', name: 'Vehicle health check', text: 'An overview of everyday condition.', includes: ['Visual and mechanical checks', 'Fluid and wear assessment', 'Findings and recommendations'] },
      { id: 'used-car-assessment', name: 'Used-car assessment', text: 'More information before your decision.', includes: ['Condition and body inspection', 'Diagnostic assessment where applicable', 'Written findings'] },
      { id: 'pre-trip', name: 'Pre-trip inspection', text: 'Prepare for the road ahead.', includes: ['Tyre, brake and fluid checks', 'Battery and lighting checks', 'Recommended work before travel'] },
    ],
    questions: [{ id: 'inspection-goal', label: 'What is the inspection for?', hint: 'The right goal helps us prepare the inspection scope.', options: ['Everyday vehicle health', 'Before buying a used car', 'Before a trip', 'A warning light or concern', 'Insurance or resale preparation'] }],
    faq: 'Will I receive a report?', answer: 'The inspection scope and report format will be confirmed when you enquire. Findings describe observed condition and recommended next steps.',
  },
  {
    slug: 'clutch-service', name: 'Clutch service', short: 'Make every gear change feel right.', tag: 'Drivetrain',
    intro: 'Bring clarity to a difficult gear change.',
    description: 'Describe slipping, noise or a heavy pedal so the right drivetrain checks can be planned.',
    items: ['Clutch diagnosis', 'Clutch-set assessment', 'Cable & hydraulic checks', 'Parts and labour estimate'],
    symptoms: [{ id: 'heavy-pedal', label: 'The clutch pedal feels heavy' }, { id: 'slipping-clutch', label: 'The clutch slips or revs rise without pulling' }, { id: 'hard-gears', label: 'Changing gears is difficult or noisy' }],
    packages: [
      { id: 'diagnosis', name: 'Clutch diagnosis', text: 'Start with the symptoms you feel.', includes: ['Pedal and engagement assessment', 'Noise and shifting assessment', 'Repair recommendations'] },
      { id: 'repair-enquiry', name: 'Clutch repair enquiry', text: 'Define the work your vehicle needs.', includes: ['Clutch assembly assessment', 'Related component checks', 'Separate parts and labour estimate'] },
      { id: 'related-components', name: 'Related components', text: 'Look beyond the clutch plate.', includes: ['Cable or hydraulic assessment', 'Bearing and flywheel assessment', 'Fluid requirements'] },
    ],
    questions: [{ id: 'clutch-symptom', label: 'Which clutch symptom fits best?', hint: 'Choose the most noticeable issue.', options: ['Heavy pedal', 'Slipping while accelerating', 'Hard or noisy gear changes', 'Burning smell', 'More than one of these'] }],
    faq: 'Is a heavy clutch always a replacement job?', answer: 'A heavy pedal may involve the cable, hydraulics or clutch assembly. Inspection helps identify the cause before replacement is recommended.',
  },
  {
    slug: 'windshield-service', name: 'Windshield service', short: 'A clear view of the road ahead.', tag: 'Glass',
    intro: 'Take a closer look at damaged glass.',
    description: 'Share the damage location and your vehicle details to discuss inspection, repair suitability and replacement options.',
    items: ['Damage inspection', 'Repair suitability', 'Replacement enquiry', 'Seal & fitment checks'],
    symptoms: [{ id: 'glass-chip', label: 'I have a chip or small crack' }, { id: 'large-crack', label: 'The windshield has a large crack' }, { id: 'leak-or-fitment', label: 'I am concerned about a leak or fitment' }],
    packages: [
      { id: 'glass-inspection', name: 'Glass inspection', text: 'Understand the damage and options.', includes: ['Damage location and size assessment', 'Visibility assessment', 'Repair suitability discussion'] },
      { id: 'replacement', name: 'Replacement enquiry', text: 'Find suitable glass for your vehicle.', includes: ['Vehicle and glass compatibility', 'Sensor and camera requirements check', 'Glass and installation estimate'] },
      { id: 'fitment', name: 'Fitment assessment', text: 'Consider the details around the glass.', includes: ['Seal and trim assessment', 'Water ingress checks', 'Calibration requirements discussion'] },
    ],
    questions: [{ id: 'glass-damage', label: 'What type of glass damage is it?', hint: 'This helps us discuss repair suitability.', options: ['Chip', 'Small crack', 'Long or spreading crack', 'Broken windshield', 'Leak or loose trim', 'I am not sure'] }],
    faq: 'Can a chip be repaired?', answer: 'Suitability depends on size, depth and position. An inspection is needed; damage affecting visibility or glass integrity may require replacement.',
  },
];

export function getService(slug: string | undefined) {
  return services.find((service) => service.slug === slug);
}

export function getServicePackage(service: Service | undefined, packageId: string | undefined) {
  return service?.packages.find((servicePackage) => servicePackage.id === packageId);
}
