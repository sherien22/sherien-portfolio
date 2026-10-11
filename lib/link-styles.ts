import { cva, type VariantProps } from 'class-variance-authority'

export const linkButton = cva(
  'inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border border-border bg-background/40 text-foreground hover:border-primary/40 hover:bg-secondary',
        ghost: 'text-muted-foreground hover:bg-secondary hover:text-foreground',
      },
    },
    defaultVariants: { variant: 'primary' },
  },
)

export type LinkButtonVariant = VariantProps<typeof linkButton>['variant']
