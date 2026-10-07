import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface-canvas font-body-default text-body-default text-text-primary antialiased min-h-screen">
      <div className="w-full flex">
        <Sidebar />
        <div className="w-full pl-64 pb-7">
          <main className="w-full pt-12 min-h-screen bg-surface-canvas flex flex-col">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
