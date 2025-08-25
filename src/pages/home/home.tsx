import { Outlet } from "react-router-dom"
import Sidescreen from "./sidescreen"
import '../css/home/home.css'
import TambahPelanggan from "./tambahPelanggan"
import { useState } from "react"

function Home() {
    const [ isClicked, setIsClicked ] = useState<boolean>(false)
    
    function clicked(): void {
        isClicked ? setIsClicked(false) : setIsClicked(true)
    }

    return (
        <div className="home-container">
            <Sidescreen />
            <div className="mainscreen-container">
                <Outlet />
            </div>
            <div className="tambahPelangganBTN" onClick={clicked}>
                <p>+</p>
            </div>
            <div className={ isClicked ? "tambahPelanggan-overlay" : "deactivate" }>
                <div className="tambahPelanggan-main-container">
                    <div className="tambahPelanggan-closeBTN" onClick={clicked}>
                        <p>{"<"}</p>
                    </div>
                    <TambahPelanggan />
                </div>
            </div>
        </div>
    )
}

export default Home 