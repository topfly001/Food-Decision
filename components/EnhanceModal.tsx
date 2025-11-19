import React, { useState } from 'react';
import { X, Search, Loader2, Globe } from 'lucide-react';
import { FoodItem, SearchResultCandidate, Language } from '../types';
import { searchFoodAlternatives, generateFoodFromCandidate } from '../services/geminiService';
import { Translation } from '../translations';

interface EnhanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentItem: FoodItem;
  onUpdate: (updatedItem: FoodItem) => void;
  t: Translation;
  lang: Language;
}

const EnhanceModal: React.FC<EnhanceModalProps> = ({ isOpen, onClose, currentItem, onUpdate, t, lang }) => {
  const [query, setQuery] = useState(currentItem.name);
  const [results, setResults] = useState<SearchResultCandidate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setError('');
    try {
      const data = await searchFoodAlternatives(query, lang);
      setResults(data);
      if (data.length === 0) setError(t.noResults);
    } catch (err) {
      setError('Failed to search. Please check API key.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = async (candidate: SearchResultCandidate) => {
    setIsApplying(true);
    try {
      const details = await generateFoodFromCandidate(candidate, lang);
      
      const updated: FoodItem = {
        ...currentItem,
        name: candidate.title, // Update name to match selected result
        description: details.description || currentItem.description,
        recipe: details.recipe || currentItem.recipe,
        ingredients: details.ingredients || currentItem.ingredients,
        tags: details.tags || currentItem.tags,
        // If the candidate had an image, use it, otherwise keep old one or use generic
        imageUrl: candidate.imageUrl || currentItem.imageUrl 
      };
      
      onUpdate(updated);
      onClose();
    } catch (err) {
      setError('Failed to generate details from selection.');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        
        <div className="p-5 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-lg font-bold text-gray-800">{t.findAlt}</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 overflow-y-auto flex-1">
            <p className="text-sm text-gray-500 mb-4">
                {t.enhanceDesc(currentItem.name)}
            </p>

            <div className="flex gap-2 mb-6">
                <input 
                    type="text" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder={t.placeholders.searchAi}
                />
                <button 
                    onClick={handleSearch} 
                    disabled={isLoading || isApplying}
                    className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 disabled:opacity-50 flex items-center gap-2"
                >
                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
                    {t.search}
                </button>
            </div>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            {isApplying && (
                <div className="flex flex-col items-center justify-center py-10 text-primary">
                    <Loader2 className="animate-spin mb-2" size={32} />
                    <span className="text-sm font-medium">{t.loading}</span>
                </div>
            )}

            {!isApplying && (
                <div className="space-y-3">
                    {results.map((res, idx) => (
                        <div key={idx} className="border rounded-xl p-4 hover:border-primary hover:bg-orange-50 transition-colors group">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-gray-800">{res.title}</h3>
                                {res.sourceUrl && (
                                    <a href={res.sourceUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-500 flex items-center gap-1 hover:underline">
                                        <Globe size={12} /> {t.source}
                                    </a>
                                )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1 mb-3">{res.snippet}</p>
                            <button 
                                onClick={() => handleSelect(res)}
                                className="w-full py-2 border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-colors flex justify-center items-center gap-2"
                            >
                                {t.useVersion}
                            </button>
                        </div>
                    ))}
                    
                    {results.length === 0 && !isLoading && !error && (
                         <div className="text-center py-8 text-gray-400">
                             {t.noResults}
                         </div>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default EnhanceModal;
