export const INITIAL_MONSTERS = [
    // Lv 1-2
    { id: 'm1', name: '雪だるまン', hp: 3, attack: 1, exp: 20, coin: 10, icon: '⛄', minLevel: 1, timeLimit: 20, difficulty: 0, image: '/assets/images/snowman.png' },
    { id: 'm2', name: 'こおりスライム', hp: 5, attack: 2, exp: 35, coin: 15, icon: '💧', minLevel: 1, timeLimit: 18, difficulty: 0, image: '/assets/images/ice_slime.png' },
    { id: 'm5', name: 'みかんバード', hp: 6, attack: 2, exp: 40, coin: 20, icon: '🦅', color: 'orange', minLevel: 2, timeLimit: 15, difficulty: 1, image: '/assets/images/mandarin_bird.png' },

    // Lv 3-4
    { id: 'm3', name: '寒がりオバケ', hp: 8, attack: 3, exp: 50, coin: 25, icon: '👻', minLevel: 3, timeLimit: 15, difficulty: 1, image: '/assets/images/cold_ghost.png' },
    { id: 'm6', name: 'コタツムリ', hp: 10, attack: 3, exp: 60, coin: 30, icon: '🐌', minLevel: 3, timeLimit: 15, difficulty: 1, image: '/assets/images/kotatsu_snail.png' },
    { id: 'm9', name: 'イエティ', hp: 12, attack: 3, exp: 70, coin: 35, icon: '🦍', color: 'white', minLevel: 4, timeLimit: 12, difficulty: 2, image: '/assets/images/yeti.png' },

    // Lv 5-6
    { id: 'm7', name: 'おもちナイト', hp: 15, attack: 4, exp: 80, coin: 40, icon: '🛡️', minLevel: 5, timeLimit: 12, difficulty: 2, image: '/assets/images/mochi_knight.png' },
    { id: 'm4', name: '冬将軍', hp: 20, attack: 5, exp: 150, coin: 100, icon: '👹', minLevel: 6, isBoss: true, timeLimit: 10, difficulty: 3, image: '/assets/images/winter_shogun.png' },

    // Lv 7+
    { id: 'm8', name: '氷のドラゴン', hp: 30, attack: 6, exp: 300, coin: 200, icon: '🐉', minLevel: 7, isBoss: true, timeLimit: 8, difficulty: 4, image: '/assets/images/ice_dragon.png' },

    // レア
    { id: 'rare1', name: 'ひかりの妖精', hp: 5, attack: 1, exp: 100, coin: 300, icon: '🧚', minLevel: 1, isRare: true, timeLimit: 10, difficulty: 1, image: '/assets/images/light_fairy.png' },
];

export const LEVELS = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 3000];

export const ITEMS = [
    { id: 'p1', name: 'みならいの剣', cost: 50, icon: '🗡️', type: 'weapon', power: 1 },
    { id: 'p2', name: '勇者の剣', cost: 200, icon: '⚔️', type: 'weapon', power: 2 },
    { id: 'p3', name: '伝説の剣', cost: 500, icon: '🔱', type: 'weapon', power: 3 },
    { id: 'a1', name: '木のたて', cost: 50, icon: '🛡️', type: 'armor', defense: 1 },
    { id: 'a2', name: '鉄のたて', cost: 200, icon: '🛡️', type: 'armor', defense: 2 },
    { id: 'pot', name: '元気の薬', cost: 20, icon: '🧪', type: 'consumable', effect: 'heal' },
];
