import React, { useState } from 'react';
import { Sword, Book, ShoppingBag, Heart, Trophy, Zap, AlertTriangle } from 'lucide-react';

export const HomeScreen = ({ player, onStartBattle, onOpenBook, items, onBuyItem, message }) => {
    const [shopOpen, setShopOpen] = useState(false);

    return (
        <div className="h-full flex flex-col items-center justify-center bg-sky-100 p-4 relative">
            <div className="text-center mb-6">
                <h1 className="text-4xl font-black text-blue-600 drop-shadow-md mb-2 tracking-wider">冬休み大冒険</h1>
                <div className="text-xl font-bold text-blue-400">ちえの勇者</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-sm mb-6 border-4 border-blue-200">
                <div className="flex justify-between items-end mb-4 border-b-2 border-gray-100 pb-2">
                    <div>
                        <div className="text-sm text-gray-500 mb-1">なまえ</div>
                        <div className="font-bold text-2xl text-gray-800">{player.name}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-bold text-blue-500">Lv.{player.level}</div>
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-2 bg-red-50 p-2 rounded-lg">
                    <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${(player.hp / player.maxHp) * 100}%` }}></div>
                    </div>
                    <div className="text-sm font-bold text-gray-700 w-12 text-right">{player.hp}/{player.maxHp}</div>
                </div>

                <div className="flex justify-between gap-2 mt-4 text-sm font-bold text-gray-600">
                    <div className="bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200 flex items-center gap-1">
                        <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-[10px] text-yellow-800">$</div>
                        {player.coins} G
                    </div>
                    <div className="bg-blue-50 px-3 py-1 rounded-full border border-blue-200 flex items-center gap-1">
                        <Zap className="w-4 h-4 text-blue-500" />
                        あと {100 - (player.exp % 100)}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-6">
                <button
                    onClick={() => onStartBattle('math')}
                    className="flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-400 to-blue-600 text-white py-6 rounded-2xl shadow-lg active:scale-95 transition-transform hover:shadow-xl border-b-4 border-blue-800"
                >
                    <Sword className="w-10 h-10" />
                    <span className="font-bold text-lg">さんすう で たたかう</span>
                </button>
                <button
                    onClick={() => onStartBattle('jp')}
                    className="flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-red-400 to-red-600 text-white py-6 rounded-2xl shadow-lg active:scale-95 transition-transform hover:shadow-xl border-b-4 border-red-800"
                >
                    <Book className="w-10 h-10" />
                    <span className="font-bold text-lg">こくご で たたかう</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg w-full max-w-sm overflow-hidden flex border-2 border-gray-200">
                <button
                    onClick={() => setShopOpen(!shopOpen)}
                    className={`flex-1 py-3 flex items-center justify-center gap-2 font-bold transition-colors ${shopOpen ? 'bg-orange-100 text-orange-600' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                    <ShoppingBag className="w-5 h-5" />
                    おみせ
                </button>
                <div className="w-px bg-gray-200" />
                <button
                    onClick={onOpenBook}
                    className="flex-1 py-3 flex items-center justify-center gap-2 font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                >
                    <Book className="w-5 h-5 text-purple-500" />
                    ずかん
                </button>
            </div>

            {shopOpen && (
                <div className="absolute inset-x-0 bottom-0 top-auto bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-6 z-20 animate-in slide-in-from-bottom duration-300 max-h-[60%] overflow-y-auto w-full max-w-md mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5 text-orange-500" />
                            道具屋
                        </h3>
                        <div className="text-sm font-bold bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">{player.coins} G</div>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        {items.map(item => {
                            const hasItem = player.items.some(i => i.id === item.id);
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => onBuyItem(item)}
                                    disabled={hasItem && item.type !== 'consumable'}
                                    className={`flex items-center gap-3 p-3 rounded-xl border-b-2 text-left transition-all active:scale-95
                                        ${hasItem && item.type !== 'consumable' ? 'bg-gray-100 border-gray-200 opacity-60' : 'bg-orange-50 border-orange-200 hover:bg-orange-100'}`}
                                >
                                    <div className="text-2xl w-10 text-center">{item.icon}</div>
                                    <div className="flex-1">
                                        <div className="font-bold text-gray-800">{item.name}</div>
                                        <div className="text-xs text-gray-500">
                                            {item.type === 'weapon' && `こうげき +${item.power}`}
                                            {item.type === 'armor' && `ぼうぎょ +${item.defense}`}
                                            {item.effect === 'heal' && `HP全かいふく`}
                                        </div>
                                    </div>
                                    <div className="font-bold text-orange-600 w-16 text-right">{hasItem && item.type !== 'consumable' ? '済' : `${item.cost}G`}</div>
                                </button>
                            );
                        })}
                    </div>
                    <button
                        onClick={() => setShopOpen(false)}
                        className="mt-6 w-full py-3 bg-gray-200 text-gray-600 font-bold rounded-xl"
                    >
                        とじる
                    </button>
                </div>
            )}

            {message && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-6 py-3 rounded-full font-bold animate-in fade-in zoom-in duration-200 whitespace-nowrap z-50">
                    {message}
                </div>
            )}
        </div>
    );
};
