import type { ReactNode } from "react";

type SidebarItemProps = {
  icon: ReactNode | string;
  active?: boolean;
  home?: boolean;
  onClick?: () => void;
  label?: string;
};

function SidebarItem({
  icon,
  active = false,
  home = false,
  onClick,
  label,
}: SidebarItemProps) {
  return (
    <div className="relative group">
      <div
        className={`flex items-center justify-center p-3 cursor-pointer transition-colors ${
          active
            ? "text-blue-500 bg-light-button-blue rounded-lg"
            : "text-gray-500 hover:text-gray-700"
        } ${home && "mb-9"}`}
        onClick={onClick}
      >
        {typeof icon === "string" ? (
          <img src={`/icons/${icon}.svg`} alt={icon} className={`${home ? "w-6 h-6" : "w-5 h-5"}`} />
        ) : (
          icon
        )}
      </div>

      {label && (
        <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
          {label}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-gray-800"></div>
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  return (
    <div className="h-screen w-14 flex flex-col items-center py-5 border-r bg-white">
      <div className="flex-1 flex flex-col items-center gap-6">
        {/* Logo icon */}
        <SidebarItem home icon="logo" label="Sentora" />

        {/* Home icon */}
        <SidebarItem active icon="home" label="Home" />

        {/* Library icon */}
        <SidebarItem icon="library" label="Library" />

        {/* Invoices icon */}
        <SidebarItem icon="invoices" label="Invoices" />

        {/* Lightbulb icon */}
        <SidebarItem icon="lightbulb" label="Ideas" />

        {/* Settings icon */}
        <SidebarItem icon="settings" label="Settings" />
      </div>

      <div className="mt-auto flex flex-col items-center gap-6">
        {/* Notification bell - using the existing SVG since there's no bell icon in the public folder */}
        <SidebarItem
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
          }
          label="Notifications"
        />

        {/* User profile - using the MS initials as shown in the image */}
        <div className="relative group">
          <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white font-semibold cursor-pointer">
            FB
          </div>
          <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
            Profile
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-gray-800"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
