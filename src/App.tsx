/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { RegulatoryBanner } from './components/RegulatoryBanner';
import { DocumentList } from './components/DocumentList';
import { DocumentReader } from './components/DocumentReader';
import { UrlQrModal } from './components/UrlQrModal';
import { PaperCopyModal } from './components/PaperCopyModal';
import { RevisionHistoryModal } from './components/RevisionHistoryModal';
import { RegulatoryModal } from './components/RegulatoryModal';
import { SubscribeModal } from './components/SubscribeModal';
import { 
  ZERO_ZONE_MARK_DOCUMENTS, 
  ZERO_ZONE_MARK_SRN, 
  ZERO_ZONE_MARK_BASE_URL, 
  REGULATORY_INFO,
  AVAILABLE_LANGUAGES 
} from './data/eifuDatabase';
import { eIFUDocument } from './types';
import { ShieldCheck, Building2, HelpCircle, ExternalLink, QrCode, Mail, Phone } from 'lucide-react';

export default function App() {
  const [selectedDocument, setSelectedDocument] = useState<eIFUDocument | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');

  // Modals state
  const [isUrlQrModalOpen, setIsUrlQrModalOpen] = useState<boolean>(false);
  const [isPaperCopyModalOpen, setIsPaperCopyModalOpen] = useState<boolean>(false);
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState<boolean>(false);
  const [isRegulatoryModalOpen, setIsRegulatoryModalOpen] = useState<boolean>(false);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState<boolean>(false);
  const [modalTargetDoc, setModalTargetDoc] = useState<eIFUDocument | null>(null);

  // Check URL parameters on mount (e.g. ?srn=9712190199&doc=...&lang=...)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const docParam = params.get('doc');
      const langParam = params.get('lang');

      if (langParam && AVAILABLE_LANGUAGES.some(l => l.code === langParam)) {
        setCurrentLanguage(langParam);
      }

      if (docParam) {
        const found = ZERO_ZONE_MARK_DOCUMENTS.find(d => d.id === docParam);
        if (found) {
          setSelectedDocument(found);
        }
      }
    } catch (e) {
      console.error('Error parsing URL params:', e);
    }
  }, []);

  const handleOpenUrlQrModal = (docId?: string) => {
    if (docId) {
      const doc = ZERO_ZONE_MARK_DOCUMENTS.find(d => d.id === docId);
      if (doc) setModalTargetDoc(doc);
    } else {
      setModalTargetDoc(selectedDocument || ZERO_ZONE_MARK_DOCUMENTS[0]);
    }
    setIsUrlQrModalOpen(true);
  };

  const handleOpenPaperCopyModal = (doc?: eIFUDocument) => {
    setModalTargetDoc(doc || selectedDocument || ZERO_ZONE_MARK_DOCUMENTS[0]);
    setIsPaperCopyModalOpen(true);
  };

  const handleOpenRevisionsModal = (doc?: eIFUDocument) => {
    setModalTargetDoc(doc || selectedDocument || ZERO_ZONE_MARK_DOCUMENTS[0]);
    setIsRevisionModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#E0E0E0] font-sans selection:bg-[#C5A267]/30 selection:text-[#C5A267]">
      {/* Top Header */}
      <Header
        onOpenUrlQrModal={() => handleOpenUrlQrModal()}
        onOpenPaperCopyModal={() => handleOpenPaperCopyModal()}
        onOpenSubscribeModal={() => setIsSubscribeModalOpen(true)}
        onOpenRegulatoryModal={() => setIsRegulatoryModalOpen(true)}
        currentLanguage={currentLanguage}
        onSelectLanguage={setCurrentLanguage}
      />

      {/* Main View Router */}
      {selectedDocument ? (
        /* Full Screen Document Reader View */
        <DocumentReader
          document={selectedDocument}
          selectedLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
          onBack={() => setSelectedDocument(null)}
          onOpenRevisions={() => handleOpenRevisionsModal(selectedDocument)}
          onOpenPaperCopy={() => handleOpenPaperCopyModal(selectedDocument)}
          onOpenUrlModal={() => handleOpenUrlQrModal(selectedDocument.id)}
        />
      ) : (
        /* Portal Dashboard / Document Library View */
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Regulatory Hero Banner */}
          <RegulatoryBanner
            onOpenUrlQrModal={() => handleOpenUrlQrModal()}
            onOpenPaperCopyModal={() => handleOpenPaperCopyModal()}
          />

          {/* Document List & Search Filter */}
          <DocumentList
            documents={ZERO_ZONE_MARK_DOCUMENTS}
            onSelectDocument={(doc) => setSelectedDocument(doc)}
            onOpenUrlQrModal={(docId) => handleOpenUrlQrModal(docId)}
            onOpenRevisionsModal={(doc) => handleOpenRevisionsModal(doc)}
            onOpenPaperCopyModal={(doc) => handleOpenPaperCopyModal(doc)}
            selectedLanguage={currentLanguage}
            onSelectLanguage={setCurrentLanguage}
          />
        </main>
      )}

      {/* Global Regulatory Footer in Sophisticated Dark */}
      <footer className="bg-[#0A0A0A] border-t border-white/10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs text-[#888888]">
            {/* Column 1: Zero Zone Mark & SRN */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-sm bg-[#C5A267] text-[#050505] font-serif font-black flex items-center justify-center text-xs tracking-tighter shadow-md">
                  ZZM
                </div>
                <span className="font-serif tracking-[0.15em] uppercase text-white text-sm font-bold">
                  Zero Zone Mark™
                </span>
              </div>
              <p className="text-[11px] text-[#777777] leading-relaxed">
                Official electronic Instructions for Use (eIFU) repository for Zero Zone Mark precision systems.
              </p>
              <div className="font-mono text-[11px] text-[#C5A267] bg-[#C5A267]/10 px-2.5 py-1 rounded-sm border border-[#C5A267]/30 inline-block font-semibold">
                SRN: {ZERO_ZONE_MARK_SRN}
              </div>
            </div>

            {/* Column 2: Legal Manufacturer */}
            <div className="space-y-1.5">
              <h4 className="font-serif tracking-widest text-white uppercase text-[11px] font-bold">
                Legal Manufacturer
              </h4>
              <p className="font-medium text-[#E0E0E0]">{REGULATORY_INFO.legalManufacturer.name}</p>
              <p className="text-[#777777]">{REGULATORY_INFO.legalManufacturer.address}</p>
              <p className="text-[#777777]">{REGULATORY_INFO.legalManufacturer.country}</p>
              <p className="font-mono text-[11px] pt-1 text-[#C5A267]/80">Email: {REGULATORY_INFO.legalManufacturer.contactEmail}</p>
            </div>

            {/* Column 3: Authorized Representative (EC REP) */}
            <div className="space-y-1.5">
              <h4 className="font-serif tracking-widest text-white uppercase text-[11px] font-bold flex items-center gap-1.5">
                <span>Authorized Rep (EC REP)</span>
              </h4>
              <p className="font-medium text-[#E0E0E0]">{REGULATORY_INFO.authorizedRepresentative.name}</p>
              <p className="text-[#777777]">{REGULATORY_INFO.authorizedRepresentative.address}</p>
              <p className="text-[#777777]">{REGULATORY_INFO.authorizedRepresentative.country}</p>
              <p className="font-mono text-[11px] pt-1 text-[#C5A267]/80">Email: {REGULATORY_INFO.authorizedRepresentative.contactEmail}</p>
            </div>

            {/* Column 4: Regulatory Directives */}
            <div className="space-y-2">
              <h4 className="font-serif tracking-widest text-white uppercase text-[11px] font-bold">
                Regulatory Standards
              </h4>
              <ul className="space-y-1 text-[11px] text-[#777777]">
                <li>• Regulation (EU) 2017/745 (MDR)</li>
                <li>• Commission Regulation (EU) 2021/2226 (eIFU)</li>
                <li>• FDA 21 CFR Part 801 Labeling</li>
                <li>• TÜV SÜD Notified Body CE 0123</li>
                <li>• Free Paper Copy Dispatch: 7 Days</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-widest text-[#555555]">
            <p>© 2026 Zero Zone Mark Medical & Industrial Technologies Ltd. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <button onClick={() => setIsRegulatoryModalOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                EUDAMED Registry
              </button>
              <span className="text-white/20">•</span>
              <button onClick={() => handleOpenPaperCopyModal()} className="hover:text-[#D4B47D] transition-colors text-[#C5A267] font-semibold cursor-pointer">
                Free Paper Copy
              </button>
              <span className="text-white/20">•</span>
              <button onClick={() => handleOpenUrlQrModal()} className="hover:text-[#D4B47D] transition-colors text-[#C5A267] font-semibold cursor-pointer">
                QR & URL Protocol
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <UrlQrModal
        isOpen={isUrlQrModalOpen}
        onClose={() => setIsUrlQrModalOpen(false)}
        initialDocId={modalTargetDoc?.id}
        initialLang={currentLanguage}
      />

      <PaperCopyModal
        isOpen={isPaperCopyModalOpen}
        onClose={() => setIsPaperCopyModalOpen(false)}
        selectedDoc={modalTargetDoc}
      />

      <RevisionHistoryModal
        isOpen={isRevisionModalOpen}
        onClose={() => setIsRevisionModalOpen(false)}
        document={modalTargetDoc}
      />

      <RegulatoryModal
        isOpen={isRegulatoryModalOpen}
        onClose={() => setIsRegulatoryModalOpen(false)}
      />

      <SubscribeModal
        isOpen={isSubscribeModalOpen}
        onClose={() => setIsSubscribeModalOpen(false)}
      />
    </div>
  );
}
