import { eIFUDocument, RegulatoryInfo } from '../types';

export const ZERO_ZONE_MARK_SRN = '9712190199';
export const ZERO_ZONE_MARK_BASE_URL = 'https://zerozonemark.vercel.app/';

export const REGULATORY_INFO: RegulatoryInfo = {
  srn: ZERO_ZONE_MARK_SRN,
  legalManufacturer: {
    name: 'Zero Zone Mark Medical & Industrial Technologies Ltd.',
    address: '104 Innovation Parkway, Suite 400, Cambridge, MA 02142',
    country: 'United States',
    contactEmail: 'regulatory@zerozonemark.com',
    phone: '+1 (800) 555-0199',
  },
  authorizedRepresentative: {
    name: 'MedReg Compliance Europe B.V.',
    address: 'Prinses Beatrixlaan 582, 2595 BM The Hague',
    country: 'The Netherlands',
    contactEmail: 'eurep@medreg-compliance.eu',
  },
  portalUrl: ZERO_ZONE_MARK_BASE_URL,
  euMdrRegulation: 'Regulation (EU) 2017/745 (MDR) & Regulation (EU) 2021/2226 (eIFU)',
  fdaRegulation: 'FDA 21 CFR Part 801 (Medical Device Labeling & Electronic IFU)',
  isoStandards: ['ISO 13485:2016', 'ISO 14971:2019', 'IEC 60601-1:2020', 'ISO 15223-1:2021', 'IEC 62304:2015'],
  paperCopyDeadlineDays: 7,
};

export const AVAILABLE_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English (US/UK)', fileSize: '3.4 MB', pageCount: 48 },
  { code: 'de', name: 'German', nativeName: 'Deutsch', fileSize: '3.6 MB', pageCount: 52 },
  { code: 'fr', name: 'French', nativeName: 'Français', fileSize: '3.5 MB', pageCount: 50 },
  { code: 'es', name: 'Spanish', nativeName: 'Español', fileSize: '3.5 MB', pageCount: 50 },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', fileSize: '3.4 MB', pageCount: 48 },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', fileSize: '4.1 MB', pageCount: 46 },
  { code: 'zh', name: 'Chinese', nativeName: '简体中文', fileSize: '3.9 MB', pageCount: 44 },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', fileSize: '3.5 MB', pageCount: 48 },
];

