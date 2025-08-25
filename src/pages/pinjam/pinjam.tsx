import { useEffect, useState } from "react";
import Item from "../components/pinjamItem"
import "../css/pinjam/pinjam.css"
import { useLoaderData, useParams, useRouteLoaderData } from "react-router-dom";

function Pinjam() {
    // ambil id sama nama dari loader buat fetching dan UI
    const users = useLoaderData() as {
        idPelanggan: number,
        nama: string,
        jenisMember: string
    }[]

    // ambil data barang dari loader items
    const itemsLoader = useRouteLoaderData("items") as {
        idItem: number,
        brand: string,
        model: string,
        harga: string,
        status: string
    } []

    // cek isi ItemsLoader
    itemsLoader.forEach(e => {
        console.log(e.brand)
    });

    // ambil id dari parameter
    const { paramId } = useParams()


    const [ data, setData ] = useState<{ id: number, nama: string, jenisMember: string }>({
        id: 0,
        nama: "",
        jenisMember: ""
    })

    console.log(users)

    // cek jika parameter id sesuai dengan data di db
    useEffect(() => {
        const id = paramId ? parseInt(paramId, 10) : NaN
        // console.log(id)
        const item = users.find(user => user.idPelanggan === id)
        // console.log(item)
        if (item) {
            setData({
                id: item.idPelanggan,
                nama: item.nama,
                jenisMember: item.jenisMember
            })
        } else {
            window.location.href = "/"
        }
    }, [])

    // handler buat klik pinjamnya
    async function handlePinjam(id: number, brand: string, model: string, harga: number, jenisMember: string) {
        console.log(data.id, id, brand, model, harga, jenisMember)
        try {
            const res = await fetch("http://localhost/synau/pinjamdgt.php?route=pinjam", {
                method: "POST",
                body: JSON.stringify({userId: data.id, itemId: id, subtotal: harga, jenisMember: jenisMember})
            })
            window.location.href = "/"
            console.log(res)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="pinjam-container">
            <div className="header">
                <p className="header-tittle">Tambah Pinjaman</p>
                <p className="header-name">{data.nama}</p>
            </div>
            <div className="items">
                {/* membuat card items berdasarkan data yang ada */}
                {itemsLoader.map(element => (
                    <Item
                        id={element.idItem}
                        brand={element.brand}
                        model={element.model}
                        harga={parseInt(element.harga, 10)}
                        jenisMember={data.jenisMember}
                        handlePinjam={handlePinjam}
                    />
                ))}
            </div>
        </div>
    )
}

export default Pinjam