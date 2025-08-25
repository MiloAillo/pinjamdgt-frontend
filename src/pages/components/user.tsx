import { useEffect, useState } from "react"
import "../css/components/user.css"
import Pinjaman from "./pinjaman"

interface UserInterface {
    idPelanggan: number,
    nama: string,
    noTelp: string,
    jenisMember: string,
    pinjaman?: { idPeminjaman: number, idPelanggan: number, idItem: number, brand: string, model: string, subtotal: string }[] // check lagi, usahain nerimanya array biar bisa di foreach
}

function User({idPelanggan, nama, noTelp, jenisMember, pinjaman}: UserInterface) {
    const [ isClicked, setIsClicked ] = useState<boolean>(false)
    const [ userId, setUserId ] = useState<number | null>(null)

    function clicked() {
        isClicked ? setIsClicked(false) : setIsClicked(true)
    }

    useEffect(() => setUserId(idPelanggan), [])
    
    return (
        <div className={isClicked ? "user user-active" : "user user-static"} onClick={clicked}>
            <div className="user-profile-container">
                <div className="user-profile">
                    <p className="user-profile-name">{nama}</p>
                    <p className="user-profile-phone">{noTelp}</p>
                </div>
                <div className="user-member">
                    <p className="user-member-status">{jenisMember}</p>
                </div>
            </div>
            <div className={ isClicked ? "user-extend" : "deactivate"}>
                {/* !! tinggal di rework pinjaman nya sesuai figma, lalu dibuat dinamis. pinjaman sudah masuk ke komponen ini. !! */}
                {pinjaman?.map((e) => {
                    return <Pinjaman id={e.idPeminjaman} ItemId={e.idItem} brand={e.brand} model={e.model} subtotal={e.subtotal}/>
                })}
                <div className="user-pinjam" onClick={() => {window.location.href = `/pinjam/${userId}`}}>Pinjam</div>
            </div>
        </div>
    )
}

export default User
