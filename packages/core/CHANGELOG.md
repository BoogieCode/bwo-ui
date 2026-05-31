# @bwo-ui/core

## 0.3.0

### Minor Changes

- Rewrite the React package from scratch — bwo-ui now owns every primitive (zero `@radix-ui/*` dependencies). 16 previously-wrapped components are reimplemented on top of a shared internal stack: `Portal`, `Presence`, `useControllable`, `useDismiss`, `useFocusTrap`, `useScrollLock`. Public APIs (component names, props, sub-components, namespaced exports) and CSS hooks (`data-state`, `data-orientation`, `data-disabled`, `data-highlighted`, `data-side`) are preserved.

  Adds 18 new components: Breadcrumb, Pagination, Stepper, Sheet, DropdownMenu, ContextMenu, Combobox, Command, Calendar, DatePicker, DataTable, Timeline, SimpleGrid, Grid, FloatingActionButton (FAB), BottomNavigation, Carousel, NumberInput.

  `@bwo-ui/core`: fix `UNUSED_EXTERNAL_IMPORT` warnings by removing the re-export of GSAP/plugins through `register.ts`; each effect now imports its plugins directly from `gsap`.

  Tagline updated to "Your shortcut to a beautiful UI."

## 0.2.1

### Patch Changes

- chore: point repository URLs at github.com/BoogieCode/bwo-ui so npm package pages link to the correct source.
