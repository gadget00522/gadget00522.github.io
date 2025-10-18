import { useForm } from 'react-hook-form';

export default function Login({ onSectionChange }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // Check if user exists
    const storedData = localStorage.getItem('userData');
    
    if (storedData) {
      const userData = JSON.parse(storedData);
      
      if (userData.email === data.email) {
        userData.isLoggedIn = true;
        localStorage.setItem('userData', JSON.stringify(userData));
        
        alert(`Connexion réussie! Bienvenue ${userData.username}!`);
        reset();
        onSectionChange('accueil');
      } else {
        alert('Email ou mot de passe incorrect.');
      }
    } else {
      alert('Aucun compte trouvé avec cet email. Veuillez créer un compte.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl animate-fadeIn">
        <h2 className="text-3xl font-bold text-center mb-2">Se connecter</h2>
        <p className="text-gray-400 text-center mb-6">Connectez-vous à votre compte</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div>
            <label htmlFor="login-email" className="block text-sm text-gray-400 mb-2">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              {...register('email', {
                required: 'L\'email est requis',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Adresse email invalide',
                },
              })}
              className={`w-full px-4 py-3 bg-gray-950 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500/20'
                  : 'border-gray-800 focus:ring-indigo-500/20 focus:border-indigo-500'
              }`}
              placeholder="Entrez votre email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500" role="alert">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="login-password" className="block text-sm text-gray-400 mb-2">
              Mot de passe
            </label>
            <input
              id="login-password"
              type="password"
              {...register('password', {
                required: 'Le mot de passe est requis',
                minLength: {
                  value: 6,
                  message: 'Le mot de passe doit contenir au moins 6 caractères',
                },
              })}
              className={`w-full px-4 py-3 bg-gray-950 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                errors.password
                  ? 'border-red-500 focus:ring-red-500/20'
                  : 'border-gray-800 focus:ring-indigo-500/20 focus:border-indigo-500'
              }`}
              placeholder="Entrez votre mot de passe"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500" role="alert">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40 active:translate-y-0 transition-all duration-300"
          >
            Se connecter
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-6">
          Vous n'avez pas de compte?{' '}
          <button
            onClick={() => onSectionChange('signup')}
            className="text-indigo-500 font-semibold hover:underline"
          >
            Créer un compte
          </button>
        </p>
      </div>
    </div>
  );
}
