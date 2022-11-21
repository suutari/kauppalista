
export type ShopListData = {
    name: string;
    createdAt?: Date;
};

export type ShopList = ShopListData & {
    id: number;
};

export type ShopListItem = {
    listId: number;
    sequence: number;
    text: string;
    done: boolean;
};
