import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  FileText, 
  Download, 
  BookOpen, 
  QrCode, 
  History, 
  ShieldCheck, 
  ExternalLink, 
  Calendar, 
  Package, 
  Layers, 
  Check, 
  AlertCircle,
  Copy,
  ChevronRight
} from 'lucide-react';
import { eIFUDocument, DocumentType } from '../types';
import { ZERO_ZONE_MARK_SRN, ZERO_ZONE_MARK_BASE_URL, AVAILABLE_LANGUAGES } from '../data/eifuDatabase';

interface DocumentListProps {
  documents: eIFUDocument[];
  onSelectDocument: (doc: eIFUDocument) => void;
  onOpenUrlQrModal: (docId: string) => void;
  onOpenRevisionsModal: (doc: eIFUDocument) => void;
  onOpenPaperCopyModal: (doc: eIFUDocument) => void;
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onSelectDocument,
  onOpenUrlQrModal,
  onOpenRevisionsModal,
  onOpenPaperCopyModal,
  selectedLanguage,
  onSelectLanguage
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [copiedDocId, setCopiedDocId] = useState<string | null>(null);

  const documentTypes: { label: string; value: string }[] = [
    { label: 'All Documents', value: 'ALL' },
    { label: 'Instructions for Use (eIFU)', value: 'eIFU' },
    { label: 'Quick Reference Guides', value: 'QuickGuide' },
    { label: 'Reprocessing & Sterilization', value: 'Sterilization' },
    { label: 'Declaration of Conformity', value: 'Declaration' },
  ];

  const filteredDocs = documents.filter((doc) => {
    const matchesType = filterType === 'ALL' || doc.documentType === filterType;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesType;

    const matchesSearch = 
      doc.productName.toLowerCase().includes(q) ||
      doc.title.toLowerCase().includes(q) ||
      doc.refNumber.toLowerCase().includes(q) ||
      doc.srn.toLowerCase().includes(q) ||
      doc.udiDI.toLowerCase().includes(q) ||
      doc.modelVariant.toLowerCase().includes(q) ||
      doc.tradeMark.toLowerCase().includes(q);

    return matchesType && matchesSearch;
  });

