
import React from 'react';
import { OPRData } from '../types';

interface ReportPreviewProps {
  data: OPRData;
}

export const ReportPreview: React.FC<ReportPreviewProps> = ({ data }) => {
  const logoUrl = "https://i.postimg.cc/xCQ9fWNF/IMG-9606-(1)-(1).jpg";

  return (
    <div className="pdf-page text-black leading-tight border-2 border-gray-100 force-print-visible">
      {/* Header Document */}
      <div className="flex flex-col items-center border-b-2 border-black pb-4 mb-4 text-center">
        <img 
          src={logoUrl} 
          alt="School Logo" 
          className="w-24 h-24 object-contain mb-3"
          crossOrigin="anonymous"
        />
        <div className="space-y-1">
          <h2 className="text-xl font-bold uppercase tracking-wide">SEKOLAH KEBANGSAAN KRANGAN</h2>
          <h3 className="text-lg font-bold uppercase tracking-tight">LAPORAN ONE PAGE REPORT SEKOLAH KEBANGSAAN KRANGAN 2026</h3>
          <p className="text-sm font-medium italic">"Pendidikan Berkualiti, Insan Terdidik, Negara Sejahtera"</p>
        </div>
      </div>

      {/* Details Table */}
      <div className="mb-4">
        <table className="w-full border-collapse border-2 border-black text-sm">
          <tbody>
            <tr>
              <td className="w-1/4 border-2 border-black bg-gray-100 p-2 font-bold uppercase">Program / Aktiviti</td>
              <td className="w-3/4 border-2 border-black p-2 font-semibold uppercase">{data.program || '-'}</td>
            </tr>
            <tr>
              <td className="border-2 border-black bg-gray-100 p-2 font-bold uppercase">Anjuran</td>
              <td className="border-2 border-black p-2 uppercase">{data.anjuran || '-'}</td>
            </tr>
            <tr>
              <td className="border-2 border-black bg-gray-100 p-2 font-bold uppercase">Tarikh</td>
              <td className="border-2 border-black p-2 uppercase">{data.tarikh || '-'}</td>
            </tr>
            <tr>
              <td className="border-2 border-black bg-gray-100 p-2 font-bold uppercase">Masa</td>
              <td className="border-2 border-black p-2 uppercase">{data.masa || '-'}</td>
            </tr>
            <tr>
              <td className="border-2 border-black bg-gray-100 p-2 font-bold uppercase">Sasaran</td>
              <td className="border-2 border-black p-2 uppercase">{data.sasaran || '-'}</td>
            </tr>
            <tr>
              <td className="border-2 border-black bg-gray-100 p-2 font-bold uppercase align-top">Objektif</td>
              <td className="border-2 border-black p-2 italic leading-relaxed whitespace-pre-wrap">{data.objektif || '-'}</td>
            </tr>
            <tr>
              <td className="border-2 border-black bg-gray-100 p-2 font-bold uppercase">KRA</td>
              <td className="border-2 border-black p-2 font-medium uppercase">{data.kra || '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Photos Section */}
      <div className="flex-grow flex flex-col">
        <div className="bg-black text-white text-center py-1 font-bold text-xs uppercase tracking-widest mb-2">
          LAPORAN BERGAMBAR
        </div>
        
        {/* Row 1: 3 Images */}
        <div className="grid grid-cols-3 gap-2 mb-2 h-1/3 min-h-[140px]">
          {[0, 1, 2].map((idx) => (
            <div key={idx} className="border-2 border-black aspect-[4/3] flex items-center justify-center bg-gray-50 overflow-hidden relative">
              {data.images[idx] ? (
                <img src={data.images[idx]!} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="text-[10px] text-gray-400 font-bold uppercase italic text-center p-2">Sila muat naik foto {idx + 1}</div>
              )}
            </div>
          ))}
        </div>

        {/* Row 2: 3 Images */}
        <div className="grid grid-cols-3 gap-2 h-1/3 min-h-[140px]">
          {[3, 4, 5].map((idx) => (
            <div key={idx} className="border-2 border-black aspect-[4/3] flex items-center justify-center bg-gray-50 overflow-hidden relative">
              {data.images[idx] ? (
                <img src={data.images[idx]!} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="text-[10px] text-gray-400 font-bold uppercase italic text-center p-2">Sila muat naik foto {idx + 1}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section - Signature */}
      <div className="mt-8 flex justify-end">
        <div className="w-72">
          <p className="font-bold text-sm mb-16">Disediakan Oleh,</p>
          <div className="border-b-2 border-black w-full mb-1"></div>
          <p className="text-sm font-bold uppercase">Nama: {data.nama || '__________________________'}</p>
          <p className="text-sm font-medium uppercase">Jawatan: {data.jawatan || '__________________________'}</p>
          <p className="text-xs mt-2 text-gray-600 font-semibold">SEKOLAH KEBANGSAAN KRANGAN</p>
        </div>
      </div>
    </div>
  );
};
