'use client';

import { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import apiClient from '@/services/api';

type FormatOption = 'pdf' | 'xlsx' | 'preview';

const OPTIONS: { value: FormatOption; label: string }[] = [
  { value: 'pdf', label: 'PDF' },
  { value: 'xlsx', label: 'Excel' },
  { value: 'preview', label: 'Preview' },
];

export function ExportReport() {
  const [format, setFormat] = useState<FormatOption>('pdf');
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await apiClient.exportReport(format);

      if (result.kind === 'preview') {
        console.log('Preview report data:', result.data);
        alert('Preview disponível no console (F12).');
        return;
      }

      const { blob, filename } = result;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Erro ao exportar relatório:', e);
      alert('Falha ao exportar. Verifique o console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white border-gray-200 rounded-md py-3 px-4 w-fit'>
      <div className='flex items-center gap-2'>
        <label htmlFor='format' className='text-sm font-medium text-gray-700'>
          Exportar
        </label>
        <select
          id='format'
          value={format}
          onChange={e => setFormat(e.target.value as FormatOption)}
          disabled={loading}
          className='px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-60'
        >
          {OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type='button'
        onClick={handleExport}
        disabled={loading}
        className='inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors'
      >
        {loading && (
          <svg
            className='animate-spin h-4 w-4 mr-2 text-white'
            viewBox='0 0 24 24'
            fill='none'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
            />
          </svg>
        )}
        {loading ? (
          <span>Exportando...</span>
        ) : (
          <ArrowDownTrayIcon className='h-5 w-5 mr-2' />
        )}
      </button>

      {format === 'preview' && (
        <span className='text-xs text-gray-500 italic'>
          Resultado será exibido no console
        </span>
      )}
    </div>
  );
}

export default ExportReport;
