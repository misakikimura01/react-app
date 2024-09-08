import React, {useState} from "react";
import './App.css';
import Counter from './components/Counter.tsx';
import Todo from './components/Todo.tsx';
import Timer from './components/Timer.tsx';
import Calculator from './components/Calculator.tsx'; 
import ProfileCard from './components/ProfileCard.tsx'; 
import WeatherApp from './components/WeatherApp.tsx';
import Calendar from './components/Calendar.tsx';
import NoteApp from './components/NoteApp.tsx';
import QuizApp from './components/QuizApp.tsx';
import ImageGallery from './components/ImageGallery.tsx';


const tabs = [
  { name: 'Counter', component: <Counter /> },
  { name: 'TodoApp', component: <Todo /> },
  { name: 'TimerApp', component: <Timer /> },
  { name: 'Calculator', component: <Calculator /> },
  { name: 'ProfileCard', component: <ProfileCard /> },
  { name: 'WeatherApp', component: <WeatherApp /> },
  { name: 'Calendar', component: <Calendar /> },
  { name: 'NoteApp', component: <NoteApp /> },
  { name: 'QuizApp', component: <QuizApp /> },
  { name: 'ImageGallery', component: <ImageGallery /> },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Counter');

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const renderActiveComponent = () => {
    const activeTabContent = tabs.find(tab => tab.name === activeTab);
    return activeTabContent?.component;
  };

  return (
    <div className="App">
      <div className="tab-navigation">
        {tabs.map(tab => (
          <button
            key={tab.name}
            className={`tab-button ${activeTab === tab.name ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.name)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default App;
