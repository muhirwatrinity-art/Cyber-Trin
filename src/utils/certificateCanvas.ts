import type { Language } from '../types';

interface CertificateOptions {
  learnerName: string;
  completionDate: string;
  certificateId: string;
  completedCount: number;
  quizScorePercent: number;
  lang: Language;
}

export function downloadCertificatePng(options: CertificateOptions): void {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 1120;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer Black Frame
  ctx.strokeStyle = '#0A0A0A';
  ctx.lineWidth = 24;
  ctx.strokeRect(36, 36, canvas.width - 72, canvas.height - 72);

  // Inner Blue + Orange Accent Frame
  ctx.strokeStyle = '#0B3B8C';
  ctx.lineWidth = 8;
  ctx.strokeRect(64, 64, canvas.width - 128, canvas.height - 128);

  // Top Blue/Orange Accent Ribbon
  ctx.fillStyle = '#0B3B8C';
  ctx.fillRect(80, 84, (canvas.width - 160) * 0.7, 10);
  ctx.fillStyle = '#EA580C';
  ctx.fillRect(80 + (canvas.width - 160) * 0.7, 84, (canvas.width - 160) * 0.3, 10);

  ctx.fillStyle = '#0A0A0A';
  ctx.textAlign = 'center';
  ctx.font = '700 38px "Plus Jakarta Sans", Arial, sans-serif';
  ctx.fillText('SAFECLICK UG', canvas.width / 2, 165);

  ctx.fillStyle = '#0B3B8C';
  ctx.font = '500 22px "Plus Jakarta Sans", Arial, sans-serif';
  ctx.fillText('Stay Safe Online  ·  Weerinde Ku Mutimbagano', canvas.width / 2, 205);

  ctx.fillStyle = '#0A0A0A';
  ctx.font = '700 56px "Plus Jakarta Sans", Arial, sans-serif';
  ctx.fillText('DIGITAL SAFETY CHAMPION', canvas.width / 2, 310);

  ctx.fillStyle = '#EA580C';
  ctx.font = '600 32px "Plus Jakarta Sans", Arial, sans-serif';
  ctx.fillText('CHAMPION WA DIGITAL SAFETY', canvas.width / 2, 360);

  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(320, 405);
  ctx.lineTo(1280, 405);
  ctx.stroke();

  ctx.fillStyle = '#475569';
  ctx.font = '500 24px "Plus Jakarta Sans", Arial, sans-serif';
  ctx.fillText(
    options.lang === 'lu'
      ? 'Satifikeeti eno eweebwa:'
      : 'This educational certificate is proudly presented to:',
    canvas.width / 2,
    465
  );

  ctx.fillStyle = '#0B3B8C';
  ctx.font = '700 62px "Plus Jakarta Sans", Arial, sans-serif';
  ctx.fillText(options.learnerName || 'SafeClick UG Learner', canvas.width / 2, 550);

  ctx.strokeStyle = '#EA580C';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(420, 575);
  ctx.lineTo(1180, 575);
  ctx.stroke();

  ctx.fillStyle = '#0A0A0A';
  ctx.font = '500 26px "Plus Jakarta Sans", Arial, sans-serif';
  const summaryLine1 =
    options.lang === 'lu'
      ? `Olw'okumaliriza emisomo gyonna ${options.completedCount}/6 egy'obukuumi ku mutimbagano`
      : `For completing all ${options.completedCount}/6 SafeClick UG Digital Safety Academy modules`;
  const summaryLine2 =
    options.lang === 'lu'
      ? `n'okuyita mu kugezesebwa okusembayo n'obubonero ${options.quizScorePercent}%.`
      : `and passing the final interactive assessment with a score of ${options.quizScorePercent}%.`;

  ctx.fillText(summaryLine1, canvas.width / 2, 650);
  ctx.fillText(summaryLine2, canvas.width / 2, 692);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#64748B';
  ctx.font = '600 20px "Plus Jakarta Sans", Arial, sans-serif';
  ctx.fillText(options.lang === 'lu' ? 'OLUNAKU' : 'COMPLETION DATE', 160, 825);
  ctx.fillStyle = '#0A0A0A';
  ctx.font = '700 26px "Plus Jakarta Sans", Arial, sans-serif';
  ctx.fillText(options.completionDate, 160, 865);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#64748B';
  ctx.font = '600 20px "Plus Jakarta Sans", Arial, sans-serif';
  ctx.fillText(options.lang === 'lu' ? 'ENNAMBA YA SATIFIKEETI' : 'CERTIFICATE ID', 1440, 825);
  ctx.fillStyle = '#0B3B8C';
  ctx.font = '700 26px "IBM Plex Mono", monospace';
  ctx.fillText(options.certificateId, 1440, 865);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#64748B';
  ctx.font = '400 18px "Plus Jakarta Sans", Arial, sans-serif';
  ctx.fillText(
    'Educational Completion Certificate — Not a government-accredited professional qualification.',
    canvas.width / 2,
    995
  );

  const link = document.createElement('a');
  link.download = `SafeClick-UG-Certificate-${options.certificateId}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
