import React, { FC, ReactNode, useMemo } from "react";
import "./GenericTable.css";

type TestData = {
    "test": string;
    "react": boolean;
}

type Column<K, V> = {
    label: ReactNode;
    getValue: (val: V) => ReactNode;
    fixedWidth?: string;
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
    const gridTemplateColumns = useMemo(() => activeColumns.map(col => 
        columns[col].fixedWidth || "1fr"
    ).join(" "), [activeColumns, columns]);

    return <div className="generic-table" style={{
        gridTemplateColumns,
        gridTemplateRows: "auto",
    }}>
        {
            activeColumns.map(col => 
                <div key={`generic-table-col-${String(col)}`} className={`generic-table-col generic-table-col-${String(col)}`}>{columns[col].label}</div>
            )
        }
        {
            rows.map(row => 
                activeColumns.map(col => <div key={`generic-table-row-${String(row)}-cell-${String(col)}`} className={`generic-table-row-${String(row)}-cell-${String(col)}`}>
                    { columns[col].getValue(row[col].value) }
                </div>)
            )
        }
    </div>
}