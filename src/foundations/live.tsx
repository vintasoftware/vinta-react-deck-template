/**
 * Support blocks for the foundation pages (MDX). Every value shown here is
 * read from tokens.css at runtime via getComputedStyle — never hardcoded. If the
 * token changes, the doc changes with it, as requested.
 *
 * This file is only for the Docs pages — it is not an element, not a pattern,
 * not a new token.
 */
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

/** Reads getComputedStyle(ref).getPropertyValue(name) on the node itself. If the node
 *  is inside an ancestor with [data-mode]/[data-accent], CSS custom property
 *  inheritance already resolves to the right value — no need
 *  to repeat the attributes here. */
export function LiveValue({ name, prop = 'value' }: { name: string; prop?: 'value' | CssReadout }) {
  const ref = useRef<HTMLElement>(null)
  const [value, setValue] = useState('')

  useEffect(() => {
    if (!ref.current) return
    const cs = getComputedStyle(ref.current)
    setValue(readProp(cs, prop, name))
  }, [name, prop])

  return (
    <code ref={ref as React.RefObject<HTMLElement>} style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>
      {value || '…'}
    </code>
  )
}

type CssReadout = 'value' | 'width' | 'borderRadius' | 'boxShadow' | 'fontFamily' | 'fontSize' | 'fontWeight' | 'lineHeight' | 'letterSpacing' | 'fontStyle'

function readProp(cs: CSSStyleDeclaration, prop: CssReadout, name: string) {
  if (prop === 'value') return cs.getPropertyValue(name).trim()
  return cs[prop]
}

/** Color box + name + live computed value. */
export function Swatch({ name, label }: { name: string; label?: string }) {
  return (
    <div style={{ display: 'inline-block', width: 132, marginRight: 12, marginBottom: 16, verticalAlign: 'top' }}>
      <div
        style={{
          background: `var(${name})`,
          height: 64,
          borderRadius: 10,
          border: '1px solid var(--border-color)',
        }}
      />
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, marginTop: 6, color: 'var(--ink)' }}>
        {label ?? name}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--slate-400)' }}>
        <LiveValue name={name} />
      </div>
    </div>
  )
}

/** Scale row (bar proportional to the value) — spacing/safe area. */
export function ScaleBar({ name, label, max = 220 }: { name: string; label?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [px, setPx] = useState('')

  useEffect(() => {
    if (ref.current) setPx(getComputedStyle(ref.current).width)
  }, [name])

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
      <div style={{ width: 150, fontFamily: 'var(--font-mono)', fontSize: 13, flexShrink: 0 }}>{label ?? name}</div>
      <div style={{ width: max, flexShrink: 0 }}>
        <div ref={ref} style={{ height: 16, width: `var(${name})`, maxWidth: '100%', background: 'var(--blue-600)', borderRadius: 3 }} />
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--slate-400)' }}>{px}</div>
    </div>
  )
}

/** Radius sample — box + name + computed value. */
export function RadiusSample({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState('')

  useEffect(() => {
    if (ref.current) setValue(getComputedStyle(ref.current).borderRadius)
  }, [name])

  return (
    <div style={{ display: 'inline-block', textAlign: 'center', marginRight: 24, marginBottom: 16 }}>
      <div
        ref={ref}
        style={{
          width: 88,
          height: 88,
          background: 'var(--surface-tint)',
          border: '1px solid var(--border-color)',
          borderRadius: `var(${name})`,
        }}
      />
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, marginTop: 8 }}>{name}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--slate-400)' }}>{value}</div>
    </div>
  )
}

/** Shadow sample — box + name + computed value + "when to use". */
export function ShadowSample({ name, usage }: { name: string; usage: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState('')

  useEffect(() => {
    if (ref.current) setValue(getComputedStyle(ref.current).boxShadow)
  }, [name])

  return (
    <div style={{ display: 'inline-block', textAlign: 'center', marginRight: 32, marginBottom: 16, verticalAlign: 'top' }}>
      <div
        ref={ref}
        style={{
          width: 150,
          height: 96,
          background: 'var(--surface-page)',
          borderRadius: 'var(--radius-md)',
          boxShadow: `var(${name})`,
        }}
      />
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, marginTop: 10 }}>{name}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--slate-400)', maxWidth: 150, margin: '2px auto 0', wordBreak: 'break-word' }}>
        {value}
      </div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--slate-500)', maxWidth: 150, margin: '4px auto 0' }}>
        {usage}
      </div>
    </div>
  )
}

