import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  CheckCircle2, 
  Mail, 
  ShieldCheck, 
  Building, 
  Send 
} from 'lucide-react';
import { ZERO_ZONE_MARK_SRN } from '../data/eifuDatabase';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({
  isOpen,
  onClose
}) => {
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [receiveSafetyAlerts, setReceiveSafetyAlerts] = useState(true);
  const [receiveRevisions, setReceiveRevisions] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="bg-[#0A0A0A] rounded-sm shadow-2xl border border-white/10 w-full max-w-md overflow-hidden text-[#E0E0E0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#050505] text-white px-6 py-5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-sm bg-[#C5A267]/15 border border-[#C5A267]/30 text-[#C5A267]">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-white tracking-wide">
                Subscribe to eIFU Updates
              </h2>
              <p className="text-xs text-[#888888]">
                Zero Zone Mark • SRN: <span className="font-mono text-[#C5A267] font-semibold">{ZERO_ZONE_MARK_SRN}</span>
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

        {isSubmitted ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-sm bg-[#C5A267]/15 border border-[#C5A267]/30 text-[#C5A267] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white tracking-wide">
                Subscription Registered
              </h3>
              <p className="text-xs text-[#777777] mt-1 leading-relaxed">
                You will be notified immediately at <strong className="text-white">{email}</strong> when a new eIFU revision or Field Safety Notice is published for SRN {ZERO_ZONE_MARK_SRN}.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-2.5 bg-[#C5A267] hover:bg-[#D4B47D] text-[#050505] rounded-sm text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <p className="text-[#888888] leading-relaxed">
              Receive automatic notifications when updated electronic Instructions for Use (eIFU) or safety advisories are released.
            </p>

            <div>
              <label className="block font-semibold text-[#888888] mb-1">
                Hospital / Institution Email *
              </label>
              <input
                type="email"
                required
                placeholder="clinical-engineering@hospital.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 rounded-sm px-3 py-2 text-xs font-medium text-white placeholder:text-[#555555] focus:border-[#C5A267]/60 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#888888] mb-1">
                Organization / Facility Name
              </label>
              <input
                type="text"
                placeholder="e.g. St. Jude Healthcare Network"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 rounded-sm px-3 py-2 text-xs font-medium text-white placeholder:text-[#555555] focus:border-[#C5A267]/60 focus:outline-hidden"
              />
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={receiveRevisions}
                  onChange={(e) => setReceiveRevisions(e.target.checked)}
                  className="rounded-xs accent-[#C5A267]"
                />
                <span className="text-[#CCCCCC] font-medium">New eIFU document revisions & manual updates</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={receiveSafetyAlerts}
                  onChange={(e) => setReceiveSafetyAlerts(e.target.checked)}
                  className="rounded-xs accent-[#C5A267]"
                />
                <span className="text-[#CCCCCC] font-medium">Field Safety Notices (FSN) & Vigilance Alerts</span>
              </label>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 bg-[#141414] hover:bg-[#1F1F1F] border border-white/10 text-[#CCCCCC] rounded-sm font-semibold uppercase tracking-wider text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#C5A267] hover:bg-[#D4B47D] text-[#050505] rounded-sm font-bold uppercase tracking-wider text-xs shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Subscribe</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
