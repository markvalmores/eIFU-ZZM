import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  QrCode as QrIcon, 
  FileCode, 
  Layers, 
  Share2, 
  Printer, 
  Tag,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { ZERO_ZONE_MARK_SRN, ZERO_ZONE_MARK_BASE_URL, AVAILABLE_LANGUAGES, ZERO_ZONE_MARK_DOCUMENTS } from '../data/eifuDatabase';

interface UrlQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDocId?: string;
  initialLang?: string;
}

export const UrlQrModal: React.FC<UrlQrModalProps> = ({
  isOpen,
  onClose,
  initialDocId = 'eifu-zzm-9700-primary',
  initialLang = 'en'
}) => {
  const [selectedDocId, setSelectedDocId] = useState(initialDocId);
  const [selectedLang, setSelectedLang] = useState(initialLang);
  const [includeSrn, setIncludeSrn] = useState(true);
  const [activeTab, setActiveTab] = useState<'url' | 'qr' | 'embed' | 'label'>('url');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sync with prop changes
  useEffect(() => {
    if (initialDocId) setSelectedDocId(initialDocId);
    if (initialLang) setSelectedLang(initialLang);
  }, [initialDocId, initialLang]);

  // Construct URLs
  const baseUrl = ZERO_ZONE_MARK_BASE_URL.replace(/\/$/, '');
  
  // Standard direct eIFU URL with SRN
  const directSrnUrl = `${baseUrl}/?srn=${ZERO_ZONE_MARK_SRN}`;
  
  // Fully qualified deep link
  const deepLinkUrl = `${baseUrl}/?srn=${ZERO_ZONE_MARK_SRN}&doc=${selectedDocId}&lang=${selectedLang}`;
  
  // GS1 Digital Link compliant URI
  const gs1DigitalLinkUrl = `${baseUrl}/01/00850097121901/21/9712190199?srn=${ZERO_ZONE_MARK_SRN}&lang=${selectedLang}`;

  // Current active target URL for QR
  const currentTargetUrl = includeSrn ? deepLinkUrl : `${baseUrl}/`;

  // Generate QR Code
  useEffect(() => {
    if (!isOpen) return;

    QRCode.toDataURL(currentTargetUrl, {
      width: 320,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => {
        setQrDataUrl(url);
      })
      .catch((err) => {
        console.error('QR generation error:', err);
      });
  }, [currentTargetUrl, isOpen]);

  if (!isOpen) return null;

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `ZeroZoneMark_eIFU_QR_SRN_${ZERO_ZONE_MARK_SRN}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Embed HTML snippet
  const embedCodeSnippet = `<!-- Zero Zone Mark eIFU Portal Badge (SRN: ${ZERO_ZONE_MARK_SRN}) -->
<a href="${directSrnUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;padding:8px 14px;background:#0d9488;color:#ffffff;border-radius:6px;font-family:sans-serif;text-decoration:none;font-size:13px;font-weight:600;">
  <span>📖 View eIFU (SRN: ${ZERO_ZONE_MARK_SRN})</span>
</a>`;

  // Packaging Label Print HTML specification
  const packagingLabelSnippet = `=====================================================
ZERO ZONE MARK™ MEDICAL & INDUSTRIAL TECHNOLOGIES
Model: ZZM-9700 Series | Single Reg. No (SRN): ${ZERO_ZONE_MARK_SRN}
Electronic Instructions for Use (eIFU) Access:
🔗 Portal URL: ${baseUrl}/
📄 Direct eIFU Link: ${directSrnUrl}
📱 Scan Packaging QR Code for Multilingual Instructions
Guaranteed Free Paper Copy within 7 Days (EU 2021/2226)
=====================================================`;

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
              <QrIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2 tracking-wide">
                eIFU URL & QR Code Distribution
              </h2>
              <p className="text-xs text-[#888888]">
                Zero Zone Mark™ • SRN: <span className="font-mono text-[#C5A267] font-semibold">{ZERO_ZONE_MARK_SRN}</span>
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

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-[#050505] px-6 pt-3 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('url')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t-sm transition-all border-b-2 cursor-pointer ${
              activeTab === 'url'
                ? 'border-[#C5A267] text-[#C5A267] bg-[#0A0A0A]'
                : 'border-transparent text-[#777777] hover:text-white hover:bg-[#141414]'
            }`}
          >
            Direct eIFU URLs
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t-sm transition-all border-b-2 cursor-pointer ${
              activeTab === 'qr'
                ? 'border-[#C5A267] text-[#C5A267] bg-[#0A0A0A]'
                : 'border-transparent text-[#777777] hover:text-white hover:bg-[#141414]'
            }`}
          >
            Packaging QR Code
          </button>
          <button
            onClick={() => setActiveTab('label')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t-sm transition-all border-b-2 cursor-pointer ${
              activeTab === 'label'
                ? 'border-[#C5A267] text-[#C5A267] bg-[#0A0A0A]'
                : 'border-transparent text-[#777777] hover:text-white hover:bg-[#141414]'
            }`}
          >
            Box Label Artwork Spec
          </button>
          <button
            onClick={() => setActiveTab('embed')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t-sm transition-all border-b-2 cursor-pointer ${
              activeTab === 'embed'
                ? 'border-[#C5A267] text-[#C5A267] bg-[#0A0A0A]'
                : 'border-transparent text-[#777777] hover:text-white hover:bg-[#141414]'
            }`}
          >
            Web Embed Badge
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Customizer Filter Bar */}
          <div className="p-4 bg-[#050505] border border-white/10 rounded-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-white">
              <span className="flex items-center gap-1.5 font-serif uppercase tracking-wider text-[11px] text-[#C5A267]">
                <Tag className="w-3.5 h-3.5 text-[#C5A267]" />
                Target Document & Language Parameter Configurator
              </span>
              <span className="font-mono bg-[#C5A267]/15 text-[#C5A267] border border-[#C5A267]/30 px-2 py-0.5 rounded-sm text-[11px]">
                SRN: {ZERO_ZONE_MARK_SRN}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[#888888] font-medium mb-1">Target Document:</label>
                <select
                  value={selectedDocId}
                  onChange={(e) => setSelectedDocId(e.target.value)}
                  className="w-full bg-[#141414] border border-white/10 rounded-sm px-3 py-1.5 text-white font-medium focus:border-[#C5A267]/60 focus:outline-hidden cursor-pointer"
                >
                  {ZERO_ZONE_MARK_DOCUMENTS.map((doc) => (
                    <option key={doc.id} value={doc.id} className="bg-[#0A0A0A] text-white">
                      {doc.productName} ({doc.currentVersion})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#888888] font-medium mb-1">Default Language:</label>
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="w-full bg-[#141414] border border-white/10 rounded-sm px-3 py-1.5 text-white font-medium focus:border-[#C5A267]/60 focus:outline-hidden cursor-pointer"
                >
                  {AVAILABLE_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-[#0A0A0A] text-white">
                      {lang.name} ({lang.nativeName})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* TAB 1: URLs */}
          {activeTab === 'url' && (
            <div className="space-y-4">
              {/* Primary Direct SRN Link */}
              <div className="border border-white/10 rounded-sm p-4 bg-[#050505] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C5A267]"></span>
                    <h3 className="text-sm font-serif font-bold text-white tracking-wide">
                      Standard eIFU Direct URL (SRN Parameter)
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#C5A267]/15 text-[#C5A267] border border-[#C5A267]/30 px-2 py-0.5 rounded-sm">
                    Recommended for Packaging
                  </span>
                </div>
                <p className="text-xs text-[#777777]">
                  Direct entry point navigating automatically to Zero Zone Mark devices registered under SRN {ZERO_ZONE_MARK_SRN}.
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    readOnly
                    value={directSrnUrl}
                    className="flex-1 bg-[#141414] border border-white/10 rounded-sm px-3 py-2 text-xs sm:text-sm font-mono text-[#C5A267] font-medium select-all"
                  />
                  <button
                    onClick={() => handleCopy(directSrnUrl, 'directSrn')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#C5A267] hover:bg-[#D4B47D] text-[#050505] rounded-sm text-xs font-bold uppercase tracking-wider shadow-sm transition-colors shrink-0 cursor-pointer"
                  >
                    {copiedField === 'directSrn' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                  <a
                    href={directSrnUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-white/10 bg-[#141414] hover:bg-[#1C1C1C] rounded-sm text-[#888888] hover:text-white transition-colors shrink-0"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Deep Link with Document & Language */}
              <div className="border border-white/10 rounded-sm p-4 bg-[#050505] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    <h3 className="text-sm font-serif font-bold text-white tracking-wide">
                      Full Deep Link (Document + Language Presets)
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-900/30 text-blue-300 border border-blue-700/40 px-2 py-0.5 rounded-sm">
                    Precise Direct View
                  </span>
                </div>
                <p className="text-xs text-[#777777]">
                  Pre-selects document ID (<span className="font-mono text-[#CCCCCC]">{selectedDocId}</span>) and language (<span className="font-mono text-[#CCCCCC]">{selectedLang}</span>).
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    readOnly
                    value={deepLinkUrl}
                    className="flex-1 bg-[#141414] border border-white/10 rounded-sm px-3 py-2 text-xs sm:text-sm font-mono text-[#C5A267] font-medium select-all"
                  />
                  <button
                    onClick={() => handleCopy(deepLinkUrl, 'deepLink')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#141414] hover:bg-[#1F1F1F] text-white border border-white/10 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
                  >
                    {copiedField === 'deepLink' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#C5A267]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Deep Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Base Portal URL */}
              <div className="border border-white/10 rounded-sm p-4 bg-[#050505] space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-serif font-bold text-white tracking-wide">
                    Root Portal Web URL
                  </h3>
                  <span className="text-[10px] font-mono text-[#555555] uppercase">Vercel Deployment Host</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={ZERO_ZONE_MARK_BASE_URL}
                    className="flex-1 bg-[#141414] border border-white/10 rounded-sm px-3 py-2 text-xs sm:text-sm font-mono text-[#C5A267] font-medium select-all"
                  />
                  <button
                    onClick={() => handleCopy(ZERO_ZONE_MARK_BASE_URL, 'rootUrl')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#141414] hover:bg-[#1F1F1F] border border-white/10 text-[#E0E0E0] rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
                  >
                    {copiedField === 'rootUrl' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#C5A267]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Root</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: QR Code */}
          {activeTab === 'qr' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="flex flex-col items-center justify-center p-6 bg-[#050505] rounded-sm border border-white/10">
                {qrDataUrl ? (
                  <div className="p-3 bg-white rounded-sm shadow-xl">
                    <img 
                      src={qrDataUrl} 
                      alt={`Zero Zone Mark eIFU QR Code SRN ${ZERO_ZONE_MARK_SRN}`}
                      className="w-56 h-56 object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-56 h-56 bg-[#141414] animate-pulse rounded-sm flex items-center justify-center text-xs text-[#555555]">
                    Generating High-Resolution QR...
                  </div>
                )}
                
                <p className="text-[10px] font-mono text-[#777777] mt-3 text-center uppercase tracking-wider">
                  ISO/IEC 18004 Compliant 2D Barcode
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-serif font-bold text-white tracking-wide">
                    Medical Device Label QR Code
                  </h3>
                  <p className="text-xs text-[#777777] mt-1">
                    This QR code embeds the live URL directly accessing the Zero Zone Mark eIFU repository for SRN <span className="font-semibold font-mono text-[#C5A267]">{ZERO_ZONE_MARK_SRN}</span>.
                  </p>
                </div>

                <div className="p-3.5 bg-[#050505] border border-white/10 rounded-sm space-y-1.5 text-xs text-[#CCCCCC]">
                  <div className="flex items-center gap-1.5 font-serif font-bold text-[#C5A267] uppercase tracking-wider text-[11px]">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A267]" />
                    <span>EU MDR 2021/2226 Packaging Standards</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 pl-1 text-[11px] text-[#888888]">
                    <li>Minimum print size: 10 × 10 mm (300 DPI)</li>
                    <li>Must be accompanied by the ISO 7000-1641 "Consult eIFU" symbol (📖)</li>
                    <li>Guaranteed direct resolution to electronic IFU</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <button
                    onClick={handleDownloadQr}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#C5A267] hover:bg-[#D4B47D] text-[#050505] rounded-sm text-xs font-bold uppercase tracking-wider shadow-md transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download QR (.PNG)</span>
                  </button>
                  <button
                    onClick={() => handleCopy(currentTargetUrl, 'qrPayload')}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 border border-white/10 bg-[#141414] hover:bg-[#1F1F1F] text-[#E0E0E0] rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {copiedField === 'qrPayload' ? (
                      <>
                        <Check className="w-4 h-4 text-[#C5A267]" />
                        <span>Copied Payload</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Payload</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Packaging Label Artwork Spec */}
          {activeTab === 'label' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-serif font-bold text-white tracking-wide">
                  Device Carton & Sterile Barrier Label Text
                </h3>
                <p className="text-xs text-[#777777] mt-0.5">
                  Ready-to-copy label text block for laser engraving, thermal transfer printing, or outer packaging artwork.
                </p>
              </div>

              <div className="relative">
                <pre className="p-4 bg-[#050505] text-[#C5A267] rounded-sm text-xs font-mono overflow-x-auto leading-relaxed border border-white/10 select-all">
                  {packagingLabelSnippet}
                </pre>
                <button
                  onClick={() => handleCopy(packagingLabelSnippet, 'labelSnippet')}
                  className="absolute top-3 right-3 px-3 py-1.5 bg-[#C5A267] hover:bg-[#D4B47D] text-[#050505] text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm transition-colors cursor-pointer flex items-center gap-1"
                >
                  {copiedField === 'labelSnippet' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Spec</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: Web Embed Badge */}
          {activeTab === 'embed' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-serif font-bold text-white tracking-wide">
                  HTML Embed Badge for Distributor & Hospital Portals
                </h3>
                <p className="text-xs text-[#777777] mt-0.5">
                  Copy and paste this HTML snippet into customer portal pages or procurement catalogs.
                </p>
              </div>

              {/* Preview */}
              <div className="p-4 bg-[#050505] rounded-sm border border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#666666] block mb-2 font-serif">
                  Live Visual Preview:
                </span>
                <a 
                  href={directSrnUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#C5A267] text-[#050505] rounded-sm font-bold uppercase tracking-wider text-xs shadow-sm hover:bg-[#D4B47D] transition-colors"
                >
                  <span>📖 View eIFU (SRN: {ZERO_ZONE_MARK_SRN})</span>
                </a>
              </div>

              {/* Code */}
              <div className="relative">
                <pre className="p-4 bg-[#050505] text-[#C5A267] rounded-sm text-xs font-mono overflow-x-auto leading-relaxed border border-white/10 select-all">
                  {embedCodeSnippet}
                </pre>
                <button
                  onClick={() => handleCopy(embedCodeSnippet, 'embedCode')}
                  className="absolute top-3 right-3 px-3 py-1.5 bg-[#C5A267] hover:bg-[#D4B47D] text-[#050505] text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm transition-colors cursor-pointer flex items-center gap-1"
                >
                  {copiedField === 'embedCode' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied HTML</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy HTML</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#050505] px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#777777]">
          <div className="flex items-center gap-1.5 text-[#888888]">
            <CheckCircle2 className="w-4 h-4 text-[#C5A267]" />
            <span>Target SRN 9712190199 verified under EU 2021/2226 regulations.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#141414] hover:bg-[#1F1F1F] border border-white/10 text-white rounded-sm font-semibold uppercase tracking-wider text-xs transition-colors w-full sm:w-auto cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
