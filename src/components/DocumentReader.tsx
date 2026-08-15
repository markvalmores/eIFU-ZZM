import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  ShieldAlert, 
  History, 
  Globe, 
  Share2, 
  Copy, 
  Check, 
  FileCheck,
  Building,
  Bookmark
} from 'lucide-react';
import { eIFUDocument, DocumentSection } from '../types';
import { ZERO_ZONE_MARK_SRN, ZERO_ZONE_MARK_BASE_URL } from '../data/eifuDatabase';

interface DocumentReaderProps {
  document: eIFUDocument;
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  onBack: () => void;
  onOpenRevisions: () => void;
  onOpenPaperCopy: () => void;
  onOpenUrlModal: () => void;
}

export const DocumentReader: React.FC<DocumentReaderProps> = ({
  document,
  selectedLanguage,
  onLanguageChange,
  onBack,
  onOpenRevisions,
  onOpenPaperCopy,
  onOpenUrlModal
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('sec-1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Active language object
  const currentLangObj = useMemo(() => {
    return document.languages.find(l => l.code === selectedLanguage) || document.languages[0];
  }, [document.languages, selectedLanguage]);

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return document.sections;
    const q = searchQuery.toLowerCase();

    return document.sections.filter(sec => {
      const matchTitle = sec.title.toLowerCase().includes(q);
      const matchContent = sec.content.some(c => c.toLowerCase().includes(q));
      const matchSubs = sec.subsections?.some(sub => 
        sub.title.toLowerCase().includes(q) || 
        sub.content.some(c => c.toLowerCase().includes(q))
      );
      const matchWarns = sec.warnings?.some(w => w.toLowerCase().includes(q));
      return matchTitle || matchContent || matchSubs || matchWarns;
    });
  }, [document.sections, searchQuery]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      
      // Trigger download of generated PDF blob or document manifest
      const content = `=============================================================================
ZERO ZONE MARK™ - OFFICIAL ELECTRONIC INSTRUCTIONS FOR USE (eIFU)
SINGLE REGISTRATION NUMBER (SRN): ${ZERO_ZONE_MARK_SRN}
DOCUMENT: ${document.productName}
VERSION: ${document.currentVersion} | RELEASE DATE: ${document.publishedDate}
LANGUAGE: ${currentLangObj.name} (${currentLangObj.nativeName})
CE MARK: ${document.ceMark} | NOTIFIED BODY: ${document.notifiedBody}
ONLINE ACCESS PORTAL: ${ZERO_ZONE_MARK_BASE_URL}?srn=${ZERO_ZONE_MARK_SRN}
=============================================================================

INTENDED PURPOSE:
${document.intendedPurpose}

REGULATORY COMPLIANCE:
This document complies with EU Regulation 2021/2226 for electronic instructions
for use (eIFU) and FDA 21 CFR Part 801. Free paper copies are guaranteed within
7 calendar days upon request.

-----------------------------------------------------------------------------
DOCUMENT CONTENTS & VERIFIED CLINICAL PROTOCOLS:
-----------------------------------------------------------------------------

${document.sections.map(s => `
[${s.number}] ${s.title.toUpperCase()}
${s.content.join('\n\n')}

${s.warnings ? 'WARNINGS:\n' + s.warnings.map(w => '  ! ' + w).join('\n') + '\n' : ''}
${s.cautions ? 'CAUTIONS:\n' + s.cautions.map(c => '  * ' + c).join('\n') + '\n' : ''}
${s.subsections ? s.subsections.map(sub => `
  [${sub.number}] ${sub.title}
  ${sub.content.join('\n  ')}
  ${sub.table ? '\n  TABLE DATA:\n' + sub.table.headers.join(' | ') + '\n  ' + sub.table.rows.map(r => r.join(' | ')).join('\n  ') : ''}
`).join('\n') : ''}
`).join('\n-----------------------------------------------------------------------------\n')}

=============================================================================
LEGAL MANUFACTURER:
Zero Zone Mark Medical & Industrial Technologies Ltd.
SRN: ${ZERO_ZONE_MARK_SRN}
Authorized Representative (EC REP): MedReg Compliance Europe B.V., Netherlands
=============================================================================`;

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `eIFU_${document.id}_SRN_${ZERO_ZONE_MARK_SRN}_${selectedLanguage.toUpperCase()}_${document.currentVersion}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1200);
  };

  const handleCopyDirectLink = () => {
    const link = `${ZERO_ZONE_MARK_BASE_URL}?srn=${ZERO_ZONE_MARK_SRN}&doc=${document.id}&lang=${selectedLanguage}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Font size class mapper
  const fontSizeClass = {
    normal: 'text-sm sm:text-base leading-relaxed',
    large: 'text-base sm:text-lg leading-relaxed',
    xlarge: 'text-lg sm:text-xl leading-relaxed',
  }[fontSize];  return (
    <div className={`min-h-screen flex flex-col ${highContrast ? 'bg-black text-white' : 'bg-[#050505] text-[#E0E0E0]'}`}>
      {/* Reader Control Bar (Sticky) */}
      <div className={`sticky top-0 z-20 border-b px-4 py-3 shadow-2xl transition-colors ${
        highContrast ? 'bg-black border-white/20 text-white' : 'bg-[#0A0A0A] border-white/10 text-[#E0E0E0]'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Back & Document Title */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onBack}
              className="p-2 rounded-sm border border-white/10 bg-[#141414] hover:bg-[#1F1F1F] text-[#E0E0E0] hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#C5A267]" />
              <span>Back</span>
            </button>

            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-serif font-bold text-white truncate tracking-wide">
                {document.productName}
              </h1>
              <div className="flex items-center gap-2 text-xs text-[#888888]">
                <span className="font-mono font-semibold text-[#C5A267]">SRN: {ZERO_ZONE_MARK_SRN}</span>
                <span className="text-white/20">•</span>
                <span className="font-mono text-[#C5A267]">{document.currentVersion}</span>
                <span className="text-white/20">•</span>
                <span className="hidden sm:inline font-mono">{document.refNumber}</span>
              </div>
            </div>
          </div>

          {/* Reader Tools */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Language Selector */}
            <div className="flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#888888]" />
              <select
                value={selectedLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="text-xs font-semibold rounded-sm px-2.5 py-1.5 bg-[#141414] border border-white/10 text-[#E0E0E0] hover:bg-[#1C1C1C] transition-colors cursor-pointer"
              >
                {document.languages.map((l) => (
                  <option key={l.code} value={l.code} className="bg-[#0A0A0A] text-[#E0E0E0]">
                    {l.name} ({l.code.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>

            {/* Font Size Adjusters */}
            <div className="hidden sm:flex items-center border border-white/10 rounded-sm overflow-hidden text-xs bg-[#141414]">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2.5 py-1.5 font-semibold transition-colors ${fontSize === 'normal' ? 'bg-[#C5A267] text-[#050505] font-bold' : 'text-[#888888] hover:text-white'}`}
                title="Normal font size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2.5 py-1.5 font-bold transition-colors ${fontSize === 'large' ? 'bg-[#C5A267] text-[#050505] font-black' : 'text-[#888888] hover:text-white'}`}
                title="Large font size"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2.5 py-1.5 font-black text-sm transition-colors ${fontSize === 'xlarge' ? 'bg-[#C5A267] text-[#050505]' : 'text-[#888888] hover:text-white'}`}
                title="Extra large font size"
              >
                A++
              </button>
            </div>

            {/* High Contrast Toggle */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`p-2 rounded-sm border text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                highContrast 
                  ? 'bg-[#C5A267] text-[#050505] border-[#C5A267]' 
                  : 'bg-[#141414] hover:bg-[#1C1C1C] text-[#888888] hover:text-white border-white/10'
              }`}
              title="Toggle high contrast clinical mode"
            >
              Contrast
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopyDirectLink}
              className="p-2 rounded-sm border border-white/10 bg-[#141414] hover:bg-[#1C1C1C] text-[#888888] hover:text-[#C5A267] transition-colors cursor-pointer"
              title="Copy direct eIFU URL"
            >
              {copiedLink ? <Check className="w-4 h-4 text-[#C5A267]" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Print */}
            <button
              onClick={handlePrint}
              className="p-2 rounded-sm border border-white/10 bg-[#141414] hover:bg-[#1C1C1C] text-[#888888] hover:text-white transition-colors cursor-pointer"
              title="Print official document"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Download eIFU */}
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C5A267] hover:bg-[#D4B47D] text-[#050505] rounded-sm text-xs font-bold uppercase tracking-wider shadow-md transition-colors cursor-pointer disabled:opacity-50"
            >
              {isDownloading ? (
                <span>Generating...</span>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#050505]" />
                  <span>Downloaded</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-[#050505]" />
                  <span>Download eIFU</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col lg:flex-row gap-8">
        {/* Left Sticky Navigation / Table of Contents */}
        <aside className="lg:w-72 shrink-0 space-y-4">
          {/* Quick Search in Document */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search in this eIFU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-sm border border-white/10 bg-[#0A0A0A] text-white placeholder:text-[#555555] transition-colors focus:outline-hidden focus:border-[#C5A267]/60"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#888888] hover:text-white cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Table of Contents Card */}
          <div className="p-4 rounded-sm border border-white/10 bg-[#0A0A0A] shadow-xl">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#888888] mb-3 flex items-center justify-between">
              <span>Table of Contents</span>
              <span className="font-mono text-[10px] text-[#C5A267]">{filteredSections.length} Chapters</span>
            </h2>

            <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
              {filteredSections.map((sec) => {
                const isActive = activeSectionId === sec.id;
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setActiveSectionId(sec.id)}
                    className={`block px-3 py-2 rounded-sm text-xs transition-colors ${
                      isActive
                        ? 'bg-[#C5A267]/15 text-[#C5A267] font-bold border-l-2 border-[#C5A267]'
                        : 'text-[#888888] hover:bg-[#141414] hover:text-white'
                    }`}
                  >
                    <span className="font-mono mr-1.5 text-[#555555]">{sec.number}</span>
                    <span>{sec.title}</span>
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Quick Regulatory Card */}
          <div className="p-4 rounded-sm border border-white/10 bg-[#0A0A0A] space-y-2.5 text-xs">
            <div className="font-bold text-[#C5A267] flex items-center gap-1.5 text-xs uppercase tracking-wider font-serif">
              <ShieldAlert className="w-4 h-4 text-[#C5A267]" />
              <span>EU MDR eIFU Notice</span>
            </div>
            <p className="text-[#777777] text-[11px] leading-relaxed">
              Paper instructions for use can be requested free of charge within 7 calendar days.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={onOpenPaperCopy}
                className="w-full px-2.5 py-2 bg-[#141414] hover:bg-[#1F1F1F] text-[#C5A267] border border-[#C5A267]/30 rounded-sm font-bold uppercase tracking-wider text-[10px] transition-colors cursor-pointer"
              >
                Request Free Paper Copy
              </button>
            </div>
          </div>
        </aside>

        {/* Center Main Document Article */}
        <main className="flex-1 min-w-0">
          <div className="p-6 sm:p-10 rounded-sm border border-white/10 bg-[#0A0A0A] shadow-2xl">
            {/* Document Header Metadata Banner */}
            <div className="border-b border-white/10 pb-6 mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-sm bg-[#C5A267]/15 text-[#C5A267] font-bold text-[10px] uppercase tracking-widest border border-[#C5A267]/30">
                  {document.documentType}
                </span>
                <span className="px-2.5 py-0.5 rounded-sm bg-[#0D1F17] text-emerald-400 font-semibold text-[10px] uppercase tracking-wider border border-emerald-800/40 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {document.status}
                </span>
                <span className="px-2.5 py-0.5 rounded-sm bg-[#141414] text-[#888888] font-semibold text-[10px] uppercase tracking-wider border border-white/10">
                  {document.riskClass}
                </span>
                <span className="px-2.5 py-0.5 rounded-sm bg-[#141414] text-[#888888] font-semibold text-[10px] uppercase tracking-wider border border-white/10 font-mono">
                  {document.ceMark}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-wide mt-2 text-white">
                {document.productName}
              </h1>
              <p className="text-xs sm:text-sm text-[#777777] mt-1">
                {document.subtitle}
              </p>

              {/* Specification Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 p-4 rounded-sm text-xs font-mono bg-[#050505] border border-white/5 text-[#E0E0E0]">
                <div>
                  <span className="block text-[9px] text-[#555555] uppercase font-sans tracking-widest">Single Reg. No (SRN)</span>
                  <span className="font-bold text-[#C5A267]">{ZERO_ZONE_MARK_SRN}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-[#555555] uppercase font-sans tracking-widest">Model / REF</span>
                  <span className="font-bold text-[#E0E0E0]">{document.refNumber}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-[#555555] uppercase font-sans tracking-widest">Version</span>
                  <span className="font-bold text-[#C5A267]">{document.currentVersion}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-[#555555] uppercase font-sans tracking-widest">Release Date</span>
                  <span className="font-bold text-[#E0E0E0]">{document.publishedDate}</span>
                </div>
              </div>

              {/* Intended Purpose Block */}
              <div className="mt-4 p-4 rounded-sm text-xs leading-relaxed bg-[#050505] border border-white/10 text-[#CCCCCC]">
                <strong className="font-bold text-[#C5A267] block mb-1 uppercase font-serif tracking-wider text-[11px]">Intended Purpose & Clinical Scope:</strong>
                {document.intendedPurpose}
              </div>
            </div>

            {/* Document Sections Content */}
            <div className="space-y-12">
              {filteredSections.map((sec) => (
                <section 
                  key={sec.id} 
                  id={sec.id}
                  className="scroll-mt-20 border-b pb-10 border-white/5 last:border-0"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs font-bold text-[#C5A267] bg-[#C5A267]/10 px-2.5 py-1 rounded-sm border border-[#C5A267]/30">
                      {sec.number}
                    </span>
                    <h2 className="text-lg sm:text-xl font-serif font-bold text-white tracking-wide">
                      {sec.title}
                    </h2>
                  </div>

                  {/* Body Paragraphs */}
                  <div className={`space-y-3 ${fontSizeClass} text-[#CCCCCC]`}>
                    {sec.content.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {/* Warnings Callout Box */}
                  {sec.warnings && sec.warnings.length > 0 && (
                    <div className="my-5 p-4 rounded-sm bg-[#1A0A0A] border-l-2 border-red-500 text-red-200 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-red-400 text-xs uppercase tracking-wider">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span>Crucial Safety Warnings</span>
                      </div>
                      <ul className="space-y-1.5 text-xs sm:text-sm pl-1 text-red-200/90">
                        {sec.warnings.map((w, wIdx) => (
                          <li key={wIdx} className="font-medium">
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Cautions Callout Box */}
                  {sec.cautions && sec.cautions.length > 0 && (
                    <div className="my-5 p-4 rounded-sm bg-[#1A160A] border-l-2 border-[#C5A267] text-[#E5D7BE] space-y-2">
                      <div className="flex items-center gap-2 font-bold text-[#C5A267] text-xs uppercase tracking-wider font-serif">
                        <Info className="w-4 h-4 text-[#C5A267]" />
                        <span>Precautionary Notice</span>
                      </div>
                      <ul className="space-y-1.5 text-xs sm:text-sm pl-1">
                        {sec.cautions.map((c, cIdx) => (
                          <li key={cIdx}>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Subsections */}
                  {sec.subsections && sec.subsections.length > 0 && (
                    <div className="mt-6 space-y-6 pl-2 sm:pl-4 border-l border-white/10">
                      {sec.subsections.map((sub) => (
                        <div key={sub.id} id={sub.id} className="space-y-3">
                          <h3 className="text-sm sm:text-base font-serif font-bold text-white flex items-center gap-2">
                            <span className="font-mono text-xs text-[#C5A267]">{sub.number}</span>
                            <span>{sub.title}</span>
                          </h3>

                          <div className={`space-y-2 text-xs sm:text-sm text-[#BBBBBB]`}>
                            {sub.content.map((subP, subPIdx) => (
                              <p key={subPIdx}>{subP}</p>
                            ))}
                          </div>

                          {/* Render Table if available */}
                          {sub.table && (
                            <div className="mt-4 overflow-x-auto rounded-sm border border-white/10">
                              <table className="w-full text-xs text-left">
                                <thead className="bg-[#050505] text-[#C5A267] uppercase font-serif tracking-wider text-[10px]">
                                  <tr>
                                    {sub.table.headers.map((h, hIdx) => (
                                      <th key={hIdx} className="px-4 py-2.5 border-b border-white/10">
                                        {h}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 bg-[#0A0A0A]">
                                  {sub.table.rows.map((row, rIdx) => (
                                    <tr key={rIdx} className="hover:bg-[#141414]">
                                      {row.map((cell, cIdx) => (
                                        <td key={cIdx} className="px-4 py-2.5 text-[#CCCCCC] font-mono text-[11px]">
                                          {cell}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Bottom Regulatory Footer */}
            <div className="mt-12 pt-8 border-t border-white/10 space-y-4 text-xs text-[#777777]">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="font-serif font-bold text-white uppercase tracking-wider text-[11px]">
                    Zero Zone Mark™ Medical & Industrial Technologies Ltd.
                  </p>
                  <p>Single Registration Number (SRN): <span className="font-mono font-bold text-[#C5A267]">{ZERO_ZONE_MARK_SRN}</span></p>
                  <p>Authorized Representative: MedReg Compliance Europe B.V., The Hague, Netherlands</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={onOpenRevisions}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm border border-white/10 hover:bg-[#141414] text-[#E0E0E0] text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <History className="w-3.5 h-3.5 text-[#C5A267]" />
                    <span>Archived Revisions</span>
                  </button>
                  <button
                    onClick={onOpenUrlModal}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm bg-[#C5A267] hover:bg-[#D4B47D] text-[#050505] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share eIFU Link</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
