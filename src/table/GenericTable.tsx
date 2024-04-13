import React, { ReactNode, useMemo } from "react";
import "./GenericTable.css";

type Column<V> = {
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
        [K in keyof T]: Column<T[K]>;
    },
    rows: {
        [K in keyof T]?: Row<K, T[K]>;
    }[];
    headerProps?: React.HTMLProps<HTMLTableRowElement>;
    rowProps?: React.HTMLProps<HTMLTableRowElement>;
    headerCellProps?: React.HTMLProps<HTMLTableCellElement>;
    cellProps?: React.HTMLProps<HTMLTableCellElement>;
} & Omit<React.HTMLProps<HTMLTableElement>, "rows" | "columns">;

export default function GenericTable<T>({ activeColumns, columns, rows, className, headerProps = {}, rowProps = {}, headerCellProps = {}, cellProps = {}, ...props } : GenericTableProps<T>): ReactNode {
    const gridTemplateColumns = useMemo(() => activeColumns.map(col => 
        columns[col].fixedWidth || "1fr"
    ).join(" "), [activeColumns, columns]);

    const { className: headerClassName, ...otherHeaderProps } = headerProps;
    const { className: rowClassName, ...otherRowProps } = rowProps;
    const { className: headerCellClassName, ...otherHeaderCellProps } = headerCellProps;
    const { className: cellClassName, ...otherCellProps } = cellProps;

    return <table className={"generic-table ".concat(className || "")} {...props}>
        <tr className={"generic-table-header ".concat(headerProps.className || "")} {...otherHeaderProps}>
        {
            activeColumns.map((col, i) => 
                <th 
                    key={`generic-table-col-${String(col)}`} 
                    className={`generic-table-col generic-table-col-${String(col)} ${headerCellClassName}`}
                    style={{
                        gridRow: 0,
                        gridColumn: i + 1,
                        width: columns[col].fixedWidth || "auto"
                    }}
                    {...otherHeaderCellProps}
                >
                    {columns[col].label}
                </th>
            )
        }
        </tr>
        {
            rows.map((row, i) => 
                <tr className={`generic-table-row generic-table-row-${i} ${otherRowProps} ${rowClassName}`}> 
                    {
                        activeColumns.map(col => {
                            const val = row[col]?.value;
                            return <td 
                                key={`generic-table-row-${String(row)}-cell-${String(col)}`} 
                                className={`generic-table-row-${String(row)}-cell-${String(col)} ${cellClassName || ""}`}
                                {...otherCellProps}
                            >
                                { val !== undefined && columns[col].getValue(val) }
                            </td>
                        })
                    }
                </tr>
            )
        }
    </table>
}