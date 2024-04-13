import type { Meta, StoryObj } from '@storybook/react';
import GenericTable, { GenericTableProps } from './GenericTable';
import "./GenericTable.interaction.stories.css";

type TableType = {
  col1: string;
  col2: string;
  col3: boolean;
  complex: {
    someValue: number;
    otherValue: number;
  }
}

const meta = {
  title: 'GenericTable - Interactions',
  component: GenericTable<TableType>,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GenericTable<TableType>>;

export default meta;
type Story = StoryObj<typeof meta>;

const commonProps: GenericTableProps<TableType> = {
    className: "interactable-table",
    cellProps: {
        className: "interactable-cell"
    },
    activeColumns: ["col1", "col2", "col3", "complex"],
    columns: {
      col1: {
        label: "col1",
        getValue: (val) => val
      },
      col2: {
        label: "col2",
        getValue: (val) => val
      },
      col3: {
        label: "col3",
        getValue: (val) => String(val)
      },
      complex: {
        label: "a number",
        getValue: (val) => val.someValue * val.otherValue
      }
    },
    rows: [
      {
        col1: {
          value: "value1"
        },
        col2: {
          value: "value2"
        },
        col3: {
          value: true
        },
        complex: {
          value: {
            someValue: 3,
            otherValue: 10,
          }
        }
      },
      {
        col1: {
          value: "value1_2"
        },
        col2: {
          value: "value2_2"
        },
        col3: {
          value: true
        },
      }
    ]
};

export const AllCellsSelectable: Story = {
  args: {
    ...commonProps,
    onCellSelected: (rowNo, colId, _, value) => alert(`Cell selected:\n rowNo: ${rowNo}\n colId: ${colId}\n value: ${JSON.stringify(value)}`),
  }
};

export const SingleCellSelectable: Story = {
    args: {
      ...commonProps,
      rows: [
            {
                col1: {
                    value: "select me!!",
                    onCellSelected: () => alert("You found me!!")
                },
                col2: {
                    value: "doesnt work"
                }
            }
        ],
    }
};

export const HeadersSelectable: Story = {
    args: {
      ...commonProps,
      columns: {
        col1: {
            label: "Selectable1",
            getValue: () => "",
        },
        col2: {
            label: "Selectable2",
            getValue: () => "",
        },
        col3: {
            label: "Selectable3",
            getValue: () => "",
        },
        complex: {
            label: "Selectable4",
            getValue: () => "",
        }
      },
      headerCellProps: {
        className: "interactable-header",
      },
      onHeaderSelected: (colNo, colId, label) => alert(`You selected me!!\n colNo: ${colNo}\n colId ${colId}\n label: ${label}`),
    }
};

export const SingleHeaderSelectable: Story = {
    args: {
      ...commonProps,
      columns: {
        col1: {
            label: "Selectable",
            getValue: () => "",
            className: "interactable-header",
            onColumnHeaderSelected: () => alert("You selected me!!"),
        },
        col2: {
            label: "Unselectable",
            getValue: () => "",
        },
        col3: {
            label: "Unselectable",
            getValue: () => "",
        },
        complex: {
            label: "Unselectable",
            getValue: () => "",
        }
      }
    }
};