# UI primitives

This directory contains low-level shadcn/Radix primitives used by the public
site. Payload blocks and project-specific compositions belong in
`src/blocks` and `src/components` respectively.

## Rules

- Reuse an existing primitive before adding another component with the same
  responsibility.
- Add a new shadcn component only for a repeated use case or interaction that
  benefits from accessible behavior such as focus management, portals, or
  keyboard navigation.
- Do not use `shadcn add --all`.
- Inspect additions with `shadcn add --dry-run` and updates with
  `shadcn add --diff` before changing local source.
- Do not overwrite `globals.css` or customized primitives such as `button.tsx`.
- Use semantic theme tokens (`background`, `foreground`, `primary`, `border`,
  `ring`, and status colors) instead of introducing ad-hoc foundation colors.
- Keep direct Radix imports inside this directory. Higher-level code should
  import the local primitive.
- Remove a primitive if it has no consumers.

After changing a primitive, run `pnpm check` and verify its keyboard, focus,
disabled, invalid, light, and dark states where applicable.
