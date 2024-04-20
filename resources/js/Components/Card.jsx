import html2canvas from 'html2canvas-pro';
import { useRef } from 'react';

export default function Card({info}) {
    const printRef = useRef();

    var santunan = [
        {A: "Rp. 25.000.000", C: "Rp 2.500.000", D: "Rp 500.000", E: "Rp 2.500.000"},
        {A: "Rp. 50.000.000", C: "Rp 5.000.000", D: "Rp 1.000.000", E: "Rp 5.000.000"},
        {A: "Rp. 100.000.000", C: "Rp 10.000.000", D: "Rp 2.000.000", E: "Rp 10.000.000"}
    ]
    
    const handleImageDownload = async () => {
        const element = printRef.current,
        canvas = await html2canvas(element),
        data = canvas.toDataURL('image/png'),
        link = document.createElement('a');
    
        link.href = data;
        link.download = 'kartu '+info['Nama']+' ('+info["Jenis kartu"]+').png';
    
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

    return(
        <div>
            <div ref={printRef} className='items-center text-center rounded px-3 py-3 w-96 font-bold border-2 border-slate-950 rounded-lg'>
                    <h2>{info['Nama']}</h2>
                    <p className="my-2">{info['Nama perusahaan']}</p>
                    {info["Jenis kartu"].toLowerCase() == "silver" ? 
                        <div class="grid grid-cols-2 gap-4 mb-4">
                            <p className="text-xs text-right">A/B :{santunan[0].A}</p>
                            <p className="text-xs text-left">C :{santunan[0].C}</p>
                            <p className="text-xs text-right">D :{santunan[0].D}</p>
                            <p className="text-xs text-left">E :{santunan[0].E}</p>
                        </div>
                    : ""}

                    {info["Jenis kartu"].toLowerCase() == "gold" ? 
                        <div class="grid grid-cols-2 gap-4 mb-4">
                            <p className="text-xs text-right">A/B :{santunan[1].A}</p>
                            <p className="text-xs text-left">C :{santunan[1].C}</p>
                            <p className="text-xs text-right">D :{santunan[1].D}</p>
                            <p className="text-xs text-left">E :{santunan[1].E}</p>
                        </div>
                    : ""}

                    {info["Jenis kartu"].toLowerCase() == "platinum" ? 
                        <div class="grid grid-cols-2 gap-4 mb-4">
                            <p className="text-xs text-right">A/B :{santunan[2].A}</p>
                            <p className="text-xs text-left">C :{santunan[2].C}</p>
                            <p className="text-xs text-right">D :{santunan[2].D}</p>
                            <p className="text-xs text-left">E :{santunan[2].E}</p>
                        </div>
                    : ""}

                    <div class="grid grid-cols-2 gap-4 mb-4 w-full whitespace-nowrap text-sm">
                        <p className="text-left">Berlaku s.d {info['Berlaku sampai']}</p>
                        <p className="text-right">{info['Unique code']}</p>
                        <p className="text-left">Polis No: {info['No. polis']}</p>
                        <p className="text-right">{info['Nomor sertifikat']}</p>
                    </div>
            </div>

            <div className='flex justify-center my-3'>
                <button type="button" className="btn btn-success" onClick={handleImageDownload}>Download</button>
            </div>
        </div>
    )
}