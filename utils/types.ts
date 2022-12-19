export type Id = string;

export type ShopListData = {
    name: string;
    createdAt?: string;
};

export type ShopList = ShopListData & {
    id: Id;
};

export type ShopListItem = {
    listId: Id;
    sequence: number;
    text: string;
    done: boolean;
};
