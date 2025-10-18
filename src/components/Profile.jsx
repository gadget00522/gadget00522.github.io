import { useState, useEffect } from 'react';

export default function Profile({ onSectionChange }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    const storedData = localStorage.getItem('userData');
    
    if (storedData) {
      const data = JSON.parse(storedData);
      if (data.isLoggedIn) {
        setUserData(data);
      } else {
        setUserData(null);
      }
    } else {
      setUserData(null);
    }
  };

  const handleLogout = () => {
    const storedData = localStorage.getItem('userData');
    
    if (storedData) {
      const data = JSON.parse(storedData);
      data.isLoggedIn = false;
      localStorage.setItem('userData', JSON.stringify(data));
      
      alert('Déconnexion réussie!');
      setUserData(null);
      onSectionChange('login');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <div className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl text-center animate-fadeIn">
        <h2 className="text-3xl font-bold mb-8">Profil Utilisateur</h2>

        {/* Profile Info */}
        <div className="flex flex-col items-center mb-8">
          {/* Avatar */}
          <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-white"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>

          {/* User Details */}
          <div>
            <h3 className="text-2xl font-semibold mb-2">
              {userData ? userData.username : 'Utilisateur Invité'}
            </h3>
            <p className="text-gray-400">
              {userData ? userData.email : 'Non connecté'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {userData ? (
            <>
              <button
                onClick={() => onSectionChange('accueil')}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40 active:translate-y-0 transition-all duration-300"
              >
                Aller au Chat
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg border border-gray-700 hover:bg-gray-700 active:bg-gray-900 transition-all duration-300"
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onSectionChange('login')}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40 active:translate-y-0 transition-all duration-300"
              >
                Se connecter
              </button>
              <button
                onClick={() => onSectionChange('signup')}
                className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg border border-gray-700 hover:bg-gray-700 active:bg-gray-900 transition-all duration-300"
              >
                Créer un compte
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
