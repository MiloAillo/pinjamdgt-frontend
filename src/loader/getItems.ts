export default async function getItems() {
    try {
        const res = await fetch("http://localhost/synau/pinjamdgt.php?route=itemsAvailable")
        const data = await res.json()        
        const optimizedData = data.map((item: {idItem: string,  brand: string, model: string, harga: string, status: string}) => {
            const idToNumber = parseInt(item.idItem, 10)
            return {...item, idItem: idToNumber}
        })
        return optimizedData
    } catch(err) {
        console.log("getItem error")
        return []
    }

    // const items = [
    //     {id: 1, brand: "Ashley", model: "WX80", harga: "500000"},
    //     {id: 2, brand: "Sennheiser", model: "HD600", harga: "220000"},
    //     {id: 3, brand: "Sony", model: "Handycam A1", harga: "355999"},
    //     {id: 4, brand: "Nikon", model: "A650", harga: "779000"},
    //     {id: 5, brand: "Audio 64", model: "Blue", harga: "1599000"},
    // ]
    // return items
}