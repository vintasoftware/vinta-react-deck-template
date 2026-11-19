import type { CSSProperties, ReactNode } from 'react'

const sectionStyle: CSSProperties = {
  marginBottom: 48,
}

const sectionTitleStyle: CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontWeight: 700,
  fontSize: 20,
  marginBottom: 16,
  color: 'var(--ink)',
}

const rowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 16,
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={sectionStyle}>
      <h2 style={sectionTitleStyle}>{title}</h2>
      {children}
    </section>
  )
}

function Swatch({ name, varName }: { name: string; varName: string }) {
  return (
    <div style={{ width: 148 }}>
      <div
        style={{
          background: `var(${varName})`,
          height: 72,
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-color)',
        }}
      />
      {/* labels always sit on the (white) page, not on the swatch — fixed, readable color */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, marginTop: 6, color: 'var(--ink)' }}>{name}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--slate-400)' }}>{varName}</div>
    </div>
  )
}

function TypeRow({
  role,
  spec,
  className,
  sample = 'Vinta Slidedeck',
}: {
  role: string
  spec: string
  className: CSSProperties
  sample?: string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, padding: '16px 0', borderBottom: '1px solid var(--border-color)' }}>
      <div style={{ width: 140, flexShrink: 0 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500 }}>{role}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--slate-400)' }}>{spec}</div>
      </div>
      <div style={{ ...className, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sample}</div>
    </div>
  )
}

function ModePreview({ mode, name }: { mode: 'light' | 'invert-blue' | 'invert-navy'; name: string }) {
  return (
    <div
      data-mode={mode}
      style={{
        background: 'var(--color-surface)',
        color: 'var(--color-text-primary)',
        padding: 24,
        borderRadius: 'var(--radius-md)',
        width: 280,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-text-muted)' }}>{name}</div>
      <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 18, color: 'var(--color-text-primary)' }}>
        text-primary
      </div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--color-text-secondary)' }}>text-secondary</div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--color-text-muted)' }}>text-muted</div>
      <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 13, color: 'var(--color-text-accent)' }}>
        text-accent
      </div>
      <div style={{ height: 1, background: 'var(--color-border)', marginTop: 4 }} />
    </div>
  )
}

