import { useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { useParams } from 'react-router';
import Receipt from '../domain/receipt';
import { findReceipt } from '../data/receipts';

function CreateReceipt() {
  const [receipt, setReceipt] = useState<Receipt>();
  const [title, setTitle] = useState<string>("New receipt")
  const params = useParams<{ id: string }>();

  useIonViewWillEnter(() => {
    if (params.id) {
      findReceipt(params.id).then(rec => {
        setReceipt(rec)
        setTitle(rec.id)
      });
    }
  });

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text={title} defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

      </IonContent>
    </IonPage>
  );
}

export default CreateReceipt;
