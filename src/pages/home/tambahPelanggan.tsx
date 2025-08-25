import { useRef } from 'react'
import '../css/home/tambahPelanggan.css'

function TambahPelanggan() {
    const namaRef = useRef<HTMLInputElement | null>(null)
    const alamatRef = useRef<HTMLInputElement | null>(null)
    const telpRef = useRef<HTMLInputElement | null>(null)
    const jenisMember = useRef<HTMLSelectElement | null>(null)

    async function tambahPelanggan() {
        console.log(namaRef.current?.value, alamatRef.current?.value, telpRef.current?.value, jenisMember.current?.value)
        try {
            const body = JSON.stringify({nama: namaRef.current?.value, alamat: alamatRef.current?.value, noTelp: telpRef.current?.value, jenisMember: jenisMember.current?.value})
            const res = await fetch("http://localhost/synau/pinjamdgt.php?route=tambahPelanggan", {
                method: "POST",
                body: body
            })
            const data = await res.json()
            console.log(data)

            window.location.href = "/"
        } catch(err) {
            console.log(err)
        }
    }


    return (
        <div className='tambah-pelanggan-container'>
            <p className='tambah-pelanggan-tittle'>Tambah Pelanggan</p>
            <div className='tambah-pelanggan-form-container'>
                <form action="">
                    <div className='tambah-pelanggan-form-data'>
                        <label htmlFor="nama">Nama</label>
                        <input type="text" id='nama' ref={namaRef}/>
                    </div>
                    <div className='tambah-pelanggan-form-data'>
                        <label htmlFor="alamat">Alamat</label>
                        <input type="text" id='alamat' ref={alamatRef}/>
                    </div>
                    <div className='tambah-pelanggan-form-data'>
                        <label htmlFor="notelp">Nomor Telepon</label>
                        <input type="text" id='notelp' ref={telpRef}/>
                    </div>
                    <div className='tambah-pelanggan-form-data'>
                        <label htmlFor="jenismember">Jenis Member</label>
                        <select id="jenismember" ref={jenisMember}>
                            <option value="reguler">Reguler</option>
                            <option value="premium">Premium</option>
                        </select>
                    </div>
                </form>
            </div>
            <div className='tambah-pelanggan-submit' onClick={tambahPelanggan}>Tambah</div>
        </div>
    )
}

export default TambahPelanggan