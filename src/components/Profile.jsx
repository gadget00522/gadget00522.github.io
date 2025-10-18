import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
      <motion.div 
        className="w-full max-w-lg bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-2xl text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Profil Utilisateur</h2>

        {/* Profile Info */}
        <div className="flex flex-col items-center mb-8">
          {/* Avatar */}
          <motion.div 
            className="w-24 h-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
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
          </motion.div>

          {/* User Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
              {userData ? userData.username : 'Utilisateur Invité'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {userData ? userData.email : 'Non connecté'}
            </p>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {userData ? (
            <>
              <motion.button
                onClick={() => onSectionChange('accueil')}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                Aller au Chat
              </motion.button>
              <motion.button
                onClick={handleLogout}
                className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                Se déconnecter
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                onClick={() => onSectionChange('login')}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                Se connecter
              </motion.button>
              <motion.button
                onClick={() => onSectionChange('signup')}
                className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                Créer un compte
              </motion.button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
