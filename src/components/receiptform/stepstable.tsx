import { FunctionComponent } from "react";

interface StepsTableProps {
    steps: string[],
    setSteps: any
}

const StepsTable: FunctionComponent<StepsTableProps> = ({ steps, setSteps }) => {

    const addStep = () => {
        setSteps(steps.concat(""))
    }

    const setStep = (i: number, value: string) => {
        const nextSteps = steps.map((step, index) => index === i ? value : step)
        setSteps(nextSteps)
    }

    return (<>
        <h2>Pasos para la magia</h2>
        <br />
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Pasos
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        steps.map((val, i) => (
                            <tr className="bg-white dark:bg-gray-800" key={`row-${i + 1}`}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" key={`h-${i + 1}`}>
                                    {i + 1}.
                                    <input type="text" name="nameProduct" key={`input-step-${i + 1}`}
                                        value={val} onChange={(e) => { setStep(i, e.target.value) }}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder={`Agregue su paso ${i + 1}`} required />
                                    <label htmlFor="nameProduct" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        {`Agregue su paso ${i + 1}`}
                                    </label>
                                </th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        <button type="button" onClick={() => addStep()}
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            Agregar Paso
        </button>
    </>);
}

export default StepsTable;