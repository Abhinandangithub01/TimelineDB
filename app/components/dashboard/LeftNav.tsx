'use client';

import { FortifyLogo } from '../icons/FortifyLogo';
import { UploadIcon, ResultsIcon } from '../icons/NavIcons';

type View = 'upload' | 'analysis' | 'results';

interface LeftNavProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export function LeftNav({ currentView, onNavigate }: LeftNavProps) {
  const navItems = [
    { id: 'upload' as View, icon: UploadIcon, label: 'Upload' },
    { id: 'results' as View, icon: ResultsIcon, label: 'Results' },
  ];

  return (
    <nav className="w-20 bg-fortress-black flex flex-col items-center py-6 gap-8">
      {/* Logo */}
      <div className="mb-4">
        <FortifyLogo className="w-12 h-12" />
      </div>

      {/* Nav Items */}
      <div className="flex flex-col gap-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                currentView === item.id
                  ? 'bg-tiger-orange/10 border-l-3 border-tiger-orange text-tiger-orange'
                  : 'text-white hover:text-tiger-orange hover:bg-tiger-orange/5'
              }`}
            >
              <Icon className="w-7 h-7" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
