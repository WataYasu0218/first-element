import { STATIC_JAPANESE_QUESTIONS, KATAKANA_TO_HIRAGANA, HIRAGANA_TO_KATAKANA } from '../data/questions';

export const generateMathProblem = (playerLevel, difficulty, lastType) => {
    const effectiveLevel = playerLevel + difficulty;

    let typeIndex = Math.floor(Math.random() * 6);
    if (lastType && lastType === typeIndex) {
        typeIndex = (typeIndex + 1) % 6;
    }
    const currentType = typeIndex;

    if (currentType === 0) { // Clock
        const hour = Math.floor(Math.random() * 12) + 1;
        const minuteOptions = effectiveLevel >= 3 ? [0, 15, 30, 45] : [0, 30];
        const minute = minuteOptions[Math.floor(Math.random() * minuteOptions.length)];

        let timeText = '';
        if (minute === 0) timeText = `${hour}じ`;
        else if (minute === 30) timeText = `${hour}じはん`;
        else timeText = `${hour}じ${minute}ふん`;

        const correct = timeText;
        let options = [correct];

        while (options.length < 3) {
            const r = Math.random();
            let fakeText = '';
            if (r < 0.3) {
                const fh = (hour % 12) + 1;
                if (minute === 0) fakeText = `${fh}じ`;
                else if (minute === 30) fakeText = `${fh}じはん`;
                else fakeText = `${fh}じ${minute}ふん`;
            } else if (r < 0.6) {
                const fm = minute === 0 ? 30 : 0;
                if (fm === 0) fakeText = `${hour}じ`;
                else fakeText = `${hour}じはん`;
            } else {
                const fh = Math.floor(Math.random() * 12) + 1;
                fakeText = `${fh}じ`;
            }

            if (!options.includes(fakeText) && fakeText !== '') options.push(fakeText);
            if (options.length < 3 && options.length === 1) {
                options.push('1じ');
                options.push('12じ');
            }
        }
        options = options.sort(() => Math.random() - 0.5);

        return {
            problemType: 0,
            type: 'select',
            question: 'とけいを みて こたえよう',
            visualType: 'clock',
            visualData: { hour, minute },
            options: options,
            answer: correct,
            hint: 'みじかいはりと ながいはりを よくみてね'
        };
    } else if (currentType === 1) { // Money
        const use100 = effectiveLevel >= 4;
        const count100 = use100 ? (Math.random() > 0.7 ? 1 : 0) : 0;
        const count10 = Math.floor(Math.random() * 5) + 1;
        const count1 = Math.floor(Math.random() * 6);
        const total = count100 * 100 + count10 * 10 + count1;
        return {
            problemType: 1,
            type: 'calc',
            question: 'あわせて いくら？',
            visualType: 'money',
            visualData: { count100, count10, count1 },
            answer: total.toString(),
            hint: 'おおきい お金から かぞえよう'
        };
    } else if (currentType === 2) { // Blocks
        const maxBlocks = effectiveLevel >= 3 ? 12 : 6;
        const count = Math.floor(Math.random() * (maxBlocks - 3)) + 3;
        return { problemType: 2, type: 'calc', question: 'しかくは いくつ ある？', visualType: 'block', visualData: { count }, answer: count.toString(), hint: 'ひとつずつ かぞえてね' };
    } else if (currentType === 3) { // Order
        const animals = ['🐶', '🐱', '🐭', '🐹', '🐰'];
        const shuffled = [...animals].sort(() => Math.random() - 0.5);
        const targetIndex = Math.floor(Math.random() * 5);
        const isRight = Math.random() > 0.5;
        const targetAnimal = isRight ? shuffled[4 - targetIndex] : shuffled[targetIndex];
        const otherAnimals = animals.filter(a => a !== targetAnimal);
        const wrongOptions = otherAnimals.sort(() => Math.random() - 0.5).slice(0, 2);
        const options = [...wrongOptions, targetAnimal].sort(() => Math.random() - 0.5);
        return { problemType: 3, type: 'select', question: `【 ${shuffled.join(' ')} 】\n${isRight ? 'みぎ' : 'ひだり'}から ${targetIndex + 1}ばんめ は？`, options: options, answer: targetAnimal, hint: isRight ? 'みぎ（→）の ほうから かぞえてね' : 'ひだり（←）の ほうから かぞえてね' };
    } else if (currentType === 4) { // Shapes
        const shapes = ['さんかく', 'しかく', 'まる'];
        const target = shapes[Math.floor(Math.random() * shapes.length)];
        const otherShapes = shapes.filter(s => s !== target);
        const options = [...otherShapes, target].sort(() => Math.random() - 0.5);
        return { problemType: 4, type: 'select', question: 'この かたちの なまえは？', visualType: 'shape', visualData: { shape: target }, options: options, answer: target, hint: 'かたちを よくみてね' };
    } else { // Calculation
        const subType = Math.random();
        if (subType < 0.3) {
            const maxNum = effectiveLevel >= 4 ? 9 : 5;
            const a = Math.floor(Math.random() * maxNum) + 1;
            const b = Math.floor(Math.random() * maxNum) + 1;
            const c = Math.floor(Math.random() * maxNum) + 1;

            if (effectiveLevel >= 3 && Math.random() > 0.7) {
                const start = Math.floor(Math.random() * 10) + 10;
                const safeStart = Math.max(start, a + b);
                return { problemType: 5, type: 'calc', question: `${safeStart} - ${a} - ${b} = ?`, answer: (safeStart - a - b).toString(), hint: 'ひきざんだよ' };
            }
            return { problemType: 5, type: 'calc', question: `${a} + ${b} + ${c} = ?`, answer: (a + b + c).toString(), hint: 'じゅんばんに たしていこう' };
        } else if (subType < 0.5) {
            const a = Math.floor(Math.random() * 9) + 1;
            const b = Math.floor(Math.random() * 9) + 1;
            return { problemType: 5, type: 'calc', question: `${a} + [ ? ] = ${a + b}`, answer: b.toString(), hint: 'なにをたすと こたえになるかな？' };
        } else if (subType < 0.8) {
            const isAdd = Math.random() > 0.5;
            if (isAdd) {
                let a, b;
                if (effectiveLevel >= 3 && Math.random() > 0.5) {
                    a = Math.floor(Math.random() * 8) + 2;
                    b = Math.floor(Math.random() * (9 - (10 - a)) + (10 - a));
                } else if (effectiveLevel >= 5 && Math.random() > 0.6) {
                    a = Math.floor(Math.random() * 20) + 10;
                    b = Math.floor(Math.random() * 9) + 1;
                } else {
                    a = Math.floor(Math.random() * 10) + 1;
                    b = Math.floor(Math.random() * 10) + 1;
                }
                return { problemType: 5, type: 'calc', question: `${a} + ${b} = ?`, answer: (a + b).toString() };
            } else {
                const a = Math.floor(Math.random() * 15) + 5;
                const b = Math.floor(Math.random() * a);
                return { problemType: 5, type: 'calc', question: `${a} - ${b} = ?`, answer: (a - b).toString() };
            }
        } else {
            const scenarios = [
                { t: 'みかんが {a}こ あります。{b}こ もらいました。あわせて いくつ？', op: '+' },
                { t: 'こうえんに {a}にん いました。{b}にん かえりました。のこりは 何にん？', op: '-' },
                { t: 'アメを {a}こ もっています。{b}こ たべました。のこりは いくつ？', op: '-' },
                { t: 'バスに {a}にん のっています。{b}にん のってきました。ぜんぶで 何にん？', op: '+' },
                { t: 'えんぴつを {a}ほん かいました。{b}ほん つかいました。のこりは？', op: '-' }
            ];
            const s = scenarios[Math.floor(Math.random() * scenarios.length)];
            const maxNum = effectiveLevel >= 4 ? 15 : 8;
            const a = Math.floor(Math.random() * maxNum) + 2;
            const b = Math.floor(Math.random() * 5) + 1;
            let ans, finalA, finalB;
            if (s.op === '+') {
                finalA = a; finalB = b; ans = a + b;
            } else {
                finalA = Math.max(a, b);
                finalB = Math.min(a, b);
                if (finalA === finalB) finalA++;
                ans = finalA - finalB;
            }
            return { problemType: 5, type: 'calc', question: s.t.replace('{a}', finalA).replace('{b}', finalB), answer: ans.toString(), hint: 'しきを かんがえてみよう' };
        }
    }
};

