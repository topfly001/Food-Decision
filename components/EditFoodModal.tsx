import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, Search } from 'lucide-react';
import { FoodItem, Language, FoodType } from '../types';
import { generateId } from '../constants';
import EnhanceModal from './EnhanceModal';
import { Translation } from '../translations';

interface EditFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: FoodItem; // If undefined, we are adding new
  onSave: (item: FoodItem) => void;
  onDelete?: (id: string) => void;
  t: Translation;
  lang: Language;
}

const EditFoodModal: React.FC<EditFoodModalProps> = ({ isOpen, onClose, item, onSave, onDelete, t, lang }) => {
  const [formData, setFormData] = useState<FoodItem>({
    id: '',
    name: '',
    type: 'dish',
    description: '',
    imageUrl: '',
    recipe: '',
    ingredients: [],
    tags: []
  });

  const [showEnhance, setShowEnhance] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [ingredientInput, setIngredientInput] = useState({ name: '', amount: '' });

  useEffect(() => {
    if (isOpen) {
      if (item) {
        setFormData(item);
      } else {
        setFormData({
          id: generateId(),
          name: '',
          type: 'dish', // default
          description: '',
          imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', // default placeholder
          recipe: '',
          ingredients: [],
          tags: []
        });
      }
    }
  }, [isOpen, item]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const addIngredient = () => {
    if (ingredientInput.name.trim()) {
      setFormData({ ...formData, ingredients: [...formData.ingredients, { ...ingredientInput }] });
      setIngredientInput({ name: '', amount: '' });
    }
  };

  const removeIngredient = (idx: number) => {
    setFormData({ ...formData, ingredients: formData.ingredients.filter((_, i) => i !== idx) });
  };

  const foodTypes: {id: FoodType, label: string}[] = [
      { id: 'staple', label: t.staple },
      { id: 'dish', label: t.dish },
      { id: 'cold_dish', label: t.cold_dish },
      { id: 'soup', label: t.soup },
      { id: 'drink', label: t.drink },
  ];

  return (
    <>
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        
        <div className="p-5 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">{item ? t.edit : t.addItem}</h2>
          <div className="flex gap-2">
             {item && onDelete && (
                <button onClick={() => { onDelete(item.id); onClose(); }} className="p-2 text-red-500 hover:bg-red-50 rounded-full" title={t.delete}>
                    <Trash2 size={20} />
                </button>
             )}
             <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200">
               <X size={20} />
             </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Basic Info & Image */}
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.name}</label>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            value={formData.name} 
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
                            placeholder={t.placeholders.name}
                        />
                         {/* Enhance Button triggers the AI modal */}
                        <button 
                            onClick={() => setShowEnhance(true)}
                            className="bg-secondary text-white px-3 py-2 rounded-lg hover:bg-amber-500"
                            title={t.enhance}
                        >
                            <Search size={18} />
                        </button>
                    </div>
                </div>

                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">{t.type}</label>
                     <div className="flex flex-wrap gap-3">
                        {foodTypes.map(ft => (
                             <label key={ft.id} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border transition-all ${formData.type === ft.id ? 'bg-orange-50 border-primary text-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                                <input 
                                    type="radio" 
                                    checked={formData.type === ft.id} 
                                    onChange={() => setFormData({...formData, type: ft.id})}
                                    className="text-primary focus:ring-primary accent-primary"
                                />
                                <span className="text-sm font-medium">{ft.label}</span>
                            </label>
                        ))}
                     </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.imgUrl}</label>
                    <input 
                        type="text" 
                        value={formData.imageUrl} 
                        onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none mb-2"
                        placeholder="https://..."
                    />
                    <div className="w-full h-48 rounded-lg bg-gray-100 overflow-hidden border">
                        <img 
                            src={formData.imageUrl} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                            onError={(e) => (e.target as HTMLImageElement).src = `https://placehold.co/600x400?text=${encodeURIComponent(formData.name || 'Preview')}`}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.desc}</label>
                    <textarea 
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none h-20"
                        placeholder={t.placeholders.desc}
                    ></textarea>
                </div>
            </div>

            {/* Right Column: Recipe & Ingredients */}
            <div className="space-y-6">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.ingredients}</label>
                    <div className="flex gap-2 mb-2">
                        <input 
                            placeholder={t.placeholders.ingName}
                            value={ingredientInput.name}
                            onChange={e => setIngredientInput({...ingredientInput, name: e.target.value})}
                            className="flex-1 border rounded-lg px-2 py-1 text-sm"
                        />
                        <input 
                            placeholder={t.placeholders.ingAmt} 
                            value={ingredientInput.amount}
                            onChange={e => setIngredientInput({...ingredientInput, amount: e.target.value})}
                            className="w-24 border rounded-lg px-2 py-1 text-sm"
                        />
                        <button onClick={addIngredient} className="text-primary font-bold px-2">+</button>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg h-32 overflow-y-auto space-y-1 border">
                        {formData.ingredients.map((ing, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm bg-white px-2 py-1 rounded shadow-sm">
                                <span>{ing.name} <span className="text-gray-400">({ing.amount})</span></span>
                                <button onClick={() => removeIngredient(idx)} className="text-red-400 hover:text-red-600"><X size={14}/></button>
                            </div>
                        ))}
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.recipe}</label>
                    <textarea 
                        value={formData.recipe}
                        onChange={e => setFormData({...formData, recipe: e.target.value})}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none h-40 font-mono text-sm"
                        placeholder={t.placeholders.recipe}
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.tags}</label>
                    <div className="flex gap-2 mb-2">
                        <input 
                            value={tagInput}
                            onChange={e => setTagInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && addTag()}
                            className="flex-1 border rounded-lg px-3 py-2"
                            placeholder={t.placeholders.tag}
                        />
                        <button onClick={addTag} className="bg-gray-200 px-3 rounded-lg hover:bg-gray-300">{t.addTag}</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.tags.map(tag => (
                            <span key={tag} className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                                {tag}
                                <button onClick={() => removeTag(tag)} className="hover:text-orange-900"><X size={12}/></button>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="p-5 border-t bg-gray-50 flex justify-end gap-3">
             <button onClick={onClose} className="px-5 py-2 rounded-lg border bg-white text-gray-700 hover:bg-gray-100">{t.cancel}</button>
             <button onClick={handleSave} className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-orange-600 flex items-center gap-2 shadow-lg shadow-orange-200">
                 <Save size={18} /> {t.save}
             </button>
        </div>
      </div>
    </div>

    {/* Nested Modal for AI Enhancement */}
    <EnhanceModal 
        isOpen={showEnhance}
        onClose={() => setShowEnhance(false)}
        currentItem={formData}
        onUpdate={(updated) => setFormData(updated)}
        t={t}
        lang={lang}
    />
    </>
  );
};

export default EditFoodModal;