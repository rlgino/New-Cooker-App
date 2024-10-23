import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonLoading,
    IonModal,
    IonThumbnail,
    IonTitle,
    IonToolbar,
    useIonViewDidLeave,
    useIonViewWillEnter,
} from '@ionic/react';
import './ReceiptForm.css';
import { Item, Receipt } from '../domain/receipt';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createReceiptFor, findReceiptFor } from '../services/receipts';
import { useHistory, useParams } from 'react-router';
import { uploadImage } from '../firebase/storage';
import { getCurrentUser } from '../firebase/auth';
import StepsTable from './receiptform/stepstable';
import ItemsTable from './receiptform/itemstable';
import { camera } from 'ionicons/icons';
import { usePhotoGallery } from '../hooks/useCamera';
import InputText from './inputText';
import { DEFAULT_IMAGE } from '../constants';

const ReceiptForm = () => {
    const [receiptToSave, setReceiptToSave] = useState<Receipt>({
        id: uuidv4(),
        userID: "",
        name: "",
        image: "",
        items: [],
        steps: []
    })
    const [steps, setSteps] = useState<string[]>([])
    const [items, setItems] = useState<Item[]>([])
    const [img, setImg] = useState<Blob | null>(null)
    const [uid, setUid] = useState("")
    const history = useHistory();
    const params = useParams<{ id: string }>();
    const [isOpen, setIsOpen] = useState(false);
    const { takePhoto } = usePhotoGallery()
    const [isLoading, setIsLoading] = useState(false);

    useIonViewWillEnter(() => {
        const user = getCurrentUser()
        if (!user) {
            history.push("/register")
            return
        }
        setUid(user.uid)
        if (params.id) {
            setIsLoading(true)
            findReceiptFor(user.uid, params.id).then(rec => {
                setReceiptToSave(rec)
                setItems(rec.items)
                setSteps(rec.steps)
                setIsLoading(false)
            });
        }
    }, [])

    useIonViewDidLeave(() => {
        setImg(null)
        setReceiptToSave({
            id: uuidv4(),
            userID: "",
            name: "",
            image: "",
            items: [],
            steps: []
        })
        setItems([])
        setSteps([])
        params.id = ""
        console.log("Leaving")
        console.log(params.id)
    })

    const changeImage = () => {
        document.getElementById('receipt_picture')?.click()
    }

    const onFileChange = (fileChangeEvent: any) => {
        setImg(fileChangeEvent.target.files[0]);
        let reader = new FileReader();
        reader.onload = (event: any) => {
            setReceiptToSave({ ...receiptToSave, image: event.target.result })
        }
        reader.readAsDataURL(fileChangeEvent.target.files[0]);
        setIsOpen(false);
    };

    const takePicture = () => {
        takePhoto().then(photo => {
            setImg(photo)
            let reader = new FileReader();
            reader.onload = (event: any) => {
                setReceiptToSave({ ...receiptToSave, image: event.target.result })
                setIsOpen(false)
            }
            reader.readAsDataURL(photo);
        }).catch(e => {
            console.error(e)
        })
    }

    const setDefaultImage = () => {
        setReceiptToSave({ ...receiptToSave, image: DEFAULT_IMAGE })
        setIsOpen(false)
    }

    const getPreview = (): string => {
        return receiptToSave.image ? receiptToSave.image : DEFAULT_IMAGE
    }

    const onChange = (e: any): void => {
        setReceiptToSave({ ...receiptToSave, [e.target.name]: e.target.value })
    };

    const sendReceipt = async (e: any) => {
        e.preventDefault()
        setIsLoading(true);
        var url = receiptToSave.image
        if (img) {
            console.log("Loading image")
            url = await uploadImage(img, `${receiptToSave.id}.jpg`)
        }
        receiptToSave.image = url

        receiptToSave.steps = steps
        receiptToSave.items = items
        console.table(receiptToSave)
        createReceiptFor(uid, receiptToSave)
            .then(() => history.push("/home"))
            .catch(ex => console.error(ex))
            .finally(() => setIsLoading(false));
    }

    return (
        <form className="max-w-md mx-auto receipt-form relative items-center block max-w-sm p-6 bg-white dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700" onSubmit={sendReceipt}>
            <IonLoading isOpen={isLoading} />
            <div className="relative z-0 w-full mb-5 group">
                <InputText name="name" value={receiptToSave.name} onChange={onChange} type='text' />
            </div>

            <button type="button" onClick={() => setIsOpen(true)} className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary">
                Elija una foto
            </button>
            <IonModal isOpen={isOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Elija una foto</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <div className="max-w-lg mx-auto">
                        <IonButton expand="block" onClick={() => changeImage()}>
                            Elegir una foto existente
                        </IonButton>
                        <input onChange={(ev) => onFileChange(ev)} id="receipt_picture" type="file" required={receiptToSave.image === ""} hidden />
                    </div>
                    o sino...
                    <IonButton expand="block" onClick={() => takePicture()}>
                        <IonIcon slot="start" icon={camera}></IonIcon>
                        Tome una foto
                    </IonButton>
                    <br />
                    <IonButton expand="block" onClick={() => setDefaultImage()}>
                        Sino elegila cuando termines
                    </IonButton>
                    <br />
                    <IonThumbnail>
                        <img alt="Silhouette of mountains" src={getPreview()} />
                    </IonThumbnail>
                </IonContent>
            </IonModal>

            <br />
            <br />
            <ItemsTable items={items} setItems={setItems} />

            <br />
            <StepsTable steps={steps} setSteps={setSteps} />
            <br />
            <div className='flex justify-between'>
                <button type="button" onClick={() => history.push("/home")} className="bg-secondary hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700">Cancelar</button>
                <button type="submit" className="bg-primary bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary">{params.id ? "Actualizar" : "Crear"}</button>
            </div>
        </form>
    );
};

export default ReceiptForm;
