import React, { useState, useEffect, useCallback } from 'react';
import { Sword, Shield, Book, Calculator, Star, ShoppingBag, Trophy, Home, Heart, Zap, Play, Clock, RefreshCcw, Skull, Sparkles, AlertTriangle } from 'lucide-react';
import { INITIAL_MONSTERS, LEVELS, ITEMS } from './data/monsters';
import { generateMathProblem, generateJapaneseQuestion } from './utils/problems';
import { HomeScreen } from './components/HomeScreen';
import { BattleScreen } from './components/BattleScreen';
import { MonsterBook } from './components/MonsterBook';

const TIME_LIMIT = 15;

function App() {
    const [screen, setScreen] = useState('home');
    const [subject, setSubject] = useState(null);
    const [monsters, setMonsters] = useState(INITIAL_MONSTERS);

    // Load player from local storage or default
    const [player, setPlayer] = useState(() => {
        const saved = localStorage.getItem('winter_adventure_player');
        return saved ? JSON.parse(saved) : {
            name: 'ゆうしゃ',
            level: 1,
            exp: 0,
            coins: 0,
            items: [],
            maxHp: 5,
            hp: 5,
            defeatedMonsters: [] // New: Track defeated IDs for Monster Book
        };
    });

    // Save player state
    useEffect(() => {
        localStorage.setItem('winter_adventure_player', JSON.stringify(player));
    }, [player]);

    const [currentMonster, setCurrentMonster] = useState(null);
    const [monsterHp, setMonsterHp] = useState(0);
    const [question, setQuestion] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [message, setMessage] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [streak, setStreak] = useState(0);
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
    const [timerActive, setTimerActive] = useState(false);
    const [showLevelUp, setShowLevelUp] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [showEncounter, setShowEncounter] = useState(false);
    const [lastQuestionType, setLastQuestionType] = useState(null);
    const [showHitEffect, setShowHitEffect] = useState(false);

    const playSound = (type) => {
        // Placeholder for sound effect logic
        console.log(`Playing sound: ${type}`);
    };

    // Timer Logic
    useEffect(() => {
        let timer = null;
        if (timerActive && timeLeft > 0 && screen === 'battle' && isCorrect === null && !isGameOver && !showEncounter) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && timerActive) {
            handleTimeUp();
        }
        return () => clearInterval(timer);
    }, [timerActive, timeLeft, screen, isCorrect, isGameOver, showEncounter]);

    // Level Up Logic
    useEffect(() => {
        const nextLevelExp = LEVELS[player.level];
        if (nextLevelExp && player.exp >= nextLevelExp) {
            setPlayer(prev => ({
                ...prev,
                level: prev.level + 1,
                maxHp: prev.maxHp + 2,
                hp: prev.maxHp + 2
            }));
            setShowLevelUp(true);
            setTimeout(() => setShowLevelUp(false), 3000);
            playSound('levelup');
        }
    }, [player.exp, player.level]);

    const takeDamage = useCallback(() => {
        if (!currentMonster) return false;
        const defense = player.items.filter(i => i.type === 'armor').reduce((a, c) => a + c.defense, 0);
        const damage = Math.max(1, currentMonster.attack - defense);

        setPlayer(prev => {
            const newHp = Math.max(0, prev.hp - damage);
            if (newHp === 0) {
                setTimerActive(false);
                setTimeout(() => {
                    setIsGameOver(true);
                    playSound('defeat');
                }, 800);
            }
            return { ...prev, hp: newHp };
        });

        if (player.hp > 0) {
            playSound('damage');
        }
        return player.hp - damage <= 0; // Returns true if player dies
    }, [currentMonster, player.items, player.hp]);

    const handleTimeUp = () => {
        setTimerActive(false);
        setIsCorrect(false);
        playSound('error');
        setStreak(0);

        const willDie = takeDamage();
        if (!willDie && player.hp > 0) {
            setTimeout(() => {
                if (!isGameOver) nextQuestion(subject);
            }, 2000);
        }
    };

    const handleRestart = () => {
        setIsGameOver(false);
        setScreen('home');
        setPlayer(prev => ({ ...prev, hp: prev.maxHp }));
        setMessage('');
    };

    const getNextMonsterData = (currentLevel, currentId) => {
        const isRare = Math.random() < 0.05;
        let candidates = [];
        if (isRare) {
            candidates = monsters.filter(m => m.isRare && currentLevel >= (m.minLevel || 1));
        }
        if (candidates.length === 0) {
            candidates = monsters.filter(m => !m.isRare && currentLevel >= (m.minLevel || 1));
        }
        if (candidates.length === 0) candidates = monsters;

        if (currentId && candidates.length > 1) {
            candidates = candidates.filter(m => m.id !== currentId);
        }
        if (candidates.length === 0) candidates = monsters;

        return candidates[Math.floor(Math.random() * candidates.length)];
    };

    const startBattle = (subj) => {
        setSubject(subj);
        setScreen('battle');

        const m = getNextMonsterData(player.level, null);

        setCurrentMonster(m);
        setMonsterHp(m.hp);

        if (m.isRare || m.isBoss) {
            setShowEncounter(true);
            setTimerActive(false);
            setTimeout(() => {
                setShowEncounter(false);
                setTimerActive(true);
                setTimeLeft(m.timeLimit || TIME_LIMIT);
            }, 2000);
        } else {
            setTimerActive(true);
            setTimeLeft(m.timeLimit || TIME_LIMIT);
        }

        let q;
        if (subj === 'math') {
            q = generateMathProblem(player.level, m.difficulty || 0, lastQuestionType);
        } else {
            q = generateJapaneseQuestion(lastQuestionType);
        }
        setLastQuestionType(q.problemType);
        setQuestion(q);
        setUserAnswer('');
        setIsCorrect(null);
        setMessage('');
    };

    const nextMonster = (overrideSubject = null) => {
        const m = getNextMonsterData(player.level, currentMonster?.id);

        setCurrentMonster(m);
        setMonsterHp(m.hp);

        if (m.isRare || m.isBoss) {
            setShowEncounter(true);
            setTimerActive(false);
            setTimeout(() => {
                setShowEncounter(false);
                setTimerActive(true);
                setTimeLeft(m.timeLimit || TIME_LIMIT);
            }, 2000);
        } else {
            setTimerActive(true);
            setTimeLeft(m.timeLimit || TIME_LIMIT);
        }

        nextQuestion(overrideSubject || subject);
        setMessage('');
    };

    const nextQuestion = (currentSubject) => {
        let q;
        if (currentSubject === 'math') {
            q = generateMathProblem(player.level, currentMonster?.difficulty || 0, lastQuestionType);
        } else {
            q = generateJapaneseQuestion(lastQuestionType);
        }
        setLastQuestionType(q.problemType);
        setQuestion(q);
        setUserAnswer('');
        setIsCorrect(null);
        setTimeLeft(currentMonster?.timeLimit || TIME_LIMIT);
        setTimerActive(true);
    };

    const handleAnswer = (ans) => {
        if (isCorrect !== null) return;
        setTimerActive(false);

        if (ans === question.answer) {
            setIsCorrect(true);
            setShowHitEffect(true);
            setTimeout(() => setShowHitEffect(false), 400);
            playSound('success');

            const damage = 1 + (player.items.filter(i => i.type === 'weapon').reduce((acc, i) => acc + i.power, 0));
            const newMonsterHp = Math.max(0, monsterHp - damage);
            setMonsterHp(newMonsterHp);
            setStreak(s => s + 1);

            if (newMonsterHp <= 0) {
                // Monster Defeated
                setTimeout(() => {
                    const bonusCoin = Math.floor(streak / 3) * 5;
                    setPlayer(prev => {
                        const newDefeated = prev.defeatedMonsters && prev.defeatedMonsters.includes(currentMonster.id)
                            ? prev.defeatedMonsters
                            : [...(prev.defeatedMonsters || []), currentMonster.id];

                        return {
                            ...prev,
                            exp: prev.exp + currentMonster.exp,
                            coins: prev.coins + currentMonster.coin + bonusCoin,
                            defeatedMonsters: newDefeated
                        };
                    });

                    setTimeout(() => {
                        nextMonster();
                    }, 1000);
                }, 500);
            } else {
                setTimeout(() => {
                    nextQuestion(subject);
                }, 1000);
            }

        } else {
            setIsCorrect(false);
            playSound('error');
            setStreak(0);

            const willDie = takeDamage();
            if (!willDie && player.hp > 0) {
                setTimeout(() => {
                    setIsCorrect(null);
                    setUserAnswer('');
                    setMessage('');
                    setTimeLeft(currentMonster?.timeLimit || TIME_LIMIT);
                    setTimerActive(true);
                }, 1500);
            }
        }
    };

    const buyItem = (item) => {
        if (player.coins < item.cost) {
            setMessage('コインがたりないよ');
            setTimeout(() => setMessage(''), 2000);
            return;
        }

        if (item.type === 'consumable' && item.effect === 'heal') {
            if (player.hp >= player.maxHp) {
                setMessage('HPはまんたんだよ');
                setTimeout(() => setMessage(''), 2000);
                return;
            }
            setPlayer(prev => ({
                ...prev,
                coins: prev.coins - item.cost,
                hp: prev.maxHp
            }));
            setMessage('元気の薬をつかった！');
            setTimeout(() => setMessage(''), 2000);
        } else if (!player.items.find(i => i.id === item.id)) {
            setPlayer(prev => ({
                ...prev,
                coins: prev.coins - item.cost,
                items: [...prev.items, item]
            }));
            setMessage('アイテムをかった！');
            setTimeout(() => setMessage(''), 2000);
        }
    };

    return (
        <div className="w-full h-full relative overflow-hidden bg-slate-900 text-slate-800 font-sans select-none">
            {screen === 'home' && (
                <HomeScreen
                    player={player}
                    onStartBattle={startBattle}
                    onOpenBook={() => setScreen('book')}
                    items={ITEMS}
                    onBuyItem={buyItem}
                    message={message}
                />
            )}

            {screen === 'battle' && (
                <BattleScreen
                    player={player}
                    monster={currentMonster}
                    monsterHp={monsterHp}
                    question={question}
                    timeLeft={timeLeft}
                    onAnswer={handleAnswer}
                    isCorrect={isCorrect}
                    showHitEffect={showHitEffect}
                    showEncounter={showEncounter}
                    isGameOver={isGameOver}
                    onRestart={handleRestart}
                    onRetreat={() => setScreen('home')}
                />
            )}

            {screen === 'book' && (
                <MonsterBook
                    monsters={monsters}
                    defeatedMonsters={player.defeatedMonsters || []}
                    onClose={() => setScreen('home')}
                />
            )}

            {showLevelUp && (
                <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/70 animate-in fade-in duration-300">
                    <div className="text-center animate-bounce">
                        <h2 className="text-6xl font-bold text-yellow-300 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] border-text">レベルアップ！</h2>
                        <div className="text-4xl text-white mt-4">Lv {player.level} になった！</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
