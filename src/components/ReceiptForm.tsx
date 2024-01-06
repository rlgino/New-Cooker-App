import {
    useIonViewDidLeave,
    useIonViewWillEnter,
} from '@ionic/react';
import './ReceiptForm.css';
import { Receipt } from '../domain/receipt';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createReceiptFor, findReceiptFor } from '../data/receipts';
import { useHistory, useParams } from 'react-router';
import { uploadImage } from '../app/storage';
import { getCurrentUser } from '../app/auth';

const ReceiptForm = () => {
    const [receiptToSave, setReceiptToSave] = useState<Receipt>({
        id: uuidv4(),
        name: "",
        image: "",
        items: [],
        steps: []
    })
    const [steps, setSteps] = useState<string[]>([])
    const [items, setItems] = useState([])
    const [img, setImg] = useState(null)
    const [uid, setUid] = useState("")
    const history = useHistory();
    const params = useParams<{ id: string }>();

    useIonViewWillEnter(() => {
        const user = getCurrentUser()
        if (!user) {
            history.push("/register")
            return
        }
        setUid(user.uid)
        if (params.id) {
            findReceiptFor(user.uid, params.id).then(rec => {
                setReceiptToSave(rec)
            });
        }
    }, [])

    useIonViewDidLeave(() => {
        setImg(null)
        setReceiptToSave({
            id: uuidv4(),
            name: "",
            image: "",
            items: [],
            steps: []
        })
        params.id = ""
        console.log("Leaving")
        console.log(params.id)
    })

    const onFileChange = (fileChangeEvent: any) => {
        setImg(fileChangeEvent.target.files[0]);
    };

    const onChange = (e: any): void => {
        setReceiptToSave({ ...receiptToSave, [e.target.name]: e.target.value })
    };

    const addStep = () => {
        setSteps(steps.concat(""))
    }

    const setStep = (i: number, value: string) => {
        const nextSteps = steps.map((step, index) => index === i ? value : step)
        setSteps(nextSteps)
    }

    const sendReceipt = async (e: any) => {
        e.preventDefault()
        if (!img && !receiptToSave.image) {
            console.log("Not file")
            return
        }
        var url = receiptToSave.image
        if (img) {
            console.log("Loading image")
            url = await uploadImage(img, `${receiptToSave.id}.jpg`)
        }
        receiptToSave.image = url

        receiptToSave.steps = steps
        receiptToSave.items = items
        createReceiptFor(uid, receiptToSave)
            .then(() => history.push("/home"))
            .catch(ex => console.error(ex))
    }

    return (
        <form className="max-w-md mx-auto receipt-form relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700" onSubmit={sendReceipt}>
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="name" id="receipt_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    value={receiptToSave.name} onChange={onChange}
                    placeholder=" " required />
                <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Nombre
                </label>
            </div>

            <div className="max-w-lg mx-auto">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">{img || receiptToSave.image !== "" ? receiptToSave.id.toString() : "Cargue una imagen"}</label>
                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    onChange={(ev) => onFileChange(ev)}
                    aria-describedby="user_avatar_help" id="user_avatar" type="file" required={receiptToSave.image === ""} />
            </div>

            <br />
            <h1>Items necesarios</h1>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Item
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Cantidad
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Medida
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white dark:bg-gray-800">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <input type="text" name="nameProduct"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" " required />
                                <label htmlFor="nameProduct" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Nombre
                                </label>
                            </th>
                            <td className="px-6 py-4">
                                <input type="number" name="amountProduct"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" " required />
                                <label htmlFor="amountProduct" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Nombre
                                </label>
                            </td>
                            <td className="px-6 py-4">
                                <select id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value={"gr"}>Gr</option>
                                    <option value={"kg"}>KG</option>
                                    <option value={"un"}>Un</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Agregar Item
            </button>

            <br />
            <h1>Pasos para la magia</h1>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Pasos
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            steps.map((val, i) => (
                                <tr className="bg-white dark:bg-gray-800" key={`row-${i + 1}`}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" key={`h-${i + 1}`}>
                                        {i + 1}.
                                        <input type="text" name="nameProduct" key={`input-step-${i + 1}`}
                                            value={val} onChange={(e) => { setStep(i, e.target.value) }}
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder={`Agregue su paso ${i + 1}`} required />
                                        <label htmlFor="nameProduct" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                            {`Agregue su paso ${i + 1}`}
                                        </label>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <button type="button" onClick={() => addStep()}
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Agregar Paso
            </button>
            <br />
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{params.id ? "Actualizar" : "Crear"}</button>
        </form>
    );
};

export default ReceiptForm;
