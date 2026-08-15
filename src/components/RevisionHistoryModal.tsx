import React, { useState } from 'react';
import { 
  X, 
  History, 
  Download, 
  CheckCircle2, 
  FileCheck, 
  Calendar, 
  UserCheck, 
  AlertCircle, 
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { eIFUDocument, RevisionEntry } from '../types';
import { ZERO_ZONE_MARK_SRN } from '../data/eifuDatabase';

interface RevisionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: eIFUDocument | null;
}

export const RevisionHistoryModal: React.FC<RevisionHistoryModalProps> = ({
  isOpen,
  onClose,
  document
}) => {
  const [selectedRevision, setSelectedRevision] = useState<RevisionEntry | null>(
    document?.revisions[0] || null
  );

  if (!isOpen || !document) return null;

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
              <History className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-white tracking-wide">
                Archived Revision History & Version Control
              </h2>
              <p className="text-xs text-[#888888]">
                Regulatory eIFU Trail • Single Registration Number (SRN): <span className="font-mono text-[#C5A267] font-semibold">{ZERO_ZONE_MARK_SRN}</span>
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
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Document Summary Info */}
          <div className="p-4 bg-[#050505] border border-white/10 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-[10px] text-[#666666] uppercase tracking-widest block font-serif">Document Title</span>
              <strong className="text-white font-serif font-bold text-sm tracking-wide">{document.productName}</strong>
              <span className="text-[#888888] block mt-0.5">{document.subtitle}</span>
            </div>
            <div className="sm:text-right font-mono">
              <span className="text-[10px] text-[#666666] uppercase tracking-widest block font-serif">Active Release</span>
              <span className="font-bold text-[#C5A267] bg-[#C5A267]/15 border border-[#C5A267]/30 px-2.5 py-0.5 rounded-sm text-xs inline-block mt-0.5">
                {document.currentVersion} (Current Valid)
              </span>
            </div>
          </div>

          {/* Revision Timeline */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-[#888888] uppercase tracking-widest font-serif">
              Revision Log (Retained for 10+ Years per EU MDR)
            </h3>

            <div className="space-y-3">
              {document.revisions.map((rev) => (
                <div
                  key={rev.version}
                  className={`p-4 rounded-sm border transition-all ${
                    rev.isCurrent
                      ? 'bg-[#141209] border-[#C5A267]/50 shadow-md'
                      : 'bg-[#050505] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-sm font-mono font-bold text-xs ${
                        rev.isCurrent ? 'bg-[#C5A267] text-[#050505]' : 'bg-[#141414] border border-white/10 text-[#888888]'
                      }`}>
                        {rev.version}
                      </span>
                      {rev.isCurrent && (
                        <span className="text-emerald-400 bg-emerald-950/50 border border-emerald-800/50 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Currently In Force
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[#777777] font-mono">
                      <span>Release: {rev.releaseDate}</span>
                      <span>•</span>
                      <span>Effective: {rev.effectiveDate}</span>
                    </div>
                  </div>

                  {/* Summary of Changes */}
                  <div className="mt-2 text-xs text-[#CCCCCC] space-y-1">
                    <strong className="text-[10px] text-[#888888] block uppercase tracking-widest font-serif">
                      Modifications in this release:
                    </strong>
                    <ul className="list-disc list-inside space-y-1 pl-1 text-[#AAAAAA]">
                      {rev.summaryOfChanges.map((change, cIdx) => (
                        <li key={cIdx}>{change}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Sign-off Authority */}
                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-[#777777]">
                    <div className="flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-[#C5A267]" />
                      <span>Approved by: <strong className="text-[#E0E0E0]">{rev.approvedBy}</strong></span>
                    </div>
                    <span className="font-mono text-[#555555]">File size: {rev.fileSize}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#050505] px-6 py-4 border-t border-white/10 flex items-center justify-between text-xs text-[#777777]">
          <span className="text-[#888888] font-medium">
            All historic electronic IFU revisions remain permanently accessible online.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#141414] hover:bg-[#1F1F1F] border border-white/10 text-white rounded-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Close History
          </button>
        </div>
      </div>
    </div>
  );
};
