import {
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
} from '@ionic/react';
import './ReceiptListItem.css';
import Receipt from '../domain/receipt';
import { FormEvent, FormEventHandler, useEffect, useRef, useState } from 'react';
import { createReceipt } from '../data/receipts';
import { v4 as uuidv4 } from 'uuid';

interface ReceiptListItemProps {
    receipt: Receipt | undefined;
}

const ReceiptForm: React.FC<ReceiptListItemProps> = ({ receipt: receipt }) => {
    const [receiptToSave, setReceiptToSave] = useState<Receipt>({
        id: uuidv4(),
        name: "",
        description: "",
        image: "",
    })
    const [img, setImg] = useState(null)

    useEffect(() => {
        if (receipt) setReceiptToSave(receipt)
    }, [])

    const onFileChange = (fileChangeEvent: any) => {
        setImg(fileChangeEvent.target.files[0]);
    };

    const sendReceipt = () => {
        if (!img) {
            console.log("Not file")
            return
        }

        createReceipt(receiptToSave, img)
    }

    return (
        <IonList>
            <IonItem>
                <IonLabel>{receiptToSave.id.toString()}</IonLabel>
            </IonItem>
            <IonItem>
                <IonInput label="Name" placeholder='Insert name of the food'></IonInput>
            </IonItem>

            <IonItem>
                <IonInput label="Description" placeholder="Any data about your food?" ></IonInput>
            </IonItem>

            <IonItem>
                <IonItem>
                    <input type="file" onChange={(ev) => onFileChange(ev)}></input>
                </IonItem>
                <IonLabel>{img ? receiptToSave.id.toString() : "Not image"}</IonLabel>
            </IonItem>

            <IonButton color="primary" expand="full" onClick={() => sendReceipt()}>
                Create
            </IonButton>
        </IonList>
    );
};

export default ReceiptForm;
