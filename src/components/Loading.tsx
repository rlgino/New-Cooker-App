import { useIonLoading } from "@ionic/react";
import { useEffect } from "react";
import { useFormStatus } from "react-dom"

const Loading = () => {
    const { pending } = useFormStatus();
    const [present, dismiss] = useIonLoading();

    useEffect(() => {
        if (pending)
            present({ message: 'Loading...' });
        else
            dismiss();
    }, [pending]);
    return <></>;
}

export default Loading;