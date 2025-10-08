export default async function PricesPage({ searchParams }: { searchParams?: { src?: string } }) {
  const DEFAULT_URL = 'https://travelpulsa.otoreport.com/harga.js.php?id=261961d19c9819d08d948c082d00d388b28ab658b5c14471ad51c430420be8496b27cde0959069b42b00ba2fc9017dc6-206';
  const candidate = searchParams?.src ? decodeURIComponent(searchParams.src) : DEFAULT_URL;
  const SOURCE_URL = candidate.startsWith('https://travelpulsa.otoreport.com/harga.js.php') ? candidate : DEFAULT_URL;

  const res = await fetch(SOURCE_URL, { cache: 'no-store' });
  const raw = await res.text();
  const text = raw.replace(/\r\n?/g, '\n');

  type Section = { title: string; headers: string[]; rows: string[][] };

  function stripTags(html: string) {
    return html
      .replace(/<br\s*\/?>(\n)?/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .trim();
  }

  function parseMarkdownTables(markup: string): Section[] {
    const sections: Section[] = [];
    const lines = markup.split('\n');

    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (line.trim().startsWith('|')) {
        const sepIdx = i + 1;
        if (lines[sepIdx]?.trim().startsWith('|') && lines[sepIdx].includes('---')) {
          const getCells = (ln: string) => ln.split('|').slice(1, -1).map((s) => s.trim()).filter(Boolean);
          let headerCells = getCells(line);
          if (headerCells.length < 4 && lines[sepIdx + 1]?.trim().startsWith('|')) {
            headerCells = getCells(lines[sepIdx + 1]);
            i = sepIdx + 2;
          } else {
            i = sepIdx + 1;
          }
          const headers = headerCells.length >= 4 ? headerCells.slice(0, 4) : ['Kode', 'Keterangan', 'Harga', 'Status'];

          let title = '';
          for (let k = i - 3; k >= 0; k--) {
            const t = lines[k].trim();
            if (!t || t.startsWith('|')) continue;
            title = t.replace(/[#*_`]/g, '').trim();
            break;
          }

          const rows: string[][] = [];
          while (i < lines.length && lines[i].trim().startsWith('|')) {
            const parts = getCells(lines[i]);
            if (parts.length >= 4) rows.push(parts.slice(0, 4));
            i++;
          }
          if (rows.length > 0) sections.push({ title, headers, rows });
          continue;
        }
      }
      i++;
    }
    return sections;
  }

  function parseHtmlTables(markup: string): Section[] {
    const sections: Section[] = [];
    const tableMatches = markup.match(/<table[^>]*class=\"?tabel\"?[^>]*>[\s\S]*?<\/table>/gi) || [];
    for (const tbl of tableMatches) {
      const trMatches = tbl.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) || [];
      if (trMatches.length < 2) continue;

      let title = stripTags(trMatches[0] || '');
      if (/kode/i.test(title) && /keterangan/i.test(title)) title = '';

      const headerTds = (trMatches[1].match(/<td[^>]*>[\s\S]*?<\/td>/gi) || []).map((td) => stripTags(td));
      const headers = headerTds.length >= 4 ? headerTds.slice(0, 4) : ['Kode', 'Keterangan', 'Harga', 'Status'];

      const rows: string[][] = [];
      for (let r = 2; r < trMatches.length; r++) {
        const tds = (trMatches[r].match(/<td[^>]*>[\s\S]*?<\/td>/gi) || []).map((td) => stripTags(td));
        if (tds.length >= 4) rows.push(tds.slice(0, 4));
      }
      if (rows.length > 0) sections.push({ title, headers, rows });
    }
    return sections;
  }

  let sections: Section[] = parseHtmlTables(text);
  if (sections.length === 0) sections = parseMarkdownTables(text);

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-primary-50 to-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary">Daftar Harga Produk</h1>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {sections.length === 0 && (
            <p className="text-gray-600">Harga belum tersedia.</p>
          )}

          {sections.map((sec, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-md ring-1 ring-gray-100 overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-red-50 to-white">
                <h2 className="text-xl font-semibold text-secondary">{sec.title || 'Harga'}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {sec.headers.map((h, hi) => (
                        <th key={hi} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {sec.rows.map((row, ri) => (
                      <tr key={ri} className="hover:bg-primary/5 transition-colors">
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {ci === 2 ? (
                              <span className="font-semibold text-secondary">{cell}</span>
                            ) : (
                              cell
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
