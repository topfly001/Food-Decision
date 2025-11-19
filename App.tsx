import React, { useState, useMemo, useEffect } from 'react';
import { Utensils, Database, RefreshCw, Settings, ShoppingCart, Plus, Search, ListChecks, ChefHat, Languages } from 'lucide-react';
import { FoodItem, Ingredient, Language } from './types';
import { INITIAL_DATABASE, generateId } from './constants';
import FoodCard from './components/FoodCard';
import EditFoodModal from './components/EditFoodModal';
import { generateShoppingListAI } from './services/geminiService';
import { translations } from './translations';

function App() {
  const [language, setLanguage] = useState<Language>('zh');
  const [activeTab, setActiveTab] = useState<'generator' | 'database'>('generator');
  const [foodDb, setFoodDb] = useState<FoodItem[]>(INITIAL_DATABASE);
  
  // Generator State
  const [numStaples, setNumStaples] = useState(1);
  const [numDishes, setNumDishes] = useState(3);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [lockedIds, setLockedIds] = useState<Set<string>>(new Set());
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [generatedList, setGeneratedList] = useState<Ingredient[]>([]);
  const [isGeneratingList, setIsGeneratingList] = useState(false);

  // Database View State
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<FoodItem | undefined>(undefined);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Translations
  const t = translations[language];

  // --- Logic ---

  // Helper: Get item object from ID
  const getItem = (id: string) => foodDb.find(i => i.id === id) || null;

  const randomizeMenu = () => {
    const staples = foodDb.filter(i => i.type === 'staple');
    const dishes = foodDb.filter(i => i.type === 'dish');

    const newSelectedIds: string[] = [];
    const currentSelected = selectedIds.map(id => getItem(id)).filter(Boolean) as FoodItem[];

    // Helper to pick random unique items excluding existing selection if possible
    const pickRandom = (pool: FoodItem[], count: number, existingLocked: FoodItem[]): FoodItem[] => {
       const lockedInPool = existingLocked.filter(l => l.type === pool[0]?.type);
       let needed = count - lockedInPool.length;
       if (needed <= 0) return lockedInPool.slice(0, count);

       const available = pool.filter(p => !lockedIds.has(p.id));
       const shuffled = [...available].sort(() => 0.5 - Math.random());
       
       return [...lockedInPool, ...shuffled.slice(0, needed)];
    };

    const lockedItems = currentSelected.filter(i => lockedIds.has(i.id));
    
    const selectedStaples = pickRandom(staples, numStaples, lockedItems);
    const selectedDishes = pickRandom(dishes, numDishes, lockedItems);

    setSelectedIds([...selectedStaples.map(i => i.id), ...selectedDishes.map(i => i.id)]);
  };

  // Initial load
  useEffect(() => {
    if (selectedIds.length === 0) randomizeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleLock = (id: string) => {
    const newLocked = new Set(lockedIds);
    if (newLocked.has(id)) newLocked.delete(id);
    else newLocked.add(id);
    setLockedIds(newLocked);
  };

  const replaceSingleItem = (id: string) => {
    const item = getItem(id);
    if (!item) return;
    
    const pool = foodDb.filter(i => i.type === item.type && !selectedIds.includes(i.id));
    if (pool.length === 0) return; // No other options

    const randomNew = pool[Math.floor(Math.random() * pool.length)];
    const newSelected = selectedIds.map(sid => sid === id ? randomNew.id : sid);
    setSelectedIds(newSelected);
  };

  const handleShoppingList = async () => {
      setShowShoppingList(true);
      if (generatedList.length === 0 || selectedIds.some(id => !lockedIds.has(id))) {
         setIsGeneratingList(true);
         const items = selectedIds.map(id => getItem(id)).filter(Boolean) as FoodItem[];
         const list = await generateShoppingListAI(items, language);
         setGeneratedList(list);
         setIsGeneratingList(false);
      }
  };

  // --- CRUD ---
  const handleSaveItem = (item: FoodItem) => {
      const idx = foodDb.findIndex(f => f.id === item.id);
      if (idx >= 0) {
          const newDb = [...foodDb];
          newDb[idx] = item;
          setFoodDb(newDb);
      } else {
          setFoodDb([...foodDb, item]);
      }
  };

  const handleDeleteItem = (id: string) => {
      setFoodDb(foodDb.filter(i => i.id !== id));
      // Remove from selection if deleted
      setSelectedIds(selectedIds.filter(sid => sid !== id));
      setLockedIds(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
      });
  };

  // --- Renders ---

  const selectedStaples = selectedIds.map(id => getItem(id)).filter(i => i?.type === 'staple') as FoodItem[];
  const selectedDishes = selectedIds.map(id => getItem(id)).filter(i => i?.type === 'dish') as FoodItem[];

  const filteredDb = foodDb.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
               <div className="bg-primary p-2 rounded-lg text-white">
                 <ChefHat size={24} />
               </div>
               <span className="text-xl font-bold text-gray-800 hidden sm:inline">{t.title}</span>
            </div>
            
            <div className="flex space-x-2 sm:space-x-4 items-center">
              <button
                onClick={() => setActiveTab('generator')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'generator' ? 'bg-orange-50 text-primary' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Utensils size={18} /> {t.generator}
              </button>
              <button
                onClick={() => setActiveTab('database')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'database' ? 'bg-orange-50 text-primary' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Database size={18} /> {t.database}
              </button>

               {/* Language Toggle */}
               <button
                onClick={() => setLanguage(prev => prev === 'en' ? 'zh' : 'en')}
                className="ml-2 p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors flex items-center gap-1 border"
                title="Switch Language"
              >
                <Languages size={18} />
                <span className="text-xs font-bold uppercase">{language}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === 'generator' ? (
          <div className="space-y-8">
            
            {/* Controls */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.staplesCount}</label>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setNumStaples(Math.max(1, numStaples - 1))} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">-</button>
                      <span className="text-xl font-bold w-4 text-center">{numStaples}</span>
                      <button onClick={() => setNumStaples(Math.min(5, numStaples + 1))} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">+</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.dishesCount}</label>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setNumDishes(Math.max(1, numDishes - 1))} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">-</button>
                      <span className="text-xl font-bold w-4 text-center">{numDishes}</span>
                      <button onClick={() => setNumDishes(Math.min(10, numDishes + 1))} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">+</button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                   <button 
                    onClick={handleShoppingList}
                    className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-all flex items-center gap-2"
                  >
                    <ShoppingCart size={20} /> {t.shoppingList}
                  </button>
                  <button 
                    onClick={randomizeMenu}
                    className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all flex items-center gap-2 active:scale-95"
                  >
                    <RefreshCw size={20} /> {t.spinMenu}
                  </button>
                </div>
              </div>
            </div>

            {/* Display Area */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2"><span className="w-2 h-8 bg-secondary rounded-full"></span> {t.staplesHeader}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: numStaples }).map((_, i) => (
                  <FoodCard 
                    key={`staple-${i}`}
                    item={selectedStaples[i] || null} 
                    isLocked={selectedStaples[i] ? lockedIds.has(selectedStaples[i].id) : false}
                    onToggleLock={() => selectedStaples[i] && toggleLock(selectedStaples[i].id)}
                    onRefresh={() => selectedStaples[i] && replaceSingleItem(selectedStaples[i].id)}
                    onEdit={(item) => { setEditingItem(item); setIsEditModalOpen(true); }}
                    t={t}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2"><span className="w-2 h-8 bg-primary rounded-full"></span> {t.dishesHeader}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: numDishes }).map((_, i) => (
                  <FoodCard 
                    key={`dish-${i}`}
                    item={selectedDishes[i] || null} 
                    isLocked={selectedDishes[i] ? lockedIds.has(selectedDishes[i].id) : false}
                    onToggleLock={() => selectedDishes[i] && toggleLock(selectedDishes[i].id)}
                    onRefresh={() => selectedDishes[i] && replaceSingleItem(selectedDishes[i].id)}
                    onEdit={(item) => { setEditingItem(item); setIsEditModalOpen(true); }}
                    t={t}
                  />
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* Database Tab */
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                        type="text" 
                        placeholder={t.searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none shadow-sm"
                    />
                </div>
                <button 
                    onClick={() => { setEditingItem(undefined); setIsEditModalOpen(true); }}
                    className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:bg-orange-600 transition-all flex items-center gap-2"
                >
                    <Plus size={20} /> {t.addItem}
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredDb.map(item => (
                    <FoodCard 
                        key={item.id}
                        item={item}
                        isLocked={false}
                        onToggleLock={() => {}}
                        onRefresh={() => {}}
                        showActions={true}
                        onEdit={(itm) => { setEditingItem(itm); setIsEditModalOpen(true); }}
                        t={t}
                    />
                ))}
            </div>
            {filteredDb.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                    {t.noDbItems}
                </div>
            )}
          </div>
        )}
      </main>

      {/* Shopping List Modal */}
      {showShoppingList && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[80vh] flex flex-col">
                  <div className="p-6 border-b flex justify-between items-center">
                      <h3 className="text-xl font-bold flex items-center gap-2">
                          <ListChecks className="text-primary" /> {t.shoppingListTitle}
                      </h3>
                      <button onClick={() => setShowShoppingList(false)} className="text-gray-400 hover:text-gray-600"><Settings className="rotate-45" size={24}/></button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6">
                      {isGeneratingList ? (
                          <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                              <RefreshCw className="animate-spin mb-2 text-primary" size={32} />
                              <p>{t.calcIngredients}</p>
                          </div>
                      ) : (
                          <ul className="space-y-3">
                              {generatedList.map((ing, idx) => (
                                  <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border">
                                      <input type="checkbox" className="mt-1 w-5 h-5 text-primary focus:ring-primary rounded border-gray-300" />
                                      <div className="flex-1">
                                          <span className="font-bold text-gray-800">{ing.name}</span>
                                          <span className="block text-sm text-gray-500">{ing.amount}</span>
                                      </div>
                                  </li>
                              ))}
                              {generatedList.length === 0 && <p className="text-gray-400 text-center">{t.emptyList}</p>}
                          </ul>
                      )}
                  </div>
                  <div className="p-6 border-t bg-gray-50 rounded-b-2xl">
                      <button onClick={() => setShowShoppingList(false)} className="w-full py-3 bg-gray-200 hover:bg-gray-300 rounded-xl font-bold text-gray-700 transition-colors">
                          {t.close}
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* Edit/Add Modal */}
      <EditFoodModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        item={editingItem}
        onSave={handleSaveItem}
        onDelete={handleDeleteItem}
        t={t}
        lang={language}
      />

    </div>
  );
}

export default App;
