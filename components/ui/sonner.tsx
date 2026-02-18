"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "dark" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-emerald-400" />,
        info: <InfoIcon className="size-4 text-cyan-400" />,
        warning: <TriangleAlertIcon className="size-4 text-yellow-400" />,
        error: <OctagonXIcon className="size-4 text-red-400" />,
        loading: <Loader2Icon className="size-4 animate-spin text-violet-400" />,
      }}
      style={
        {
          /* Glass background */
          "--normal-bg": "rgba(18,18,32,0.75)",
          "--normal-text": "rgba(255,255,255,0.95)",
          "--normal-border": "rgba(100,100,140,.13)",

          /* Success */
          "--success-bg": "rgba(18,18,32,0.75)",
          "--success-border": "rgba(34,197,94,.25)",

          /* Error */
          "--error-bg": "rgba(18,18,32,0.75)",
          "--error-border": "rgba(239,68,68,.25)",

          /* Border radius */
          "--border-radius": "16px",

          /* Shadow */
          "--shadow": "0 8px 40px rgba(0,0,0,.45)",
        } as React.CSSProperties
      }
      toastOptions={{
        className:
          "backdrop-blur-xl border text-white " +
          "shadow-[0_8px_40px_rgba(0,0,0,.45)]",
      }}
      {...props}
    />
  )
}

export { Toaster }