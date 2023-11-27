import { getReceipt, getReceipts, setReceipt } from "../app/database";
import { uploadImage } from "../app/storage";
import Receipt from "../domain/receipt";

export const listReceipts = async () => {
  return getReceipts()
};

export const createReceipt = async (receipt: Receipt, image: any) => {
  const url = await uploadImage(image, `${receipt.id}.jpg`)
  receipt.image = url
  await setReceipt(receipt)
}

export const findReceipt = async (id: String) => getReceipt(id);
