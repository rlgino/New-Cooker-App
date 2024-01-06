import { getReceiptFor, getReceiptsFor, setReceiptFor } from "../app/database";
import { Receipt } from "../domain/receipt";

export const listReceiptsFor = async (uid: string) => {
  return getReceiptsFor(uid)
};

export const createReceiptFor = async (uid: string, receipt: Receipt) => {
  await setReceiptFor(uid, receipt)
}

export const findReceiptFor = async (uid: string, id: String) => getReceiptFor(uid, id);
