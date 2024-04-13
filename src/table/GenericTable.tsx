import React, { MouseEvent, ReactNode } from "react";
import "./GenericTable.css";

export interface Column<V> {
    label: ReactNode;
    getValue: (val: V) => ReactNode;
    fixedWidth?: string;
    onColumnHeaderSelected?: (e: MouseEvent) => void;
    className?: string;
};

export type Cell<V> = {
    value: V;
    onCellSelected?: (e: MouseEvent) => void;
}

export type GenericTableProps<T> = {
    activeColumns: (keyof T)[];
    columns: {
        [K in keyof T]: Column<T[K]>;
    },
    rows: {
        [K in keyof T]?: Cell<T[K]>;
    }[];
    headerProps?: React.HTMLProps<HTMLTableRowElement>;
    rowProps?: React.HTMLProps<HTMLTableRowElement>;
    headerCellProps?: React.HTMLProps<HTMLTableCellElement>;
    cellProps?: React.HTMLProps<HTMLTableCellElement>;
    onHeaderSelected?: (colNo: number, colId: keyof T, label: ReactNode) => void;
    onCellSelected?: (rowNo: number, colId: keyof T, e: MouseEvent, value?: T[keyof T]) => void;
    sortable?: boolean;
} & Omit<React.HTMLProps<HTMLTableElement>, "rows" | "columns">;

export default function GenericTable<T>({ 
    activeColumns, 
    columns, 
    rows, 
    className, 
    headerProps = {}, 
    rowProps = {}, 
    headerCellProps = {}, 
    cellProps = {}, 
    onHeaderSelected,
    onCellSelected,
    sortable = true,
    ...props 
} : GenericTableProps<T>): ReactNode {
    const { className: headerClassName, ...otherHeaderProps } = headerProps;
    const { className: rowClassName, ...otherRowProps } = rowProps;
    const { className: headerCellClassName, ...otherHeaderCellProps } = headerCellProps;
    const { className: cellClassName, ...otherCellProps } = cellProps;

    const onColumnHeaderSelected = (e: MouseEvent<HTMLTableCellElement>, colId: keyof T) => {
        const colHeaderCallback = columns[colId].onColumnHeaderSelected;
        if (colHeaderCallback !== undefined) {
            colHeaderCallback(e);
        }
        if (onHeaderSelected !== undefined) {
            onHeaderSelected(activeColumns.findIndex(col => col === colId), colId, columns[colId].label);
        }
    }
    
    const onCellSelectedWrapper = (e: MouseEvent<HTMLTableCellElement>, rowNo: number, colId: keyof T) => {
        const cellCallback = rows[rowNo][colId]?.onCellSelected;
        if (cellCallback !== undefined) {
            cellCallback(e);
        }
        if (onCellSelected !== undefined) {
            onCellSelected(rowNo, colId, e, rows[rowNo][colId]?.value);
        }
    }

    return <table className={"generic-table ".concat(className || "")} {...props}>
        <tr className={"generic-table-header ".concat(headerProps.className || "")} {...otherHeaderProps}>
        {
            activeColumns.map((col, i) => 
                <th 
                    key={`generic-table-col-${String(col)}`} 
                    className={`generic-table-col generic-table-col-${String(col)} ${headerCellClassName || ""} ${columns[col].className || ""}`}
                    style={{
                        gridRow: 0,
                        gridColumn: i + 1,
                        width: columns[col].fixedWidth || "auto"
                    }}
                    onClick={(e) => onColumnHeaderSelected(e, col)}
                    {...otherHeaderCellProps}
                >
                    {columns[col].label}
                </th>
            )
        }
        </tr>
        {
            rows.map((row, i) => {
                const key = `generic-table-row-${i}`;
                return <tr className={`generic-table-row generic-table-row-${i} ${rowClassName || ""}`} {...otherRowProps}> 
                    {
                        activeColumns.map(col => {
                            const val = row[col]?.value;
                            const subKey = key.concat(`-cell-${String(col)}`);
                            return <td 
                                key={subKey} 
                                className={`${subKey} ${cellClassName || ""}`}
                                onClick={(e) => onCellSelectedWrapper(e, i, col)}
                                {...otherCellProps}
                            >
                                { val !== undefined && columns[col].getValue(val) }
                            </td>
                        })
                    }
                </tr>
            })
        }
    </table>
}