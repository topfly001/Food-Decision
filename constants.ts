import { FoodItem } from './types';

// Helper to generate a random ID
export const generateId = () => Math.random().toString(36).substr(2, 9);

// Expanded database with bilingual content
export const INITIAL_DATABASE: FoodItem[] = [
  // --- Staples ---
  {
    id: 's1',
    name: 'Rice / 米饭',
    type: 'staple',
    description: 'Fluffy white rice. 香软的白米饭。',
    imageUrl: 'https://images.unsplash.com/photo-1516684732162-7c8c001a12fd?auto=format&fit=crop&w=800&q=80',
    recipe: '1. Wash rice. 2. Cook. \n1. 淘米。2. 煮饭。',
    ingredients: [{ name: 'Rice/米', amount: '2 cups' }],
    tags: ['Chinese', 'Simple', '主食']
  },
  {
    id: 's2',
    name: 'Noodles / 手擀面',
    type: 'staple',
    description: 'Homemade wheat noodles. 手工制作的面条。',
    imageUrl: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80',
    recipe: 'Boil noodles. 煮面。',
    ingredients: [{ name: 'Flour/面粉', amount: '500g' }],
    tags: ['Chinese', 'Noodle', '面食']
  },
  {
    id: 's3',
    name: 'Mantou / 馒头',
    type: 'staple',
    description: 'Steamed buns. 白白胖胖的蒸馒头。',
    imageUrl: 'https://images.unsplash.com/photo-1536188919818-2542cb5c8cb0?auto=format&fit=crop&w=800&q=80',
    recipe: 'Steam dough. 蒸面团。',
    ingredients: [{ name: 'Flour/面粉', amount: '500g' }, { name: 'Yeast/酵母', amount: '5g' }],
    tags: ['Chinese', 'Bun', '面食']
  },
  {
    id: 's4',
    name: 'Congee / 白粥',
    type: 'staple',
    description: 'Rice porridge. 养胃白粥。',
    imageUrl: 'https://images.unsplash.com/photo-1515044680409-e2d367462254?auto=format&fit=crop&w=800&q=80',
    recipe: 'Boil rice with lots of water. 多水煮米。',
    ingredients: [{ name: 'Rice/米', amount: '0.5 cup' }],
    tags: ['Breakfast', 'Light', '清淡']
  },
  {
    id: 's5',
    name: 'Fried Rice / 蛋炒饭',
    type: 'staple',
    description: 'Stir-fried rice with eggs. 简单的蛋炒饭。',
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb74b?auto=format&fit=crop&w=800&q=80',
    recipe: 'Fry rice with eggs. 蛋液裹饭炒匀。',
    ingredients: [{ name: 'Leftover Rice/剩饭', amount: '1 bowl' }, { name: 'Egg/鸡蛋', amount: '2' }],
    tags: ['Chinese', 'Quick', '快手']
  },

  // --- Dishes ---
  {
    id: 'd1',
    name: 'Mapo Tofu / 麻婆豆腐',
    type: 'dish',
    description: 'Spicy Sichuan tofu. 麻辣鲜香。',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    recipe: 'Fry doubanjiang, add tofu. 炒豆瓣酱，加豆腐。',
    ingredients: [{ name: 'Tofu/豆腐', amount: '1 block' }, { name: 'Minced Meat/肉末', amount: '100g' }],
    tags: ['Sichuan', 'Spicy', '川菜']
  },
  {
    id: 'd2',
    name: 'Kung Pao Chicken / 宫保鸡丁',
    type: 'dish',
    description: 'Chicken with peanuts. 甜酸微辣。',
    imageUrl: 'https://images.unsplash.com/photo-1525755617732-23e52b810305?auto=format&fit=crop&w=800&q=80',
    recipe: 'Stir fry chicken, peanuts, chilies. 爆炒鸡丁花生。',
    ingredients: [{ name: 'Chicken/鸡胸肉', amount: '300g' }, { name: 'Peanuts/花生', amount: '50g' }],
    tags: ['Sichuan', 'Classic', '下饭']
  },
  {
    id: 'd3',
    name: 'Tomato Eggs / 番茄炒蛋',
    type: 'dish',
    description: 'Classic comfort food. 国民家常菜。',
    imageUrl: 'https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?auto=format&fit=crop&w=800&q=80',
    recipe: 'Scramble eggs, fry tomatoes. 炒鸡蛋，炒番茄，混合。',
    ingredients: [{ name: 'Eggs/鸡蛋', amount: '4' }, { name: 'Tomatoes/番茄', amount: '3' }],
    tags: ['Home', 'Quick', '家常']
  },
  {
    id: 'd4',
    name: 'Braised Pork / 红烧肉',
    type: 'dish',
    description: 'Sweet soy braised pork belly. 肥而不腻。',
    imageUrl: 'https://images.unsplash.com/photo-1606658896235-6627018d0946?auto=format&fit=crop&w=800&q=80',
    recipe: 'Braise pork with soy and sugar. 酱油糖慢炖。',
    ingredients: [{ name: 'Pork Belly/五花肉', amount: '500g' }],
    tags: ['Traditional', 'Meat', '硬菜']
  },
  {
    id: 'd5',
    name: 'Broccoli Beef / 西兰花炒牛肉',
    type: 'dish',
    description: 'Healthy stir fry. 荤素搭配。',
    imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
    recipe: 'Stir fry beef then broccoli. 炒牛肉，炒西兰花。',
    ingredients: [{ name: 'Beef/牛肉', amount: '200g' }, { name: 'Broccoli/西兰花', amount: '1' }],
    tags: ['Stir-fry', 'Cantonese', '粤菜']
  },
  {
    id: 'd6',
    name: 'Fish Flavored Pork / 鱼香肉丝',
    type: 'dish',
    description: 'Sweet, sour, spicy pork strips. 没有鱼的鱼香肉丝。',
    imageUrl: 'https://images.unsplash.com/photo-1563245312-131618062256?auto=format&fit=crop&w=800&q=80',
    recipe: 'Shred pork, stir fry with wood ear. 肉丝木耳胡萝卜同炒。',
    ingredients: [{ name: 'Pork/猪肉', amount: '200g' }, { name: 'Wood Ear/木耳', amount: '50g' }],
    tags: ['Sichuan', 'Spicy', '下饭']
  },
  {
    id: 'd7',
    name: 'Cucumber Salad / 拍黄瓜',
    type: 'dish',
    description: 'Garlic cucumber appetizer. 清爽凉菜。',
    imageUrl: 'https://images.unsplash.com/photo-1605592609762-7d625809203c?auto=format&fit=crop&w=800&q=80',
    recipe: 'Smash cucumber, add garlic/vinegar. 拍碎黄瓜加蒜醋。',
    ingredients: [{ name: 'Cucumber/黄瓜', amount: '2' }, { name: 'Garlic/大蒜', amount: '3 cloves' }],
    tags: ['Cold', 'Appetizer', '凉菜']
  },
  {
    id: 'd8',
    name: 'Steamed Fish / 清蒸鱼',
    type: 'dish',
    description: 'Fresh fish with soy sauce. 鲜嫩蒸鱼。',
    imageUrl: 'https://images.unsplash.com/photo-1599021456807-25db0f974333?auto=format&fit=crop&w=800&q=80',
    recipe: 'Steam fish, pour hot oil over scallions. 蒸熟泼热油。',
    ingredients: [{ name: 'Fish/鱼', amount: '1' }, { name: 'Scallion/葱', amount: '2' }],
    tags: ['Seafood', 'Healthy', '海鲜']
  },
  {
    id: 'd9',
    name: 'Potato Strips / 酸辣土豆丝',
    type: 'dish',
    description: 'Sour and spicy crunchy potatoes. 酸辣脆爽。',
    imageUrl: 'https://images.unsplash.com/photo-1600272328672-30493792c406?auto=format&fit=crop&w=800&q=80',
    recipe: 'Fry potato strips with vinegar/chili. 猛火快炒加醋。',
    ingredients: [{ name: 'Potato/土豆', amount: '2' }, { name: 'Chili/干辣椒', amount: '5' }],
    tags: ['Veggie', 'Cheap', '素菜']
  },
  {
    id: 'd10',
    name: 'Coke Wings / 可乐鸡翅',
    type: 'dish',
    description: 'Chicken wings cooked in cola. 孩子最爱。',
    imageUrl: 'https://images.unsplash.com/photo-1527477396000-64ca9c23d9d9?auto=format&fit=crop&w=800&q=80',
    recipe: 'Simmer wings in coke. 可乐焖鸡翅。',
    ingredients: [{ name: 'Wings/鸡翅', amount: '10' }, { name: 'Cola/可乐', amount: '1 can' }],
    tags: ['Sweet', 'Easy', '快手']
  },
  {
    id: 'd11',
    name: 'Lamb Cumin / 孜然羊肉',
    type: 'dish',
    description: 'Spicy cumin lamb. 大漠风味。',
    imageUrl: 'https://images.unsplash.com/photo-1603048374864-64cb3364086f?auto=format&fit=crop&w=800&q=80',
    recipe: 'Stir fry lamb with cumin seeds. 爆炒羊肉孜然。',
    ingredients: [{ name: 'Lamb/羊肉', amount: '300g' }, { name: 'Cumin/孜然', amount: '2 tbsp' }],
    tags: ['Meat', 'Spicy', '重口味']
  },
  {
    id: 'd12',
    name: 'Green Beans / 干煸四季豆',
    type: 'dish',
    description: 'Dry fried string beans. 干香下饭。',
    imageUrl: 'https://images.unsplash.com/photo-1562976401-7e858680665e?auto=format&fit=crop&w=800&q=80',
    recipe: 'Deep fry beans, stir fry with pork. 炸干煸炒。',
    ingredients: [{ name: 'Beans/四季豆', amount: '400g' }, { name: 'Pork Mince/肉末', amount: '50g' }],
    tags: ['Sichuan', 'Veggie', '素菜']
  }
];
