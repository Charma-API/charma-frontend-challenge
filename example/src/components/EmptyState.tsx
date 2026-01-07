'use client';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, description, icon = '🍽️', action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-6xl mb-6 animate-bounce">{icon}</div>
      <h3 className="text-xl font-semibold text-stone-200 mb-2">{title}</h3>
      <p className="text-stone-500 max-w-md mb-6">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 
                     text-stone-900 font-semibold rounded-xl
                     transition-all duration-300 hover:scale-105
                     shadow-lg shadow-amber-500/20"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

