import { getReceipt, getReceipts, setReceipt } from "../app/database";
import Receipt from "../domain/receipt";

export const listReceipts = async () => {
  return getReceipts()
};

export const createReceipt = async (receipt: Receipt) => {
  await setReceipt(receipt)
}

export const findReceipt = async (id: String) => getReceipt(id);

export const updateReceipt = async (receipt: Receipt) => {
  await setReceipt(receipt)
}