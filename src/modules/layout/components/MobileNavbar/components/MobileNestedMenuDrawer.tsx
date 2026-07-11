'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import { IconButton } from '@/components/atoms';
import { ArrowLeftIcon, CloseIcon } from '@/icons';
import { cn } from '@/lib/utils';

interface MobileNestedMenuDrawerProps {
  item: {
    title: string;
    link: string;
    children: any[];
  };
  isOpen: boolean;
  onClose: () => void;
  onLinkClick?: () => void;
}

export const MobileNestedMenuDrawer = ({
  item,
  isOpen,
  onClose,
  onLinkClick
}: MobileNestedMenuDrawerProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    onLinkClick?.();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-primary/80 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-primary transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center gap-4 border-b p-4">
            <IconButton
              icon={<ArrowLeftIcon size={20} />}
              onClick={onClose}
              aria-label="Close drawer"
              variant="icon"
            />
            <h3 className="heading-md uppercase text-primary">{item.title}</h3>
            <IconButton
              icon={<CloseIcon size={20} />}
              onClick={onClose}
              className="ml-auto"
              aria-label="Close drawer"
              variant="icon"
            />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="flex flex-col gap-2">
              <Link
                href={item.link}
                onClick={handleLinkClick}
                className="heading-sm px-4 py-3 uppercase text-primary transition-colors hover:bg-secondary/10"
              >
                {item.title}
              </Link>
              {item.children.map(child => (
                <Link
                  key={child.title}
                  href={child.link}
                  onClick={handleLinkClick}
                  className="label-md px-4 py-3 uppercase text-primary transition-colors hover:bg-secondary/10"
                >
                  {child.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};
