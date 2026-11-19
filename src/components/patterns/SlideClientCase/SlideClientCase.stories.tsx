import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideClientCase } from './SlideClientCase'

const meta = {
  title: 'Patterns/SlideClientCase',
  component: SlideClientCase,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideClientCase>

export default meta
type Story = StoryObj<typeof meta>

/** Figma copy (427:1452) with the real logo and text */
export const Everself: Story = {
  name: 'Everself',
  args: {
    eyebrow: 'CASE STUDY | SAN FRANCISCO, CA',
    title: ['Everself: one platform for a more', 'connected care experience'],
    body: (
      <>
        Vinta helped Everself replace fragmented clinical and communication tools with a
        <br />
        Medplum-based provider portal for obesity care. Built for a telehealth-first care model, the
        <br />
        platform brings asynchronous communication and patient context into one connected
        <br />
        experience, with a flexible foundation for expanding clinical workflows.
      </>
    ),
    linkLabel: 'VIEW THE FULL CASE STUDY',
    logo: { name: 'Everself', src: '/assets/client-case/logo-everself.png', width: 200, height: 52 },
  },
}

/** Same layout, with the logo still a placeholder */
export const QuiltedHealth: Story = {
  name: 'Quilted Health',
  args: {
    eyebrow: 'CASE STUDY | SPOKANE, WA',
    title: ['Quilted Health: a modern core', 'for a 14-year-old maternity EHR'],
    body: (
      <>
        Modernizing a 14-year-old maternity EHR: a Medplum proof of concept in one month,
        <br />
        then a 5-month engagement. We validated the new foundation with the midwives who use it
        <br />
        before moving the clinical workflows onto it.
      </>
    ),
    linkLabel: 'VIEW THE FULL CASE STUDY',
    logo: { name: 'Quilted Health', width: 200, height: 52 },
  },
}

/** Custom photo: the `photo` slot takes any image; the blue tint stays on top */
export const CustomPhoto: Story = {
  name: 'Foto personalizada',
  args: {
    ...QuiltedHealth.args,
    photo: <img src="/assets/closing/background.png" alt="" />,
  },
}
