import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  useIonViewDidEnter,
} from '@ionic/react';
import ReceiptForm from '../components/ReceiptForm';
import { getCurrentUser } from '../app/auth';
import { useHistory } from 'react-router';

function CreateReceipt() {
  const history = useHistory();

  useIonViewDidEnter(() => {
    const user = getCurrentUser()
    if (!user) history.push("/register")
  }, [])

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
