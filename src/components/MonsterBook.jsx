import React from 'react';
import { Home } from 'lucide-react';

export const MonsterBook = ({ monsters, defeatedMonsters, onClose }) => {
    return (
        <div className="h-full bg-slate-100 flex flex-col p-4 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={onClose}
                    className="p-2 bg-white rounded-full shadow-sm"
                >
                    <Home className="w-6 h-6 text-gray-600" />
                </button>
                <h2 className="text-2xl font-bold text-purple-600">モンスターずかん</h2>
                <div className="w-10"></div>
            </div>

            <div className="flex-1 overflow-y-auto pb-8">
                <div className="grid grid-cols-2 gap-4">
                    {monsters.map(monster => {
                        const isDefeated = defeatedMonsters.includes(monster.id);
                        return (
                            <div
                                key={monster.id}
                                className={`
                                    relative flex flex-col items-center p-4 rounded-xl border-2 transition-all
                                    ${isDefeated ? 'bg-white border-purple-200 shadow-md' : 'bg-gray-200 border-gray-300'}
                                `}
                            >
                                <div className="text-4xl mb-2 filter drop-shadow-sm">
                                    {isDefeated ? (monster.image ? <img src={monster.image} alt={monster.name} className="w-20 h-20 object-contain" /> : monster.icon) : '❓'}
                                </div>
                                <div className={`font-bold text-sm ${isDefeated ? 'text-gray-800' : 'text-gray-400'}`}>
                                    {isDefeated ? monster.name : '？？？？'}
                                </div>
                                {isDefeated && (
                                    <div className="text-xs text-purple-500 mt-1 font-bold">
                                        GET!
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
