
import React from 'react';
import { UserRole } from '../types';
import { DoctorIcon, PatientIcon } from './Icons';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

const RoleCard: React.FC<{
  role: UserRole;
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}> = ({ role, title, description, icon, onClick }) => {
  const isPatient = role === 'Patient';
  const colorClass = isPatient ? 'hover:border-brand-primary' : 'hover:border-blue-500';
  const buttonClass = isPatient ? 'bg-brand-primary hover:bg-brand-secondary' : 'bg-blue-500 hover:bg-blue-600';

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-md p-8 w-80 text-center flex flex-col items-center cursor-pointer transition-all duration-300 border-2 border-transparent ${colorClass}`}
    >
      <div className={`mb-4 ${isPatient ? 'text-brand-primary' : 'text-blue-500'}`}>
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-text-primary mb-2">{title}</h2>
      <p className="text-sm text-text-secondary mb-6">{description}</p>
      <button className={`${buttonClass} text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 w-full`}>
        Login
      </button>
    </div>
  );
};

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7 2a1 1 0 00-1 1v1H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H9V3a1 1 0 00-1-1H7zm1 12a1 1 0 10-2 0v-1a1 1 0 102 0v1zm4 0a1 1 0 10-2 0v-1a1 1 0 102 0v1zm-2-4a1 1 0 11-2 0 1 1 0 012 0zm-2-3a1 1 0 100 2 1 1 0 000-2zm4 3a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
            </svg>
            <h1 className="text-4xl font-bold text-gray-800">
                <span className="text-brand-primary">Gene</span>AI
            </h1>
        </div>
        <p className="text-text-secondary">Your Personal Health Intelligence Platform</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <RoleCard
          role="Patient"
          title="Login as a Patient"
          description="Access your personalized health dashboard, view insights, and track your progress."
          icon={<PatientIcon />}
          onClick={() => onLogin('Patient')}
        />
        <RoleCard
          role="Doctor"
          title="Login as a Doctor"
          description="Monitor your patients' data, manage wellness plans, and provide remote guidance."
          icon={<DoctorIcon />}
          onClick={() => onLogin('Doctor')}
        />
      </div>
    </div>
  );
};
