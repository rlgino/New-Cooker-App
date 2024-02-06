export interface Receipt {
    userID: string
    id: string
    name: string
    image: string
    items: Item[]
    steps: string[]
}

export interface Item {
    name: string
    quantity: number
    measureUnity: string
}
