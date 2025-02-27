import React from 'react';
import NotificationPopover from './NotificationPopover';
import UserMenu from './UserMenu';

const Header = () => {
  return (
    <header className="bg-white h-16 fixed right-0 top-0 left-64 shadow-sm z-10">
      <div className="h-full flex items-center justify-between px-6">
        <h2 className="text-xl font-semibold text-purple-900">Network Dashboard</h2>
        
        <div className="flex items-center gap-4">
          <NotificationPopover />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;