/** Live type specimen — renders the sample with the tokens themselves and
 *  reads back the computed size/line-height/tracking/weight, not hardcoded. */
export function TypeSpecimen({
  role,
  sample,
  family,
  size,
  weight,
  lineHeight,
  tracking,
  fontStyle,
  mono = false,
}: {
  role: string
  sample: string
  family: string
  size: string
  weight: string
  lineHeight?: string
  tracking?: string
  fontStyle?: string
  mono?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [computed, setComputed] = useState({ size: '', weight: '', lineHeight: '', tracking: '' })

  useEffect(() => {
    if (!ref.current) return
    const cs = getComputedStyle(ref.current)
    setComputed({
      size: cs.fontSize,
      weight: cs.fontWeight,
      lineHeight: cs.lineHeight,
      tracking: cs.letterSpacing,
    })
  }, [role])

  const specStyle: CSSProperties = {
    fontFamily: `var(${family})`,
    fontSize: `var(${size})`,
    fontWeight: `var(${weight})` as unknown as number,
    color: 'var(--ink)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
  if (lineHeight) specStyle.lineHeight = `var(${lineHeight})`
  if (tracking) specStyle.letterSpacing = `var(${tracking})`
  if (fontStyle) specStyle.fontStyle = `var(${fontStyle})` as CSSProperties['fontStyle']

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 24,
        padding: '14px 0',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div style={{ width: 150, flexShrink: 0 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500 }}>{role}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--slate-400)' }}>
          {computed.size} · {computed.weight} · {computed.lineHeight === 'normal' ? 'auto' : computed.lineHeight}
          {computed.tracking !== 'normal' ? ` · ${computed.tracking}` : ''}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--slate-400)' }}>
          {mono ? 'DM Mono' : 'DM Sans'}
        </div>
      </div>
      <div ref={ref} style={specStyle}>
        {sample}
      </div>
    </div>
  )
}

/** Panel for a whole semantic mode — background + 4 text roles, all
 *  read live from the [data-mode] applied on the panel itself. */
export function ModePanel({ mode, label }: { mode: string; label: string }) {
  return (
    <div
      data-mode={mode}
      style={{
        display: 'inline-block',
        width: 280,
        background: 'var(--color-surface)',
        color: 'var(--color-text-primary)',
        padding: 24,
        borderRadius: 'var(--radius-md)',
        marginRight: 16,
        marginBottom: 16,
        verticalAlign: 'top',
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 10 }}>
        {label}
      </div>
      <RoleLine sample="text-primary" varName="--color-text-primary" bold />
      <RoleLine sample="text-secondary" varName="--color-text-secondary" color="var(--color-text-secondary)" />
      <RoleLine sample="text-muted" varName="--color-text-muted" color="var(--color-text-muted)" />
      <RoleLine sample="text-accent" varName="--color-text-accent" color="var(--color-text-accent)" bold />
      <div style={{ height: 1, background: 'var(--color-border)', margin: '10px 0 6px' }} />
      <RoleLine sample="surface" varName="--color-surface" mono />
      <RoleLine sample="border" varName="--color-border" mono />
    </div>
  )
}

function RoleLine({
  sample,
  varName,
  color,
  bold,
  mono,
}: {
  sample: string
  varName: string
  color?: string
  bold?: boolean
  mono?: boolean
}) {
  return (
    <div
      style={{
        fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
        fontWeight: bold ? 700 : 400,
        fontSize: 13,
        color,
        marginBottom: 4,
        display: 'flex',
        justifyContent: 'space-between',
        gap: 8,
      }}
    >
      <span>{sample}</span>
      <LiveValue name={varName} />
    </div>
  )
}

/** Accent resolution panel — [data-mode] + [data-accent] together. */
export function AccentPanel({ mode, accent, dark }: { mode: string; accent: string; dark?: boolean }) {
  return (
    <div
      data-mode={mode}
      data-accent={accent}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        width: 96,
        marginRight: 10,
        marginBottom: 10,
        padding: '14px 8px',
        borderRadius: 'var(--radius-sm)',
        background: dark ? 'var(--surface-invert-navy)' : 'var(--surface-page)',
        border: dark ? 'none' : '1px solid var(--border-color)',
      }}
    >
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: dark ? 'rgba(255,255,255,.6)' : 'var(--slate-400)' }}>
        {accent}
      </span>
      <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 14, color: 'var(--accent-color)' }}>Aa</span>
      <LiveValue name="--accent-color" />
    </div>
  )
}

export function Row({ children }: { children: ReactNode }) {
  return <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>{children}</div>
}
