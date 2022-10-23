import { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'

function Table({ category, setCat, cat }) {

    const [prData, setPr] = useState()

    useEffect(() => {
        fetch(`http://localhost:4575/${category.cid}`)
            .then(result => result.json())
            .then(res => {
                if (category.cid === 'categories') {
                    setCat(res)
                    setPr(res)
                } else {
                    setCat(res)
                }
            })
    }, [cat])

    const handleDelete = (dId, deg) => {
        if (deg === 1) {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: dId })
            };
            fetch('http://localhost:4575/delete-category', options)
                .then(response => response.json())
                .then(data => {

                })
        } else {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: dId })
            };
            fetch('http://localhost:4575/delete-product', options)
                .then(response => response.json())
                .then(data => {

                })
        }
    }

    const checkCategory = (val) => {
        return (
            prData.map((item) => {
                if (item.id === val) {
                    return (
                        item.c_name
                    )
                }
            })
        )

    }

    const renderTable = () => {
        if (cat.length > 0 && category.cat === 'Kategoriler') {
            return (
                // cat.map((item) => {
                //     return (
                //         <tr className="bg-white border-bhover:bg-gray-50 border-b hover:bg-slate-100">
                //             <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                //                 {item.c_name}
                //             </td>
                //             {/* <td className="py-4 px-6">
                //                 İçindeki Ürün
                //             </td> */}
                //             <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap text-right">
                //                 a
                //                 {/* <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                //             </td>
                //         </tr>
                //     )
                // })
                <table className="w-full text-sm text-left text-gray-500 transition-all duration-150">
                    <thead className="text-[1.2rem] text-gray-700 uppercase bg-gray-200">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                AD
                            </th>
                            <th scope="col" className="py-3 px-6 text-right">
                                Düzenle
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-[1.1rem]'>
                        {
                            cat.map((item) => {
                                return (
                                    <tr className="bg-white border-bhover:bg-gray-50 border-b hover:bg-slate-100">
                                        <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                            {item.c_name}
                                        </td>
                                        <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap flex justify-end" >
                                            <p className='cursor-pointer text-red-500 text-[1.4rem] shadow-md rounded-md bg-gray-100 border border-gray-100 p-2' onClick={() => handleDelete(item.id, 1)}>
                                                <MdDelete />
                                            </p>
                                            {/* <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            )
        } else if (cat.length > 0 && category.cat === 'Ürünler') {
            return (
                <table className="w-full text-sm text-left text-gray-500  transition-all duration-150">
                    <thead className="text-[1.2rem] text-gray-700 uppercase bg-gray-200">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                AD
                            </th>

                            <th scope="col" className="py-3 px-6">
                                Fiyat
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Kategori
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Detay Açıklaması
                            </th>
                            <th scope="col" className="py-3 px-6 text-right">
                                Düzenle
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-[1.1rem]'>
                        {
                            cat.map((item) => {
                                return (
                                    <tr className="bg-white border-bhover:bg-gray-50 border-b hover:bg-slate-100 overflow-y-hidden">
                                        <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                            {item.c_name}
                                        </td>
                                        <td className="py-4 px-6">
                                            {item.price} €
                                        </td>
                                        <td className="py-4 px-6">
                                            {checkCategory(item.cat_id)}
                                        </td>
                                        <td className="py-4 px-6 ">
                                            {item.c_details}
                                        </td>
                                        <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap flex justify-end">
                                            <p className='cursor-pointer text-red-500 text-[1.4rem] shadow-md rounded-md bg-gray-100 border border-gray-100 p-2' onClick={() => handleDelete(item.id, 2)}>
                                                <MdDelete />
                                            </p>
                                            {/* <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            )
        }
    }

    return (
        <div>
            <div className='w-full z-0 my-4'>
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    {renderTable()}
                </div>
            </div>
        </div>
    )
}
export default Table