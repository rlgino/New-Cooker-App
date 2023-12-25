import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "./firebase";

const storage = getStorage(app);

export const uploadImage = (image: any, name: string): Promise<string> => {
    return new Promise((success, reject) => {
        const storageRef = ref(storage, `receipts/${name}`);

        uploadBytes(storageRef, image).then((snapshot) => {
            // download url
            getDownloadURL(snapshot.ref).then((url) => {
                console.log("Upload successful");
                success(url)
            });
        }
        ).catch(reason => reject(reason));
    })
}

export const uploadProfileImage = (image: any, name: string): Promise<string> => {
    return new Promise((success, reject) => {
        const storageRef = ref(storage, `profiles/${name}`);

        uploadBytes(storageRef, image).then((snapshot) => {
            // download url
            getDownloadURL(snapshot.ref).then((url) => {
                console.log("Upload successful");
                success(url)
            });
        }
        ).catch(reason => reject(reason));
    })
}

