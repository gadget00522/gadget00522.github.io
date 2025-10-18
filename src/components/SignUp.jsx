import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

export default function SignUp({ onSectionChange }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // Store user data in localStorage
    const userData = {
      username: data.username,
      email: data.email,
      isLoggedIn: true,
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    
    alert(`Compte créé avec succès! Bienvenue ${data.username}!`);
    reset();
    onSectionChange('accueil');
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <motion.div 
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">Créer un compte</h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-6">Rejoignez-nous pour commencer à discuter</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label htmlFor="signup-username" className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
              Nom d'utilisateur
            </label>
            <input
              id="signup-username"
              type="text"
              {...register('username', {
                required: 'Le nom d\'utilisateur est requis',
                minLength: {
                  value: 3,
                  message: 'Le nom d\'utilisateur doit contenir au moins 3 caractères',
                },
              })}
              className={`w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                errors.username
                  ? 'border-red-500 focus:ring-red-500/20'
                  : 'border-gray-300 dark:border-gray-800 focus:ring-indigo-500/20 focus:border-indigo-500'
              }`}
              placeholder="Entrez votre nom d'utilisateur"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500" role="alert">{errors.username.message}</p>
            )}
          </motion.div>

          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label htmlFor="signup-email" className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              {...register('email', {
                required: 'L\'email est requis',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Adresse email invalide',
                },
              })}
              className={`w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500/20'
                  : 'border-gray-300 dark:border-gray-800 focus:ring-indigo-500/20 focus:border-indigo-500'
              }`}
              placeholder="Entrez votre email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500" role="alert">{errors.email.message}</p>
            )}
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="signup-password" className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
              Mot de passe
            </label>
            <input
              id="signup-password"
              type="password"
              {...register('password', {
                required: 'Le mot de passe est requis',
                minLength: {
                  value: 6,
                  message: 'Le mot de passe doit contenir au moins 6 caractères',
                },
              })}
              className={`w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                errors.password
                  ? 'border-red-500 focus:ring-red-500/20'
                  : 'border-gray-300 dark:border-gray-800 focus:ring-indigo-500/20 focus:border-indigo-500'
              }`}
              placeholder="Entrez votre mot de passe"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500" role="alert">{errors.password.message}</p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg transition-all duration-300"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Créer un compte
          </motion.button>
        </form>

        {/* Footer */}
        <motion.p 
          className="text-center text-gray-600 dark:text-gray-400 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Vous avez déjà un compte?{' '}
          <button
            onClick={() => onSectionChange('login')}
            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
          >
            Se connecter
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
}
