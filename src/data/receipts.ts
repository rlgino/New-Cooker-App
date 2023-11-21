import { setReceipt, getReceipt, getReceipts } from "../app/firebase";
import Receipt from "../domain/receipt";
import { v4 as uuidv4 } from 'uuid';

export const listReceipts = async () => {
  return getReceipts()
};

export const createReceipt = () => {
  const rec: Receipt = {
    id: uuidv4(),
    name: "receipt1",
    description: "New receipt",
    image: "https://firebasestorage.googleapis.com/v0/b/recetario-2021.appspot.com/o/images%2F1c2dbde1-ff54-48e3-96b7-0ddc5cdc8ab5.jpg?alt=media&token=a9921c8c-c15b-4029-8789-855c49427cf2"
  }
  setReceipt(rec)
}

export const findReceipt = (id: String) => getReceipt(id);
