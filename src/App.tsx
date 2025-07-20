import GameBoard from './components/GameBoard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        🧠 Memory Match Game
      </h1>
      <GameBoard />
    </div>
  );
}

export default App;
