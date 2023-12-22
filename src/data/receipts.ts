import { getReceipt, getReceiptFor, getReceipts, getReceiptsFor, setReceipt, setReceiptFor } from "../app/database";
import Receipt from "../domain/receipt";

export const listReceipts = async () => {
  return getReceipts()
};

export const createReceipt = async (receipt: Receipt) => {
  await setReceipt(receipt)
}

export const findReceipt = async (id: String) => getReceipt(id);

export const listReceiptsFor = async (uid: string) => {
  return getReceiptsFor(uid)
};

export const createReceiptFor = async (uid: string, receipt: Receipt) => {
  await setReceiptFor(uid, receipt)
}

export const findReceiptFor = async (uid: string, id: String) => getReceiptFor(uid, id);
