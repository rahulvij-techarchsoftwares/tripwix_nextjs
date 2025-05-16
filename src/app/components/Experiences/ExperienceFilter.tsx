'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { ChevronDownSVG } from '~/components/SVG';
import { ASSET_PATHS } from '~/configs/assetPaths';
import { Country } from '~/types/globalTypes';

interface ExperienceFilterProps {
  options: Country[];
}

export const ExperienceFilter: React.FC<ExperienceFilterProps> = ({
  options,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedDestination = searchParams?.get('location');
  const selectedDestinationName =
    options
      .flatMap(destination => destination.destinations || [])
      .find(sub => `${sub.id}` === selectedDestination)?.name ||
    'Filter By Destination';
  const updateDestination = (destination: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('location', destination);
    router.push(`?${params.toString()}`, { scroll: false });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setActiveSubMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full md:w-auto" ref={menuRef}>
      <button
        className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg w-full md:w-56 hover:bg-gray-100 transition"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
      >
        {selectedDestinationName}
        <Image
          src={ASSET_PATHS.CHEVRON_DOWN_DARK}
          alt="Dropdown Icon"
          width={10}
          height={10}
        />
      </button>

      {isMenuOpen && (
        <div className="absolute left-0 md:w-56 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-30 transition-opacity opacity-100">
          <ul className="py-2">
            <li>
              <button
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 w-full text-left"
                onClick={() => updateDestination('')}
              >
                See All
              </button>
            </li>
            {options.map(destination => (
              <li key={destination.id} className="relative">
                <button
                  className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 w-full text-left"
                  onClick={() =>
                    setActiveSubMenu(
                      activeSubMenu === destination.id ? null : destination.id
                    )
                  }
                >
                  {destination.name}
                  {destination.destinations && (
                    <ChevronDownSVG
                      extraClasses={`transition ${
                        activeSubMenu === destination.id ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>

                {destination.destinations &&
                  activeSubMenu === destination.id && (
                    <ul className="bg-gray-50 border-t border-gray-300 transition-all duration-300">
                      {destination.destinations.map(subOption => (
                        <li
                          key={subOption.id}
                          className="px-6 py-2 hover:bg-gray-200"
                        >
                          <button
                            className="w-full text-left"
                            onClick={() => updateDestination(subOption.id)}
                          >
                            {subOption.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
