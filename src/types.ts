export type DocumentType = 
  | 'eIFU'
  | 'QuickGuide'
  | 'Safety'
  | 'Sterilization'
  | 'Declaration'
  | 'TechnicalSpec';

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  fileSize: string;
  pageCount: number;
  pdfUrl?: string;
}

export interface DocumentSection {
  id: string;
  title: string;
  number: string;
  content: string[];
  subsections?: {
    id: string;
    title: string;
    number: string;
    content: string[];
    warnings?: string[];
    cautions?: string[];
    notes?: string[];
    table?: {
      headers: string[];
      rows: string[][];
    };
  }[];
  warnings?: string[];
  cautions?: string[];
  notes?: string[];
}

export interface RevisionEntry {
  version: string;
  releaseDate: string;
  effectiveDate: string;
  summaryOfChanges: string[];
  isCurrent: boolean;
  fileSize: string;
  archivedUrl?: string;
  approvedBy: string;
}

export interface eIFUDocument {
  id: string;
  srn: string;
  productName: string;
  tradeMark: string;
  modelVariant: string;
  refNumber: string;
  udiDI: string;
  basicUdi: string;
  gmdnCode: string;
  riskClass: 'Class I' | 'Class IIa' | 'Class IIb' | 'Class III';
  documentType: DocumentType;
  title: string;
  subtitle: string;
  currentVersion: string;
  publishedDate: string;
  lastUpdated: string;
  languages: LanguageOption[];
  revisions: RevisionEntry[];
  sections: DocumentSection[];
  ceMark: string;
  notifiedBody: string;
  status: 'Active / Valid' | 'Archived' | 'Draft';
  intendedPurpose: string;
  storageConditions: string;
}

export interface RegulatoryInfo {
  srn: string;
  legalManufacturer: {
    name: string;
    address: string;
    country: string;
    contactEmail: string;
    phone: string;
  };
  authorizedRepresentative: {
    name: string;
    address: string;
    country: string;
    contactEmail: string;
  };
  portalUrl: string;
  euMdrRegulation: string;
  fdaRegulation: string;
  isoStandards: string[];
  paperCopyDeadlineDays: number;
}

export interface PaperCopyRequest {
  id: string;
  srn: string;
  productName: string;
  language: string;
  version: string;
  recipientName: string;
  organization: string;
  department?: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  trackingCode: string;
  status: 'Received' | 'Processing' | 'Dispatched' | 'Delivered';
  requestedAt: string;
  estimatedDelivery: string;
}

export interface URLConfig {
  baseUrl: string;
  srn: string;
  selectedLang: string;
  selectedDocId: string;
  version: string;
  directUrl: string;
  qrPayload: string;
  embedCode: string;
  packagingLabelSnippet: string;
}
