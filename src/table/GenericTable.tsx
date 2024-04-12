import React, { FC, ReactNode } from "react";

type TestData = {
    "test": string;
    "react": boolean;
}

type Column<K, V> = {
    id: K;
    getValue: (val: V) => ReactNode;
};

type Row<K, V> = {
    value: V;
}

export type GenericTableProps<T> = {
    activeColumns: (keyof T)[];
    columns: {
        [K in keyof T]: Column<K, T[K]>;
    },
    rows: {
        [K in keyof T]: Row<K, T[K]>;
    }[];
};

export default function GenericTable<T>({ activeColumns, columns, rows } : GenericTableProps<T>): ReactNode {
    return <table>
        
    </table>
}