export function formatarDataBR(dataISO: string): string {
  if (!dataISO || typeof dataISO !== 'string') return '';

  const partes = dataISO.split('-');
  if (partes.length !== 3) return '';

  const [ano, mes, dia] = partes;
  return `${dia}/${mes}/${ano}`;
}
