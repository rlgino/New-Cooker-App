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
  useIonViewDidEnter
} from '@ionic/react';
import './Home.css';
import { Receipt } from '../domain/receipt';
import { options, search } from 'ionicons/icons';
import { getCurrentUser, userSignOut } from '../app/auth';
import { useHistory } from 'react-router';
import { listReceiptsFor } from '../data/receipts';

const Home: React.FC = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [imgUrl, setImgUrl] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Boca_Juniors_logo18.svg/1200px-Boca_Juniors_logo18.svg.png")
  const [user, setUser] = useState("")
  const history = useHistory();

  useIonViewDidEnter(() => {
    const user = getCurrentUser()
    if (!user) {
      history.push("/register")
      return
    }
    setUser(user.displayName ? user.displayName : "")
    setImgUrl(user.photoURL ? user.photoURL : imgUrl)

    listReceiptsFor(user.uid).then(receipts => {
      setReceipts(receipts);
    });
  }, [])

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
            <h3 className='title'>{user}</h3>
          </div>
          <IonAvatar aria-hidden="true" slot="start" className='avatar' onClick={() => signOut()}>
            <img alt="" src={imgUrl} />
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
          {
            receipts.length > 0 ? receipts.map(receipt => <ReceiptListItem key={receipt.id} receipt={receipt} />) : <div>No tiene recetas creadas</div>
          }
        </div>
      </IonContent>

    </IonPage>
  );
};

export default Home;
