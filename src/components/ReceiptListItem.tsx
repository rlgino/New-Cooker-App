import './ReceiptListItem.css';
import { Receipt } from '../domain/receipt';
import { IonIcon, IonRouterLink } from '@ionic/react';
import ShareReceiptDialog from './ShareReceipt';
import { useState } from 'react';
import { trash } from 'ionicons/icons';
import { getCurrentUser } from '../firebase/auth';
import { deleteReceiptFor } from '../firebase/database';

interface ReceiptListItemProps {
  receipt: Receipt;
}

const ReceiptListItem: React.FC<ReceiptListItemProps> = ({ receipt: receipt }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false);

  const shareReceipt = (e: any) => {
    e.preventDefault()
    setIsOpen(true)
  }

  const deleteItem = () => {
    const user = getCurrentUser()
    if (!user) return
    deleteReceiptFor(user.uid, receipt.id)
    setIsDeleted(true)
  }
  if (isDeleted) {
    return (<></>)
  }

  return (
    <div className="card max-w-44">
      <div className='relative flex max-w justify-end mr-1' onClick={() => deleteItem()}>
        <IonIcon icon={trash} size='medium' className="m-1 absolute bg-danger inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 z-40" />
      </div>
      <IonRouterLink href={`/new-receipt/${receipt.id}`}>
        <img src={receipt.image.toString()} alt="" className='object-cover size-44 rounded-lg' />
        <div className="p-1 flex justify-between items-start">
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{receipt.name}</h5>
          <div className='flex'>
            <IonRouterLink onClick={e => shareReceipt(e)} href="#" className="bg-primary inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
              </svg>
            </IonRouterLink>
          </div>
        </div>
      </IonRouterLink>
      <ShareReceiptDialog isOpen={isOpen} setIsOpen={setIsOpen} userID={receipt.userID} receiptID={receipt.id} />
    </div>
  );
};

export default ReceiptListItem;
