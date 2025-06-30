'use client';

import { useState } from 'react';
import { bookIndex, type IndexItem } from '@/lib/index-data';
import { useSlides } from '@/contexts/SlidesContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronRight, FileText } from 'lucide-react';

interface IndexNodeProps {
  node: IndexItem;
  level: number;
  onSelect: () => void;
}

function IndexNode({ node, level, onSelect }: IndexNodeProps) {
  const { activeSection, setActiveSection } = useSlides();
  const [isOpen, setIsOpen] = useState(level < 1); // Auto-expand first level

  const isParent = !!node.children && node.children.length > 0;
  const isActive = activeSection?.id === node.id;

  const handleToggle = () => {
    setActiveSection(node);
    if(isParent) {
      setIsOpen(prev => !prev);
    }
    if (!isParent) {
      onSelect();
    }
  };

  return (
    <div className="w-full">
      <Button
         variant={isActive ? 'secondary' : 'ghost'}
        size="sm"
        onClick={handleToggle}
        className={cn('w-full justify-start h-auto py-2 px-3 text-left', {
          'font-bold': isActive,
        })}
        style={{ paddingLeft: `${level * 1.25 + 0.75}rem` }}
       >
        {isParent ? (
          <ChevronRight
            className={cn('w-4 h-4 mr-2 shrink-0 transition-transform duration-200', {
               'rotate-90': isOpen,
            })}
          />
        ) : (
          <FileText className="w-4 h-4 mr-2 shrink-0" />
        )}
        <span className="truncate flex-1">{node.title}</span>
      </Button>
      {isParent && isOpen && node.children && (
        <div className="w-full">
          {node.children.map(child => (
            <IndexNode key={child.id} node={child} level={level + 1} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

export function InteractiveIndex({ onSelect = () => {} }: { onSelect?: () => void }) {
  return (
    <nav className="p-2 space-y-1">
      {bookIndex.map(node => (
        <IndexNode key={node.id} node={node} level={0} onSelect={onSelect} />
      ))}
    </nav>
  );
}
