import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        callheroGradient:
          "bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 text-white hover:opacity-90",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

type MagicBorderProps = {
  className?: string
  innerClassName?: string
  children: React.ReactNode
}

const callHeroSpinGradient =
  "bg-[conic-gradient(from_90deg_at_50%_50%,#6366f1_0%,#d946ef_50%,#f43f5e_100%)]"

function MagicBorder({ className, innerClassName, children }: MagicBorderProps) {
  return (
    <span
      className={cn(
        "group relative inline-flex overflow-hidden rounded-full p-[1px] focus-within:outline-none focus-within:ring-2 focus-within:ring-slate-400 focus-within:ring-offset-2 focus-within:ring-offset-slate-50",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-[-1000%] animate-[spin_2s_linear_infinite] motion-reduce:animate-none",
          callHeroSpinGradient
        )}
      />
      <Slot
        className={cn(
          "relative z-10 inline-flex items-center justify-center rounded-full",
          innerClassName
        )}
      >
        {children}
      </Slot>
    </span>
  )
}

type MagicButtonProps = React.ComponentProps<typeof Button> & {
  wrapperClassName?: string
}

function MagicBorderButton({
  wrapperClassName,
  className,
  ...props
}: MagicButtonProps) {
  return (
    <MagicBorder className={wrapperClassName}>
      <Button className={cn("h-full w-full", className)} {...props} />
    </MagicBorder>
  )
}

function MagicGradientButton({
  wrapperClassName,
  className,
  ...props
}: Omit<MagicButtonProps, "variant">) {
  return (
    <MagicBorder className={wrapperClassName}>
      <Button
        variant="callheroGradient"
        className={cn("h-full w-full", className)}
        {...props}
      />
    </MagicBorder>
  )
}

export { MagicBorder, MagicBorderButton, MagicGradientButton }
