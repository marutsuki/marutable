import React from "react";
import type { Meta, StoryObj } from '@storybook/react';
import GenericTable from './GenericTable';

const Smiley = <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm-.019 14c1.842.005 3.613.791 5.117 2.224l-.663.748c-1.323-1.27-2.866-1.968-4.456-1.972h-.013c-1.568 0-3.092.677-4.4 1.914l-.664-.748c1.491-1.4 3.243-2.166 5.064-2.166h.015zm-3.494-6.5c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm7.013 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"/></svg>;

type TableType = {
  col1: string;
  col2: string;
  col3: boolean;
  img: React.JSX.Element | null;
}

const meta = {
  title: 'GenericTable',
  component: GenericTable<TableType>,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GenericTable<TableType>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeColumns: ["col1", "col2", "col3", "img"],
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
      img: {
        label: "img",
        getValue: (val) => val
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
        img: {
          value: Smiley
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
        img: {
          value: null
        }
      }
    ]
  }
};