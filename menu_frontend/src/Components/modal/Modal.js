import { useEffect, useState } from 'react'
import { GrClose } from 'react-icons/gr'
import { MdDelete } from 'react-icons/md'

function Modal({ isOpen, setOpen, data, catArray, setCat, s, setS, which }) {

    const [fData, setData] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4575/categories`)
            .then(result => result.json())
            .then(res => setData(res))
    }, [fData])


    const [inputVal, setInputVal] = useState('')
    const [selectVal, setSelect] = useState(1)
    const [priceVal, setPrice] = useState(0)
    const [areaVal, setArea] = useState('')

    const handleDelete = (itemT) => {
        // let index = catArray.indexOf(item)
        // catArray.splice(index, 1)
        const items = s.filter(item => item.cat !== itemT);
        setS(items);
    }

    const handlePost = (deg) => {
        if (s.length > 0 && deg === 1) {
            const freeArr = []
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(s)
            };
            fetch('http://localhost:4575/post-category', options)
                .then(response => response.json())
                .then(data => {

                })
            setS(freeArr)
            setInputVal('')
            console.log(s)
        } else if (s.length > 0 && deg === 2) {
            const freeArr = []
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(s)
            };
            fetch('http://localhost:4575/post-product', options)
                .then(response => response.json())
                .then(data => {

                })
            setS(freeArr)
            console.log(s)
        }

    }


    const renderModal = () => {
        if (isOpen && which === 1) {
            return (
                <div className='w-screen h-screen fixed left-0 bg-lowOpacity flex justify-center items-center transition-all duration-150 z-50'>
                    <div className="w-[50rem] max-h-[30rem] min-h-[20rem] bg-white z-50 rounded-lg shadow shadow-2xl py-8 px-8 relative overflow-auto transition-all duration-150 delay-150">
                        <button className='right-8 absolute top-12' onClick={() => setOpen(!isOpen)}>
                            <GrClose size={30} />
                        </button>
                        <div className='w-full border-b-2 py-4'>
                            <h1 className='text-[1.8rem]'>Kategori Ekle</h1>
                        </div>
                        <div className="w-full py-8 flex flex-col items-center justify-center h-full border-b-2">
                            <input onChange={(e) => setInputVal(e.target.value)} placeholder='Kategori ekle...' type="text" className='shadow-md w-full border border-3 py-2 outline-0 px-2 focus:border-sky-500 text-[1.3rem] rounded-lg' />
                            <button className='shadow-md bg-sky-500 hover:bg-sky-400 text-white rounded-lg p-3 w-full my-4' onClick={() => setS(current => [...current, { cat: inputVal, cid: 'categories' }])} >KATEGORİ EKLE</button>
                            {/* <input class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search" /> */}
                        </div>
                        <div className='py-4'>
                            {
                                s.map((item) => {
                                    return (
                                        <div className='flex justify-between px-2 items-center border-b-2 py-2 my-2'>
                                            <p className='text-[1.3rem]' >{item.cat}</p>
                                            <button className='text-[1.3rem] text-red-600' onClick={() => handleDelete(item.cat)}>
                                                <MdDelete />
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            <button className='bg-green-400 text-white px-8 py-2 w-full rounded-md shadow-md' onClick={() => handlePost(1)}>
                                KAYDET
                            </button>
                        </div>
                    </div>
                </div>
            )
        } else if (isOpen && which === 2) {
            return (
                <div className='w-screen h-screen fixed left-0 bg-lowOpacity flex justify-center items-center transition-all duration-150 z-50'>
                    <div className="w-[50rem] max-h-[30rem] min-h-[90vh] bg-white z-50 rounded-lg shadow shadow-2xl py-8 px-8 relative overflow-auto transition-all duration-150 delay-150">
                        <button className='right-8 absolute top-12' onClick={() => setOpen(!isOpen)}>
                            <GrClose size={30} />
                        </button>
                        <div className='w-full border-b-2 py-4'>
                            <h1 className='text-[1.8rem]'>Ürün Ekle</h1>
                        </div>
                        <div className="w-full py-8 flex flex-col justify-center h-full border-b-2">
                            <h1 className='my-2 text-[1.2rem]'>Ürün ismi gir</h1>
                            <input required onChange={(e) => setInputVal(e.target.value)} placeholder='Ürün ekle...' type="text" className='my-2 shadow-md w-full border border-3 py-2 outline-0 px-2 focus:border-sky-500 text-[1.3rem] rounded-lg' />
                            <h1 className='my-2 text-[1.2rem]'>Açıklama gir</h1>
                            <textarea required className='my-2 shadow-md w-full border border-3 py-2 outline-0 px-2 focus:border-sky-500 text-[1.3rem] rounded-lg resize-none' placeholder='Açıklama Gir' onChange={(e) => setArea(e.target.value)} name="" maxLength={61} id="" cols="30" rows="5"></textarea>
                            <h1 className='my-2 text-[1.2rem]'>Fiyat gir</h1>
                            <input required onChange={(e) => setPrice(e.target.value)} placeholder='Fiyat Gir...' type="text" className='my-2 shadow-md w-full border border-3 py-2 outline-0 px-2 focus:border-sky-500 text-[1.3rem] rounded-lg' />
                            <h1 className='my-2 text-[1.2rem]'>Kategori Seç</h1>
                            <select onChange={(e) => setSelect(e.target.value)} name="" id="" className='shadow-md w-full border border-3 py-2 outline-0 px-2 focus:border-sky-500 text-[1.3rem] rounded-lg my-2 cursor-pointer'>
                                <option value="0" selected disabled>Seçim yapınız</option>
                                {
                                    fData.map((item) => {
                                        return (
                                            <option value={item.id}>
                                                {item.c_name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            <button className='shadow-md bg-sky-500 hover:bg-sky-400 text-white rounded-lg p-3 w-full my-4' onClick={() => setS(current => [...current, { cat: inputVal, catId: selectVal, price: priceVal, details: areaVal }])} >Ürün Ekle</button>
                            {/* <input class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search" /> */}
                        </div>
                        <div className='py-4'>
                            {
                                s.map((item) => {
                                    return (
                                        <div className='flex justify-between px-2 items-center border-b-2 py-2 my-2'>
                                            <p className='text-[1.3rem]' >{item.cat}</p>
                                            <button className='text-[1.3rem] text-red-600' onClick={() => handleDelete(item.cat)}>
                                                <MdDelete />
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            <button className='bg-green-400 text-white px-8 py-2 w-full rounded-md shadow-md' onClick={() => handlePost(2)}>
                                KAYDET
                            </button>
                        </div>
                    </div>
                </div>
            )
        } else {

        }
    }

    return (
        <>
            {renderModal()}
        </>
    )
}

export default Modal