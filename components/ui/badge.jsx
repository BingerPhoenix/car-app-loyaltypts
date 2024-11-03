import * as React from "react"
import { cn } from "@/utils/helpers"

const Badge = React.forwardRef(({
  variant = "default",
  className = "",
  ...props
}, ref) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "secondary":
        return "bg-gray-100 text-gray-900"
      case "success":
        return "bg-green-100 text-green-800"
      case "destructive":
        return "bg-red-100 text-red-800"
      case "outline":
        return "border border-gray-200 text-gray-900"
      case "points":
        return "bg-blue-500 text-white"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors",
        getVariantClasses(),
        className
      )}
      {...props}
    />
  )
})

Badge.displayName = "Badge"

export { Badge }