"Replace broken and large LandingPage with a simplified, valid React + TSX component so the app can compile; remove references to deleted AI components and other broken fragments."
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Orange_logo.svg"
                      alt="Orange"
                      className="max-h-16 max-w-full object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center h-28 w-48 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-slate-100">
                    <img
                      src={diversidaysLogo}
                      alt="Diversidays"
                      className="max-h-16 max-w-full object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center h-28 w-48 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-slate-100">
                    <img
                      src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                      alt="Google"
                      className="max-h-16 max-w-full object-contain"
                    />
                  </div>
                </div>
                <div className="flex space-x-6 items-center ml-6">
                  <div className="flex items-center justify-center h-28 w-48 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-slate-100">
                    <img
                      src={franceTravailLogo}
                      alt="France Travail"
                      className="max-h-20 max-w-full object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center h-28 w-48 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-slate-100">
                    <img
                      src={wexecutiveLogo}
                      alt="Wexecutive"
                      className="max-h-16 max-w-full object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center h-28 w-48 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-slate-100">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Orange_logo.svg"
                      alt="Orange"
                      className="max-h-16 max-w-full object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center h-28 w-48 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-slate-100">
                    <img
                      src={diversidaysLogo}
                      alt="Diversidays"
                      className="max-h-16 max-w-full object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center h-28 w-48 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-slate-100">
                    <img
                      src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                      alt="Google"
                      className="max-h-16 max-w-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Notre Réponse aux Défis du Sport</h2>
              <p className="text-xl text-slate-600">Comprendre les enjeux pour mieux y répondre</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Le Problème Actuel</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">✗</span>
                    <span>Difficulté pour les sportifs à trouver des opportunités professionnelles et de sponsoring adaptées</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">✗</span>
                    <span>Manque de visibilité sur les aides et subventions disponibles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">✗</span>
                    <span>Entreprises peinent à identifier et recruter des profils sportifs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">✗</span>
                    <span>Processus de reconversion complexe et fragmenté</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg border border-blue-200">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Pourquoi Trophenix ?</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <CheckCircle className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>Plateforme unique dédiée aux sportifs, recruteurs et sponsors</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>Agent IA pour identifier automatiquement vos aides et subventions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>Matching intelligent entre profils sportifs et opportunités</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>Accompagnement complet dans votre reconversion professionnelle</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <ProgramSection />

        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Trouvez votre opportunité en 2 minutes</h2>
              <p className="text-xl text-slate-600">Découvrez les opportunités qui correspondent à votre profil</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6">
                  <h3 className="text-2xl font-bold text-white">Recherche d'opportunité</h3>
                </div>
                <div className="p-8 space-y-4">
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setOpportunityType('emploi')}
                      className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                        opportunityType === 'emploi'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Trouver un emploi
                    </button>
                    <button
                      onClick={() => setOpportunityType('sponsoring')}
                      className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                        opportunityType === 'sponsoring'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Trouver un sponsor
                    </button>
                  </div>
                  {opportunityType === 'emploi' ? (
                    <>
                      <div className="relative">
                        <input
                          type="text"
                          value={sectorInput}
                          onChange={(e) => {
                            setSectorInput(e.target.value);
                            setJobSearchForm(prev => ({ ...prev, sector: e.target.value }));
                            setShowSectorSuggestions(true);
                          }}
                          onFocus={() => setShowSectorSuggestions(true)}
                          onBlur={() => setTimeout(() => setShowSectorSuggestions(false), 200)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Domaine d'activité"
                        />
                        {showSectorSuggestions && filteredSectors.length > 0 && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                            {filteredSectors.map((sector) => (
                              <button
                                key={sector}
                                type="button"
                                onClick={() => handleSectorSelect(sector)}
                                className="w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors text-sm"
                              >
                                {sector}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          value={locationInput}
                          onChange={(e) => {
                            setLocationInput(e.target.value);
                            setJobSearchForm(prev => ({ ...prev, location: e.target.value }));
                            setShowLocationSuggestions(true);
                          }}
                          onFocus={() => setShowLocationSuggestions(true)}
                          onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Zone géographique"
                        />
                        {showLocationSuggestions && filteredLocations.length > 0 && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                            {filteredLocations.map((location) => (
                              <button
                                key={location}
                                type="button"
                                onClick={() => handleLocationSelect(location)}
                                className="w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors text-sm"
                              >
                                {location}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {/* Removed AgentElea and broken JSX */}
                      </div>
                        >
                          <option value="">Disponibilité</option>
                          <option value="immediate">Immédiate</option>
                          <option value="1mois">1 mois</option>
                          <option value="3mois">3 mois</option>
                          <option value="6mois">6 mois</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={jobSearchForm.name}
                          onChange={(e) => setJobSearchForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Nom"
                        />
                        <input
                          type="email"
                          value={jobSearchForm.email}
                          onChange={(e) => setJobSearchForm(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Mail"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative">
                        <input
                          type="text"
                          value={sportInput}
                          onChange={(e) => {
                            setSportInput(e.target.value);
                            setSponsoringForm(prev => ({ ...prev, sport: e.target.value }));
                            setShowSportSuggestions(true);
                          }}
                          onFocus={() => setShowSportSuggestions(true)}
                          onBlur={() => setTimeout(() => setShowSportSuggestions(false), 200)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Sport / Discipline"
                        />
                        {showSportSuggestions && filteredSports.length > 0 && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                            {filteredSports.map((sport) => (
                              <button
                                key={sport}
                                type="button"
                                onClick={() => handleSportSelect(sport)}
                                className="w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors text-sm"
                              >
                                {sport}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <select
                        value={sponsoringForm.visibility}
                        onChange={(e) => setSponsoringForm(prev => ({ ...prev, visibility: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-500"
                      >
                        <option value="">Niveau recherché</option>
                        <option value="international">International</option>
                        <option value="national">National</option>
                        <option value="regional">Régional</option>
                        <option value="professionnel">Professionnel</option>
                        <option value="semi-professionnel">Semi-professionnel</option>
                        <option value="amateur-haut-niveau">Amateur haut niveau</option>
                      </select>
                      <div className="grid grid-cols-2 gap-4">
                        <select
                          value={sponsoringForm.budget}
                          onChange={(e) => setSponsoringForm(prev => ({ ...prev, budget: e.target.value }))}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-500"
                        >
                          <option value="">Budget</option>
                          <option value="0-5k">0 - 5 000€</option>
                          <option value="5k-20k">5 000 - 20 000€</option>
                          <option value="20k-50k">20 000 - 50 000€</option>
                          <option value="50k+">50 000€+</option>
                        </select>
                        <select
                          value={sponsoringForm.duration}
                          onChange={(e) => setSponsoringForm(prev => ({ ...prev, duration: e.target.value }))}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-500"
                        >
                          <option value="">Durée</option>
                          <option value="3mois">3 mois</option>
                          <option value="6mois">6 mois</option>
                          <option value="1an">1 an</option>
                          <option value="pluriannuel">Pluriannuel</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={sponsoringForm.name}
                          onChange={(e) => setSponsoringForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Nom"
                        />
                        <input
                          type="email"
                          value={sponsoringForm.email}
                          onChange={(e) => setSponsoringForm(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Mail"
                        />
                      </div>
                    </>
                  )}
                  <button
                    onClick={onSignUp}
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
                  >
                    Rechercher des opportunités
                  </button>
                  <p className="text-sm text-slate-500 text-center flex items-center justify-center">
                    <span className="mr-1">🔒</span> Vos données sont sécurisées
                  </p>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-full">
                <img
                  src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Nos experts vous accompagnent"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-3xl font-bold mb-4">Nos experts vous accompagnent</h3>
                  <p className="text-lg text-blue-100 mb-8">
                    Remplissez le formulaire pour découvrir vos opportunités personnalisées
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SupportersCarousel />

      </main>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Qui sommes-nous ?</h2>
            <p className="text-xl text-slate-600">L'infrastructure complète pour la gestion de carrière</p>
          </div>

          <VisionTabs />
        </div>
      </section>

      <section className="py-4 overflow-hidden relative border-y border-blue-400/50" style={{ backgroundColor: '#1f8cb2' }}>
        <div className="flex animate-scroll whitespace-nowrap">
          <div className="flex space-x-12 px-6">
            <span className="text-xl font-bold text-white">Faites une passe décisive</span>
            <span className="text-xl font-bold text-white">Recrutez un sportif</span>
            <span className="text-xl font-bold text-white">Offrez un sponsoring</span>
            <span className="text-xl font-bold text-white">Faites une passe décisive</span>
            <span className="text-xl font-bold text-white">Recrutez un sportif</span>
            <span className="text-xl font-bold text-white">Offrez un sponsoring</span>
            <span className="text-xl font-bold text-white">Faites une passe décisive</span>
            <span className="text-xl font-bold text-white">Recrutez un sportif</span>
            <span className="text-xl font-bold text-white">Offrez un sponsoring</span>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Trophy className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">Trophenix</span>
              </div>
              <p className="text-slate-400 mb-4 leading-relaxed">
                Expert en aides financières pour la rénovation énergétique et l'installation de pompes à chaleur.
              </p>
              <p className="text-slate-400 text-sm">Du lundi au vendredi : 9h - 19h</p>
              <p className="text-blue-400 font-semibold mt-2">📞 01 23 45 67 89</p>
              <p className="text-blue-400 mt-1">contact@meilleursaides.com</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Nos solutions</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Pompe à chaleur air-eau</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Pompe à chaleur air-air</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Isolation thermique</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Panneaux solaires</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Informations</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Les aides disponibles</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Nos artisans RGE</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                <li>
                  <button
                    onClick={onNavigateToInvestors}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Investisseurs
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 text-sm text-slate-400 mb-4 md:mb-0">
              <a href="#" className="hover:text-blue-400 transition-colors">
                Mentions légales
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                RGPD
              </a>
            </div>
            <a
              href="/admin"
              className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors shadow-lg"
            >
              Entrer
            </a>
          </div>
        </div>
      </footer>

      {/* Agent Elea - Accessible sur la page d'accueil */}
    </div>
  );
}
