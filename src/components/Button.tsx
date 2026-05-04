import Link from 'next/link'
import clsx from 'clsx'

const baseStyles = {
  solid:
    'group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2',
  outline:
    'group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm',
}

const variantStyles = {
  solid: {
    mist: 'bg-mist-900 text-white hover:bg-mist-700 hover:text-mist-100 active:bg-mist-800 active:text-mist-300 focus-visible:outline-mist-900',
    brand:
      'bg-[#FF5400] text-white hover:text-mist-100 hover:bg-[#EC4F02] active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600',
    white:
      'bg-white text-mist-900 hover:bg-blue-50 active:bg-blue-200 active:text-mist-600 focus-visible:outline-white',
  },
  outline: {
    mist: 'ring-mist-200 text-mist-700 hover:text-mist-900 hover:ring-mist-300 active:bg-mist-100 active:text-mist-600 focus-visible:outline-blue-600 focus-visible:ring-mist-300',
    white:
      'ring-mist-700 text-white hover:ring-mist-500 active:ring-mist-700 active:text-mist-400 focus-visible:outline-white',
  },
}

type ButtonProps = (
  | {
      variant?: 'solid'
      color?: keyof typeof variantStyles.solid
    }
  | {
      variant: 'outline'
      color?: keyof typeof variantStyles.outline
    }
) &
  (
    | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'color'>
    | (Omit<React.ComponentPropsWithoutRef<'button'>, 'color'> & {
        href?: undefined
      })
  )

export function Button({ className, ...props }: ButtonProps) {
  props.variant ??= 'solid'
  props.color ??= 'mist'

  className = clsx(
    baseStyles[props.variant],
    props.variant === 'outline'
      ? variantStyles.outline[props.color]
      : props.variant === 'solid'
        ? variantStyles.solid[props.color]
        : undefined,
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
