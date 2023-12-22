import {
    useIonViewDidLeave,
    useIonViewWillEnter,
} from '@ionic/react';
import './ReceiptForm.css';
import Receipt from '../domain/receipt';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createReceipt, findReceipt } from '../data/receipts';
import { useHistory, useParams } from 'react-router';
import { uploadImage } from '../app/storage';

const ReceiptForm = () => {
    const [receiptToSave, setReceiptToSave] = useState<Receipt>({
        id: uuidv4(),
        name: "",
        description: "",
        image: "",
    })
    const [img, setImg] = useState(null)
    const history = useHistory();
    const params = useParams<{ id: string }>();

    useIonViewWillEnter(() => {
        if (params.id) {
            findReceipt(params.id).then(rec => {
                setReceiptToSave(rec)
            });
        }
    }, [])

    useIonViewDidLeave(() => {
        setImg(null)
        setReceiptToSave({
            id: uuidv4(),
            name: "",
            description: "",
            image: "",
        })
        params.id = ""
    })

    const onFileChange = (fileChangeEvent: any) => {
        setImg(fileChangeEvent.target.files[0]);
    };

    const onChange = (e: any): void => {
        setReceiptToSave({ ...receiptToSave, [e.target.name]: e.target.value })
    };

    const sendReceipt = async (e: any) => {
        e.preventDefault()
        if (!img && !receiptToSave.image) {
            console.log("Not file")
            return
        }
        console.log(receiptToSave.image)
        var url = receiptToSave.image
        if (img) {
            console.log("Loading image")
            url = await uploadImage(img, `${receiptToSave.id}.jpg`)
        }
        receiptToSave.image = url

        createReceipt(receiptToSave)
            .then(() => history.push("/home"))
            .catch(ex => console.error(ex))
    }

    return (
        <form className="max-w-md mx-auto receipt-form relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700" onSubmit={sendReceipt}>
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="name" id="receipt_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    value={receiptToSave.name.toString()} onChange={onChange}
                    placeholder=" " required />
                <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Nombre
                </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="description" id="receipt_description"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    value={receiptToSave.description.toString()} onChange={onChange}
                    placeholder=" " required />
                <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Descripcion
                </label>
            </div>

            <div className="max-w-lg mx-auto">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">{img || receiptToSave.image !== "" ? receiptToSave.id.toString() : "Cargue una imagen"}</label>
                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    onChange={(ev) => onFileChange(ev)}
                    aria-describedby="user_avatar_help" id="user_avatar" type="file" required={receiptToSave.image === ""} />
            </div>
            <br />
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{params.id ? "Actualizar" : "Crear"}</button>
        </form>
    );
};

export default ReceiptForm;
