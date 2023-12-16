import ReceiptListItem from '../components/ReceiptListItem';
import { useState } from 'react';
import {
  IonAvatar,
  IonContent,
  IonIcon,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import './Home.css';
import Receipt from '../domain/receipt';
import { listReceipts } from '../data/receipts';
import { search, searchSharp, settings } from 'ionicons/icons';

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
      <IonToolbar>
        <div className='header'>
          <div className='welcome'>
            <div>Welcome 👋</div>
            <h3 className='title'>Gino Luraschi</h3>
          </div>
          <IonAvatar aria-hidden="true" slot="start" className='avatar'>
            <img alt="" src="/favicon.png" />
          </IonAvatar>
        </div>
      </IonToolbar>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <div className='filters'>
          <form id="form" role="search">
            <input type="search" id="query" name="q"
              placeholder="Search..."
              aria-label="Search through site content" />
              <IonIcon icon={search} size='large' className='searchIcon'></IonIcon>
          </form>
          <IonIcon icon={settings} size='large'></IonIcon>
        </div>

        <IonList className='receipt-grid'>
          {receipts.map(receipt => <ReceiptListItem key={receipt.id} receipt={receipt} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
