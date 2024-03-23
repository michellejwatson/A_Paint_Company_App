import logo from './assets/logo.svg';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import KanbanBoard from './components/KanbanBoard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
        <KanbanBoard />
      </header>
    </div>
  );
}

export default App;
