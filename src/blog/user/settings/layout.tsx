

import { Separator } from "src/components/ui/separator";
import { SidebarNav } from "./components/sidebar-nav";
import * as React from 'react';
import { Route, Routes } from "react-router-dom";
import SettingsNotificationsPage from "./notifications/page";
import SettingsProfilePage from "./profile/page";
import SettingsAccountPage from "./account/page";
import SettingsAppearancePage from "./appearance/page";
import SettingsDisplayPage from "./display/page";

export const metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
  {
    title: "Profile",
    href: "./profile",
  },
  {
    title: "Account",
    href: "./account",
  },
  {
    title: "Appearance",
    href: "./appearance",
  },
  {
    title: "Notifications",
    href: "./notifications",
  },
  {
    title: "Display",
    href: "./display",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="md:hidden">
        <img
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <img
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block bg-white">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 h-screen">
          <aside className="flex mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}
            <Routes>
              <Route path="/profile" element={<SettingsProfilePage />} />
              <Route path="/notifications" element={<SettingsNotificationsPage />} />
              <Route path="/account" element={<SettingsAccountPage />} />
              <Route path="/appearance" element={<SettingsAppearancePage />} />
              <Route path="/display" element={<SettingsDisplayPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}