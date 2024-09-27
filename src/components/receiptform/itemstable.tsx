import { FunctionComponent } from "react";
import { Item } from "../../domain/receipt";
import InputText from "../inputText";
import { IonIcon } from "@ionic/react";
import { addCircle, camera, trashBin } from "ionicons/icons";

interface ItemsTableProps {
    items: Item[],
    setItems: any
}

const ItemsTable: FunctionComponent<ItemsTableProps> = ({ items, setItems }) => {

    const addItem = () => {
        setItems(items.concat({
            name: "",
            quantity: 0,
            measureUnity: ""
        }))
    }

    const changeName = (i: number, value: string) => {
        const newItems = items.map((item, index) => {
            if (index === i)
                return {
                    ...item,
                    name: value
                }
            return item
        })
        setItems(newItems)
    }

    const changeQuantity = (i: number, value: string) => {
        if (!value) value = "0"
        const newItems = items.map((item, index) => {
            if (index === i)
                return {
                    ...item,
                    quantity: parseInt(value),
                }
            return item
        })
        setItems(newItems)
    }

    const changeMeasureUnity = (i: number, value: string) => {
        const newItems = items.map((item, index) => {
            if (index === i)
                return {
                    ...item,
                    measureUnity: value
                }
            return item
        })
        setItems(newItems)
    }

    const removeItem = (i: number) => {
        const newItems = items.filter((item, index) => index !== i)
        setItems(newItems)
    }

    return (<>
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-2 py-1 w-50">
                            Item
                        </th>
                        <th scope="col" className="px-2 py-1 w-20">
                            Cantidad
                        </th>
                        <th scope="col" className="px-2 py-1 w-20">
                            Medida
                        </th>
                        <th className="w-10"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item, i) => (
                            <tr className="bg-white dark:bg-gray-800" key={`row-item-${i + 1}`}>
                                <th scope="row" className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <input type="text" name="nameProduct" value={item.name} onChange={(e) => changeName(i, e.target.value)}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" " required />
                                </th>
                                <td className="px-2 py-1">
                                    <input type="number" name="amountProduct" value={item.quantity} onChange={(e) => changeQuantity(i, e.target.value)}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" " required />
                                </td>
                                <td className="px-2 py-1">
                                    <select id="amount" value={item.measureUnity} onChange={(e) => changeMeasureUnity(i, e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value={"gr"}>Gr</option>
                                        <option value={"kg"}>KG</option>
                                        <option value={"un"}>Un</option>
                                    </select>
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
        <button type="button" onClick={() => { addItem() }}
            className="bg-secondary py-2 px-2 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            Agregar Item
        </button>
    </>);
}

export default ItemsTable;