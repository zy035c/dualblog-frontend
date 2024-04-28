import { Separator } from "src/components/ui/separator";
import { ProfileForm } from "./profile-form";
import * as React from 'react';

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6 pt-6">
      <ProfileForm />
    </div>
  )
}