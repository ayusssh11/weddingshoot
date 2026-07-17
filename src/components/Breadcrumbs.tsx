import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex flex-wrap items-center gap-2 text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold text-charcoal/50">
        <li>
          <a 
            href="/" 
            className="hover:text-orchid transition-colors duration-300"
          >
            Home
          </a>
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight size={10} className="text-charcoal/30 flex-shrink-0" />
              {isLast || !item.href ? (
                <span className="text-charcoal/80 font-medium truncate max-w-[200px] md:max-w-xs" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <a 
                  href={item.href} 
                  className="hover:text-orchid transition-colors duration-300"
                >
                  {item.name}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
