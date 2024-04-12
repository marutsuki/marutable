import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import GenericTable from './GenericTable';

type TableType = {
  col1: string;
  col2: string;
  col3: boolean;
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
    activeColumns: ["col1", "col2", "col3"],
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
        }
      }
    ]
  }
};