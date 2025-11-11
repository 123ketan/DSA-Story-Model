import React, { useState, useEffect } from 'react';
import { Sword, Map, Search, Network, Zap, Trophy, Lock, ChevronRight, RotateCcw, Lightbulb } from 'lucide-react';

const DSAStoryMode = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [gameState, setGameState] = useState(null);

  const levels = [
    {
      id: 1,
      title: "Escape the Maze",
      concept: "Breadth-First Search (BFS)",
      icon: Map,
      story: "You're trapped in a mysterious dungeon. Find the shortest path to escape!",
      description: "BFS explores all neighbors at the current depth before moving deeper, guaranteeing the shortest path in unweighted graphs.",
      difficulty: "Beginner",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Find the Treasure",
      concept: "Binary Search",
      icon: Search,
      story: "Ancient scrolls hint at treasure hidden in sorted caves. Search efficiently!",
      description: "Binary Search divides the search space in half each time, achieving O(log n) time complexity.",
      difficulty: "Beginner",
      color: "from-green-500 to-emerald-500",
      locked: !completedLevels.includes(1)
    },
    {
      id: 3,
      title: "Build the Kingdom Network",
      concept: "Minimum Spanning Tree (MST)",
      icon: Network,
      story: "Connect all villages with roads using minimum resources. Use Kruskal's or Prim's algorithm!",
      description: "MST connects all nodes with minimum total edge weight, crucial for network design.",
      difficulty: "Intermediate",
      color: "from-purple-500 to-pink-500",
      locked: !completedLevels.includes(2)
    },
    {
      id: 4,
      title: "Battle the Monster Horde",
      concept: "Dynamic Programming",
      icon: Sword,
      story: "Monsters grow stronger each wave. Optimize your battle strategy using previous results!",
      description: "DP breaks problems into overlapping subproblems and stores results to avoid recomputation.",
      difficulty: "Advanced",
      color: "from-red-500 to-orange-500",
      locked: !completedLevels.includes(3)
    }
  ];

  // Level 1: BFS Maze Game
  const MazeGame = () => {
    const [maze, setMaze] = useState([
      [2, 0, 1, 0, 0],
      [0, 0, 1, 0, 1],
      [1, 0, 0, 0, 1],
      [0, 0, 1, 0, 0],
      [0, 1, 0, 0, 3]
    ]);
    const [playerPos, setPlayerPos] = useState([0, 0]);
    const [visited, setVisited] = useState(new Set(['0,0']));
    const [path, setPath] = useState([[0, 0]]);
    const [moves, setMoves] = useState(0);
    const [won, setWon] = useState(false);

    const movePlayer = (dir) => {
      if (won) return;
      
      const [r, c] = playerPos;
      let newR = r, newC = c;
      
      if (dir === 'up' && r > 0) newR = r - 1;
      if (dir === 'down' && r < 4) newR = r + 1;
      if (dir === 'left' && c > 0) newC = c - 1;
      if (dir === 'right' && c < 4) newC = c + 1;
      
      if (maze[newR][newC] === 1) return; // Wall
      
      setPlayerPos([newR, newC]);
      setVisited(prev => new Set([...prev, ${newR},${newC}]));
      setPath(prev => [...prev, [newR, newC]]);
      setMoves(moves + 1);
      
      if (maze[newR][newC] === 3) {
        setWon(true);
        if (!completedLevels.includes(1)) {
          setCompletedLevels([...completedLevels, 1]);
        }
      }
    };

    return (
      <div className="space-y-4">
        <div className="bg-gray-900 p-6 rounded-lg">
          <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
            {maze.map((row, i) => row.map((cell, j) => {
              const isPlayer = playerPos[0] === i && playerPos[1] === j;
              const isVisited = visited.has(${i},${j});
              
              return (
                <div
                  key={${i}-${j}}
                  className={`w-12 h-12 flex items-center justify-center rounded text-2xl font-bold transition-all ${
                    cell === 1 ? 'bg-gray-700' :
                    cell === 3 ? 'bg-yellow-500 animate-pulse' :
                    isPlayer ? 'bg-blue-500' :
                    isVisited ? 'bg-blue-900' :
                    'bg-gray-800'
                  }`}
                >
                  {isPlayer ? '🧙' : cell === 3 ? '🚪' : cell === 1 ? '🧱' : ''}
                </div>
              );
            }))}
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => movePlayer('up')}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
          >
            ↑
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => movePlayer('left')}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
            >
              ←
            </button>
            <button
              onClick={() => movePlayer('down')}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
            >
              ↓
            </button>
            <button
              onClick={() => movePlayer('right')}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
            >
              →
            </button>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-gray-300">Moves: {moves}</p>
          {won && (
            <div className="mt-4 p-4 bg-green-600 rounded-lg">
              <p className="text-xl font-bold text-white">🎉 Level Complete!</p>
              <p className="text-white">You explored using BFS principles!</p>
              <button
                onClick={() => setCurrentLevel(2)}
                className="mt-3 px-6 py-2 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-100 transition-all flex items-center gap-2 mx-auto"
              >
                Next Level <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Level 2: Binary Search Game
  const BinarySearchGame = () => {
    const [caves, setCaves] = useState([5, 15, 25, 35, 45, 55, 65, 75, 85, 95]);
    const [treasure, setTreasure] = useState(65);
    const [low, setLow] = useState(0);
    const [high, setHigh] = useState(9);
    const [guesses, setGuesses] = useState([]);
    const [won, setWon] = useState(false);

    const makeGuess = (index) => {
      if (won) return;
      
      const value = caves[index];
      setGuesses([...guesses, { index, value }]);
      
      if (value === treasure) {
        setWon(true);
        if (!completedLevels.includes(2)) {
          setCompletedLevels([...completedLevels, 2]);
        }
      } else if (value < treasure) {
        setLow(index + 1);
      } else {
        setHigh(index - 1);
      }
    };

    const mid = Math.floor((low + high) / 2);

    return (
      <div className="space-y-4">
        <div className="bg-gray-900 p-6 rounded-lg">
          <p className="text-center text-xl mb-4">Treasure is at value: {treasure}</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {caves.map((cave, i) => {
              const isInRange = i >= low && i <= high;
              const wasGuessed = guesses.some(g => g.index === i);
              const isMid = i === mid && isInRange;
              
              return (
                <div
                  key={i}
                  onClick={() => isInRange && makeGuess(i)}
                  className={`min-w-[60px] h-20 flex flex-col items-center justify-center rounded cursor-pointer transition-all ${
                    wasGuessed && caves[i] === treasure ? 'bg-yellow-500 animate-pulse' :
                    wasGuessed ? 'bg-red-900' :
                    isMid ? 'bg-green-600 hover:bg-green-700' :
                    isInRange ? 'bg-gray-700 hover:bg-gray-600' :
                    'bg-gray-800 opacity-50'
                  }`}
                >
                  <div className="text-2xl">🗻</div>
                  <div className="text-xs">{cave}</div>
                </div>
              );
            })}
          </div>
          {!won && low <= high && (
            <div className="mt-4 p-3 bg-green-900 rounded text-center">
              <p className="text-green-300">Binary Search suggests: Cave {mid} (value {caves[mid]})</p>
              <p className="text-sm text-green-400 mt-1">Click to search!</p>
            </div>
          )}
        </div>
        
        <div className="text-center">
          <p className="text-gray-300">Searches made: {guesses.length}</p>
          <p className="text-sm text-gray-400">Optimal: {Math.ceil(Math.log2(caves.length))} searches</p>
          {won && (
            <div className="mt-4 p-4 bg-green-600 rounded-lg">
              <p className="text-xl font-bold text-white">🎉 Treasure Found!</p>
              <p className="text-white">You used Binary Search efficiently!</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Level 3: MST Game
  const MSTGame = () => {
    const [villages] = useState([
      { id: 'A', x: 50, y: 50 },
      { id: 'B', x: 150, y: 80 },
      { id: 'C', x: 100, y: 150 },
      { id: 'D', x: 200, y: 120 },
      { id: 'E', x: 250, y: 50 }
    ]);
    
    const [edges] = useState([
      { from: 'A', to: 'B', cost: 4 },
      { from: 'A', to: 'C', cost: 2 },
      { from: 'B', to: 'C', cost: 1 },
      { from: 'B', to: 'D', cost: 5 },
      { from: 'C', to: 'D', cost: 8 },
      { from: 'C', to: 'E', cost: 10 },
      { from: 'D', to: 'E', cost: 2 }
    ]);
    
    const [selectedEdges, setSelectedEdges] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [won, setWon] = useState(false);

    const optimalCost = 9; // Correct MST cost

    const toggleEdge = (edge) => {
      if (won) return;
      
      const isSelected = selectedEdges.some(e => 
        (e.from === edge.from && e.to === edge.to) || 
        (e.from === edge.to && e.to === edge.from)
      );
      
      let newEdges;
      if (isSelected) {
        newEdges = selectedEdges.filter(e => 
          !((e.from === edge.from && e.to === edge.to) || 
            (e.from === edge.to && e.to === edge.from))
        );
      } else {
        newEdges = [...selectedEdges, edge];
      }
      
      setSelectedEdges(newEdges);
      const cost = newEdges.reduce((sum, e) => sum + e.cost, 0);
      setTotalCost(cost);
      
      if (newEdges.length === 4 && cost === optimalCost) {
        setWon(true);
        if (!completedLevels.includes(3)) {
          setCompletedLevels([...completedLevels, 3]);
        }
      }
    };

    return (
      <div className="space-y-4">
        <div className="bg-gray-900 p-6 rounded-lg">
          <svg width="300" height="200" className="mx-auto">
            {edges.map((edge, i) => {
              const from = villages.find(v => v.id === edge.from);
              const to = villages.find(v => v.id === edge.to);
              const isSelected = selectedEdges.some(e => 
                (e.from === edge.from && e.to === edge.to) || 
                (e.from === edge.to && e.to === edge.from)
              );
              
              return (
                <g key={i} onClick={() => toggleEdge(edge)} className="cursor-pointer">
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={isSelected ? '#10b981' : '#4b5563'}
                    strokeWidth={isSelected ? '3' : '2'}
                    className="transition-all"
                  />
                  <text
                    x={(from.x + to.x) / 2}
                    y={(from.y + to.y) / 2}
                    fill="white"
                    fontSize="12"
                    className="pointer-events-none"
                  >
                    {edge.cost}
                  </text>
                </g>
              );
            })}
            
            {villages.map((v, i) => (
              <g key={i}>
                <circle cx={v.x} cy={v.y} r="15" fill="#3b82f6" />
                <text x={v.x} y={v.y} textAnchor="middle" dy="5" fill="white" fontWeight="bold">
                  {v.id}
                </text>
              </g>
            ))}
          </svg>
        </div>
        
        <div className="text-center">
          <p className="text-gray-300">Total Cost: {totalCost}</p>
          <p className="text-sm text-gray-400">Edges: {selectedEdges.length}/4 | Target: {optimalCost}</p>
          <p className="text-xs text-gray-500 mt-2">Click edges to build roads between villages</p>
          {won && (
            <div className="mt-4 p-4 bg-green-600 rounded-lg">
              <p className="text-xl font-bold text-white">🎉 Perfect Network!</p>
              <p className="text-white">You found the Minimum Spanning Tree!</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Level 4: DP Battle Game
  const DPBattleGame = () => {
    const [waves] = useState([
      { monsters: 3, power: 5 },
      { monsters: 5, power: 8 },
      { monsters: 4, power: 12 },
      { monsters: 6, power: 15 }
    ]);
    
    const [strategy, setStrategy] = useState([]);
    const [totalDamage, setTotalDamage] = useState(0);
    const [won, setWon] = useState(false);

    const chooseAction = (waveIndex, action) => {
      if (strategy.length !== waveIndex) return;
      
      const wave = waves[waveIndex];
      let damage = 0;
      
      if (action === 'attack') {
        damage = wave.monsters * 2;
      } else if (action === 'defend') {
        damage = wave.power / 2;
      } else if (action === 'combo') {
        const prevDamage = strategy.length > 0 ? strategy[strategy.length - 1].damage : 0;
        damage = (wave.monsters + wave.power) * 1.5 + prevDamage * 0.1;
      }
      
      const newStrategy = [...strategy, { action, damage }];
      setStrategy(newStrategy);
      const total = newStrategy.reduce((sum, s) => sum + s.damage, 0);
      setTotalDamage(Math.floor(total));
      
      if (newStrategy.length === waves.length && total >= 100) {
        setWon(true);
        if (!completedLevels.includes(4)) {
          setCompletedLevels([...completedLevels, 4]);
        }
      }
    };

    return (
      <div className="space-y-4">
        <div className="bg-gray-900 p-6 rounded-lg space-y-4">
          {waves.map((wave, i) => (
            <div key={i} className={p-4 rounded ${strategy.length > i ? 'bg-gray-800' : strategy.length === i ? 'bg-gray-700' : 'bg-gray-900 opacity-50'}}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">Wave {i + 1}</span>
                <span className="text-sm">👹 {wave.monsters} monsters | ⚡ {wave.power} power</span>
              </div>
              
              {strategy.length === i && !won && (
                <div className="flex gap-2">
                  <button
                    onClick={() => chooseAction(i, 'attack')}
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                  >
                    Attack ({wave.monsters * 2} dmg)
                  </button>
                  <button
                    onClick={() => chooseAction(i, 'defend')}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                  >
                    Defend ({wave.power / 2} dmg)
                  </button>
                  <button
                    onClick={() => chooseAction(i, 'combo')}
                    className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded"
                  >
                    Combo (DP boost!)
                  </button>
                </div>
              )}
              
              {strategy[i] && (
                <div className="mt-2 text-green-400 text-sm">
                  ✓ {strategy[i].action.toUpperCase()}: {Math.floor(strategy[i].damage)} damage
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-gray-300">Total Damage: {totalDamage} / 100</p>
          <p className="text-xs text-gray-500 mt-1">Combo actions use DP to build on previous results!</p>
          {won && (
            <div className="mt-4 p-4 bg-green-600 rounded-lg">
              <p className="text-xl font-bold text-white">🎉 Victory!</p>
              <p className="text-white">You mastered Dynamic Programming!</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderGame = () => {
    switch(currentLevel) {
      case 1: return <MazeGame />;
      case 2: return <BinarySearchGame />;
      case 3: return <MSTGame />;
      case 4: return <DPBattleGame />;
      default: return null;
    }
  };

  const currentLevelData = levels.find(l => l.id === currentLevel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            DSA Story Mode
          </h1>
          <p className="text-gray-400">Master algorithms through epic adventures</p>
        </div>

        {/* Level Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {levels.map((level) => {
            const Icon = level.icon;
            const isCompleted = completedLevels.includes(level.id);
            const isCurrent = currentLevel === level.id;
            
            return (
              <div
                key={level.id}
                onClick={() => !level.locked && setCurrentLevel(level.id)}
                className={`relative p-6 rounded-xl cursor-pointer transition-all ${
                  level.locked ? 'opacity-50 cursor-not-allowed' :
                  isCurrent ? 'ring-4 ring-purple-500' : 'hover:scale-105'
                } bg-gradient-to-br ${level.color}`}
              >
                {level.locked && (
                  <div className="absolute top-2 right-2">
                    <Lock size={20} />
                  </div>
                )}
                {isCompleted && (
                  <div className="absolute top-2 right-2">
                    <Trophy className="text-yellow-300" size={24} />
                  </div>
                )}
                
                <Icon size={32} className="mb-2" />
                <h3 className="font-bold text-lg mb-1">{level.title}</h3>
                <p className="text-xs opacity-90 mb-2">{level.concept}</p>
                <span className="text-xs px-2 py-1 bg-black bg-opacity-30 rounded">
                  {level.difficulty}
                </span>
              </div>
            );
          })}
        </div>

        {/* Current Level */}
        {currentLevelData && (
          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-3xl font-bold mb-2">{currentLevelData.title}</h2>
                <p className="text-gray-300 mb-2">{currentLevelData.story}</p>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300"
                >
                  <Lightbulb size={16} />
                  {showHint ? 'Hide' : 'Show'} Algorithm Explanation
                </button>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
              >
                <RotateCcw size={16} />
                Reset
              </button>
            </div>

            {showHint && (
              <div className="mb-4 p-4 bg-blue-900 bg-opacity-50 rounded-lg border border-blue-500">
                <p className="text-sm text-blue-200">{currentLevelData.description}</p>
              </div>
            )}

            {renderGame()}
          </div>
        )}

        {/* Progress */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-full">
            <Zap className="text-yellow-400" size={20} />
            <span className="font-bold">Progress: {completedLevels.length}/{levels.length} Levels Complete</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSAStoryMode;