export const ZERO_ZONE_MARK_DOCUMENTS: eIFUDocument[] = [
  {
    id: 'eifu-zzm-9700-primary',
    srn: ZERO_ZONE_MARK_SRN,
    productName: 'Zero Zone Mark™ Precision Cryo-Thermal Management System',
    tradeMark: 'Zero Zone Mark®',
    modelVariant: 'ZZM-9700 Pro Series (Standard & Surgical Dual-Zone)',
    refNumber: 'REF-9712-1901',
    udiDI: '(01)00850097121901(17)281231(10)ZZM26A(21)9712190199',
    basicUdi: '085009712190199ZZM-SYS7K',
    gmdnCode: 'GMDN-64219 (Cryosurgical System Console & Probes)',
    riskClass: 'Class IIb',
    documentType: 'eIFU',
    title: 'Electronic Instructions for Use (eIFU) - Operation & Safety Manual',
    subtitle: 'Comprehensive User, Reprocessing, and Clinical Installation Guide',
    currentVersion: 'Rev 4.2',
    publishedDate: '2026-03-12',
    lastUpdated: '2026-06-20',
    ceMark: 'CE 0123',
    notifiedBody: 'TÜV SÜD Product Service GmbH (Notified Body 0123)',
    status: 'Active / Valid',
    intendedPurpose: 'The Zero Zone Mark™ System provides controlled ultra-low temperature cryogenic tissue thermal stabilization, precise dual-zone barrier cooling, and continuous thermal monitoring during clinical, laboratory, and interventional procedures.',
    storageConditions: 'Temperature: -20°C to +55°C | Relative Humidity: 10% to 90% non-condensing | Atmospheric Pressure: 700 hPa to 1060 hPa',
    languages: AVAILABLE_LANGUAGES,
    revisions: [
      {
        version: 'Rev 4.2',
        releaseDate: '2026-03-12',
        effectiveDate: '2026-03-15',
        isCurrent: true,
        approvedBy: 'Dr. Evelyn Vance, Head of Regulatory Affairs & Quality Assurance',
        fileSize: '3.4 MB',
        summaryOfChanges: [
          'Updated compliance declarations for EU 2021/2226 electronic IFU criteria.',
          'Added dual-zone automated cryogenic sensor self-calibration protocols in Section 4.3.',
          'Enhanced high-level disinfection parameters and automated cycle timeout parameters in Section 6.',
          'Added direct QR code URL telemetry verification for packaging integration with SRN 9712190199.',
        ],
      },
      {
        version: 'Rev 3.8',
        releaseDate: '2025-09-18',
        effectiveDate: '2025-10-01',
        isCurrent: false,
        approvedBy: 'M. Sterling, Lead Quality Engineer',
        fileSize: '3.2 MB',
        summaryOfChanges: [
          'Added German (DE) and Italian (IT) verified clinical safety translations.',
          'Revised probe connector torque specifications to 1.8 N·m.',
          'Updated EMC immunity test standards to IEC 60601-1-2 4th Edition Amendment 1.',
        ],
      },
      {
        version: 'Rev 3.0',
        releaseDate: '2024-11-05',
        effectiveDate: '2024-11-15',
        isCurrent: false,
        approvedBy: 'Dr. Evelyn Vance, Head of Regulatory Affairs',
        fileSize: '3.0 MB',
        summaryOfChanges: [
          'Major revision for EU MDR 2017/745 Class IIb compliance transition.',
          'Introduced Basic UDI-DI tracking and single registration numbering (SRN 9712190199).',
          'Restructured Chapter 7 diagnostics tables with new warning alerts E-01 through E-44.',
        ],
      },
      {
        version: 'Rev 2.1',
        releaseDate: '2023-05-14',
        effectiveDate: '2023-06-01',
        isCurrent: false,
        approvedBy: 'J. Dupont, Chief Technical Officer',
        fileSize: '2.8 MB',
        summaryOfChanges: [
          'Initial electronic distribution release under Directive 93/42/EEC.',
          'Added touch console interface calibration instructions.',
        ],
      },
    ],
    sections: [
      {
        id: 'sec-1',
        number: '1.0',
        title: 'General Information & Indications for Use',
        content: [
          'This electronic Instructions for Use (eIFU) document is delivered in compliance with Regulation (EU) 2021/2226 and FDA 21 CFR Part 801. Always verify that the SRN (9712190199) and REF number displayed on your physical unit match this digital documentation.',
          'The Zero Zone Mark™ Precision System is designed for specialized healthcare and technical professionals trained in thermal control, cryogenic handling, and physiological temperature regulation.',
        ],
        subsections: [
          {
            id: 'sec-1-1',
            number: '1.1',
            title: 'Indications for Use',
            content: [
              'The Zero Zone Mark™ System is indicated for targeted cryogenic thermal isolation, localized tissue freezing, controlled thermal zone management, and auxiliary biological sample stabilization in clinical procedure suites and operating rooms.',
            ],
            notes: [
              'Usage is restricted to licensed healthcare practitioners or under the direct supervision of authorized medical personnel.',
            ],
          },
          {
            id: 'sec-1-2',
            number: '1.2',
            title: 'Single Registration Number (SRN) Verification',
            content: [
              'Under the European Medical Device Regulation (EU MDR), the legal manufacturer identification SRN is 9712190199. This identifier connects all technical documentation, vigilance reports, clinical evaluation reports, and post-market surveillance dossiers directly within the EUDAMED database.',
            ],
          },
        ],
      },
      {
        id: 'sec-2',
        number: '2.0',
        title: 'Contraindications, Warnings & Precautions',
        content: [
          'Before operating the Zero Zone Mark™ System, thoroughly review all hazard statements. Failure to adhere to these safety instructions can lead to adverse patient outcomes, unintended thermal injury, or equipment damage.',
        ],
        warnings: [
          'WARNING: EXPLOSION HAZARD - Do not operate in the presence of flammable anesthetics, enriched oxygen environments (>25% O2), or volatile hydrocarbons.',
          'WARNING: CRYOGENIC BURN HAZARD - Direct skin contact with uninsulated lines or active cryogenic probes below -40°C can result in instantaneous frostbite and deep tissue necrosis.',
          'WARNING: ELECTRIC SHOCK PROTECTION - Connect exclusively to hospital-grade, grounded power receptacles (100–240 V~, 50/60 Hz). Do not use multiple portable socket outlets.',
        ],
        cautions: [
          'CAUTION: Ensure adequate ventilation in the operating room. Nitrogen/Argon exhaust ports must remain unobstructed at all times.',
          'CAUTION: Inspect high-pressure cryogenic transfer hoses for micro-cracks, crimping, or seal degradation prior to every procedure.',
        ],
        subsections: [
          {
            id: 'sec-2-1',
            number: '2.1',
            title: 'Absolute Contraindications',
            content: [
              'Do not utilize the Zero Zone Mark™ device on patients with documented severe cold agglutinin disease, cryoglobulinemia, Raynaud phenomenon with gangrene, or over compromised open vascular beds without surgical vascular occlusion control.',
            ],
          },
        ],
      },
      {
        id: 'sec-3',
        number: '3.0',
        title: 'Technical Specifications & Operating Parameters',
        content: [
          'The Zero Zone Mark™ System conforms to IEC 60601-1 (General requirements for basic safety and essential performance) and IEC 60601-1-2 (Electromagnetic compatibility).',
        ],
        subsections: [
          {
            id: 'sec-3-1',
            number: '3.1',
            title: 'Performance & Environmental Ratings',
            content: [
              'Review the table below for certified electrical, pneumatic, and thermal limits.',
            ],
            table: {
              headers: ['Parameter', 'Specification', 'Tolerance / Standard'],
              rows: [
                ['Input Voltage Range', '100 - 240 VAC, 50/60 Hz', '±10% nominal'],
                ['Maximum Power Consumption', '650 VA (Peak during Rapid Thaw)', 'IEC 60601-1 Class I'],
                ['Cooling Temperature Range', '-160°C to +40°C', '±0.5°C Sensor Accuracy'],
                ['Zone Isolation Channels', '2 Independent Active Channels', 'Dual PID closed-loop'],
                ['Operating Ambient Temp', '+15°C to +30°C', 'Continuous Duty Cycle'],
                ['Noise Emission Level', '< 48 dB(A) at 1 meter', 'ISO 3744 compliant'],
                ['Ingress Protection Rating', 'IPX2 (Console), IPX7 (Probes)', 'IEC 60529'],
              ],
            },
          },
        ],
      },
      {
        id: 'sec-4',
        number: '4.0',
        title: 'Unpacking, Assembly & Zero-Point Calibration',
        content: [
          'Verify that the shipping seal is intact and the tilt/temperature drop indicators have not been tripped during transit.',
          'Follow the step-by-step setup procedure before clinical deployment.',
        ],
        subsections: [
          {
            id: 'sec-4-1',
            number: '4.1',
            title: 'Unboxing Checklist & Visual Inspection',
            content: [
              '1. Inspect outer packaging for physical puncture or moisture ingress.',
              '2. Verify that package label displays SRN 9712190199 and matching REF number (REF-9712-1901).',
              '3. Verify that the sterile barrier on accessories is completely uncompromised.',
            ],
          },
          {
            id: 'sec-4-2',
            number: '4.2',
            title: 'Automated Sensor Zero-Point Calibration',
            content: [
              '1. Power on the Zero Zone Mark™ Console via the rear mains switch.',
              '2. Allow the internal reference chamber to reach ambient equilibrium (approximately 90 seconds).',
              '3. Navigate to [Settings] -> [Diagnostics] -> [Zero-Point Auto-Cal].',
              '4. Confirm the prompt on the capacitive touch display. The system will self-test cryogenic flow valves, thermal junction sensors, and pressure transducers.',
            ],
            notes: [
              'Annual recalibration by a Zero Zone Mark certified field service engineer is required to maintain MDR certification compliance.',
            ],
          },
        ],
      },
      {
        id: 'sec-5',
        number: '5.0',
        title: 'Operational Guidelines & Clinical Workflow',
        content: [
          'Detailed instructions on initiating thermal cycles, setting boundary isotherms, and monitoring temperature curves in real-time.',
        ],
        subsections: [
          {
            id: 'sec-5-1',
            number: '5.1',
            title: 'Setting Thermal Zones (Zone A & Zone B)',
            content: [
              'Zone A controls primary cryogenic thermal ablation or deep chilling (-140°C to -40°C). Zone B controls the thermal boundary barrier (+25°C to +37°C) to protect adjacent sensitive structures and prevent collateral frost spread.',
              'Adjust the rotary optical encoder or tap directly on the touchscreen temperature curve to configure target hold durations and thaw ramp rates.',
            ],
          },
          {
            id: 'sec-5-2',
            number: '5.2',
            title: 'Emergency Stop & Pressure Venting Protocol',
            content: [
              'In any event of abnormal pressure buildup or procedural interruption, depress the prominent red E-STOP button on the front panel. The unit will immediately isolate cryogenic lines, depressurize the chamber through the rear silencer port, and trigger active warming on all attached probes.',
            ],
          },
        ],
      },
      {
        id: 'sec-6',
        number: '6.0',
        title: 'Reprocessing, Cleaning, Disinfection & Sterilization',
        content: [
          'Reprocessing guidelines comply with ISO 17664. Follow validated hospital sterilization protocols rigorously.',
        ],
        warnings: [
          'DO NOT autoclave the main electronic console. Only dedicated autoclavable probes, connectors, and silicone sheathings marked [STERILE | R] or [AUTOCLAVE 134°C] can undergo steam sterilization.',
        ],
        subsections: [
          {
            id: 'sec-6-1',
            number: '6.1',
            title: 'Console Surface Disinfection',
            content: [
              'Wipe down all outer console surfaces using hospital-grade quaternary ammonium or 70% isopropanol disinfectant wipes. Avoid liquid pooling around the USB diagnostic port or power switch.',
            ],
          },
          {
            id: 'sec-6-2',
            number: '6.2',
            title: 'Validated Steam Sterilization Parameters for Probes',
            content: [
              'Pre-vacuum Steam Sterilization Cycle: Temperature: 134°C (273°F) | Exposure Time: 4 minutes | Minimum Vacuum Drying Time: 20 minutes.',
            ],
          },
        ],
      },
      {
        id: 'sec-7',
        number: '7.0',
        title: 'Troubleshooting & Error Code Reference (E-01 to E-44)',
        content: [
          'When the system detects an out-of-tolerance condition, an acoustic alarm sounds and an alphanumeric error code is displayed on screen.',
        ],
        subsections: [
          {
            id: 'sec-7-1',
            number: '7.1',
            title: 'Error Codes & Corrective Actions',
            content: [
              'Reference this chart before contacting clinical technical support.',
            ],
            table: {
              headers: ['Code', 'Fault Description', 'Recommended Corrective Action'],
              rows: [
                ['E-01', 'Cryogenic Pressure Supply Low (< 3.2 bar)', 'Verify cylinder supply valve is fully opened and cylinder is >20% full.'],
                ['E-04', 'Zone A Thermocouple Disconnected', 'Check probe connection plug; re-seat latch until audible click is heard.'],
                ['E-12', 'Flow Restrictor Overheat Protection', 'Allow 5-minute cooling cycle; verify rear exhaust fan intake is unobstructed.'],
                ['E-23', 'UDI / Telemetry Calibration Offset', 'Run Zero-Point Calibration from settings menu; verify SRN 9712190199.'],
                ['E-44', 'Safety Interlock Chamber Open', 'Ensure cryogenic line safety latch is firmly locked before starting cycle.'],
              ],
            },
          },
        ],
      },
      {
        id: 'sec-8',
        number: '8.0',
        title: 'Regulatory Compliance & Free Paper Copy Guarantee',
        content: [
          'Under Article 5 of Commission Regulation (EU) 2021/2226, users are entitled to receive a paper copy of this electronic Instructions for Use free of charge within seven (7) calendar days of request.',
          'To request your free printed copy, use the integrated Paper Copy Request button on this portal (https://zerozonemark.vercel.app/) or email regulatory@zerozonemark.com referencing SRN: 9712190199.',
          'All prior revisions of this document are archived and permanently accessible on this portal for a minimum of 10 years after the last unit of the model has been placed on the market.',
        ],
      },
    ],
  },
  {
    id: 'doc-zzm-quick-guide',
    srn: ZERO_ZONE_MARK_SRN,
    productName: 'Zero Zone Mark™ Quick Reference & Setup Guide',
    tradeMark: 'Zero Zone Mark®',
    modelVariant: 'All ZZM-9700 & ZZM-9712 Variants',
    refNumber: 'REF-9712-QG01',
    udiDI: '(01)00850097121901(17)281231(10)ZZM26QG(21)9712190199',
    basicUdi: '085009712190199ZZM-SYS7K',
    gmdnCode: 'GMDN-64219',
    riskClass: 'Class IIb',
    documentType: 'QuickGuide',
    title: 'Zero Zone Mark™ Quick Reference Procedural Guide',
    subtitle: 'Laminated OR Bedside & Procedure Room Rapid Start Protocol',
    currentVersion: 'Rev 2.4',
    publishedDate: '2026-02-10',
    lastUpdated: '2026-04-15',
    ceMark: 'CE 0123',
    notifiedBody: 'TÜV SÜD Product Service GmbH',
    status: 'Active / Valid',
    intendedPurpose: 'Quick reference guide summarizing the 5 critical pre-check steps, probe connections, safety alarms, and procedure completion protocols for the Zero Zone Mark system.',
    storageConditions: 'Standard clinical environment.',
    languages: AVAILABLE_LANGUAGES,
    revisions: [
      {
        version: 'Rev 2.4',
        releaseDate: '2026-02-10',
        effectiveDate: '2026-02-15',
        isCurrent: true,
        approvedBy: 'Dr. Evelyn Vance, Head of Regulatory Affairs',
        fileSize: '1.2 MB',
        summaryOfChanges: ['Updated fast-connect probe seating visual icons and emergency stop reminders.'],
      },
    ],
    sections: [
      {
        id: 'qg-1',
        number: '1.0',
        title: '5-Minute Rapid Procedure Setup',
        content: [
          'Step 1: Position Zero Zone Mark unit at least 30 cm from walls to maintain cooling airflow.',
          'Step 2: Connect hospital-grade power cable and engage the rear green safety circuit breaker.',
          'Step 3: Insert sterile Dual-Zone probe connector into Port 1 until the lock ring clicks.',
          'Step 4: Press "Quick Priming" on the touchscreen display and wait for the green status light.',
          'Step 5: Verify patient temperature telemetry reads normal baseline (+36.5°C to +37.2°C).',
        ],
      },
      {
        id: 'qg-2',
        number: '2.0',
        title: 'Immediate Alarm Response Matrix',
        content: [
          'High Tone Continuous Alarm: Depress Emergency Stop; check supply pressure gauge.',
          'Intermittent Beep: Target isotherm achieved; maintain monitored procedure duration.',
          'Yellow Flash: Reposition thermocouple probe 2 to eliminate thermal bridging.',
        ],
      },
    ],
  },
  {
    id: 'doc-zzm-sterilization',
    srn: ZERO_ZONE_MARK_SRN,
    productName: 'Zero Zone Mark™ Reprocessing & Sterilization Manual',
    tradeMark: 'Zero Zone Mark®',
    modelVariant: 'Sterilizable Reusable Components (REF ZZM-PRB-01 through 08)',
    refNumber: 'REF-9712-STERIL',
    udiDI: '(01)00850097121901(17)281231(10)ZZM26ST(21)9712190199',
    basicUdi: '085009712190199ZZM-SYS7K',
    gmdnCode: 'GMDN-64219',
    riskClass: 'Class IIb',
    documentType: 'Sterilization',
    title: 'Reprocessing, Cleaning, Disinfection and Sterilization Guidelines',
    subtitle: 'Standard Operating Procedures according to ISO 17664 and AAMI TIR12',
    currentVersion: 'Rev 3.1',
    publishedDate: '2026-01-20',
    lastUpdated: '2026-05-08',
    ceMark: 'CE 0123',
    notifiedBody: 'TÜV SÜD Product Service GmbH',
    status: 'Active / Valid',
    intendedPurpose: 'Provides validated parameters for point-of-use cleaning, enzymatic ultrasonic bath cleaning, thermal disinfection, and pre-vacuum steam sterilization of Zero Zone Mark reusable probes and accessories.',
    storageConditions: 'Sterile wrap storage in compliance with DIN 58953.',
    languages: AVAILABLE_LANGUAGES,
    revisions: [
      {
        version: 'Rev 3.1',
        releaseDate: '2026-01-20',
        effectiveDate: '2026-02-01',
        isCurrent: true,
        approvedBy: 'A. Hoffman, Lead Sterilization Scientist',
        fileSize: '2.1 MB',
        summaryOfChanges: ['Added validated drying cycle times for wrapped double-pouch configurations.'],
      },
    ],
    sections: [
      {
        id: 'st-1',
        number: '1.0',
        title: 'Point of Use Preparation & Decontamination',
        content: [
          'Immediately after procedure termination, wipe gross organic soil from probes with non-linting wipes dampened with enzymatic cleaning solution (pH 7.0 - 8.5). Never allow blood or saline to dry on cryogenic sensor tips.',
        ],
      },
      {
        id: 'st-2',
        number: '2.0',
        title: 'Validated Autoclave Parameters',
        content: [
          'Fractionated Pre-Vacuum Steam Sterilizer: Temperature: 134°C (+3°C / -0°C) | Hold Time: 4.0 minutes (or 18 minutes for Prion inactivation protocol) | Vacuum Drying: 20 minutes.',
        ],
      },
    ],
  },
  {
    id: 'doc-zzm-declaration',
    srn: ZERO_ZONE_MARK_SRN,
    productName: 'EU Declaration of Conformity (DoC) - Zero Zone Mark™',
    tradeMark: 'Zero Zone Mark®',
    modelVariant: 'Series ZZM-9700 & Accessories',
    refNumber: 'DOC-EU-MDR-9712190199',
    udiDI: '(01)00850097121901(17)281231(10)ZZM26DOC(21)9712190199',
    basicUdi: '085009712190199ZZM-SYS7K',
    gmdnCode: 'GMDN-64219',
    riskClass: 'Class IIb',
    documentType: 'Declaration',
    title: 'EU Declaration of Conformity (DoC) under Regulation (EU) 2017/745',
    subtitle: 'Official Manufacturer Compliance Statement with Notified Body 0123 Attestation',
    currentVersion: 'Rev 5.0',
    publishedDate: '2026-01-02',
    lastUpdated: '2026-01-02',
    ceMark: 'CE 0123',
    notifiedBody: 'TÜV SÜD Product Service GmbH (Certificate No. G10 098472 0019 Rev. 02)',
    status: 'Active / Valid',
    intendedPurpose: 'Legal declaration affirming sole responsibility that the Zero Zone Mark device meets General Safety and Performance Requirements of Regulation (EU) 2017/745 (MDR) Annex I.',
    storageConditions: 'Permanent legal archive.',
    languages: AVAILABLE_LANGUAGES,
    revisions: [
      {
        version: 'Rev 5.0',
        releaseDate: '2026-01-02',
        effectiveDate: '2026-01-02',
        isCurrent: true,
        approvedBy: 'CEO & Managing Director, Zero Zone Mark Technologies',
        fileSize: '0.9 MB',
        summaryOfChanges: ['Annual regulatory renewal under MDR Certificate G10 098472 0019 Rev. 02.'],
      },
    ],
    sections: [
      {
        id: 'doc-1',
        number: '1.0',
        title: 'Declaration of Conformity Statement',
        content: [
          'We, Zero Zone Mark Medical & Industrial Technologies Ltd., as the legal manufacturer registered under SRN 9712190199, hereby declare under our sole responsibility that the aforementioned medical device family conforms to all applicable provisions of Regulation (EU) 2017/745 and Regulation (EU) 2021/2226.',
          'Notified Body: TÜV SÜD Product Service GmbH, Ridlerstraße 65, 80339 München, Germany (CE 0123).',
        ],
      },
    ],
  },
];
