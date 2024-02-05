import './ReceiptListItem.css';
import { Receipt } from '../../core/domain/receipt';
import { IonRouterLink } from '@ionic/react';

interface ReceiptListItemProps {
  receipt: Receipt;
}

const ReceiptListItem: React.FC<ReceiptListItemProps> = ({ receipt: receipt }) => {

  const shareReceipt = (e: any, id: string) => {
    e.preventDefault()
  }

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 card">
      <IonRouterLink href={`/new-receipt/${receipt.id}`}>
        <img className="rounded-t-lg" src={receipt.image.toString()} alt="" />
      </IonRouterLink>
      <div className="p-5">
        <IonRouterLink href={`/new-receipt/${receipt.id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{receipt.name}</h5>
        </IonRouterLink>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Accede a esta receta fabulosa!</p>
        <div className='flex justify-between'>
          <IonRouterLink href={`/new-receipt/${receipt.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Ver detalles
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </IonRouterLink>
          <IonRouterLink onClick={e => shareReceipt(e, receipt.id)} href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
            </svg>
          </IonRouterLink>
        </div>
      </div>
    </div>
  );
};

export default ReceiptListItem;
