---
template: SlideCode
props:
  filename: src/visits/startIntake.ts
---

SAMPLE CODE

# Code slides
# in markdown too

A fenced block becomes a highlighted code window.

```ts
import { createIntake } from '@/intake'

// One intake per visit type.
export async function startIntake(visitId: string) {
  const intake = await createIntake({
    visitId,
    sections: ['about-you', 'visit-reason'],
  })
  return intake.url
}
```

<!--
Onboarding — delete this file once you're building. Keep snippets short: about 20 lines of 60 characters.
-->
