import React, { useState } from 'react';
import { 
  FileText, 
  QrCode, 
  BookOpen, 
  ShieldCheck, 
  ExternalLink, 
  Copy, 
  Check, 
  PackageCheck,
  Bell,
  Building2,
  Globe
} from 'lucide-react';
import { ZERO_ZONE_MARK_SRN, ZERO_ZONE_MARK_BASE_URL, REGULATORY_INFO } from '../data/eifuDatabase';

interface HeaderProps {
  onOpenUrlQrModal: () => void;
  onOpenPaperCopyModal: () => void;
  onOpenSubscribeModal: () => void;
  onOpenRegulatoryModal: () => void;
  currentLanguage: string;
  onSelectLanguage: (lang: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenUrlQrModal,
  onOpenPaperCopyModal,
  onOpenSubscribeModal,
  onOpenRegulatoryModal,
  currentLanguage,
  onSelectLanguage
}) => {
  const [copiedSrn, setCopiedSrn] = useState(false);

  const handleCopySrn = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(ZERO_ZONE_MARK_SRN);
    setCopiedSrn(true);
    setTimeout(() => setCopiedSrn(false), 2000);
  };

  return (
    <header className="bg-[#0A0A0A] border-b border-white/10 sticky top-0 z-30 shadow-2xl">
      {/* Top Compliance & Telemetry Bar */}
      <div className="bg-[#050505] text-[#888888] text-[11px] px-4 py-1.5 border-b border-white/5 uppercase tracking-wider">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium text-[#C5A267]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A267] animate-pulse"></span>
              EU MDR 2021/2226 & FDA 21 CFR 801 Compliant eIFU Portal
            </span>
            <span className="hidden md:inline text-[#333333]">|</span>
            <span className="hidden md:inline text-[#666666] tracking-widest text-[10px]">
              Verified Status: Active • System Online
            </span>
          </div>

          <div className="flex items-center gap-4 text-[#888888]">
            <button 
              onClick={onOpenRegulatoryModal}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-[#C5A267]" />
              <span>Manufacturer & EC REP</span>
            </button>
            <span className="text-[#333333]">|</span>
            <button 
              onClick={onOpenPaperCopyModal}
              className="hover:text-[#D4B47D] transition-colors text-[#C5A267] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <PackageCheck className="w-3.5 h-3.5 text-[#C5A267]" />
              <span>Free Paper Copy (7-Day Guarantee)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Brand & SRN Info */}
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-sm bg-[#C5A267] text-[#050505] flex items-center justify-center shadow-lg shadow-[#C5A267]/10 shrink-0 font-serif font-black text-xl tracking-tighter">
              ZZM
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-serif font-bold text-white tracking-[0.15em] uppercase">
                  Zero Zone Mark
                </h1>
                <span className="bg-[#C5A267]/15 text-[#C5A267] text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-sm border border-[#C5A267]/30">
                  Registry & eIFU Protocol
                </span>
                <span className="bg-[#141414] text-[#888888] text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-sm border border-white/10 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#C5A267]" />
                  CE 0123
                </span>
              </div>

              {/* SRN Quick Badge */}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] uppercase tracking-widest text-[#666666] font-medium">Single Registration Number:</span>
                <button
                  onClick={handleCopySrn}
                  title="Click to copy SRN number"
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#141414] hover:bg-[#1C1C1C] text-[#E0E0E0] rounded-sm font-mono text-xs font-semibold border border-white/10 hover:border-[#C5A267]/40 transition-colors group cursor-pointer"
                >
                  <span className="text-[#C5A267]">SRN:</span>
                  <span className="tracking-wider">{ZERO_ZONE_MARK_SRN}</span>
                  {copiedSrn ? (
                    <Check className="w-3 h-3 text-[#C5A267]" />
                  ) : (
                    <Copy className="w-3 h-3 text-[#555555] group-hover:text-[#C5A267]" />
                  )}
                </button>
                {copiedSrn && (
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A267] font-semibold animate-fade-in">
                    Copied!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Tools & Language */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Direct eIFU URL & QR Code Trigger */}
            <button
              id="btn-eifu-url-qr"
              onClick={onOpenUrlQrModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-[#C5A267] hover:bg-[#D4B47D] active:bg-[#B39055] text-[#050505] text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg transition-colors cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>eIFU URL & QR Code</span>
            </button>

            {/* Paper Copy Request Button */}
            <button
              id="btn-paper-copy-req"
              onClick={onOpenPaperCopyModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-[#141414] hover:bg-[#1C1C1C] border border-white/10 hover:border-[#C5A267]/40 text-[#E0E0E0] text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              <PackageCheck className="w-4 h-4 text-[#C5A267]" />
              <span className="hidden sm:inline">Request</span> Paper Copy
            </button>

            {/* Subscribe to Revisions */}
            <button
              id="btn-subscribe-updates"
              onClick={onOpenSubscribeModal}
              title="Subscribe to safety alerts and eIFU version updates"
              className="p-2 rounded-sm text-[#888888] hover:text-[#C5A267] hover:bg-[#141414] border border-white/10 transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
