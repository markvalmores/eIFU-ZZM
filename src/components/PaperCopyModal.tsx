import React, { useState } from 'react';
import { 
  X, 
  PackageCheck, 
  Calendar, 
  CheckCircle2, 
  Building, 
  MapPin, 
  Mail, 
  Phone, 
  User, 
  AlertCircle,
  FileText,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { eIFUDocument } from '../types';
import { ZERO_ZONE_MARK_SRN, ZERO_ZONE_MARK_DOCUMENTS, AVAILABLE_LANGUAGES } from '../data/eifuDatabase';

interface PaperCopyModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDoc?: eIFUDocument | null;
}

export const PaperCopyModal: React.FC<PaperCopyModalProps> = ({
  isOpen,
  onClose,
  selectedDoc
}) => {
  const [docId, setDocId] = useState<string>(selectedDoc?.id || ZERO_ZONE_MARK_DOCUMENTS[0].id);
  const [language, setLanguage] = useState<string>('en');
  const [fullName, setFullName] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [addressLine1, setAddressLine1] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [stateProvince, setStateProvince] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [country, setCountry] = useState<string>('United States');
  const [notes, setNotes] = useState<string>('');

  const [submittedRequest, setSubmittedRequest] = useState<{
    trackingCode: string;
    estimatedDelivery: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate regulatory tracking code
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `ZZM-MDR7-${ZERO_ZONE_MARK_SRN.slice(0, 4)}-${randomNum}`;
    
    // Calculate 7-day estimated delivery per EU 2021/2226
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    const formattedDelivery = deliveryDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    setSubmittedRequest({
      trackingCode,
      estimatedDelivery: formattedDelivery,
    });
  };

  const handleReset = () => {
    setSubmittedRequest(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="bg-[#0A0A0A] rounded-sm shadow-2xl border border-white/10 w-full max-w-2xl overflow-hidden text-[#E0E0E0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#050505] text-white px-6 py-5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-sm bg-[#C5A267]/15 border border-[#C5A267]/30 text-[#C5A267]">
              <PackageCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-white tracking-wide">
                Request Free Printed Paper Copy (eIFU)
              </h2>
              <p className="text-xs text-[#C5A267]">
                Guaranteed Dispatch within 7 Calendar Days (EU Regulation 2021/2226 Art. 5)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-sm text-[#888888] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedRequest ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-sm bg-[#C5A267]/15 border border-[#C5A267]/30 text-[#C5A267] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-xl font-serif font-bold text-white tracking-wide">
                Paper Copy Order Confirmed
              </h3>
              <p className="text-xs text-[#777777] mt-1">
                Your request has been submitted to the Zero Zone Mark Regulatory Logistics Department.
              </p>
            </div>

            <div className="p-4 bg-[#050505] border border-white/10 rounded-sm text-left text-xs font-mono space-y-2 max-w-md mx-auto">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#666666] font-sans">Single Reg. Number (SRN):</span>
                <span className="font-bold text-[#C5A267]">{ZERO_ZONE_MARK_SRN}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#666666] font-sans">MDR Dispatch Tracking:</span>
                <span className="font-bold text-white">{submittedRequest.trackingCode}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#666666] font-sans">Recipient / Clinic:</span>
                <span className="font-bold text-[#CCCCCC]">{fullName} ({organization})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666] font-sans">Guaranteed Max Delivery:</span>
                <span className="font-bold text-emerald-400">{submittedRequest.estimatedDelivery}</span>
              </div>
            </div>

            <p className="text-xs text-[#777777] max-w-md mx-auto">
              A confirmation email with shipping updates has been sent to <strong className="text-white">{email}</strong>. This service is provided at zero cost to the healthcare provider.
            </p>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-[#C5A267] hover:bg-[#D4B47D] text-[#050505] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-md"
            >
              Return to eIFU Portal
            </button>
          </div>
        ) : (
          /* Request Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            <div className="p-3.5 bg-[#141005] border border-[#C5A267]/30 rounded-sm text-xs text-[#E5D7BE] flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#C5A267] shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block text-[#C5A267] uppercase font-serif tracking-wider text-[11px]">Regulatory Guarantee (EU 2021/2226):</strong>
                Under European and international medical device regulations, qualified healthcare professionals and device operators are entitled to receive hard-copy printed instructions for use free of charge, with expedited courier shipment within 7 days.
              </div>
            </div>

            {/* Document & Language Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#888888] mb-1">
                  Requested Document:
                </label>
                <select
                  value={docId}
                  onChange={(e) => setDocId(e.target.value)}
                  className="w-full bg-[#050505] border border-white/10 rounded-sm px-3 py-2 text-xs font-medium text-white focus:border-[#C5A267]/60 focus:outline-hidden cursor-pointer"
                >
                  {ZERO_ZONE_MARK_DOCUMENTS.map((doc) => (
                    <option key={doc.id} value={doc.id} className="bg-[#0A0A0A] text-white">
                      {doc.productName} ({doc.currentVersion})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#888888] mb-1">
                  Required Print Language:
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-[#050505] border border-white/10 rounded-sm px-3 py-2 text-xs font-medium text-white focus:border-[#C5A267]/60 focus:outline-hidden cursor-pointer"
                >
                  {AVAILABLE_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-[#0A0A0A] text-white">
                      {lang.name} ({lang.nativeName})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Recipient Information */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <h3 className="text-[10px] font-bold text-[#888888] uppercase tracking-widest font-serif">
                Recipient & Healthcare Facility
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#888888] mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Sarah Jenkins"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-sm px-3 py-2 text-xs font-medium text-white placeholder:text-[#555555] focus:border-[#C5A267]/60 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#888888] mb-1">
                    Hospital / Clinic / Institution *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Boston General Hospital"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-sm px-3 py-2 text-xs font-medium text-white placeholder:text-[#555555] focus:border-[#C5A267]/60 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#888888] mb-1">
                    Department / Suite
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Surgical Suite 4, Cryo-Medicine"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-sm px-3 py-2 text-xs font-medium text-white placeholder:text-[#555555] focus:border-[#C5A267]/60 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#888888] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. sjenkins@hospital.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-sm px-3 py-2 text-xs font-medium text-white placeholder:text-[#555555] focus:border-[#C5A267]/60 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <h3 className="text-[10px] font-bold text-[#888888] uppercase tracking-widest font-serif">
                Shipping Destination (Courier Delivery)
              </h3>

              <div>
                <label className="block text-[11px] font-medium text-[#888888] mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 750 Longwood Avenue"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  className="w-full bg-[#050505] border border-white/10 rounded-sm px-3 py-2 text-xs font-medium text-white placeholder:text-[#555555] focus:border-[#C5A267]/60 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-[#888888] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Boston"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-sm px-3 py-2 text-xs font-medium text-white placeholder:text-[#555555] focus:border-[#C5A267]/60 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#888888] mb-1">
                    State / Region
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MA"
                    value={stateProvince}
                    onChange={(e) => setStateProvince(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-sm px-3 py-2 text-xs font-medium text-white placeholder:text-[#555555] focus:border-[#C5A267]/60 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#888888] mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 02115"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-sm px-3 py-2 text-xs font-medium text-white placeholder:text-[#555555] focus:border-[#C5A267]/60 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#888888] mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-sm px-3 py-2 text-xs font-medium text-white placeholder:text-[#555555] focus:border-[#C5A267]/60 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Modal Buttons */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <span className="text-[11px] text-[#666666] font-mono">
                SRN: {ZERO_ZONE_MARK_SRN}
              </span>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-[#141414] hover:bg-[#1F1F1F] border border-white/10 text-[#CCCCCC] rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C5A267] hover:bg-[#D4B47D] text-[#050505] rounded-sm text-xs font-bold uppercase tracking-wider shadow-md transition-colors cursor-pointer"
                >
                  Submit 7-Day Paper Request
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
