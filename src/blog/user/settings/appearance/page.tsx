import { Separator } from "src/components/ui/separator"
import { AppearanceForm } from "./appearance-form"
import * as React from 'react';

export default function SettingsAppearancePage() {
  return (
    <div className="space-y-6 pt-4">
      <AppearanceForm />
    </div>
  )
}
