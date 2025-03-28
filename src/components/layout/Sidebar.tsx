import React, { useState } from 'react';
import { Building2, Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Subsidiary } from '../../data/types';

interface SidebarProps {
  subsidiaries: Subsidiary[];
  selectedSubsidiaryId: string;
  onSelectSubsidiary: (id: string) => void;
  isMobileMenuOpen?: boolean;
  onMobileMenuToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  subsidiaries, 
  selectedSubsidiaryId, 
  onSelectSubsidiary,
  isMobileMenuOpen,
  onMobileMenuToggle
}) => {
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const selectedSubsidiary = subsidiaries.find(sub => sub.id === selectedSubsidiaryId);

  const toggleCompanyDropdown = () => {
    setIsCompanyDropdownOpen(!isCompanyDropdownOpen);
  };

  // Mobile company selector dropdown
  const MobileCompanySelector = () => (
    <div className="md:hidden fixed top-4 right-4 z-30 w-48">
      <button
        onClick={toggleCompanyDropdown}
        className="w-full flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center overflow-hidden">
          {selectedSubsidiary && (
            <>
              <Building2 size={18} className="mr-2 flex-shrink-0 text-indigo-500 dark:text-indigo-400" />
              <span className="font-medium text-gray-800 dark:text-gray-200 truncate">
                {selectedSubsidiary.name}
              </span>
            </>
          )}
        </div>
        {isCompanyDropdownOpen ? <ChevronUp size={18} className="flex-shrink-0 ml-1" /> : <ChevronDown size={18} className="flex-shrink-0 ml-1" />}
      </button>

      {isCompanyDropdownOpen && (
        <div className="mt-2 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 overflow-hidden z-50 absolute right-0 w-full">
          <div className="py-1 max-h-60 overflow-y-auto">
            {subsidiaries.map((sub) => {
              const isSelected = sub.id === selectedSubsidiaryId;
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    onSelectSubsidiary(sub.id);
                    setIsCompanyDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    isSelected
                      ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {sub.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  // Desktop sidebar content
  const sidebarContent = (
    <>
      {/* Logo Area */}
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">KPower</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">Executive Dashboard</p>
      </div>

      <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-2 mb-1">Companies</h2>
      {subsidiaries.map((sub) => {
        const Icon = sub.icon || Building2; // Use provided icon or default
        const isSelected = sub.id === selectedSubsidiaryId;
        return (
          <button
            key={sub.id}
            onClick={() => onSelectSubsidiary(sub.id)}
            className={`w-full flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 ${
              isSelected
                ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Icon size={18} className={`mr-3 flex-shrink-0 ${isSelected ? 'text-indigo-500 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'}`} />
            <span className="truncate text-left flex-grow">{sub.name}</span>
          </button>
        );
      })}

      {/* Add other navigation links here if needed */}
    </>
  );

  // Mobile sidebar (hidden by default)
  const mobileSidebar = (
    <div className={`fixed inset-0 flex z-40 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onMobileMenuToggle}
      ></div>
      
      {/* Sidebar */}
      <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800 transform transition ease-in-out duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Close button */}
        <div className="absolute top-0 right-0 -mr-12 pt-2">
          <button
            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={onMobileMenuToggle}
          >
            <span className="sr-only">Close sidebar</span>
            <X size={24} className="text-white" />
          </button>
        </div>
        
        {/* Sidebar content */}
        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
          <div className="px-4 space-y-2">
            {sidebarContent}
          </div>
        </div>
      </div>
    </div>
  );

  // Desktop sidebar
  const desktopSidebar = (
    <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 z-10">
      <div className="flex-1 flex flex-col min-h-screen bg-white dark:bg-gray-800 shadow-lg p-4 space-y-2">
        {sidebarContent}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-30">
        <button
          onClick={onMobileMenuToggle}
          className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <span className="sr-only">Open sidebar</span>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      {mobileSidebar}
      
      {/* Desktop Sidebar */}
      {desktopSidebar}
      
      {/* Mobile Company Selector Dropdown (always visible on mobile) */}
      <MobileCompanySelector />
    </>
  );
};

export default Sidebar;