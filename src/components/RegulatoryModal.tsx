import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  ShieldCheck, 
  MapPin, 
  Mail, 
  Phone, 
  ExternalLink, 
  Copy, 
  Check,
  FileCheck2,
  Scale
} from 'lucide-react';
import { REGULATORY_INFO, ZERO_ZONE_MARK_SRN, ZERO_ZONE_MARK_BASE_URL } from '../data/eifuDatabase';

interface RegulatoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegulatoryModal: React.FC<RegulatoryModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(id);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="bg-[#0A0A0A] rounded-sm shadow-2xl border border-white/10 w-full max-w-3xl overflow-hidden text-[#E0E0E0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#050505] text-white px-6 py-5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-sm bg-[#C5A267]/15 border border-[#C5A267]/30 text-[#C5A267]">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-white tracking-wide">
                Manufacturer, EC REP & Regulatory Compliance
              </h2>
              <p className="text-xs text-[#888888]">
                Single Registration Number (SRN): <span className="font-mono text-[#C5A267] font-bold">{ZERO_ZONE_MARK_SRN}</span>
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

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs text-[#CCCCCC]">
          {/* EUDAMED & SRN Banner */}
          <div className="p-4 bg-[#050505] border border-[#C5A267]/30 rounded-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-white flex items-center gap-1.5 text-sm uppercase tracking-wide">
                <ShieldCheck className="w-4 h-4 text-[#C5A267]" />
                EUDAMED Registered Actor Data
              </span>
              <span className="bg-emerald-950/50 border border-emerald-800/50 text-emerald-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm text-[10px]">
                Active & Verified
              </span>
            </div>
            <p className="text-[#888888] leading-relaxed">
              In accordance with Regulation (EU) 2017/745 (MDR) Article 31, the legal manufacturer is registered with the Single Registration Number (SRN) below:
            </p>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 bg-[#141414] p-2.5 rounded-sm border border-white/10 font-mono font-bold text-sm text-[#C5A267]">
                SRN: {ZERO_ZONE_MARK_SRN}
              </div>
              <button
                onClick={() => handleCopy(ZERO_ZONE_MARK_SRN, 'srn')}
                className="px-4 py-2.5 bg-[#C5A267] hover:bg-[#D4B47D] text-[#050505] rounded-sm font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
              >
                {copiedField === 'srn' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'srn' ? 'Copied' : 'Copy SRN'}</span>
              </button>
            </div>
          </div>

          {/* Legal Manufacturer & EC REP Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Manufacturer */}
            <div className="p-4 bg-[#050505] border border-white/10 rounded-sm space-y-3">
              <div className="flex items-center gap-2 font-serif font-bold text-white border-b border-white/10 pb-2 tracking-wide uppercase text-xs">
                <Building2 className="w-4 h-4 text-[#C5A267]" />
                <span>Legal Manufacturer (US)</span>
              </div>

              <div className="space-y-1 text-[#AAAAAA]">
                <strong className="text-white block font-serif">{REGULATORY_INFO.legalManufacturer.name}</strong>
                <p>{REGULATORY_INFO.legalManufacturer.address}</p>
                <p>{REGULATORY_INFO.legalManufacturer.country}</p>
              </div>

              <div className="pt-2 border-t border-white/5 space-y-1 font-mono text-[11px] text-[#777777]">
                <p>Email: <span className="text-[#C5A267]">{REGULATORY_INFO.legalManufacturer.contactEmail}</span></p>
                <p>Tel: {REGULATORY_INFO.legalManufacturer.phone}</p>
              </div>
            </div>

            {/* Authorized Representative */}
            <div className="p-4 bg-[#050505] border border-white/10 rounded-sm space-y-3">
              <div className="flex items-center gap-2 font-serif font-bold text-white border-b border-white/10 pb-2 tracking-wide uppercase text-xs">
                <span className="px-1.5 py-0.5 bg-[#C5A267]/15 border border-[#C5A267]/30 text-[#C5A267] font-bold rounded-sm text-[10px]">
                  EC REP
                </span>
                <span>Authorized Representative (EU)</span>
              </div>

              <div className="space-y-1 text-[#AAAAAA]">
                <strong className="text-white block font-serif">{REGULATORY_INFO.authorizedRepresentative.name}</strong>
                <p>{REGULATORY_INFO.authorizedRepresentative.address}</p>
                <p>{REGULATORY_INFO.authorizedRepresentative.country}</p>
              </div>

              <div className="pt-2 border-t border-white/5 space-y-1 font-mono text-[11px] text-[#777777]">
                <p>Email: <span className="text-[#C5A267]">{REGULATORY_INFO.authorizedRepresentative.contactEmail}</span></p>
                <p>Status: Registered in Netherlands CIBG / EUDAMED</p>
              </div>
            </div>
          </div>

          {/* Applicable Standards & Directives */}
          <div className="p-4 bg-[#050505] border border-white/10 rounded-sm space-y-2">
            <h3 className="font-serif font-bold text-white uppercase text-[11px] tracking-wider">
              Harmonized Standards & Quality Management
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {REGULATORY_INFO.isoStandards.map((std, i) => (
                <span key={i} className="px-2.5 py-1 bg-[#141414] border border-white/10 rounded-sm font-mono text-[11px] font-medium text-[#C5A267]">
                  {std}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#050505] px-6 py-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#141414] hover:bg-[#1F1F1F] border border-white/10 text-white rounded-sm font-semibold uppercase tracking-wider text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
