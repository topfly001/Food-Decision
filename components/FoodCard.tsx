import React from 'react';
import { Lock, Unlock, RefreshCw, Edit } from 'lucide-react';
import { FoodItem } from '../types';
import { Translation } from '../translations';

interface FoodCardProps {
  item: FoodItem | null;
  isLocked: boolean;
  onToggleLock: () => void;
  onRefresh: () => void;
  onEdit?: (item: FoodItem) => void;
  showActions?: boolean;
  t: Translation;
}

const FoodCard: React.FC<FoodCardProps> = ({ 
  item, 
  isLocked, 
  onToggleLock, 
  onRefresh, 
  onEdit,
  showActions = true,
  t
}) => {
  if (!item) {
    return (
      <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 bg-gray-50/50">
        <span className="text-sm font-medium">{t.emptySlot}</span>
      </div>
    );
  }

  let displayType = t.dish;
  if (item.type === 'staple') displayType = t.staple;
  else if (item.type === 'cold_dish') displayType = t.cold_dish;
  else if (item.type === 'soup') displayType = t.soup;
  else if (item.type === 'drink') displayType = t.drink;

  const getTypeColor = () => {
      switch(item.type) {
          case 'staple': return 'bg-secondary';
          case 'dish': return 'bg-primary';
          case 'cold_dish': return 'bg-emerald-500';
          case 'soup': return 'bg-sky-500';
          case 'drink': return 'bg-purple-500';
          default: return 'bg-primary';
      }
  }

  return (
    <div className={`relative group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${isLocked ? 'ring-2 ring-primary' : ''}`}>
      <div className="h-40 w-full overflow-hidden relative">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/600x400/orange/white?text=${encodeURIComponent(item.name)}`;
          }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
        
        <div className="absolute bottom-3 left-3 text-white">
          <div className="flex items-center gap-2 mb-1">
             <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white ${getTypeColor()}`}>
                {displayType}
             </span>
          </div>
          <h3 className="text-lg font-bold leading-tight">{item.name}</h3>
        </div>

        {showActions && (
          <div className="absolute top-2 right-2 flex gap-1">
            <button 
              onClick={onToggleLock}
              className={`p-2 rounded-full backdrop-blur-md shadow-sm transition-colors ${isLocked ? 'bg-primary text-white' : 'bg-white/30 text-white hover:bg-white/50'}`}
              title={isLocked ? t.unlock : t.lock}
            >
              {isLocked ? <Lock size={16} /> : <Unlock size={16} />}
            </button>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-gray-600 text-sm line-clamp-2 mb-3 h-10">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3 h-6 overflow-hidden">
          {item.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {showActions && (
          <div className="flex justify-between items-center border-t pt-3">
            <button 
              onClick={() => onEdit && onEdit(item)}
              className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1 text-xs"
            >
              <Edit size={14} /> {t.details}
            </button>
            
            {!isLocked && (
                <button 
                    onClick={onRefresh}
                    className="text-gray-400 hover:text-primary transition-colors"
                    title={t.change}
                >
                    <RefreshCw size={16} />
                </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodCard;