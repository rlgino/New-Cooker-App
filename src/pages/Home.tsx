import ReceiptListItem from '../components/ReceiptListItem';
import { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import './Home.css';
import Receipt from '../domain/receipt';
import { listReceipts } from '../data/receipts';
import { add } from 'ionicons/icons';

const Home: React.FC = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);

  useIonViewWillEnter(() => {
    listReceipts().then(receipts => {
      setReceipts(receipts);
    });
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <div className='header'>
            <IonTitle>Inbox</IonTitle>
            <IonItem routerLink={`/new-receipt`} detail={false}>
              <IonIcon icon={add} size="large" color="primary"></IonIcon>
            </IonItem>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Inbox
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {receipts.map(receipt => <ReceiptListItem key={receipt.id} receipt={receipt} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
