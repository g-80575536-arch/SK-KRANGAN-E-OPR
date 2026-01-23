
import React from 'react';
import { OPRData } from '../types';
import { Camera, User, Briefcase, Calendar, Clock, Target, FileText, LayoutGrid } from 'lucide-react';

interface FormSectionProps {
  data: OPRData;
  onDataChange: (field: keyof OPRData, value: string) => void;
  onImageUpload: (index: number, base64: string | null) => void;
}

export const FormSection: React.FC<FormSectionProps> = ({ data, onDataChange, onImageUpload }) => {
  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Saiz gambar terlalu besar. Sila guna gambar bawah 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(index, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const inputClass = "w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none text-slate-800 font-medium placeholder:text-slate-400";
  const labelClass = "block text-sm font-bold text-slate-700 mb-2 flex items-center";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-full">
          <label className={labelClass}><FileText size={18} className="mr-2 text-blue-600" /> Nama Program / Aktiviti</label>
          <input 
            type="text" 
            value={data.program} 
            onChange={(e) => onDataChange('program', e.target.value)}
            className={inputClass}
            placeholder="Masukkan nama penuh program"
          />
        </div>
        
        <div>
          <label className={labelClass}><Briefcase size={18} className="mr-2 text-blue-600" /> Anjuran</label>
          <input 
            type="text" 
            value={data.anjuran} 
            onChange={(e) => onDataChange('anjuran', e.target.value)}
            className={inputClass}
            placeholder="Unit / Panitia / Kelab"
          />
        </div>

        <div>
          <label className={labelClass}><Calendar size={18} className="mr-2 text-blue-600" /> Tarikh</label>
          <input 
            type="text" 
            value={data.tarikh} 
            onChange={(e) => onDataChange('tarikh', e.target.value)}
            className={inputClass}
            placeholder="Contoh: 12 Mac 2026"
          />
        </div>

        <div>
          <label className={labelClass}><Clock size={18} className="mr-2 text-blue-600" /> Masa</label>
          <input 
            type="text" 
            value={data.masa} 
            onChange={(e) => onDataChange('masa', e.target.value)}
            className={inputClass}
            placeholder="Contoh: 8:00 Pagi - 1:00 Petang"
          />
        </div>

        <div>
          <label className={labelClass}><Target size={18} className="mr-2 text-blue-600" /> Sasaran</label>
          <input 
            type="text" 
            value={data.sasaran} 
            onChange={(e) => onDataChange('sasaran', e.target.value)}
            className={inputClass}
            placeholder="Siapa peserta program?"
          />
        </div>

        <div className="col-span-full">
          <label className={labelClass}><LayoutGrid size={18} className="mr-2 text-blue-600" /> Objektif Program</label>
          <textarea 
            value={data.objektif} 
            onChange={(e) => onDataChange('objektif', e.target.value)}
            className={`${inputClass} h-32 resize-none leading-relaxed`}
            placeholder="Senaraikan objektif program di sini..."
          />
        </div>

        <div className="col-span-full">
          <label className={labelClass}><Target size={18} className="mr-2 text-blue-600" /> Key Result Area (KRA)</label>
          <input 
            type="text" 
            value={data.kra} 
            onChange={(e) => onDataChange('kra', e.target.value)}
            className={inputClass}
            placeholder="Contoh: KRA 1 - Kualiti Guru"
          />
        </div>
      </div>

      <div className="pt-6 border-t-2 border-slate-100">
        <h3 className="font-black text-slate-800 mb-4 flex items-center text-lg uppercase tracking-tight">
          <Camera size={22} className="mr-3 text-blue-600" /> 
          Laporan Bergambar (6 Keping)
        </h3>
        <p className="text-sm text-slate-500 mb-6 italic">Muat naik 3 keping untuk baris atas dan 3 keping untuk baris bawah.</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {data.images.map((img, idx) => (
            <div key={idx} className="relative aspect-[4/3] bg-white border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center overflow-hidden hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer group shadow-sm">
              {img ? (
                <>
                  <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onImageUpload(idx, null); }}
                      className="bg-white text-red-600 p-2 rounded-full shadow-lg transform hover:scale-110 transition-transform"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center p-4">
                  <div className="bg-slate-100 p-3 rounded-full mb-2 mx-auto group-hover:bg-blue-100 transition-colors">
                    <Camera size={24} className="text-slate-400 group-hover:text-blue-600" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Foto {idx + 1}</span>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleFileChange(idx, e)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t-2 border-slate-100 bg-slate-50 p-6 rounded-2xl border-2 border-slate-200">
        <h3 className="font-black text-slate-800 mb-6 flex items-center text-lg uppercase tracking-tight">
          <User size={22} className="mr-3 text-blue-600" /> 
          Butiran Penyedia Laporan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Nama Penuh</label>
            <input 
              type="text" 
              value={data.nama} 
              onChange={(e) => onDataChange('nama', e.target.value)}
              className={inputClass}
              placeholder="Masukkan nama anda"
            />
          </div>
          <div>
            <label className={labelClass}>Jawatan</label>
            <input 
              type="text" 
              value={data.jawatan} 
              onChange={(e) => onDataChange('jawatan', e.target.value)}
              className={inputClass}
              placeholder="Contoh: Guru Perpustakaan"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
