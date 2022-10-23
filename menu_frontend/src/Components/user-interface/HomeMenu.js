import { useState, useEffect } from 'react'
import Menu from './menu/Menu'

function HomeMenu() {
    const [isOpen, setOpen] = useState(true)
    const [catData, setCatData] = useState([])
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch('http://localhost:4575/categories')
            .then(res => res.json())
            .then(res => {
                setCatData(res)
            })
    }, [catData])

    useEffect(() => {
        fetch('http://localhost:4575/products')
            .then(res => res.json())
            .then(res => {
                setProducts(res)
            })
    }, [products])

    const renderComp = () => {
        if (products.length > 0 && catData.length > 0) {
            return (
                <Menu products={products} catData={catData} isOpen={isOpen} setOpen={setOpen} />
            )
        }
    }

    return (
        <div>
            {/* <button className='shadow-md border bg-slate-100 rounded-md text-black w-[2.9rem] h-[2.9rem] fixed right-4 top-4 z-50' onClick={() => setOpen(!isOpen)}>
                AÇ
            </button> */}
            {renderComp()}
        </div>
    )
}

export default HomeMenu