import { useState } from "react";
import Navbar from "@/Components/Navbar";
import CardFromDatabase from "@/Components/CardFromDatabase";
import { Link, Head } from "@inertiajs/react";

export default function History({cards}) {
    const [searchId, setId] = useState("");
    const [searchNama, setNama] = useState("");
    const [searchPerusahaan, setPerusahaan] = useState("");
    return(
        <>
            <Head title="Riwayat" />
            <Navbar></Navbar>
            <div className="flex justify-center my-8">
                <label className="input input-bordered flex items-center gap-2 mx-5">
                    <input type="text" className="grow border-transparent" placeholder="Kode unik" onChange={e => setId(e.target.value)}/>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>
                <label className="input input-bordered flex items-center gap-2 mx-5">
                    <input type="text" className="grow border-transparent" placeholder="Nama pemilik" onChange={e => setNama(e.target.value)}/>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>
                <label className="input input-bordered flex items-center gap-2 mx-5">
                    <input type="text" className="grow border-transparent" placeholder="Nama perusahaan" onChange={e => setPerusahaan(e.target.value)}/>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>
            </div>
            <div className="flex justify-center my-4">
                <div className="grid grid-cols-3 gap-4">
                            {cards.map((data, i) =>
                                {
                                    if(data["Unique_code"].toLowerCase().includes(searchId.toLowerCase()) && data["Nama"].toLowerCase().includes(searchNama.toLowerCase()) && data["Nama_perusahaan"].toLowerCase().includes(searchPerusahaan.toLowerCase())) {
                                        return <CardFromDatabase info={data} key={i}></CardFromDatabase>
                                    } else {
                                        return ""
                                    }
                                    
                                }
                                
                            )}
                </div>
            </div>
            {cards.length == 0 ? 
            <>
                <div className='flex justify-center'>

                    <p className="text-logo-color font-bold">Belum ada kartu yang dibuat</p>
                </div>
                <div className='flex justify-center'>
                    <Link href="/" method="GET" as="button"><button className="btn btn-link">Klik disini untuk mulai membuat kartu</button></Link>
                </div>
            </>
            :""}
        </>
    )
}