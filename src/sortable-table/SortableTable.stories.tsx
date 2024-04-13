import React from "react";
import type { Meta, StoryObj } from '@storybook/react';
import SortableTable, { SortableTableProps } from "./SortableTable";
import { SortOrder } from "../util/sort-utils";

const Smiley = <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm-.019 14c1.842.005 3.613.791 5.117 2.224l-.663.748c-1.323-1.27-2.866-1.968-4.456-1.972h-.013c-1.568 0-3.092.677-4.4 1.914l-.664-.748c1.491-1.4 3.243-2.166 5.064-2.166h.015zm-3.494-6.5c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm7.013 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"/></svg>;

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