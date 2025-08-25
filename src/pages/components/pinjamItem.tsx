import '../css/components/pinjamItem.css'

interface ItemInterface {
    id: number,
    brand: string,
    model: string,
    harga: number,
    img?: string,
    jenisMember: string,
    handlePinjam: (id: number, brand: string, model: string, harga: number, jenisMember: string) => void
}

function Item({ id, brand, model, harga, img, handlePinjam, jenisMember }: ItemInterface) {

    return (
        <div className='item-container'>
            <div className='item-img'><img src={img ? img : ""} alt="" /></div>
            <div className='item-detail'>
                <div className='item-header'>
                    <p className='item-tittle'>{`${brand} ${model}`}</p>
                    <p className='item-harga'>Rp. {jenisMember === "premium" ? (harga * (95/100)).toLocaleString("ID-id") : harga.toLocaleString("ID-id")}</p>
                </div>
                <div className='item-pinjam-BTN' onClick={() => {handlePinjam(id, brand, model, harga, jenisMember)}}>Pinjam</div>
            </div>
        </div>
    )
}

export default Item