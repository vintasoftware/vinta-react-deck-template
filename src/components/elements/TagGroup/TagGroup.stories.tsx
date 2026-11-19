import type { Meta, StoryObj } from '@storybook/react-vite'
import { TagGroup } from './TagGroup'
import { Tag } from '../Tag'

const meta = {
  title: 'Elements/TagGroup',
  component: TagGroup,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof TagGroup>

export default meta
type Story = StoryObj<typeof meta>

export const OnInvertBlue: Story = {
  args: { children: null },
  render: () => (
    <div style={{ background: 'var(--surface-invert-blue)', padding: 32 }}>
      <TagGroup>
        <Tag variant="outline" mode="invert-blue">4 WEEKS</Tag>
        <Tag variant="outline" mode="invert-blue">FIXED PRICE</Tag>
        <Tag variant="outline" mode="invert-blue">FHIR + HIPAA</Tag>
      </TagGroup>
    </div>
  ),
}
