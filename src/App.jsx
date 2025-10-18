import { useState } from 'react';
import Navigation from './components/Navigation';
import Chat from './components/Chat';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
  const [activeSection, setActiveSection] = useState('accueil');

  const renderSection = () => {
    switch (activeSection) {
      case 'accueil':
        return <Chat />;
      case 'signup':
        return <SignUp onSectionChange={setActiveSection} />;
      case 'login':
        return <Login onSectionChange={setActiveSection} />;
      case 'profile':
        return <Profile onSectionChange={setActiveSection} />;
      default:
        return <Chat />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="pt-16">
        {renderSection()}
      </main>
    </div>
  );
}

export default App;
