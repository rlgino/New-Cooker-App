// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { Receipt } from "../domain/receipt";
import app from "./firebase";

export const setReceiptFor = (uid: string, receipt: Receipt) => {
    const db = getDatabase(app);
    set(ref(db, `user/${uid}/receipts/${receipt.id}`), {
        name: receipt.name,
        image: receipt.image,
        steps: receipt.steps,
        items: receipt.items
    });
}

export const getReceiptsFor = async (uid: string): Promise<Receipt[]> => {
    return new Promise((resolve) => {
        const db = getDatabase(app);
        var receipts = ref(db, `user/${uid}/receipts`);
        onValue(receipts, (snapshot) => {
            if (!snapshot.exists()) {
                resolve([])
                return
            }
            var res: Receipt[] = []
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                const receipt: Receipt = {
                    userID: uid,
                    id: childKey,
                    name: childData.name,
                    image: childData.image,
                    items: childData.items ? childData.items : [],
                    steps: childData.steps ? childData.steps : []
                }
                res.push(receipt)
            });
            resolve(res)
        });
    })
}

export const getReceiptFor = async (uid: string, id: String): Promise<Receipt> => {
    return new Promise((resolve, reject) => {
        const db = getDatabase(app);
        var receipts = ref(db, `user/${uid}/receipts/${id}`);
        onValue(receipts, (snapshot) => {
            if (!snapshot.exists()) {
                reject("Receipt not found")
                return
            }
            const data = snapshot.val();
            const rec: Receipt = {
                userID: uid,
                id: snapshot.key ? snapshot.key : "",
                name: data.name,
                image: data.image,
                items: data.items ? data.items : [],
                steps: data.steps ? data.steps : []
            };
            resolve(rec)
        });
    })
}

export const updateNumber = (uid: string, phoneNumber: string, oldPhoneNumber: string) => {
    const db = getDatabase(app);
    remove(ref(db, `contacts/${oldPhoneNumber}`))
    set(ref(db, `contacts/${phoneNumber}/uid`), uid);
}

export const updatePushToken = (phoneNumber: string, pushToken: string) => {
    const db = getDatabase(app);
    set(ref(db, `contacts/${phoneNumber}/pushToken`), pushToken);
}

export const findUid = async (phoneNumber: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const db = getDatabase(app);
        var contact = ref(db, `contacts/${phoneNumber.split(' ').join('')}`);
        onValue(contact, (snapshot) => {
            if (!snapshot.exists()) {
                reject("Contact not found")
                return
            }
            const data = snapshot.val();
            resolve(data.uid)
        });
    })
}

export const shareReceipt = (sourceUID: string, targetUID: string, receiptUid: string) => {
    getReceiptFor(sourceUID, receiptUid).then((receipt) => {
        setReceiptFor(targetUID, receipt)
    })
}
