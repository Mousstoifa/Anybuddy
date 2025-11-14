import { Mail, Search, Filter } from 'lucide-react';

export function MessagesList() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-slate-900 flex items-center">
              <Mail className="w-8 h-8 mr-3 text-blue-600" />
              Messages
            </h1>
            <div className="flex space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher des messages..."
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filtrer</span>
              </button>
            </div>
          </div>
          
          <div className="text-center py-12">
            <Mail className="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Aucun message</h3>
            <p className="text-slate-600">Cette fonctionnalité de messagerie sera bientôt disponible.</p>
          </div>
        </div>
      </div>
    </div>
  );
}