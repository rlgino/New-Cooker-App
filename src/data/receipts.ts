import { getReceipt, getReceipts, setReceipt } from "../app/database";
import { uploadImage } from "../app/storage";
import Receipt from "../domain/receipt";

export const listReceipts = async () => {
  return getReceipts()
};

export const createReceipt = (receipt: Receipt, image: any) => {
  uploadImage(image, `${receipt.id}.jpg`).then(url => {
    receipt.image = url
    setReceipt(receipt)
  })
}

export const findReceipt = (id: String) => getReceipt(id);
