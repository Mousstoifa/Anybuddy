import { LogOut, User, Mail, Bell, Home, Briefcase, Building2, Users } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export function Navbar({ currentView, onNavigate, onLogout }: NavbarProps) {
  const navItems = [
    { id: 'athlete-dashboard', label: 'Tableau de bord', icon: Home },
    { id: 'company-dashboard', label: 'Tableau de bord', icon: Home },
    { id: 'job-offers', label: 'Offres d\'emploi', icon: Briefcase },
    { id: 'athletes-directory', label: 'Annuaire Athlètes', icon: Users },
    { id: 'companies-directory', label: 'Annuaire Entreprises', icon: Building2 },
    { id: 'messages', label: 'Messages', icon: Mail },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-slate-900">Trophenix</h1>
            </div>
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors ${
                      currentView === item.id
                        ? 'bg-slate-100 text-slate-900'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}