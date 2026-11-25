import React from 'react';
import type { LessonModule } from '../../types';

interface LessonIllustrationProps {
  illustrationId: LessonModule['illustrationId'];
  alt: string;
}

export const LessonIllustration: React.FC<LessonIllustrationProps> = ({
  illustrationId,
  alt,
}) => {
  return (
    <div className="w-full rounded-2xl bg-[#EFF6FF] border border-slate-200 overflow-hidden">
      <svg
        viewBox="0 0 640 280"
        className="w-full h-auto block"
        role="img"
        aria-label={alt}
      >
        {illustrationId === 'mobile_money' && (
          <>
            <rect width="640" height="280" fill="#F8FAFC" />
            {/* Market canopy stripes */}
            <path d="M0 0h640v52H0z" fill="#0B3B8C" />
            <rect x="40" y="52" width="56" height="16" fill="#EA580C" />
            <rect x="96" y="52" width="56" height="16" fill="#0A0A0A" />
            <rect x="152" y="52" width="56" height="16" fill="#EA580C" />
            <rect x="208" y="52" width="56" height="16" fill="#0A0A0A" />
            <rect x="264" y="52" width="56" height="16" fill="#EA580C" />
            <rect x="320" y="52" width="56" height="16" fill="#0A0A0A" />
            {/* Nambi checking real phone screen */}
            <circle cx="170" cy="145" r="34" fill="#5C3A21" />
            <path d="M122 260c0-38 22-62 48-62s48 24 48 62H122z" fill="#0B3B8C" />
            <path d="M140 120c14-14 46-14 60 0" stroke="#EA580C" strokeWidth="8" fill="none" strokeLinecap="round" />
            {/* Phone card showing real balance vs fake SMS */}
            <rect x="290" y="88" width="160" height="166" rx="18" fill="#0A0A0A" />
            <rect x="302" y="104" width="136" height="134" rx="10" fill="#FFFFFF" />
            <text x="370" y="132" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0A0A0A">
              Check Real Balance
            </text>
            <rect x="314" y="144" width="112" height="36" rx="8" fill="#DBEAFE" />
            <text x="370" y="167" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0B3B8C">
              UGX Verified
            </text>
            <rect x="314" y="192" width="112" height="34" rx="8" fill="#FFF7ED" />
            <text x="370" y="213" textAnchor="middle" fontSize="12" fontWeight="700" fill="#EA580C">
              No PIN Sharing
            </text>
            {/* Warning callout */}
            <circle cx="535" cy="148" r="44" fill="#FFF7ED" stroke="#EA580C" strokeWidth="4" />
            <path d="M535 126v24M535 162v4" stroke="#EA580C" strokeWidth="6" strokeLinecap="round" />
          </>
        )}

        {illustrationId === 'passwords' && (
          <>
            <rect width="640" height="280" fill="#F8FAFC" />
            {/* Study desk */}
            <rect x="0" y="220" width="640" height="60" fill="#E2E8F0" />
            {/* Phone & Padlock Shield */}
            <rect x="130" y="56" width="150" height="184" rx="20" fill="#0A0A0A" />
            <rect x="142" y="72" width="126" height="152" rx="10" fill="#FFFFFF" />
            <rect x="156" y="110" width="98" height="28" rx="6" fill="#E2E8F0" />
            <circle cx="172" cy="124" r="4" fill="#0A0A0A" />
            <circle cx="186" cy="124" r="4" fill="#0A0A0A" />
            <circle cx="200" cy="124" r="4" fill="#0A0A0A" />
            <circle cx="214" cy="124" r="4" fill="#0A0A0A" />
            <circle cx="228" cy="124" r="4" fill="#0A0A0A" />
            <rect x="156" y="152" width="98" height="34" rx="8" fill="#0B3B8C" />
            <text x="205" y="174" textAnchor="middle" fontSize="13" fontWeight="700" fill="#FFFFFF">
              2FA ON
            </text>
            {/* Strong passphrase shield */}
            <path
              d="M440 52L356 84v62c0 52 35 96 84 110 49-14 84-58 84-110V84L440 52z"
              fill="#0B3B8C"
              stroke="#EA580C"
              strokeWidth="6"
            />
            <rect x="412" y="138" width="56" height="44" rx="8" fill="#EA580C" />
            <path
              d="M424 138v-14a16 16 0 0 1 32 0v14"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle cx="440" cy="160" r="5" fill="#FFFFFF" />
          </>
        )}

        {illustrationId === 'phishing' && (
          <>
            <rect width="640" height="280" fill="#F8FAFC" />
            {/* Browser/SMS window comparison */}
            <rect x="76" y="48" width="230" height="184" rx="16" fill="#FFFFFF" stroke="#EA580C" strokeWidth="3" />
            <rect x="76" y="48" width="230" height="38" rx="16" fill="#FFF7ED" />
            <text x="191" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#EA580C">
              Fake Lookalike Link
            </text>
            <rect x="96" y="106" width="190" height="34" rx="8" fill="#FFF7ED" />
            <text x="191" y="128" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0A0A0A">
              mtn-free-cash.xyz
            </text>
            <text x="191" y="168" textAnchor="middle" fontSize="13" fill="#475569">
              Asks for PIN + Fee
            </text>
            <line x1="150" y1="186" x2="232" y2="216" stroke="#EA580C" strokeWidth="6" strokeLinecap="round" />
            <line x1="232" y1="186" x2="150" y2="216" stroke="#EA580C" strokeWidth="6" strokeLinecap="round" />

            {/* Magnifying check */}
            <rect x="340" y="48" width="224" height="184" rx="16" fill="#FFFFFF" stroke="#0B3B8C" strokeWidth="3" />
            <rect x="340" y="48" width="224" height="38" rx="16" fill="#DBEAFE" />
            <text x="452" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0B3B8C">
              Check Before You Click
            </text>
            <circle cx="452" cy="148" r="36" fill="#EFF6FF" stroke="#0B3B8C" strokeWidth="5" />
            <path d="M435 148l12 12 22-24" fill="none" stroke="#0B3B8C" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <text x="452" y="210" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0A0A0A">
              Use Official App / Website
            </text>
          </>
        )}

        {illustrationId === 'social_media' && (
          <>
            <rect width="640" height="280" fill="#F8FAFC" />
            {/* Real profile vs Impersonator */}
            <rect x="86" y="54" width="210" height="172" rx="18" fill="#FFFFFF" stroke="#0B3B8C" strokeWidth="2.5" />
            <circle cx="191" cy="112" r="28" fill="#0B3B8C" />
            <circle cx="191" cy="104" r="10" fill="#FFFFFF" />
            <path d="M168 134c6-12 40-12 46 0" fill="#FFFFFF" />
            <text x="191" y="166" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0A0A0A">
              Amina (Real Account)
            </text>
            <rect x="128" y="182" width="126" height="28" rx="8" fill="#DBEAFE" />
            <text x="191" y="201" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0B3B8C">
              Privacy Locked
            </text>

            {/* Voice Call Confirmation arrow */}
            <path d="M308 140h46" stroke="#0A0A0A" strokeWidth="4" strokeDasharray="6 6" />
            <rect x="366" y="54" width="194" height="172" rx="18" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2.5" />
            <text x="463" y="96" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0A0A0A">
              Friend Asks for Cash?
            </text>
            <circle cx="463" cy="144" r="28" fill="#0A0A0A" />
            <path
              d="M453 134c2-2 6-2 8 0l4 5c2 2 1 5-1 7l-2 2c3 5 7 9 12 12l2-2c2-2 5-3 7-1l5 4c2 2 2 6 0 8-4 4-10 5-16 2-10-5-19-14-24-24-3-6-2-12 2-16z"
              fill="#EA580C"
            />
            <text x="463" y="202" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0A0A0A">
              Call Their Voice First
            </text>
          </>
        )}

        {illustrationId === 'online_shopping' && (
          <>
            <rect width="640" height="280" fill="#F8FAFC" />
            {/* Verified physical shop & inspection */}
            <rect x="96" y="64" width="204" height="160" rx="16" fill="#FFFFFF" stroke="#0B3B8C" strokeWidth="2.5" />
            <rect x="96" y="64" width="204" height="40" rx="12" fill="#0B3B8C" />
            <text x="198" y="90" textAnchor="middle" fontSize="14" fontWeight="700" fill="#FFFFFF">
              Verified Shop
            </text>
            <rect x="132" y="126" width="132" height="26" rx="6" fill="#E2E8F0" />
            <text x="198" y="144" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0A0A0A">
              Physical Location
            </text>
            <rect x="132" y="166" width="132" height="32" rx="8" fill="#DBEAFE" />
            <text x="198" y="187" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0B3B8C">
              Inspect First
            </text>

            {/* Warning against paying stranger in advance */}
            <rect x="342" y="64" width="204" height="160" rx="16" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2.5" />
            <text x="444" y="106" textAnchor="middle" fontSize="14" fontWeight="700" fill="#EA580C">
              Advance Pay Trap
            </text>
            <text x="444" y="138" textAnchor="middle" fontSize="13" fill="#0A0A0A">
              "Send UGX 250,000
            </text>
            <text x="444" y="158" textAnchor="middle" fontSize="13" fill="#0A0A0A">
              before delivery!"
            </text>
            <rect x="380" y="176" width="128" height="28" rx="8" fill="#0A0A0A" />
            <text x="444" y="195" textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFFFFF">
              Walk Away
            </text>
          </>
        )}

        {illustrationId === 'hacked_recovery' && (
          <>
            <rect width="640" height="280" fill="#F8FAFC" />
            {/* 3-Step Calm Recovery Cards */}
            <rect x="56" y="66" width="160" height="150" rx="16" fill="#FFFFFF" stroke="#0B3B8C" strokeWidth="2.5" />
            <circle cx="136" cy="108" r="20" fill="#0B3B8C" />
            <text x="136" y="114" textAnchor="middle" fontSize="16" fontWeight="700" fill="#FFFFFF">1</text>
            <text x="136" y="152" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0A0A0A">Warn Friends</text>
            <text x="136" y="174" textAnchor="middle" fontSize="12" fill="#475569">Call or SMS</text>

            <rect x="240" y="66" width="160" height="150" rx="16" fill="#FFFFFF" stroke="#EA580C" strokeWidth="2.5" />
            <circle cx="320" cy="108" r="20" fill="#EA580C" />
            <text x="320" y="114" textAnchor="middle" fontSize="16" fontWeight="700" fill="#FFFFFF">2</text>
            <text x="320" y="152" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0A0A0A">Lock Account</text>
            <text x="320" y="174" textAnchor="middle" fontSize="12" fill="#475569">Reset PIN & 2FA</text>

            <rect x="424" y="66" width="160" height="150" rx="16" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2.5" />
            <circle cx="504" cy="108" r="20" fill="#0A0A0A" />
            <text x="504" y="114" textAnchor="middle" fontSize="16" fontWeight="700" fill="#FFFFFF">3</text>
            <text x="504" y="152" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0A0A0A">Save Evidence</text>
            <text x="504" y="174" textAnchor="middle" fontSize="12" fill="#475569">Report Safely</text>
          </>
        )}
      </svg>
    </div>
  );
};
