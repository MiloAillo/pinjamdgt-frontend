import { useRouteLoaderData } from "react-router-dom"
import User from "../components/user"
import '../css/home/mainscreen.css'
import { useEffect } from "react"

function Mainscreen() {
    const data = useRouteLoaderData('users') as {
        idPelanggan: number
        nama: string
        noTelp: string
        jenisMember: string
        pinjaman?: { idPeminjaman: number, idPelanggan: number, idItem: number, brand: string, model: string, subtotal: string }[]
    }[]

    useEffect(() => console.log(data), [])

    return (
        <div className="home-mainscreen">
            {data.map(e => (
                <User
                  idPelanggan={e.idPelanggan}
                  nama={e.nama} 
                  noTelp={e.noTelp} 
                  jenisMember={e.jenisMember} 
                  pinjaman={e.pinjaman}
                />
            ))}
        </div>
    )
}

export default Mainscreen