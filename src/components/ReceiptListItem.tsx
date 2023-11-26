import {
  IonItem,
  IonLabel,
  IonNote
  } from '@ionic/react';
import './ReceiptListItem.css';
import Receipt from '../domain/receipt';

interface ReceiptListItemProps {
  receipt: Receipt;
}

const ReceiptListItem: React.FC<ReceiptListItemProps> = ({ receipt: receipt }) => {
  return (
    <IonItem routerLink={`/receipt/${receipt.id}`} detail={false}>
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          {receipt.name}
          <span className="date">
            <IonNote>{receipt.image}</IonNote>
          </span>
        </h2>
        <h3>{receipt.description}</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default ReceiptListItem;
