
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { OPRData, INITIAL_DATA } from './types.ts';
import { FormSection } from './components/FormSection.tsx';
import { ReportPreview } from './components/ReportPreview.tsx';
import { FileDown, FileText, CheckCircle2, Layout, BookOpen, Save, Trash2 } from 'lucide-react';

const DRAFT_KEY = 'e-opr-sk-krangan-draft';

const App: React.FC = () => {
  const [data, setData] = useState<OPRData>(INITIAL_DATA);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const reportRef = useRef<HTMLDivElement>(null);

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_KEY);
    if (savedDraft) {
      try {
        const parsedData = JSON.parse(savedDraft);
        setData(parsedData);
      } catch (e) {
        console.error("Failed to parse saved draft", e);
      }
    }
  }, []);

  const handleDataChange = (field: keyof OPRData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (index: number, base64: string | null) => {
    const newImages = [...data.images];
    newImages[index] = base64;
    setData(prev => ({ ...prev, images: newImages }));
  };

  const saveDraft = () => {
    setSaveStatus('saving');
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (e) {
      console.error("Failed to save draft", e);
      alert("Gagal menyimpan draf. Mungkin saiz gambar terlalu besar untuk simpanan pelayar.");
      setSaveStatus('idle');
    }
  };

  const clearDraft = () => {
    if (window.confirm("Adakah anda pasti ingin memadam draf dan mengosongkan borang?")) {
      localStorage.removeItem(DRAFT_KEY);
      setData(INITIAL_DATA);
    }
  };

  const generatePDF = useCallback(async () => {
    if (!reportRef.current) return;
    
    setIsGenerating(true);
    
    // Ensure all images are ready and rendered
    await new Promise(resolve => setTimeout(resolve, 800));

    const element = reportRef.current;
    
    // Optimized for A4 One Page Report
    const opt = {
      margin: 0,
      filename: `E-OPR_${data.program.replace(/\s+/g, '_') || 'SK_Krangan'}.pdf`,
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        logging: false,
        letterRendering: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true
      }
    };

    try {
      // @ts-ignore - html2pdf is globally loaded via script tag
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF Generation failed:", error);
      alert("Gagal menjana PDF. Sila pastikan sambungan internet stabil dan cuba lagi.");
    } finally {
      setIsGenerating(false);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Navbar / Header */}
      <nav className="bg-[#002147] text-white shadow-xl no-print sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-1.5 rounded-xl shadow-inner transform hover:rotate-3 transition-transform">
              <img 
                src="https://i.postimg.cc/xCQ9fWNF/IMG-9606-(1)-(1).jpg" 
                alt="Logo SK Krangan" 
                className="h-12 w-12 object-contain"
                crossOrigin="anonymous"
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-none uppercase">E-OPR SK KRANGAN</h1>
              <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mt-1">SISTEM PELAPORAN AKTIVITI SEKOLAH</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
             <button
              onClick={saveDraft}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold transition-all text-sm
                ${saveStatus === 'saved' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-blue-800/50 hover:bg-blue-700 text-blue-100 border border-blue-700/50'}`}
            >
              {saveStatus === 'saving' ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : saveStatus === 'saved' ? (
                <CheckCircle2 size={18} />
              ) : (
                <Save size={18} />
              )}
              <span className="hidden sm:inline">{saveStatus === 'saved' ? 'Draf Disimpan' : 'Simpan Draf'}</span>
            </button>

             <button
              onClick={generatePDF}
              disabled={isGenerating}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl font-black transition-all shadow-lg text-sm
                ${isGenerating 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-yellow-400 hover:bg-yellow-300 text-blue-900 active:scale-95 hover:shadow-yellow-400/20'}`}
            >
              {isGenerating ? (
                <>
                  <div className="h-4 w-4 border-2 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
                  <span>SEDANG MENJANA...</span>
                </>
              ) : (
                <>
                  <FileDown size={18} strokeWidth={3} />
                  <span>JANA PDF OPR</span>
                </>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 no-print">
        {/* Left Side: Form */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-8 py-6 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg text-white">
                  <FileText size={20} />
                </div>
                <h2 className="font-black text-slate-800 text-lg uppercase tracking-tight">BORANG PELAPORAN</h2>
              </div>
              <button 
                onClick={clearDraft}
                className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50"
                title="Kosongkan Borang"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <div className="p-8">
              <FormSection 
                data={data} 
                onDataChange={handleDataChange} 
                onImageUpload={handleImageUpload} 
              />
            </div>
          </div>
          
          <div className="bg-indigo-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-xl font-black mb-4 flex items-center">
                <CheckCircle2 size={24} className="mr-3 text-yellow-400" />
                Sila Pastikan
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3 text-indigo-100">
                   <div className="mt-1 bg-indigo-700 rounded-full p-1"><Layout size={12} /></div>
                   <span>Semua ruangan butiran (KRA, Sasaran, dll) diisi dengan tepat.</span>
                </li>
                <li className="flex items-start space-x-3 text-indigo-100">
                   <div className="mt-1 bg-indigo-700 rounded-full p-1"><BookOpen size={12} /></div>
                   <span>Gunakan 6 keping gambar aktiviti yang paling menarik & relevan.</span>
                </li>
                <li className="flex items-start space-x-3 text-indigo-100">
                   <div className="mt-1 bg-indigo-700 rounded-full p-1"><Save size={12} /></div>
                   <span>Data borang disimpan secara automatik dalam pelayar ini (Draf).</span>
                </li>
              </ul>
            </div>
            <div className="absolute top-[-20%] right-[-10%] opacity-10 transform rotate-12 group-hover:rotate-0 transition-transform duration-1000">
               <FileText size={200} />
            </div>
          </div>
        </div>

        {/* Right Side: Live Preview */}
        <div className="lg:col-span-5 hidden lg:block">
           <div className="sticky top-28 space-y-6">
             <div className="flex items-center justify-between px-2">
                <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center">
                  <Layout size={16} className="mr-2 text-blue-600" />
                  Pratonton Laporan
                </h3>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded italic">Skala: 55%</span>
             </div>
             
             <div className="bg-slate-200 p-6 rounded-3xl shadow-inner border-2 border-slate-300/50 flex justify-center overflow-hidden">
                <div className="transform scale-[0.52] origin-top hover:scale-[0.55] transition-transform duration-500 cursor-zoom-in">
                  <ReportPreview data={data} />
                </div>
             </div>
             
             <p className="text-center text-slate-400 text-xs italic font-medium">
               Klik butang di atas untuk memuat turun PDF dalam saiz A4 yang sempurna.
             </p>
           </div>
        </div>
      </main>

      {/* Hidden container for actual PDF generation at full scale */}
      <div className="fixed left-[-9999px] top-0 no-print" aria-hidden="true">
        <div ref={reportRef}>
          <ReportPreview data={data} />
        </div>
      </div>

      <footer className="bg-white py-10 border-t border-slate-200 no-print mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <img src="https://i.postimg.cc/xCQ9fWNF/IMG-9606-(1)-(1).jpg" className="h-8 w-8 grayscale opacity-50" alt="" />
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">&copy; 2026 SK KRANGAN. PELAPORAN RASMI SEKOLAH.</p>
          </div>
          <div className="flex space-x-6 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <span className="hover:text-blue-600 cursor-help transition-colors">Bantuan</span>
            <span className="hover:text-blue-600 cursor-help transition-colors">Privasi</span>
            <span className="hover:text-blue-600 cursor-help transition-colors">Pekeliling</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
