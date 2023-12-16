import {
  IonAvatar,
  IonItem,
  IonLabel,
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
        <h2>{receipt.name}</h2>
        <IonAvatar aria-hidden="true" slot="start">
          <img alt="" src={receipt.image.toString()} />
        </IonAvatar>
        <h3>{receipt.description}</h3>
      </IonLabel>
    </IonItem>
  );
};

export default ReceiptListItem;
