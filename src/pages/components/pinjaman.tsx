import '../css/components/pinjaman.css'

interface PinjamanInterface {
    id: number,
    ItemId: number,
    brand: string,
    model: string,
    subtotal: string,
}

function Pinjaman({ id, ItemId, brand, model, subtotal }: PinjamanInterface) {
    async function kembalikan(id: number, itemId: number) {
        console.log(id, itemId)
        try {
            const res = await fetch("http://localhost/synau/pinjamdgt.php?route=kembalikan", {
                method: "POST",
                body: JSON.stringify({pinjamanId: id, itemId: itemId})
            })
            window.location.href = "/"
            console.log(res)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="pinjaman-container">
            <div className='pinjaman-info'>
                <div className="pinjaman-data">
                    <p className='pinjaman-tittle'>{`${brand} ${model}`}</p>
                </div>
                <div>
                    <p className="pinjaman-subtotal">{`Rp. ${parseInt(subtotal, 10).toLocaleString("ID-id")}`}</p>
                </div>
            </div>
            <div className='pinjaman-return' onClick={() => kembalikan(id, ItemId)}>Kembalikan</div>
        </div>
    )
}

export default Pinjaman