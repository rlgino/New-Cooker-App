import ReceiptListItem from '../components/ReceiptListItem';
import { useState } from 'react';
import {
  IonAvatar,
  IonContent,
  IonIcon,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import './Home.css';
import Receipt from '../domain/receipt';
import { listReceipts } from '../data/receipts';
import { options, search } from 'ionicons/icons';
import { getCurrentUser, userSignOut } from '../app/auth';
import { useHistory } from 'react-router';

const Home: React.FC = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const history = useHistory();

  useIonViewWillEnter(() => {
    const user = getCurrentUser()
    if (!user) history.push("/register")

    listReceipts().then(receipts => {
      setReceipts(receipts);
    });
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };


  const signOut = () => {
    userSignOut()
      .then(() => history.push("/login"))
      .catch(err => {
        console.log(err)
        alert("Error al salir de su usuario")
      })
  }

  return (
    <IonPage id="home-page">
      <IonToolbar>
        <div className='header'>
          <div className='welcome'>
            <div>Welcome 👋</div>
            <h3 className='title'>Gino Luraschi</h3>
          </div>
          <IonAvatar aria-hidden="true" slot="start" className='avatar' onClick={() => signOut()}>
            <img alt="" src="/favicon.png" />
          </IonAvatar>
        </div>
      </IonToolbar>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <div className='filters'>
          <form id="form" role="search" className='filters-form'>
            <input type="search" id="query" name="q"
              placeholder="Search..." className='filters-input'
              aria-label="Search through site content" />
            <IonIcon icon={search} size='large' className='searchIcon'></IonIcon>
          </form>
          <IonIcon icon={options} size='large' className='more-filters'></IonIcon>
        </div>

        <div>
          {receipts.map(receipt => <ReceiptListItem key={receipt.id} receipt={receipt} />)}
        </div>
      </IonContent>

    </IonPage>
  );
};

export default Home;
