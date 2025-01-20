import { IonIcon, IonTextarea } from "@ionic/react";
import { trashBin } from "ionicons/icons";
import { FunctionComponent, useEffect } from "react";

interface StepsTableProps {
    steps: string[],
    setSteps: any
}

const StepsTable: FunctionComponent<StepsTableProps> = ({ steps, setSteps }) => {

    const addStep = () => {
        setSteps(steps.concat(""))
    }
    useEffect(() => {
        steps.forEach((_, index) => {
            const textArea = document.getElementById(`input-step-${index + 1}`) as HTMLTextAreaElement
            textArea.style.height = "1px";
            textArea.style.height = (textArea.scrollHeight) + "px";
        })
    }, [steps])

    const setStep = (i: number, value: string) => {
        let nextSteps = [];
        if (value.indexOf("\n") !== -1) {
            const values = value.split("\n");
            nextSteps = steps.map((step, index) => index === i ? values[0] : step)
            for (let j = 1; j < values.length; j++) {
                nextSteps.push(values[j])
            }
        } else {
            nextSteps = steps.map((step, index) => index === i ? value : step)
        }
        setSteps(nextSteps)
    }

    const removeItem = (i: number) => {
        const newItems = steps.filter((_, index) => index !== i)
        setSteps(newItems)
    }

    return (<>
        <h2>Pasos para la magia</h2>
        <br />
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-2 py-1 w-90">
                            Pasos
                        </th>
                        <th className="w-10"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        steps.map((val, i) => (
                            <tr className="bg-white dark:bg-gray-800" key={`row-${i + 1}`}>
                                <td className="flex justify-between items-center">
                                    {i + 1}.
                                    <textarea name="nameProduct" key={`input-step-${i + 1}`}
                                        id={`input-step-${i + 1}`}
                                        value={val} onChange={(e) => { setStep(i, e.target.value) }}
                                        className="mb-1 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder={`Agregue su paso ${i + 1}`} required />
                                </td>
                                <td>
                                    <IonIcon icon={trashBin} size="large" onClick={e => removeItem(i)} color="danger"></IonIcon>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        <br />
        <button type="button" onClick={() => addStep()}
            className="bg-secondary py-2 px-2  me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            Agregar Paso
        </button>
    </>);
}

export default StepsTable;