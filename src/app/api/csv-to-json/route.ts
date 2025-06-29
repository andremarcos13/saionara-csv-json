import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // Para deploy rápido na Vercel

function parsePercentage(str: string): number {
  // Remove % e troca vírgula por ponto
  const clean = str.replace('%', '').replace(',', '.');
  return parseFloat(clean) / 100;
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'Arquivo não enviado.' }, { status: 400 });
  }

  const text = await file.text();
  // Detecta delimitador (padrão ;)
  const lines = text.split(/\r?\n/).filter(Boolean);
  const delimiter = lines[0].includes(';') ? ';' : ',';
  const [header, ...rows] = lines;
  const [mbCol, feeCol] = header.split(delimiter).map(h => h.trim().toLowerCase());

  if (mbCol !== 'mb' || feeCol !== 'fee') {
    return NextResponse.json({ error: 'Cabeçalho do CSV deve ser: mb;fee' }, { status: 400 });
  }

  const data = rows.map(row => {
    const [mb, fee] = row.split(delimiter).map(s => s.trim());
    return {
      mb: parsePercentage(mb),
      fee: parsePercentage(fee)
    };
  });

  return NextResponse.json(data);
} 