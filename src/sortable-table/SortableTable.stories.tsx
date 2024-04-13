import React from "react";
import type { Meta, StoryObj } from '@storybook/react';
import SortableTable, { SortableTableProps } from "./SortableTable";
import { SortOrder } from "../util/sort-utils";

type TableType = {
  col1: string;
  col2: string;
  col3: boolean;
  react: React.JSX.Element | null;
  number: number;
}

const meta = {
  title: 'SortableTable',
  component: SortableTable<TableType>,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SortableTable<TableType>>;

export default meta;
type Story = StoryObj<typeof meta>;

const commonProps: SortableTableProps<TableType> = {
  sortable: true,
  activeColumns: ["col1", "col2", "col3", "react", "number"],
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
    react: {
      label: "react element",
      getValue: (val) => val
    },
    number: {
      label: "a number",
      getValue: (val) => String(val)
    }
  },
  rows: [
    {
      col1: {
        value: "zzz"
      },
      col2: {
        value: "abc"
      },
      col3: {
        value: true,
      }
    },
    {
      col1: {
        value: "yyy"
      },
      col2: {
        value: "maru"
      },
      col3: {
        value: true,
      }
    },
    {
      col1: {
        value: "b123"
      },
      col2: {
        value: ""
      },
      col3: {
        value: false,
      }
    },
    {
      col1: {
        value: "xxx"
      },
      col2: {
        value: "&*9%"
      },
      col3: {
        value: true,
      }
    },
    {
      col1: {
        value: "ccc"
      },
      col2: {
        value: "help"
      },
      col3: {
        value: false,
      }
    },
    {
      col1: {
        value: "aaa"
      },
      col2: {
        value: "emu"
      },
      col3: {
        value: true,
      }
    },
    {
      col1: {
        value: "b21"
      },
      col2: {
        value: "cinnamoroll"
      },
      col3: {
        value: false,
      }
    }
  ]
}

export const DefaultSorted: Story = {
  args: {
    ...commonProps,
    defaultSort: SortOrder.Ascending,
    defaultSortColumn: "col1",
    columns: {
      ...commonProps.columns,
      col1: {
        label: "sorted",
        getValue: (val) => val
      }
    },
  }
};

export const ClickableHeaders: Story = {
  args: {
    ...commonProps,
    defaultSort: SortOrder.Ascending,
    defaultSortColumn: "col1",
    columns: {
      ...commonProps.columns,
      col1: {
        label: "sorted",
        getValue: (val) => val
      }
    },
  }
};