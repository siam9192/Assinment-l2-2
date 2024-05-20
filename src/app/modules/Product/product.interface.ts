

export type Variants = {
    type:string,
    value:string
}

export type Inventory = {
    quantity: string,
    inStock: boolean
}

export interface Product {
    name: string,
    description:string,
    price:number,
    category:string,
    tags:Array<string>,
    variants:Array<Variants>,
    inventory:Inventory
}