import { Link } from "@inertiajs/react";
export default function Navbar() {
    return(
        <>
            <div className="navbar bg-white text-neutral">
                <img src="/img/logo.jpg" className="max-h-12" />
                <Link href="/" method="GET" as="button"><button className="btn btn-ghost">Home</button></Link>
                <Link href="/history" method="GET" as="button"><button className="btn btn-ghost">Riwayat</button></Link>
            </div>
            <hr className="h-1 bg-logo-color" />
        </>
    );
}