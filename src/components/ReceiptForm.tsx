import {
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    useIonViewWillEnter,
} from '@ionic/react';
import './ReceiptListItem.css';
import Receipt from '../domain/receipt';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createReceipt } from '../data/receipts';
import { useHistory } from 'react-router';

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
    const history = useHistory();

    useIonViewWillEnter(() => {
        console.log("Finding receipt? "+ receipt)
        if (receipt) setReceiptToSave(receipt)
    }, [])

    const onFileChange = (fileChangeEvent: any) => {
        setImg(fileChangeEvent.target.files[0]);
    };

    const onChange = (e: any): void => {
        setReceiptToSave({ ...receiptToSave, [e.target.name]: e.target.value })
    };

    const sendReceipt = (e: any) => {
        e.preventDefault()
        if (!img) {
            console.log("Not file")
            return
        }

        createReceipt(receiptToSave, img)
            .then(() => history.push("/home"))
            .catch(ex => console.error(ex))
    }

    return (
        <form onSubmit={sendReceipt}>
            <IonList>
                <IonItem>
                    <IonLabel>{receiptToSave.id.toString()}</IonLabel>
                </IonItem>
                <IonItem>
                    <IonInput label="Name" name="name" placeholder='Insert name of the food' value={receiptToSave.name.toString()} onIonChange={onChange}></IonInput>
                </IonItem>

                <IonItem>
                    <IonInput label="Description" name="description" placeholder="Any data about your food?" value={receiptToSave.description.toString()} onIonChange={onChange}></IonInput>
                </IonItem>

                <IonItem>
                    <IonItem>
                        <input type="file" onChange={(ev) => onFileChange(ev)}></input>
                    </IonItem>
                    <IonLabel>{img ? receiptToSave.id.toString() : "Not image"}</IonLabel>
                </IonItem>

                <IonButton color="primary" expand="full" type='submit'>
                    Create
                </IonButton>
            </IonList>
        </form>
    );
};

export default ReceiptForm;
