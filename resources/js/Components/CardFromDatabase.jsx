import Card from "./Card";

export default function CardFromDatabase({info}) {
    var infoCard = {
        "Berlaku sampai":info["Berlaku_sampai"], "Jenis kartu":info["Jenis_kartu"], "Nama":info["Nama"], "Nama perusahaan":info["Nama_perusahaan"], "No. polis":info["No_polis"], "Nomor sertifikat":info["Nomor_sertifikat"], "Unique code":info["Unique_code"]
    }
    return(
        <Card info={infoCard}></Card>
    )
}