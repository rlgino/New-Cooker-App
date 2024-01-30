// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, set, onValue } from "firebase/database";
import { Receipt } from "../../core/domain/receipt";
import app from "./firebase";

export const setReceiptFor = (uid: string, receipt: Receipt) => {
    const db = getDatabase(app);
    set(ref(db, `receipts/${uid}/${receipt.id}`), {
        name: receipt.name,
        image: receipt.image,
        steps: receipt.steps,
        items: receipt.items
    });
}

export const getReceiptsFor = async (uid: string): Promise<Receipt[]> => {
    return new Promise((resolve) => {
        const db = getDatabase(app);
        var receipts = ref(db, `receipts/${uid}`);
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
        var receipts = ref(db, `receipts/${uid}/${id}`);
        onValue(receipts, (snapshot) => {
            if (!snapshot.exists()) {
                reject("Receipt not found")
                return
            }
            const data = snapshot.val();
            const rec: Receipt = {
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