import React from 'react';
import { Clock, Heart, Shield, Sword, RefreshCcw, Home, Sparkles, AlertTriangle } from 'lucide-react';
import { AnalogClock, MoneyVisual, BlockVisual, ShapeVisual } from './Visuals';

export const BattleScreen = ({
    player, monster, monsterHp, question, timeLeft, onAnswer,
    isCorrect, showHitEffect, showEncounter, isGameOver, onRestart, onRetreat
}) => {

    if (showEncounter) {
        return (
            <div className="h-full flex flex-col items-center justify-center bg-red-900 text-white animate-flash-red-overlay">
                <AlertTriangle className="w-24 h-24 text-yellow-400 mb-6 animate-pulse" />
                <h2 className="text-5xl font-black text-center mb-4 text-red-100 drop-shadow-lg scale-150 animate-bounce">
                    {monster.isBoss ? '強敵 出現！' : 'レアモン 出現！'}
                </h2>
                <div className="text-9xl mt-8 animate-ping">{monster.icon}</div>
            </div>
        );
    }

    if (isGameOver) {
        return (
            <div className="h-full flex flex-col items-center justify-center bg-slate-900 text-white p-6">
                <div className="text-8xl mb-8">🪦</div>
                <h2 className="text-4xl font-bold mb-8 text-red-500">ゲームオーバー...</h2>
                <button
                    onClick={onRestart}
                    className="flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-xl shadow-lg active:scale-95 transition-transform"
                >
                    <RefreshCcw className="w-6 h-6" />
                    もういちど
                </button>
            </div>
        );
    }

    const [inputValue, setInputValue] = React.useState('');

    // Reset input value when question changes
    React.useEffect(() => {
        setInputValue('');
    }, [question]);

    const handleInput = (val) => {
        if (inputValue.length >= 10) return; // Limit length
        setInputValue(prev => prev + val);
    };

    const handleBackspace = () => {
        setInputValue(prev => prev.slice(0, -1));
    };

    const handleSubmit = () => {
        if (inputValue === '') return;
        onAnswer(inputValue);
    };

    const VisualDisplay = ({ q }) => {
        if (!q || !q.visualType) return null;
        switch (q.visualType) {
            case 'clock': return <AnalogClock hour={q.visualData.hour} minute={q.visualData.minute} />;
            case 'money': return <MoneyVisual count100={q.visualData.count100} count10={q.visualData.count10} count1={q.visualData.count1} />;
            case 'block': return <BlockVisual count={q.visualData.count} />;
            case 'shape': return <ShapeVisual shape={q.visualData.shape} />;
            default: return null;
        }
    };

    return (
        <div className={`h-full flex flex-col bg-slate-100 relative ${timeLeft <= 5 ? 'animate-flash-red' : ''}`}>
            {/* Header UI */}
            <div className="bg-white p-2 shadow-sm flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                    <div className="bg-yellow-100 p-1.5 rounded-lg border-2 border-yellow-300">
                        <Clock className={`w-6 h-6 ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-yellow-600'}`} />
                    </div>
                    <div className={`text-3xl font-black ${timeLeft <= 5 ? 'text-red-500 scale-110' : 'text-slate-700'} transition-all w-12 text-center`}>
                        {timeLeft}
                    </div>
                </div>

                <div className="flex-1 px-4 flex justify-end items-center gap-3">
                    <div className="flex items-center gap-1">
                        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                        <div className="font-bold text-xl text-slate-700">{player.hp}</div>
                    </div>
                </div>

                <button
                    onClick={onRetreat}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <Home className="w-6 h-6" />
                </button>
            </div>

            {/* Battle Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                {/* Monster Info (Moved Above) */}
                <div className="mb-2 text-center z-10">
                    <div className="inline-block bg-black/50 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm border border-white/30 shadow-sm">
                        {monster.name} <span className="text-yellow-300 ml-1">Lv.{Math.ceil(monster.exp / 20)}</span>
                    </div>
                </div>

                {/* Monster HP */}
                <div className="w-48 relative mb-4 z-10">
                    <div className="h-4 bg-gray-300 rounded-full overflow-hidden shadow-inner border-2 border-white">
                        <div
                            className="h-full bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-300"
                            style={{ width: `${(monsterHp / monster.hp) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Monster Image/Icon */}
                <div className={`cursor-pointer transition-transform duration-100 relative z-0
                    ${showHitEffect ? 'animate-shake-damage' : ''} 
                    ${isCorrect === false ? 'scale-110' : ''}`}
                >
                    {monster.image ? (
                        <img
                            src={monster.image}
                            alt={monster.name}
                            className="w-48 h-48 object-contain drop-shadow-xl mix-blend-multiply"
                            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                        />
                    ) : null}
                    <div className="text-[120px] leading-none filter drop-shadow-xl" style={{ display: monster.image ? 'none' : 'block' }}>
                        {monster.icon}
                    </div>
                </div>

                {/* HIT Effect Overlay */}
                {showHitEffect && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
                        <div className="relative">
                            <Sparkles className="w-32 h-32 text-yellow-300 animate-spin-slow absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-80" />
                            <div className="text-6xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] italic absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 animate-ping">
                                HIT!
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="bg-white rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] p-6 z-20 animate-in slide-in-from-bottom duration-300">
                {question && (
                    <div className="max-w-md mx-auto">
                        <div className="text-center mb-4">
                            <div className="text-lg font-bold text-slate-600 mb-1 whitespace-pre-wrap">{question.question}</div>
                            <VisualDisplay q={question} />

                            {/* Input Display Buffer */}
                            {(question.type === 'calc' || question.type === 'write') && (
                                <div className="h-16 flex items-center justify-center mb-2">
                                    <div className="bg-gray-100 border-2 border-gray-300 rounded-xl px-6 py-2 min-w-[120px] text-center">
                                        <span className="text-3xl font-black text-slate-700 tracking-widest min-h-[40px] block">
                                            {inputValue || <span className="text-gray-300 opacity-50">?</span>}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {isCorrect === false && (
                                <div className="text-sm text-red-500 font-bold bg-red-50 py-1 px-3 rounded-full inline-block mt-2 animate-bounce">
                                    {question.hint || 'もういちど かんがえてみて！'}
                                </div>
                            )}
                        </div>

                        {/* Answer Options: SELECT TYPE (One-Click) */}
                        {question.type === 'select' && (
                            <div className="grid grid-cols-2 gap-3" style={{ gridTemplateColumns: question.options && question.options.length === 3 ? 'repeat(3, 1fr)' : '1fr 1fr' }}>
                                {question.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => onAnswer(opt)}
                                        className={`
                                            py-4 px-2 rounded-xl text-xl font-bold shadow-sm border-b-4 active:border-b-0 active:translate-y-1 transition-all
                                            ${isCorrect === true && opt === question.answer ? 'bg-green-500 text-white border-green-700' :
                                                isCorrect === false ? 'bg-gray-100 text-gray-400 border-gray-200' : 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'}
                                        `}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Control Buttons for Buffered Input (Write Only) */}
                        {question.type === 'write' && (
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <button
                                    onClick={handleBackspace}
                                    className="bg-red-100 text-red-600 border-b-4 border-red-200 rounded-lg py-2 font-bold active:border-b-0 active:translate-y-0.5 active:bg-red-200"
                                >
                                    1もじ けす
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className={`
                                        bg-blue-500 text-white border-b-4 border-blue-700 rounded-lg py-2 font-bold text-lg active:border-b-0 active:translate-y-0.5
                                        ${inputValue.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}
                                    `}
                                    disabled={inputValue.length === 0}
                                >
                                    これで OK！
                                </button>
                            </div>
                        )}

                        {/* Write Type (Japanese) */}
                        {question.type === 'write' && (
                            <div className="grid grid-cols-4 gap-2">
                                {question.chars.map((char, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleInput(char)}
                                        className={`
                                            aspect-square rounded-xl text-xl font-bold shadow-sm border-b-4 active:border-b-0 active:translate-y-1 transition-all
                                             bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 flex items-center justify-center
                                        `}
                                    >
                                        {char}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Num Pad for Calc (3x4 Layout) */}
                        {question.type === 'calc' && (
                            <div className="grid grid-cols-3 gap-2">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                                    <button
                                        key={num}
                                        onClick={() => handleInput(num.toString())}
                                        className="aspect-[4/3] rounded-xl bg-blue-50 border-blue-200 border-b-4 font-bold text-2xl text-blue-600 active:border-b-0 active:translate-y-0.5 active:bg-blue-100 flex items-center justify-center shadow-sm transition-all"
                                    >
                                        {num}
                                    </button>
                                ))}
                                {/* Bottom Row: Delete, 0, OK */}
                                <button
                                    onClick={handleBackspace}
                                    className="aspect-[4/3] rounded-xl bg-red-50 border-red-200 border-b-4 font-bold text-lg text-red-500 active:border-b-0 active:translate-y-0.5 active:bg-red-100 flex items-center justify-center shadow-sm transition-all"
                                >
                                    けす
                                </button>
                                <button
                                    onClick={() => handleInput('0')}
                                    className="aspect-[4/3] rounded-xl bg-blue-50 border-blue-200 border-b-4 font-bold text-2xl text-blue-600 active:border-b-0 active:translate-y-0.5 active:bg-blue-100 flex items-center justify-center shadow-sm transition-all"
                                >
                                    0
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={inputValue.length === 0}
                                    className={`
                                        aspect-[4/3] rounded-xl border-b-4 font-bold text-xl flex items-center justify-center shadow-sm transition-all
                                        ${inputValue.length > 0
                                            ? 'bg-blue-500 border-blue-700 text-white active:border-b-0 active:translate-y-0.5 hover:bg-blue-600'
                                            : 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed'}
                                    `}
                                >
                                    OK
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
