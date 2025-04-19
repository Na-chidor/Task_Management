//src/App.js

import './App.css';
import Filterbar from './Components/Filterbar';
import Navbar from './Components/Navbar';
import { TaskProvider } from './assets/Context/TaskContext';
import Tasks from "./Components/TaskList";
import Dashboard from './Components/Dashboard';

function App() {
    return (
        <>
            <TaskProvider>
                <Navbar />
                <Filterbar />
                <div className="flex flex-col lg:flex-row gap-2 justify-center">
          <div className="w-full basis-3/4">
                <Tasks />
                </div>
          <div className="full basis-1/4">
            <Dashboard />
          </div>
          </div>
            </TaskProvider>
        </>
    );
}

export default App;
