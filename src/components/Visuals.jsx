import React from 'react';

export const AnalogClock = ({ hour, minute }) => {
    const minuteDeg = (minute / 60) * 360;
    const hourDeg = ((hour % 12) / 12) * 360 + (minute / 60) * 30;

    return (
        <div className="relative w-20 h-20 bg-white rounded-full border-4 border-gray-700 shadow-md mx-auto my-1 box-content flex-shrink-0">
            {[...Array(12)].map((_, i) => (
                <div key={i} className="absolute w-full h-full left-0 top-0" style={{ transform: `rotate(${i * 30}deg)` }}>
                    <div className="mx-auto w-0.5 h-1.5 bg-gray-400 mt-0.5"></div>
                </div>
            ))}
            <div className="absolute w-1 h-2 bg-red-400 left-1/2 top-0 -translate-x-1/2 mt-0.5" />
            <div className="absolute w-1 h-2 bg-gray-600 left-1/2 bottom-0 -translate-x-1/2 mb-0.5" />
            <div className="absolute h-1 w-2 bg-gray-600 top-1/2 right-0 -translate-y-1/2 mr-0.5" />
            <div className="absolute h-1 w-2 bg-gray-600 top-1/2 left-0 -translate-y-1/2 ml-0.5" />
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-black rounded-full -translate-x-1/2 -translate-y-1/2 z-20 border-2 border-white" />
            <div className="absolute top-1/2 left-1/2 w-1.5 h-6 bg-black rounded-full z-10 origin-bottom" style={{ transform: `translate(-50%, -100%) rotate(${hourDeg}deg)` }} />
            <div className="absolute top-1/2 left-1/2 w-1 h-8 bg-gray-800 rounded-full z-10 origin-bottom" style={{ transform: `translate(-50%, -100%) rotate(${minuteDeg}deg)` }} />
        </div>
    );
};

export const MoneyVisual = ({ count100, count10, count1 }) => {
    return (
        <div className="flex flex-wrap justify-center gap-1 my-1 max-w-[200px] mx-auto">
            {[...Array(count100)].map((_, i) => (
                <div key={`100-${i}`} className="w-9 h-9 rounded-full bg-gray-200 border-2 border-gray-400 flex items-center justify-center font-bold text-gray-600 text-xs shadow-sm">100</div>
            ))}
            {[...Array(count10)].map((_, i) => (
                <div key={`10-${i}`} className="w-8 h-8 rounded-full bg-orange-300 border-2 border-orange-500 flex items-center justify-center font-bold text-orange-800 text-xs shadow-sm">10</div>
            ))}
            {[...Array(count1)].map((_, i) => (
                <div key={`1-${i}`} className="w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center font-bold text-gray-500 text-[10px] shadow-sm">1</div>
            ))}
        </div>
    );
};

export const BlockVisual = ({ count }) => {
    return (
        <div className="flex flex-wrap justify-center gap-1 my-2 max-w-[150px] mx-auto">
            {[...Array(count)].map((_, i) => (
                <div key={i} className="w-7 h-7 bg-blue-400 border-b-4 border-r-4 border-blue-600 rounded-sm"></div>
            ))}
        </div>
    );
};

export const ShapeVisual = ({ shape }) => {
    if (shape === 'さんかく') return <div className="w-0 h-0 border-l-[35px] border-l-transparent border-r-[35px] border-r-transparent border-b-[60px] border-b-green-500 mx-auto my-2 drop-shadow-md"></div>;
    if (shape === 'しかく') return <div className="w-16 h-16 bg-blue-500 mx-auto my-2 border-4 border-blue-700 shadow-md"></div>;
    if (shape === 'まる') return <div className="w-16 h-16 bg-red-500 rounded-full mx-auto my-2 border-4 border-red-700 shadow-md"></div>;
    return null;
};
