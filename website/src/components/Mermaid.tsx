'use client';

import mermaid from 'mermaid';
import { useEffect, useRef, useState } from 'react';

export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef(null);
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    const renderChart = async () => {
      if (ref.current) {
        try {
          const { svg } = await mermaid.render('mermaid-svg', chart);
          setSvgContent(svg);
        } catch (error) {
          console.error('Error rendering mermaid chart:', error);
          setSvgContent('');
        }
      }
    };

    renderChart();
  }, [chart]);

  return (
    <div ref={ref}>
      {svgContent ? (
        <div dangerouslySetInnerHTML={{ __html: svgContent }} />
      ) : (
        <div>Loading chart...</div>
      )}
    </div>
  );
}
