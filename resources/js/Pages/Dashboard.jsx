import { useState } from "react";
import { Head, router } from '@inertiajs/react';
import * as XLSX from "xlsx";
import Card from "../Components/Card";

export default function Homepage(props) {
    console.log(props.generated)
    const [data, setData] = useState([]);
    console.log(data)

    const handleFileUpload = (e) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e) => {
            const data = e.target.result
            const workbook = XLSX.read(data, {type: "binary"})
            const sheetName = workbook.SheetNames[0]
            const sheet = workbook.Sheets[sheetName]
            const parsedData = XLSX.utils.sheet_to_json(sheet)
            console.log(parsedData)
            setData(parsedData)
        }
    }

    const handleSubmit = () => {
        router.post('/', data)
    }

    return(
        <>
            <div className="navbar bg-neutral text-neutral-content">
                <button className="btn btn-ghost text-xl">Jasa raharja insurance</button>
            </div>

            <div className="flex justify-center m-8">
                <input type="file" accept=".xlsx, .xls" className="file-input file-input-bordered file-input-info w-full max-w-xs" onChange={handleFileUpload}/> 
            </div>

            <div className="flex justify-center m-8">
                <div className="overflow-x-auto h-60">
                    <table className="table table-pin-rows">
                        {/* head */}
                        <thead>
                        <tr>
                            <th></th>
                            <th>No. polis</th>
                            <th>Nama</th>
                            <th>Nama perusahaan</th>
                            <th>Berlaku sampai</th>
                            <th>Nomor sertifikat</th>
                            <th>Jenis kartu</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.length > 0 ? data.map((data, i) =>
                            <tr className="hover">
                                <th>{i+1}</th>
                                <td>{data['No. polis']}</td>
                                <td>{data['Nama']}</td>
                                <td>{data['Nama perusahaan']}</td>
                                <td>{data['Berlaku sampai']}</td>
                                <td>{data['Nomor sertifikat']}</td>
                                <td>{data['Jenis kartu']}</td>
                            </tr>
                        ) 
                        : 
                        ""}
                        {/* row 2 */}


                        </tbody>
                    </table>
                </div>
            </div>
            {data.length > 0 && props.generated == null ? 
                <div className='flex justify-center my-3'>
                    <button type="button" className="btn btn-success" onClick={handleSubmit}>Generate card</button>
                </div>
            : ""}

            {props.generated != null ?
                <div className='flex justify-center my-3'>
                    <p className="text-green-500 font-bold mb-3">Card generated</p>
                </div>
            : ""}
            
            <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-4">
                    {props.generated != null ?
                            props.generated.map((data, i) =>
                                <Card info={data}></Card>
                            )
                        : ""}
                </div>
            </div>

        </>
    );
}