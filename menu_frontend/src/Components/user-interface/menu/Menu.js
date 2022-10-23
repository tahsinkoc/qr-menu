import { useState } from 'react'
import { Link } from 'react-router-dom'

function Menu({ isOpen, setOpen, catData, products }) {

    const [active, setActive] = useState(catData[0].id)

    const handleClick = (deg) => {
        setActive(deg)
    }

    const renderComp = () => {
        if (catData.length > 0) {
            return (
                catData.map(item => {
                    return (
                        <button key={item.id} onClick={() => handleClick(item.id)} className='w-11/12 xl:w-[19rem] xl:h-[10rem] my-4 xl:my-0 bg-slate-700 rounded-lg flex items-center justify-center text-[1.7rem] text-white mx-auto'>
                            {item.c_name}
                        </button>
                    )
                })
            )
        }
    }

    const renderProducts = () => {
        const pro = products.filter(item => item.cat_id === active)
        console.log(pro)
        return (
            pro.map(item => {
                return (
                    <button className='px-4 w-11/12 xl:w-[19rem] xl:h-[10rem] my-4 xl:my-0 bg-purple-600 rounded-lg flex items-center flex-col justify-center text-[1.7rem] text-white mx-auto'>
                        <div className="flex w-full justify-evenly text-[2.8rem]">
                            <p>
                                {item.c_name}
                            </p>
                            <p>
                                {item.price} €
                            </p>
                        </div>
                        <p className='text-[1.4rem]'>
                            {item.c_details}
                        </p>
                    </button>
                )
            })
        )


    }

    return (
        <div className='mx-auto max-w-screen-xl'>
            <h1 className='text-[2.7rem] py-1 border-b-2 border-black hidden xl:block pl-2'>Kategoriler</h1>
            <div className="w-full">
                <button className='shadow-xl border visible xl:invisible bg-slate-100 rounded-xl text-black w-[2.9rem] h-[2.9rem] fixed right-4 top-4 z-50' onClick={() => setOpen(!isOpen)}>
                    AÇ
                </button>
                {
                    (isOpen === true) ? <div className='w-full xl:w-[0] h-0 xl:h-0 sticky transition-all duration-1000 gap-8 overflow-hidden'>
                        {renderComp()}
                    </div> : <div className='w-full xl:w-[0] h-[auto] xl:h-0 sticky transition-all duration-1000 gap-8 overflow-hidden'>
                        {renderComp()}
                    </div>
                }
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-4 py-4 gap-8 hidden xl:grid">
                {renderComp()}
            </div>
            <h1 className='text-[2.7rem] py-1 border-b-2 border-black xl:block pl-2'>Ürünler</h1>
            <div className="grid grid-cols-1 xl:grid-cols-4 py-4 gap-8 xl:grid">
                {renderProducts()}
            </div>
        </div>
    )
}

export default Menu