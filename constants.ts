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
    imageUrl: 'https://freetubed.netlib.re/api/cfile/AgACAgUAAyEGAAS7KCaJAAMJaR5q7i3AmwaxFXfDlKPcmjtmATIAAk4Laxs8lvhULOO7RlOEVZwBAAMCAAN4AAM2BA',
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
    imageUrl: 'https://freetubed.netlib.re/api/cfile/AgACAgUAAyEGAAS7KCaJAAMIaR5qhwme57q7rxmByxjk9QGekJAAAk0Laxs8lvhUms6pqIykZFsBAAMCAAN3AAM2BA',
    recipe: 'Steam dough. 蒸面团。',
    ingredients: [{ name: 'Flour/面粉', amount: '500g' }, { name: 'Yeast/酵母', amount: '5g' }],
    tags: ['Chinese', 'Bun', '面食']
  },
  {
    id: 's4',
    name: 'Congee / 白粥',
    type: 'staple',
    description: 'Rice porridge. 养胃白粥。',
    imageUrl: 'https://freetubed.netlib.re/api/cfile/AgACAgUAAyEGAAS7KCaJAAMHaR5qF6WVONwRIc_45OBHpmqsG-0AAksLaxs8lvhU-GqT4abEqMYBAAMCAAN4AAM2BA',
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

  // --- Hot Dishes ---
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
    imageUrl: 'https://freetubed.netlib.re/api/cfile/AgACAgUAAyEGAAS7KCaJAAMWaR6hi39_3lrYQ2tooErlhi_7E4QAAtULaxs8lvhUquykKgGhsy0BAAMCAAN5AAM2BA',
    recipe: 'Stir fry chicken, peanuts, chilies. 爆炒鸡丁花生。',
    ingredients: [{ name: 'Chicken/鸡胸肉', amount: '300g' }, { name: 'Peanuts/花生', amount: '50g' }],
    tags: ['Sichuan', 'Classic', '下饭']
  },
  {
    id: 'd3',
    name: 'Tomato Eggs / 番茄炒蛋',
    type: 'dish',
    description: 'Classic comfort food. 国民家常菜。',
    imageUrl: 'https://freetubed.netlib.re/api/cfile/AgACAgUAAyEGAAS7KCaJAAMVaR6hiRVsbD20l1i2GE9DvBkaPuAAAtQLaxs8lvhU4ul0ZCD76DMBAAMCAAN5AAM2BA',
    recipe: 'Scramble eggs, fry tomatoes. 炒鸡蛋，炒番茄，混合。',
    ingredients: [{ name: 'Eggs/鸡蛋', amount: '4' }, { name: 'Tomatoes/番茄', amount: '3' }],
    tags: ['Home', 'Quick', '家常']
  },
  {
    id: 'd4',
    name: 'Braised Pork / 红烧肉',
    type: 'dish',
    description: 'Sweet soy braised pork belly. 肥而不腻。',
    imageUrl: 'https://freetubed.netlib.re/api/cfile/AgACAgUAAyEGAAS7KCaJAAMUaR6hhh81YY8YPp2ZIYZ-5OfltrAAAtMLaxs8lvhUvyru4o1yS5MBAAMCAAN5AAM2BA',
    recipe: 'Braise pork with soy and sugar. 酱油糖慢炖。',
    ingredients: [{ name: 'Pork Belly/五花肉', amount: '500g' }],
    tags: ['Traditional', 'Meat', '硬菜']
  },
  {
    id: 'd5',
    name: 'Broccoli Beef / 西兰花炒牛肉',
    type: 'dish',
    description: 'Healthy stir fry. 荤素搭配。',
    imageUrl: 'https://freetubed.netlib.re/api/cfile/AgACAgUAAyEGAAS7KCaJAAMTaR6hhEM9II4AAW6ObIfreyzMab9FAALSC2sbPJb4VPn-jKWADVG1AQADAgADeQADNgQ',
    recipe: 'Stir fry beef then broccoli. 炒牛肉，炒西兰花。',
    ingredients: [{ name: 'Beef/牛肉', amount: '200g' }, { name: 'Broccoli/西兰花', amount: '1' }],
    tags: ['Stir-fry', 'Cantonese', '粤菜']
  },
  {
    id: 'd6',
    name: 'Fish Flavored Pork / 鱼香肉丝',
    type: 'dish',
    description: 'Sweet, sour, spicy pork strips. 没有鱼的鱼香肉丝。',
    imageUrl: 'https://freetubed.netlib.re/api/cfile/AgACAgUAAyEGAAS7KCaJAAMSaR6hgThKMFu8eLTqdTFGwSn9u3sAAtELaxs8lvhUxoMoEJi4D6cBAAMCAAN3AAM2BA',
    recipe: 'Shred pork, stir fry with wood ear. 肉丝木耳胡萝卜同炒。',
    ingredients: [{ name: 'Pork/猪肉', amount: '200g' }, { name: 'Wood Ear/木耳', amount: '50g' }],
    tags: ['Sichuan', 'Spicy', '下饭']
  },
  {
    id: 'd8',
    name: 'Steamed Fish / 清蒸鱼',
    type: 'dish',
    description: 'Fresh fish with soy sauce. 鲜嫩蒸鱼。',
    imageUrl: 'https://freetubed.netlib.re/api/cfile/AgACAgUAAyEGAAS7KCaJAAMRaR6hfgnjaaVtvKj4lysYzL4h8J0AAtALaxs8lvhUxMruPG2DeE4BAAMCAAN3AAM2BA',
    recipe: 'Steam fish, pour hot oil over scallions. 蒸熟泼热油。',
    ingredients: [{ name: 'Fish/鱼', amount: '1' }, { name: 'Scallion/葱', amount: '2' }],
    tags: ['Seafood', 'Healthy', '海鲜']
  },
  {
    id: 'd9',
    name: 'Potato Strips / 酸辣土豆丝',
    type: 'dish',
    description: 'Sour and spicy crunchy potatoes. 酸辣脆爽。',
    imageUrl: 'https://freetubed.netlib.re/api/cfile/AgACAgUAAyEGAAS7KCaJAAMQaR6he9TEwlVmaHiVlRN0k0jOvYgAAs4Laxs8lvhUou2d5ArAdy0BAAMCAAN3AAM2BA',
    recipe: 'Fry potato strips with vinegar/chili. 猛火快炒加醋。',
    ingredients: [{ name: 'Potato/土豆', amount: '2' }, { name: 'Chili/干辣椒', amount: '5' }],
    tags: ['Veggie', 'Cheap', '素菜']
  },
  {
    id: 'd10',
    name: 'Coke Wings / 可乐鸡翅',
    type: 'dish',
    description: 'Chicken wings cooked in cola. 孩子最爱。',
    imageUrl: 'https://freetubed.netlib.re/api/cfile/AgACAgUAAyEGAAS7KCaJAAMPaR6hecHywS1E5-iKBhqfYf0mr28AAs0Laxs8lvhUlhlma6dXqskBAAMCAAN4AAM2BA',
    recipe: 'Simmer wings in coke. 可乐焖鸡翅。',
    ingredients: [{ name: 'Wings/鸡翅', amount: '10' }, { name: 'Cola/可乐', amount: '1 can' }],
    tags: ['Sweet', 'Easy', '快手']
  },
  {
    id: 'd11',
    name: 'Lamb Cumin / 孜然羊肉',
    type: 'dish',
    description: 'Spicy cumin lamb. 大漠风味。',
    imageUrl: 'https://freetubed.netlib.re/api/cfile/AgACAgUAAyEGAAS7KCaJAAMOaR6hdlAs9gYMxry8DdUmHX2UqSEAAswLaxs8lvhUMwtqYv1gxhgBAAMCAAN3AAM2BA',
    recipe: 'Stir fry lamb with cumin seeds. 爆炒羊肉孜然。',
    ingredients: [{ name: 'Lamb/羊肉', amount: '300g' }, { name: 'Cumin/孜然', amount: '2 tbsp' }],
    tags: ['Meat', 'Spicy', '重口味']
  },
  {
    id: 'd12',
    name: 'Green Beans / 干煸四季豆',
    type: 'dish',
    description: 'Dry fried string beans. 干香下饭。',
    imageUrl: 'https://freetubed.netlib.re/api/cfile/AgACAgUAAyEGAAS7KCaJAAMNaR6hczw5eseOnzB9pGQrXVc8kgoAAssLaxs8lvhU0zatk2usDjABAAMCAAN5AAM2BA',
    recipe: 'Deep fry beans, stir fry with pork. 炸干煸炒。',
    ingredients: [{ name: 'Beans/四季豆', amount: '400g' }, { name: 'Pork Mince/肉末', amount: '50g' }],
    tags: ['Sichuan', 'Veggie', '素菜']
  },

  // --- Cold Dishes (New) ---
  {
    id: 'c1',
    name: 'Cucumber Salad / 拍黄瓜',
    type: 'cold_dish',
    description: 'Garlic cucumber appetizer. 清爽凉菜。',
    imageUrl: 'https://freetubed.netlib.re/api/cfile/AgACAgUAAyEGAAS7KCaJAAMMaR6hcMJQ_XCrVH_uMKM7d_k0gCIAAsoLaxs8lvhUnT0XzUbVzmIBAAMCAAN4AAM2BA',
    recipe: 'Smash cucumber, add garlic/vinegar. 拍碎黄瓜加蒜醋。',
    ingredients: [{ name: 'Cucumber/黄瓜', amount: '2' }, { name: 'Garlic/大蒜', amount: '3 cloves' }],
    tags: ['Cold', 'Appetizer', '凉菜']
  },
  {
    id: 'c2',
    name: 'Preserved Egg Tofu / 皮蛋豆腐',
    type: 'cold_dish',
    description: 'Silken tofu with century egg. 经典凉菜。',
    imageUrl: 'https://freetubed.netlib.re/api/cfile/AgACAgUAAyEGAAS7KCaJAAMLaR6hbOy4n1yrjGnx6RIxM6ATJjYAAskLaxs8lvhUPfSExm6sAaIBAAMCAAN5AAM2BA',
    recipe: 'Cut tofu and egg, add soy sauce dressing. 豆腐皮蛋切块淋汁。',
    ingredients: [{ name: 'Silken Tofu/嫩豆腐', amount: '1 box' }, { name: 'Century Egg/皮蛋', amount: '2' }],
    tags: ['Cold', 'Quick', '凉菜']
  },

  // --- Soups (New) ---
  {
    id: 'so1',
    name: 'Tomato Egg Soup / 番茄蛋花汤',
    type: 'soup',
    description: 'Simple and comforting soup. 简单好喝。',
    imageUrl: 'https://freetubed.netlib.re/api/cfile/AgACAgUAAyEGAAS7KCaJAAMKaR6hacwcUINSlAxsPgGJ0TPY_9wAAsgLaxs8lvhUBzF-TyUXH1UBAAMCAAN5AAM2BA',
    recipe: 'Boil tomatoes, swirl in egg. 煮番茄水，淋入蛋液。',
    ingredients: [{ name: 'Tomato/番茄', amount: '2' }, { name: 'Egg/鸡蛋', amount: '1' }],
    tags: ['Soup', 'Warm', '汤']
  },
  {
    id: 'so2',
    name: 'Corn Pork Rib Soup / 玉米排骨汤',
    type: 'soup',
    description: 'Slow cooked clear soup. 营养清甜。',
    imageUrl: 'https://freetubed.netlib.re/api/cfile/AgACAgUAAyEGAAS7KCaJAAMYaR6hkbBC1h8yhulDu_rhj-hOogAD1wtrGzyW-FTfgLSFpNtkJgEAAwIAA3kAAzYE',
    recipe: 'Simmer ribs and corn for 2 hours. 排骨玉米慢炖。',
    ingredients: [{ name: 'Ribs/排骨', amount: '500g' }, { name: 'Corn/甜玉米', amount: '2' }],
    tags: ['Soup', 'Slow Cook', '汤']
  },

  // --- Drinks (New) ---
  {
    id: 'dr1',
    name: 'Cola / 可乐',
    type: 'drink',
    description: 'Ice cold cola. 快乐水。',
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    recipe: 'Open can. Pour over ice. 打开，加冰。',
    ingredients: [{ name: 'Cola/可乐', amount: '1 can' }],
    tags: ['Drink', 'Soda', '饮料']
  },
  {
    id: 'dr2',
    name: 'Soy Milk / 豆浆',
    type: 'drink',
    description: 'Fresh soy milk. 早餐必备。',
    imageUrl: 'https://freetubed.netlib.re/api/cfile/AgACAgUAAyEGAAS7KCaJAAMXaR6hjpDGAAGMsdV7OXk9dFBeK0tvAALWC2sbPJb4VAQ_cIhQvcpdAQADAgADeQADNgQ',
    recipe: 'Soak beans, blend, boil. 泡豆打浆煮沸。',
    ingredients: [{ name: 'Soybeans/黄豆', amount: '100g' }],
    tags: ['Drink', 'Healthy', '饮料']
  }
];
