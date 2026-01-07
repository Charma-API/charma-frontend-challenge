'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`${sizeClasses[size]} rounded-full 
                    border-amber-500/30 border-t-amber-500
                    animate-spin`}
      />
      {text && <p className="text-stone-400 text-sm animate-pulse">{text}</p>}
    </div>
  );
}

export function RecipeCardSkeleton() {
  return (
    <div className="bg-stone-900/50 rounded-2xl overflow-hidden border border-stone-800/50 animate-pulse">
      <div className="aspect-[4/3] bg-stone-800" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-stone-800 rounded w-3/4" />
        <div className="h-4 bg-stone-800 rounded w-1/2" />
      </div>
    </div>
  );
}

export function RecipeGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <RecipeCardSkeleton key={i} />
      ))}
    </div>
  );
}

