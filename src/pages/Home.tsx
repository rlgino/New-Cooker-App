import ReceiptListItem from '../components/ReceiptListItem';
import { useState } from 'react';
import {
  IonAvatar,
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  useIonViewDidEnter
} from '@ionic/react';
import './Home.css';
import { Receipt } from '../domain/receipt';
import { getCurrentUser, userSignOut } from '../firebase/auth';
import { useHistory } from 'react-router';
import { listReceiptsFor } from '../services/receipts';
import { defaultImage } from '../domain/default';
import { addListeners, registerNotifications } from '../firebase/notifications';

const Home: React.FC = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [imgUrl, setImgUrl] = useState(defaultImage)
  const [user, setUser] = useState("")
  const history = useHistory();

  useIonViewDidEnter(() => {
    const user = getCurrentUser()
    if (!user) {
      history.push("/register")
      return
    }

    registerNotifications().then(() => {
      if (user.phoneNumber) addListeners(user.phoneNumber)
      else console.log("No notification added")
    })

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
    <IonPage>
      <IonContent fullscreen>
        <div className="flex justify-between items-center">
          <div className="ion-text-wrap">
            What would you like to cook today, {user}?
          </div>
          <IonAvatar aria-hidden="true" slot="end" className='size-16 m-2' onClick={() => signOut()}>
            <img alt={user} src={imgUrl} />
          </IonAvatar>
        </div>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <div className='flex flex-wrap justify-center'>
          <div className='grid grid-cols-2 sm:grid-flow-col'>
            {
              receipts.length > 0 ? receipts.map(receipt => <ReceiptListItem key={receipt.id} receipt={receipt} />) : <div>No tiene recetas creadas</div>
            }
          </div>
        </div>
      </IonContent>

    </IonPage>
  );
};

export default Home;
