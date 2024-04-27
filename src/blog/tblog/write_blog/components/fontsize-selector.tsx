"use client"

import * as React from "react"
import { SliderProps } from "@radix-ui/react-slider"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "src/components/ui/hover-card"
import { Label } from "src/components/ui/label"
import { Slider } from "src/components/ui/slider"


interface FontsizeSelectorProps {
  setFontSize: (value: number[]) => void,
  fontSize: number[]
}

export function FontSizeSelector({
  setFontSize,
  fontSize
}: FontsizeSelectorProps) {

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="temperature">字体尺寸</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {fontSize}
              </span>
            </div>
            <Slider
              id="temperature"
              max={70}
              min={10}
              defaultValue={fontSize}
              step={0.1}
              onValueChange={setFontSize}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Temperature"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-fit text-sm"
          side="left"
        >
          调节编辑器正文的字体大小
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
