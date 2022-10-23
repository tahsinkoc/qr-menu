import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../modal/Modal'
import Table from '../table/Table'

function Header() {

    const [categoryName, setCategory] = useState(
        { cat: 'Kategoriler', cid: 'categories' }
    )
    const [catArray, setCat] = useState([])
    const [sArray, setS] = useState([])
    const [isOpen, setOpen] = useState(false)
    const [data, setData] = useState(true)
    const [which, setWhich] = useState()

    const renderCategory = (item) => {
        setCategory(item)
    }

    const handleClick = (deg) => {
        setWhich(deg)
        setOpen(!isOpen)
    }

    return (
        <div className='max-w-screen-xl mx-auto'>
            <Modal isOpen={isOpen} setOpen={setOpen} data={data} catArray={catArray} setCat={setCat} s={sArray} setS={setS} which={which} />
            <div className='flex items-center justify-between p-4 rounded-lg border-b-2'>
                <h2 className='text-[1.7rem]'>Yönetim Paneli</h2>
                <div className='flex justify-evenly'>
                    {
                        [{ cat: 'Kategoriler', cid: 'categories' }, { cat: 'Ürünler', cid: 'products' }].map((item) => {
                            return (
                                <button onClick={() => renderCategory(item)} className='bg-zinc-100 p-2 px-8 rounded-xl shadow-md mx-4 hover:bg-slate-100'>{item.cat}</button>
                            )
                        })
                    }
                </div>
            </div>
            <div className='px-2 py-4 w-full'>
                <div className='flex justify-between border-b-2 py-4'>
                    <h1 className='text-[2rem]'>
                        {categoryName.cat}
                    </h1>
                    <div className='flex'>
                        <button className='bg-zinc-100 p-2 px-8 rounded-xl shadow-md mx-4 hover:bg-slate-100' onClick={() => handleClick(1)}>Kategori Ekle</button>
                        <button className='bg-zinc-100 p-2 px-8 rounded-xl shadow-md mx-4 hover:bg-slate-100' onClick={() => handleClick(2)}>Ürün Ekle</button>
                    </div>
                </div>
                {/* <input class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search" /> */}
                <Table category={categoryName} setCat={setCat} cat={catArray} />
            </div>
        </div >
    )
}

export default Header