  const handleCopyLink = (docId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${ZERO_ZONE_MARK_BASE_URL}?srn=${ZERO_ZONE_MARK_SRN}&doc=${docId}&lang=${selectedLanguage}`;
    navigator.clipboard.writeText(url);
    setCopiedDocId(docId);
    setTimeout(() => setCopiedDocId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Control Card */}
      <div className="bg-[#0A0A0A] rounded-sm p-5 border border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Main Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="input-eifu-search"
              placeholder="Search by SRN (9712190199), REF number, product name, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#050505] border border-white/10 rounded-sm text-xs sm:text-sm font-medium text-white placeholder:text-[#555555] focus:border-[#C5A267]/60 focus:outline-hidden transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#888888] hover:text-white cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Language Selection */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] whitespace-nowrap hidden sm:inline">
              Language:
            </span>
            <select
              value={selectedLanguage}
              onChange={(e) => onSelectLanguage(e.target.value)}
              className="bg-[#050505] border border-white/10 rounded-sm px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#E0E0E0] focus:border-[#C5A267]/60 focus:outline-hidden cursor-pointer"
            >
              {AVAILABLE_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-[#0A0A0A] text-[#E0E0E0]">
                  {lang.name} ({lang.code.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-[#666666] font-semibold uppercase text-[10px] tracking-wider shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#C5A267]" />
            Filter:
          </span>
          {documentTypes.map((t) => (
            <button
              key={t.value}
              onClick={() => setFilterType(t.value)}
              className={`px-3 py-1.5 rounded-sm font-bold uppercase tracking-wider text-[11px] whitespace-nowrap transition-all cursor-pointer ${
                filterType === t.value
                  ? 'bg-[#C5A267] text-[#050505] shadow-sm'
                  : 'bg-[#141414] text-[#888888] hover:text-white hover:bg-[#1C1C1C] border border-white/5'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Search SRN Tip */}
      {searchQuery.includes(ZERO_ZONE_MARK_SRN) && (
        <div className="p-3 bg-[#0A0A0A] border border-[#C5A267]/40 rounded-sm text-xs text-[#E0E0E0] flex items-center justify-between">
          <span className="flex items-center gap-2 font-medium">
            <ShieldCheck className="w-4 h-4 text-[#C5A267]" />
            Filtered for manufacturer Single Registration Number (SRN): <strong className="text-[#C5A267] font-mono">{ZERO_ZONE_MARK_SRN}</strong>
          </span>
          <span className="text-[#C5A267] font-mono text-[11px] uppercase tracking-wider">EU MDR Validated</span>
        </div>
      )}

      {/* Document Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredDocs.length === 0 ? (
          <div className="bg-[#0A0A0A] rounded-sm p-12 text-center border border-white/10 space-y-3">
            <div className="w-12 h-12 rounded-sm bg-[#141414] text-[#555555] flex items-center justify-center mx-auto border border-white/5">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-serif text-white uppercase tracking-wider">No documents found</h3>
            <p className="text-xs text-[#666666] max-w-sm mx-auto">
              No matching records for "{searchQuery}". Try searching for SRN "9712190199" or "Zero Zone Mark".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterType('ALL');
              }}
              className="px-4 py-2 bg-[#C5A267] text-[#050505] text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#D4B47D] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-[#0A0A0A] rounded-sm p-5 sm:p-6 border border-white/10 hover:border-[#C5A267]/40 hover:shadow-2xl transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Top Tags & Status */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-sm bg-[#C5A267]/15 text-[#C5A267] font-bold text-[10px] uppercase tracking-widest border border-[#C5A267]/30">
                      {doc.documentType}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-sm bg-[#141414] text-[#888888] font-semibold text-[10px] uppercase tracking-wider border border-white/10 font-mono">
                      {doc.modelVariant}
                    </span>
                    <span className="px-2 py-0.5 rounded-sm bg-[#0D1F17] text-emerald-400 font-medium text-[10px] uppercase tracking-wider border border-emerald-800/40 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      {doc.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#C5A267] bg-[#C5A267]/10 px-2 py-0.5 rounded-sm border border-[#C5A267]/30">
                      {doc.currentVersion}
                    </span>
                    <span className="text-xs text-[#555555] font-mono">
                      {doc.publishedDate}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 
                  onClick={() => onSelectDocument(doc)}
                  className="text-lg sm:text-xl font-serif font-bold text-white group-hover:text-[#C5A267] transition-colors cursor-pointer tracking-wide"
                >
                  {doc.productName}
                </h3>
                <p className="text-xs text-[#777777] mt-1 leading-relaxed">
                  {doc.subtitle}
                </p>

                {/* Regulatory Identifiers Ribbon */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 p-3 bg-[#050505] rounded-sm border border-white/5 text-xs font-mono">
                  <div>
                    <span className="text-[9px] text-[#555555] uppercase block font-sans tracking-widest">Single Reg. No.</span>
                    <span className="font-bold text-[#C5A267]">{ZERO_ZONE_MARK_SRN}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#555555] uppercase block font-sans tracking-widest">Product REF</span>
                    <span className="font-semibold text-[#E0E0E0]">{doc.refNumber}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#555555] uppercase block font-sans tracking-widest">CE Notified Body</span>
                    <span className="font-semibold text-[#E0E0E0]">{doc.ceMark}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#555555] uppercase block font-sans tracking-widest">Available In</span>
                    <span className="font-semibold text-[#E0E0E0]">8 Languages (EU)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Read Online */}
                  <button
                    onClick={() => onSelectDocument(doc)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C5A267] hover:bg-[#D4B47D] text-[#050505] rounded-sm text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Read eIFU Online</span>
                  </button>

                  {/* QR & URL Tool */}
                  <button
                    onClick={() => onOpenUrlQrModal(doc.id)}
                    title="Generate QR code and link for packaging"
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#141414] hover:bg-[#1F1F1F] text-[#E0E0E0] rounded-sm text-xs font-semibold border border-white/10 hover:border-[#C5A267]/40 transition-colors cursor-pointer"
                  >
                    <QrCode className="w-3.5 h-3.5 text-[#C5A267]" />
                    <span className="hidden sm:inline">QR / URL</span>
                  </button>

                  {/* Revision History */}
                  <button
                    onClick={() => onOpenRevisionsModal(doc)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#141414] hover:bg-[#1F1F1F] text-[#E0E0E0] rounded-sm text-xs font-semibold border border-white/10 hover:border-[#C5A267]/40 transition-colors cursor-pointer"
                  >
                    <History className="w-3.5 h-3.5 text-[#888888]" />
                    <span className="hidden sm:inline">Revisions</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {/* Copy Link */}
                  <button
                    onClick={(e) => handleCopyLink(doc.id, e)}
                    className="p-2 rounded-sm border border-white/10 hover:border-[#C5A267]/40 hover:bg-[#141414] text-[#888888] hover:text-[#C5A267] transition-colors cursor-pointer"
                    title="Copy direct eIFU URL"
                  >
                    {copiedDocId === doc.id ? (
                      <Check className="w-4 h-4 text-[#C5A267]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  {/* Request Paper Copy */}
                  <button
                    onClick={() => onOpenPaperCopyModal(doc)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#141414] hover:bg-[#1F1F1F] text-[#C5A267] border border-[#C5A267]/30 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <Package className="w-3.5 h-3.5 text-[#C5A267]" />
                    <span>Free Paper Copy</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
