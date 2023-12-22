import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import ReceiptForm from '../components/ReceiptForm';

function CreateReceipt() {

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Editando o creando receta" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <ReceiptForm />
      </IonContent>
    </IonPage>
  );
}

export default CreateReceipt;