export function Foundations() {
  return (
    <div style={{ padding: 40, maxWidth: 1120, fontFamily: 'var(--font-sans)' }}>
      <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 40, marginBottom: 4 }}>
        Vinta Slidedeck — Foundations
      </h1>
      <p style={{ color: 'var(--slate-500)', marginBottom: 40 }}>
        Tokens mirrored 1:1 from docs/foundations.md. Nothing here was invented — whatever is not in the harness
        does not become a token.
      </p>

      <Section title="1.1 Color — blue ramp (primary)">
        <div style={rowStyle}>
          <Swatch name="blue-050" varName="--blue-050" />
          <Swatch name="blue-100" varName="--blue-100" />
          <Swatch name="blue-300" varName="--blue-300" />
          <Swatch name="blue-400" varName="--blue-400" />
          <Swatch name="blue-500" varName="--blue-500" />
          <Swatch name="blue-600 (brand)" varName="--blue-600" />
          <Swatch name="blue-700" varName="--blue-700" />
          <Swatch name="blue-800" varName="--blue-800" />
          <Swatch name="blue-900" varName="--blue-900" />
        </div>
      </Section>

      <Section title="1.2 Secondary accents">
        <div style={rowStyle}>
          <Swatch name="accent-cyan" varName="--accent-cyan" />
          <Swatch name="accent-purple" varName="--accent-purple" />
          <Swatch name="accent-purple-light" varName="--accent-purple-light" />
          <Swatch name="accent-mint" varName="--accent-mint" />
          <Swatch name="accent-mint-dark" varName="--accent-mint-dark" />
          <Swatch name="accent-rose" varName="--accent-rose" />
          <Swatch name="accent-rose-dark" varName="--accent-rose-dark" />
        </div>
      </Section>

      <Section title="1.3 Neutrals / slate">
        <div style={rowStyle}>
          <Swatch name="ink" varName="--ink" />
          <Swatch name="slate-700" varName="--slate-700" />
          <Swatch name="slate-500" varName="--slate-500" />
          <Swatch name="slate-400" varName="--slate-400" />
          <Swatch name="border" varName="--border-color" />
        </div>
      </Section>

      <Section title="1.4 Surfaces — light">
        <div style={rowStyle}>
          <Swatch name="surface-page" varName="--surface-page" />
          <Swatch name="surface-soft" varName="--surface-soft" />
          <Swatch name="surface-tint" varName="--surface-tint" />
          <Swatch name="surface-mist" varName="--surface-mist" />
          <Swatch name="surface-gray" varName="--surface-gray" />
        </div>
      </Section>

      <Section title="1.4 Surfaces — inverted">
        <div style={rowStyle}>
          <Swatch name="surface-invert-blue" varName="--surface-invert-blue" />
          <Swatch name="surface-invert-blue-alt" varName="--surface-invert-blue-alt" />
          <Swatch name="surface-invert-navy" varName="--surface-invert-navy" />
        </div>
      </Section>

      <Section title="2. Semantics + modes">
        <div style={rowStyle}>
          <ModePreview mode="light" name="light" />
          <ModePreview mode="invert-blue" name="invert-blue" />
          <ModePreview mode="invert-navy" name="invert-navy" />
        </div>
      </Section>

      <Section title="1.5 Radius">
        <div style={rowStyle}>
          {(['none', 'sm', 'md', 'lg', 'pill'] as const).map((k) => (
            <div key={k} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 96,
                  height: 96,
                  background: 'var(--surface-tint)',
                  border: '1px solid var(--border-color)',
                  borderRadius: `var(--radius-${k})`,
                }}
              />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, marginTop: 6 }}>radius-{k}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="1.6 Shadow">
        <div style={{ ...rowStyle, paddingTop: 8 }}>
          {(['sm', 'md', 'lg'] as const).map((k) => (
            <div key={k} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 140,
                  height: 96,
                  background: 'var(--surface-page)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: `var(--shadow-${k})`,
                }}
              />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, marginTop: 10 }}>shadow-{k}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="1.7 Spacing">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(['1', '2', '3', '4'] as const).map((k) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 90, fontFamily: 'var(--font-mono)', fontSize: 12 }}>space-{k}</div>
              <div style={{ height: 16, width: `var(--space-${k})`, background: 'var(--blue-600)' }} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="4. Typography by role">
        <div>
          <TypeRow role="stat-mega" spec="206 / solid" className={{ fontFamily: 'var(--font-sans)', fontWeight: 'var(--font-weight-stat-mega)', fontSize: 'var(--font-size-stat-mega)', lineHeight: 'var(--line-height-stat-mega)' }} sample="42%" />
          <TypeRow role="display" spec="120 / auto / -2.2%" className={{ fontFamily: 'var(--font-sans)', fontWeight: 'var(--font-weight-display)', fontSize: 'var(--font-size-display)', letterSpacing: 'var(--tracking-display)' }} sample="Vinta" />
          <TypeRow role="h1" spec="60" className={{ fontFamily: 'var(--font-sans)', fontWeight: 'var(--font-weight-h1)', fontSize: 'var(--font-size-h1)' }} />
          <TypeRow role="h2" spec="50 / 60 / -0.8px" className={{ fontFamily: 'var(--font-sans)', fontWeight: 'var(--font-weight-h2)', fontSize: 'var(--font-size-h2)', lineHeight: 'var(--line-height-h2)', letterSpacing: 'var(--tracking-h2)' }} />
          <TypeRow role="h4" spec="30 / 40" className={{ fontFamily: 'var(--font-sans)', fontWeight: 'var(--font-weight-h4)', fontSize: 'var(--font-size-h4)', lineHeight: 'var(--line-height-h4)' }} />
          <TypeRow role="subtitle" spec="22–28 / 30 (floor 22)" className={{ fontFamily: 'var(--font-sans)', fontWeight: 'var(--font-weight-subtitle)', fontSize: 'var(--font-size-subtitle)', lineHeight: 'var(--line-height-subtitle)' }} sample="Apresentação comercial" />
          <TypeRow role="body" spec="20" className={{ fontFamily: 'var(--font-sans)', fontWeight: 'var(--font-weight-body)', fontSize: 'var(--font-size-body)' }} sample="Running text of the deck." />
          <TypeRow role="caption/label" spec="18 / 26 / +0.6px" className={{ fontFamily: 'var(--font-sans)', fontWeight: 'var(--font-weight-caption)', fontSize: 'var(--font-size-caption)', lineHeight: 'var(--line-height-caption)', letterSpacing: 'var(--tracking-caption)' }} sample="CRESCIMENTO ANUAL" />
          <TypeRow role="overline" spec="30 / +2.9%" className={{ fontFamily: 'var(--font-sans)', fontWeight: 'var(--font-weight-overline)', fontSize: 'var(--font-size-overline)', letterSpacing: 'var(--tracking-overline)' }} sample="SEÇÃO" />
          <TypeRow role="quote" spec="22 italic" className={{ fontFamily: 'var(--font-sans)', fontWeight: 'var(--font-weight-quote)', fontSize: 'var(--font-size-quote)', fontStyle: 'var(--font-style-quote)' }} sample="“A client quote.”" />
          <TypeRow role="mono-xl" spec="57 / 61" className={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-weight-mono-xl)', fontSize: 'var(--font-size-mono-xl)', lineHeight: 'var(--line-height-mono-xl)' }} sample="01" />
          <TypeRow role="mono-md" spec="24–27 / solid (floor 24)" className={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-weight-mono-md)', fontSize: 'var(--font-size-mono-md)', lineHeight: 'var(--line-height-mono-md)' }} sample="00 / 03" />
          <TypeRow role="mono-label" spec="18 / +3%" className={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-weight-mono-label)', fontSize: 'var(--font-size-mono-label)', letterSpacing: 'var(--tracking-mono-label)' }} sample="VINTA.COM.BR" />
        </div>
      </Section>
    </div>
  )
}
