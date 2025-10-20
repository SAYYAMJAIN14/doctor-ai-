
import React, { useState, useEffect } from 'react';
import { GeneAIResponse, WearableData, UserRole } from './types';
import { getPersonalizedInsights } from './services/geminiService';
import { Dashboard } from './components/Dashboard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { LoginPage } from './components/LoginPage';

const App: React.FC = () => {
  const [healthData, setHealthData] = useState<GeneAIResponse | null>(null);
  const [wearableData, setWearableData] = useState<WearableData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!userRole) return;

      try {
        setLoading(true);
        setError(null);
        const insights = await getPersonalizedInsights();
        setHealthData(insights);
        // Generate mock wearable data for the patient
        if (userRole === 'Patient') {
            setWearableData({
              sleep: { duration: "7h 45m", quality: 92 },
              heartRate: { resting: 62, average: 78 },
              steps: { count: 8450, goal: 10000 },
              oxygenLevel: 98,
            });
        } else {
            // Mock data for a doctor's view could be different, e.g., an average of patients
             setWearableData({
              sleep: { duration: "7h 15m", quality: 88 },
              heartRate: { resting: 68, average: 82 },
              steps: { count: 7120, goal: 10000 },
              oxygenLevel: 97,
            });
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userRole]);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
  };
  
  const handleLogout = () => {
      setUserRole(null);
      setHealthData(null);
      setWearableData(null);
      setError(null);
  }

  if (!userRole) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background font-sans text-text-primary">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 2a1 1 0 00-1 1v1H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H9V3a1 1 0 00-1-1H7zm1 12a1 1 0 10-2 0v-1a1 1 0 102 0v1zm4 0a1 1 0 10-2 0v-1a1 1 0 102 0v1zm-2-4a1 1 0 11-2 0 1 1 0 012 0zm-2-3a1 1 0 100 2 1 1 0 000-2zm4 3a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-800">
              <span className="text-brand-primary">Gene</span>AI
            </h1>
          </div>
           <div className="flex items-center space-x-4">
             <span className="text-sm font-medium text-text-secondary">{userRole === 'Patient' ? 'Welcome, Alex' : 'Doctor Dashboard'}</span>
             <img className="h-10 w-10 rounded-full" src={userRole === 'Patient' ? "https://picsum.photos/100" : "https://i.pravatar.cc/100?u=doctor"} alt="User profile" />
             <button onClick={handleLogout} className="text-sm font-medium text-red-500 hover:text-red-700 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-md transition">
                Logout
             </button>
           </div>
        </div>
      </header>
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && <LoadingSpinner />}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {!loading && !error && healthData && wearableData && (
            <Dashboard healthData={healthData} wearableData={wearableData} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