export const generateJapaneseQuestion = (lastType) => {
    const type = Math.random();
    let currentType = type < 0.3 ? 0 : 1;

    if (lastType !== null && lastType === currentType) {
        currentType = 1 - currentType;
    }

    if (currentType === 0) {
        const isKatakanaQuestion = Math.random() > 0.5;
        if (isKatakanaQuestion) {
            const item = KATAKANA_TO_HIRAGANA[Math.floor(Math.random() * KATAKANA_TO_HIRAGANA.length)];
            const shuffled = [...item.chars].sort(() => Math.random() - 0.5);
            return {
                problemType: 10,
                type: 'write',
                question: `カタカナの「${item.word}」を\nひらがなで かこう`,
                answer: item.answer,
                chars: shuffled
            };
        } else {
            const item = HIRAGANA_TO_KATAKANA[Math.floor(Math.random() * HIRAGANA_TO_KATAKANA.length)];
            const shuffled = [...item.chars].sort(() => Math.random() - 0.5);
            return {
                problemType: 10,
                type: 'write',
                question: `ひらがなの「${item.word}」を\nカタカナで かこう`,
                answer: item.answer,
                chars: shuffled
            };
        }
    }
    else {
        return {
            problemType: 11,
            ...STATIC_JAPANESE_QUESTIONS[Math.floor(Math.random() * STATIC_JAPANESE_QUESTIONS.length)]
        };
    }
};
