import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  QrCode, 
  ExternalLink, 
  Copy, 
  Check, 
  PackageCheck,
  CheckCircle2,
  Lock,
  Globe,
  Radio,
  Cpu
} from 'lucide-react';
import { ZERO_ZONE_MARK_SRN, ZERO_ZONE_MARK_BASE_URL } from '../data/eifuDatabase';

interface RegulatoryBannerProps {
  onOpenUrlQrModal: () => void;
  onOpenPaperCopyModal: () => void;
}

export const RegulatoryBanner: React.FC<RegulatoryBannerProps> = ({
  onOpenUrlQrModal,
  onOpenPaperCopyModal
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`${ZERO_ZONE_MARK_BASE_URL}?srn=${ZERO_ZONE_MARK_SRN}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Primary Hero Section with Large Gold Subject Reference Number */}
      <section className="relative bg-[#0A0A0A] border border-white/10 rounded-sm p-8 sm:p-12 flex flex-col items-center justify-center shadow-2xl overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-radial from-[#C5A267]/5 via-transparent to-transparent pointer-events-none"></div>

        {/* Top telemetry tags */}
        <div className="w-full flex justify-between items-center text-[10px] uppercase tracking-widest text-[#666666] mb-6">
          <span className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-[#C5A267]" />
            Subject Reference Number (SRN)
          </span>
          <span className="font-mono text-[#444444] hidden sm:inline">
            HASH: 7F8E-92B1-0199-AC42
          </span>
        </div>

        {/* Giant Gold SRN Display */}
        <div className="text-6xl sm:text-8xl md:text-9xl font-serif leading-none tracking-tight text-[#C5A267] opacity-95 my-2 select-all drop-shadow-sm font-semibold">
          {ZERO_ZONE_MARK_SRN}
        </div>

        {/* Verified Status Ribbon */}
        <div className="flex items-center gap-4 my-3">
          <div className="h-[1px] w-8 sm:w-16 bg-[#C5A267]/40"></div>
          <div className="text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[#C5A267] font-semibold text-center">
            Verified Status: Active • EU MDR 2021/2226
          </div>
          <div className="h-[1px] w-8 sm:w-16 bg-[#C5A267]/40"></div>
        </div>

        {/* Context info */}
        <p className="text-xs sm:text-sm text-[#888888] text-center max-w-2xl mt-2 leading-relaxed">
          Official electronic Instructions for Use (eIFU) repository for <strong className="text-white font-serif">Zero Zone Mark™</strong> precision systems.
          Compliant with EU Regulation 2021/2226, FDA 21 CFR Part 801, and TÜV SÜD CE 0123.
        </p>

        {/* Direct Link Action Bar */}
        <div className="mt-8 w-full max-w-2xl bg-[#050505] rounded-sm p-3 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#888888] min-w-0 w-full sm:w-auto px-2">
            <span className="text-[#C5A267] uppercase font-bold text-[10px] tracking-wider shrink-0 font-sans">eIFU Link:</span>
            <span className="truncate text-[#E0E0E0]">{ZERO_ZONE_MARK_BASE_URL}?srn={ZERO_ZONE_MARK_SRN}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
            <button
              onClick={handleCopyUrl}
              className="px-3 py-1.5 bg-[#141414] hover:bg-[#1F1F1F] text-[#E0E0E0] rounded-sm text-xs font-semibold border border-white/10 hover:border-[#C5A267]/40 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Copy direct portal link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#C5A267]" />
                  <span className="text-[#C5A267]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#888888]" />
                  <span>Copy URL</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenUrlQrModal}
              className="px-3 py-1.5 bg-[#C5A267] hover:bg-[#D4B47D] text-[#050505] rounded-sm text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>QR Protocol</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3-Column Logistics & Protocol Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Regulatory Standard */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-sm p-6 flex flex-col justify-between hover:border-white/20 transition-colors">
          <div>
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-[10px] uppercase tracking-widest text-[#888888]">
                Regulatory Protocol
              </h3>
              <ShieldCheck className="w-4 h-4 text-[#C5A267]" />
            </div>
            <p className="text-lg font-serif text-white mb-1">EU MDR 2021/2226</p>
            <p className="text-xs text-[#666666] leading-relaxed">
              Certified electronic Instructions for Use repository. Permanent 10-year revision archive guaranteed.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-white/5 flex justify-between text-[10px] uppercase tracking-wider">
            <span className="text-[#555555]">Notified Body</span>
            <span className="text-[#C5A267] font-semibold">TÜV SÜD CE 0123</span>
          </div>
        </div>

        {/* Card 2: Multilingual Deployment */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-sm p-6 flex flex-col justify-between hover:border-white/20 transition-colors">
          <div>
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-[10px] uppercase tracking-widest text-[#888888]">
                Global Deployment
              </h3>
              <Globe className="w-4 h-4 text-[#C5A267]" />
            </div>
            <p className="text-lg font-serif text-white mb-1">8 EU Languages</p>
            <p className="text-xs text-[#666666] leading-relaxed">
              Full official translations including German, French, Spanish, Italian, Japanese, Chinese, and Portuguese.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-white/5 flex justify-between text-[10px] uppercase tracking-wider">
            <span className="text-[#555555]">Compliance Region</span>
            <span className="text-[#C5A267] font-semibold">Global / EEA</span>
          </div>
        </div>

        {/* Card 3: Free Paper Copy Mandate */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-sm p-6 flex flex-col justify-between hover:border-white/20 transition-colors">
          <div>
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-[10px] uppercase tracking-widest text-[#888888]">
                Article 5 Guarantee
              </h3>
              <PackageCheck className="w-4 h-4 text-[#C5A267]" />
            </div>
            <p className="text-lg font-serif text-white mb-1">7-Day Free Dispatch</p>
            <p className="text-xs text-[#666666] leading-relaxed">
              Physical paper copies delivered at zero cost to healthcare providers within 7 calendar days.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-white/5 flex justify-between items-center text-[10px] uppercase tracking-wider">
            <span className="text-[#555555]">Dispatch SLA</span>
            <button
              onClick={onOpenPaperCopyModal}
              className="text-[#C5A267] hover:text-[#D4B47D] font-bold cursor-pointer transition-colors"
            >
              Order Copy →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
