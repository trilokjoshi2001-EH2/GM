export const serviceEnquiryDraftKey = 'automechnics-service-enquiry-draft';

export type ServiceEnquiryDraft = {
  service: string;
  packageId: string;
  symptomId: string;
  name: string;
  phone: string;
  vehicle: string;
  details: string;
  answers: Record<string, string>;
};
