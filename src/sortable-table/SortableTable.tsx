import React, { ReactNode, useMemo, useState } from "react";
import GenericTable, { Cell, Column, GenericTableProps, TableKeyValueMap } from "../table/GenericTable";
import { SortOrder, sorted } from "../util/sort-utils";
import { getInnerText } from "../util/react-utils";

const DefaultSortIcon = ({ sortOrder }: { sortOrder: SortOrder }) => 
    <svg
        style={{
            ...(sortOrder === SortOrder.Unordered && { opacity: "0%" }),
            padding: "0px 5px",
            rotate: sortOrder === SortOrder.Ascending ? "0deg" : "180deg"
        }}
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24"
    >
        <path d="M24 3l-12 18-12-18z"/>
    </svg>;

interface SortableColumn<V> extends Column<V> {
    sortable?: boolean;
    sortOnClick?: boolean;
}

export type SortableTableProps<T extends TableKeyValueMap> = GenericTableProps<T> & {
    columns: {
        [K in keyof T]: SortableColumn<T[K]>;
    },
    rows: {
        [K in keyof T]?: Cell<T[K]>;
    }[],
    defaultSort?: SortOrder;
    defaultSortColumn?: keyof T;
    numericSort?: boolean;
    sortOnHeaderClick?: boolean;
    sortIconProvider?: (props: { sortOrder: SortOrder } & JSX.IntrinsicAttributes) => ReactNode;
}

export default function SortableTable<T extends TableKeyValueMap>({ 
    rows,
    columns,
    onHeaderSelected,
    defaultSort = SortOrder.Unordered,
    defaultSortColumn,
    numericSort: numeric = false,
    sortOnHeaderClick = true,
    sortIconProvider = DefaultSortIcon,
    ...props 
} : SortableTableProps<T>): ReactNode {
    const [sortColumns, setSortColumns] = useState<Record<keyof T, SortOrder>>(Object.keys(columns).reduce((prev, col) => ({
        ...prev,
        [col]: col === defaultSortColumn ? defaultSort : SortOrder.Unordered
    }), {} as Record<keyof T, SortOrder>));

    const columnsWithSort = useMemo(() => Object.keys(columns).reduce((prev, col) => {
        const original = columns[col as keyof typeof columns];
        return {
            ...prev,
            [col]: {
                ...(original),
                label: <>
                    {
                        original.label
                    } 
                    {
                        (original.sortable === undefined || original.sortable === true) && sortIconProvider({ sortOrder: sortColumns[col as keyof typeof columns] })
                    }
                </>
            }
        }
    }, {} as {
        [K in keyof T]: SortableColumn<T[K]>;
    }), [columns, sortColumns]);

    const sortedRows = useMemo(() => {
        const toSort = Object.entries(sortColumns).find(col => col[1] !== SortOrder.Unordered) as [keyof typeof columns, SortOrder];
        if (toSort === undefined) {
            return rows;
        }
        const [sortColumn, sortOrder] = toSort;
        const ssortColumn = String(sortColumn);
        if (columns[sortColumn].sortable === false) {
            return rows;
        }
        return sorted(rows, (a, b) => {
            const aVal = a[ssortColumn]?.value;
            const bVal = b[ssortColumn]?.value;
            if (aVal === undefined) {
                return -1;
            }
            if (bVal === undefined) {
                return 1;
            }
            return getInnerText(columns[sortColumn].getValue(aVal)).localeCompare(getInnerText(columns[sortColumn].getValue(bVal)), 'en', { numeric });
        }, sortOrder);
    }, [sortColumns]);

    const changeSort = (sort: SortOrder) => {
        switch (sort) {
            case SortOrder.Ascending:
                return SortOrder.Descending;
            case SortOrder.Descending:
                return SortOrder.Unordered;
            case SortOrder.Unordered:
                return SortOrder.Ascending;
        }
    }
    const onHeaderSelectedWrapper = (colNo: number, colId: keyof T, label: ReactNode) => {
        if (sortOnHeaderClick) {
            setSortColumns(cols => Object.keys(cols).reduce((prev, col) => ({
                ...prev,
                [col]: col === colId ? changeSort(cols[col as keyof typeof cols]) : SortOrder.Unordered
            }), {} as Record<keyof T, SortOrder>));
        }
        if (onHeaderSelected) {
            onHeaderSelected(colNo, colId, label);
        }
    }

    return <GenericTable 
        rows={sortedRows} 
        columns={columnsWithSort} 
        onHeaderSelected={onHeaderSelectedWrapper} 
        {...props}
    />
}