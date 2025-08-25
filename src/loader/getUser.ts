export default async function getUser(): Promise<any> {
    let data: any;
    try {
        const res = await fetch("http://localhost/synau/pinjamdgt.php?route=fetchingAwal", {
            method: "get"
        })
        data = await res.json()
        console.log(data)

        const optimizedData = data.pelanggan.map((user: {idPelanggan: string, nama: string, alamat: string, noTelp: string, jenisMember: string}) => {
            const idToNumber = parseInt(user.idPelanggan, 10)
            const pinjaman = data.pinjaman.filter((pinjaman: {idPeminjaman: string, idPelanggan: string, idItem: string, brand: string, model: string}) => user.idPelanggan === pinjaman.idPelanggan)
            return { ...user, idPelanggan: idToNumber, pinjaman }
        })
        return optimizedData;
    } catch(err) {
        console.log(err)
        return []
    }



// const users = {
//     pelanggan: [
//         {id: 1, nama: "Moe", noTelp: "0866492019", jenisMember: "premium"},
//         {id: 2, nama: "Joe", noTelp: "0866492020", jenisMember: "reguler"},
//         {id: 3, nama: "Anna", noTelp: "0866492021", jenisMember: "premium"},
//         {id: 4, nama: "Rudi", noTelp: "0866492022", jenisMember: "reguler"},
//         {id: 5, nama: "Siti", noTelp: "0866492023", jenisMember: "premium"},
//     ],
//     pinjaman: [
//         {id: 1, idItem: 1, userId: 1, brand: "Razer", model: "RGB-V1", subtotal: 500000},
//         {id: 2, idItem: 2, userId: 1, brand: "Razer", model: "RGB-V4", subtotal: 1100000},
//         {id: 3, idItem: 3, userId: 2, brand: "Sony", model: "A600", subtotal: 450000},
//         {id: 4, idItem: 4, userId: 2, brand: "Asus", model: "ROG-Phone", subtotal: 2000000},
//         {id: 5, idItem: 5, userId: 3, brand: "Logitech", model: "G502", subtotal: 350000},
//         {id: 6, idItem: 6, userId: 3, brand: "Canon", model: "EOS M10", subtotal: 1500000},
//         {id: 7, idItem: 7, userId: 4, brand: "MSI", model: "GF63", subtotal: 7500000},
//     ]
// };

//     const optimizedData = users.pelanggan.map((user) => {
//         const pinjaman = users.pinjaman.filter(pinjaman => user.id === pinjaman.userId)
//         return { ...user, pinjaman }
//     })
//     return optimizedData;
}