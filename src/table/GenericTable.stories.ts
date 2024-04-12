import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import GenericTable from './GenericTable';

type TableType = {
  col1: string;
  col2: string;
  col3: boolean;
}

const meta = {
  title: 'Example/Page',
  component: GenericTable<TableType>,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GenericTable<TableType>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeColumns: ["col1", "col2", "col3"],
    columns: {
      col1: {
        id: "col1",
        getValue: (val) => val
      },
      col2: {
        id: "col2",
        getValue: (val) => val
      },
      col3: {
        id: "col3",
        getValue: (val) => String(val)
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
        }
      }
    ]
  }
};