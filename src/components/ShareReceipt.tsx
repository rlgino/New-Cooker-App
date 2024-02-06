import { IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonInput, IonItem, IonList, IonModal, IonTitle, IonToolbar, useIonAlert } from "@ionic/react"
import { useEffect, useState } from "react";
import { findUid, shareReceipt } from "../firebase/database";
import { Contacts } from "@capacitor-community/contacts";

interface ShareReceiptDialogParams {
    isOpen: any;
    setIsOpen: any;
    userID: string;
    receiptID: string;
}

const ShareReceiptDialog: React.FC<ShareReceiptDialogParams> = ({ isOpen: isOpen, setIsOpen: setIsOpen, receiptID: receiptID, userID: userID }) => {
    const [selectedContacts, setSelectedContacts] = useState<string[]>([])
    const [presentAlert] = useIonAlert();
    const [contacts, setContacts] = useState<Contact[]>([])

    useEffect(() => {
        Contacts.getContacts({
            projection: {
                name: true,
                phones: true
            },
        }).then(result => {
            for (const contact of result.contacts) {
                if (!contact.phones || contact.phones?.length === 0 || !contact.phones[0].number) return
                const phoneNumber = contact.phones[0].number
                const name = contact.name?.display
                findUid(phoneNumber).then((res) => {
                    setContacts(contacts.concat({
                        name: name!,
                        phoneNumber: phoneNumber,
                        uid: res
                    }))
                })
            }
        });
    }, [])

    const checkPhoneNumber = (uid: string) => {
        console.log(uid)
        const i = selectedContacts.indexOf(uid)
        if (i !== -1) setSelectedContacts(selectedContacts.filter(item => item !== uid))
        else setSelectedContacts(selectedContacts.concat(uid))
    }

    const shareToContacts = () => {
        presentAlert({
            header: 'Desea compartir la receta?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                },
                {
                    text: 'OK',
                    role: 'confirm',
                    handler: () => {
                        selectedContacts.forEach(uid => {
                            shareReceipt(userID, uid, receiptID)
                            setIsOpen(false)
                        });
                    },
                },
            ],
            onDidDismiss: () => presentAlert({
                header: 'Se ha comapartido correctamente',
                buttons: ['OK'],
            }),
        })
    }

    return <IonModal isOpen={isOpen}>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Compartir</IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            <IonList inset={true}>
                {
                    contacts.map((contact, index) => <IonItem>
                        <IonCheckbox slot="start" aria-label="Toggle task completion" key={index}
                            onIonChange={() => checkPhoneNumber(contact.uid)}
                            checked={selectedContacts.indexOf(contact.uid) !== -1}></IonCheckbox>
                        <IonInput aria-label="Task name" value={`${contact.name} ${contact.phoneNumber}`} ></IonInput>
                    </IonItem>)
                }
            </IonList>
            <IonButton type='button' onClick={() => shareToContacts()} disabled={selectedContacts.length === 0}>Compartir</IonButton>
        </IonContent>
    </IonModal>
}

export default ShareReceiptDialog