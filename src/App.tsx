import { useState, useEffect } from 'react';
import {
  Menu, X, Moon, Sun, ChevronDown, ChevronUp, ArrowRight,
  Heart, Gift, Rocket, Palette, Users, Globe, Check,
  Wallet, Target, Clock, DollarSign, Send, ExternalLink, Languages,
  Settings, Lock, Edit3, Trash2, Save, Plus, Eye, Image, LogOut, User
} from 'lucide-react';

type Language = 'fr' | 'en';

interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  raised: number;
  goal: number;
  contributors: number;
  type: 'pure' | 'reward';
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

interface SiteSettings {
  logo: string | null;
  siteName: string;
}

const translations = {
  fr: {
    nav: [
      { name: 'Accueil', href: '#hero' },
      { name: 'Solutions', href: '#solutions' },
      { name: 'Secteurs', href: '#sectors' },
      { name: 'Projets', href: '#projects' },
      { name: 'Conditions', href: '#conditions' },
      { name: 'Contact', href: '#contact' },
    ],
    hero: {
      badge: 'Financement Web3',
      title: 'Transformez vos',
      titleHighlight: 'idées',
      titleEnd: 'en réalité avec la communauté',
      description: "FW3 offre des solutions de financement communautaire aux porteurs de projets, en mobilisant les réseaux Web3 pour concrétiser vos ambitions.",
      cta1: 'Découvrir les solutions',
      cta2: 'Voir les projets',
      stats: [
        { value: '$2.5M+', label: 'Fonds collectés' },
        { value: '150+', label: 'Projets financés' },
        { value: '12K+', label: 'Contributeurs' },
        { value: '15+', label: 'Pays atteints' },
      ],
    },
    solutions: {
      title: 'Deux types de',
      titleHighlight: 'financement',
      subtitle: 'Choisissez le modèle adapté à votre projet et à votre communauté',
      types: [
        {
          icon: Heart,
          title: 'Don Pur',
          description: "Les contributeurs donnent pour des projets d'intérêt général, caritatifs ou humanitaires. Ils n'attendent rien en retour.",
          features: ['Projets sociaux', 'Impact direct', 'Communauté solidaire'],
        },
        {
          icon: Gift,
          title: 'Don avec Récompense',
          description: 'Les contributeurs reçoivent en retour une primeur, un jeton numérique, un accès aux fonds ou une expérience unique.',
          features: ['Tokens', 'Accès exclusif', 'Expériences uniques'],
        },
      ],
    },
    sectors: {
      title: 'Secteurs',
      titleHighlight: 'ciblés',
      subtitle: 'FW3 accompagne les projets innovants dans trois domaines clés',
      items: [
        {
          icon: Rocket,
          title: 'Entrepreneurial & Innovation',
          description: 'Lancement de startups, applications, solutions technologiques innovantes.',
          examples: ['Startup tech', 'Applications mobiles', 'SaaS'],
        },
        {
          icon: Palette,
          title: 'Créativité & Culture',
          description: 'Production de films, albums, jeux de société, livres et projets artistiques.',
          examples: ['Films & Documentaires', 'Musique', 'Jeux & Édition'],
        },
        {
          icon: Users,
          title: 'Social & Solidaire',
          description: 'Projets humanitaires, environnementaux et initiatives de quartier.',
          examples: ['Humanitaire', 'Environnement', 'Projets locaux'],
        },
      ],
      markets: {
        title: 'Marchés cibles',
        items: [
          { icon: Rocket, title: 'Startups', desc: '1-18 mois' },
          { icon: Users, title: 'Travailleurs autonomes', desc: 'Freelances' },
          { icon: Heart, title: 'Œuvres philanthropiques', desc: 'Impact social' },
          { icon: Globe, title: 'Coopératives', desc: 'Modèle partagé' },
        ],
      },
    },
    projects: {
      title: 'Projets',
      titleHighlight: 'en cours',
      subtitle: 'Découvrez les projets qui mobilisent la communauté FW3',
      filters: ['Tous', 'Innovation', 'Culture', 'Social'],
      pure: 'Don pur',
      reward: 'Récompense',
      progress: 'Progression',
    },
    conditions: {
      title: 'Conditions pour',
      titleHighlight: 'demandeurs',
      subtitle: "Ce qu'il faut savoir avant de lancer votre campagne",
      items: [
        {
          icon: Target,
          title: 'Présentation du projet',
          description: "Préparez un document de 2 pages maximum expliquant le projet, l'objectif financier, la durée, les promoteurs et l'utilisation des fonds.",
        },
        {
          icon: Users,
          title: 'Communauté engagée',
          description: 'Les porteurs de projets doivent être capables de mobiliser leurs réseaux. FW3 engagera sa propre communauté pour assurer le succès.',
        },
        {
          icon: DollarSign,
          title: 'Contribution',
          description: "Une contribution de 500$ à 1500$ pour 4 à 12 semaines d'accompagnement et de soutien technique selon le besoin de financement.",
        },
      ],
      process: {
        title: 'Processus de financement',
        steps: [
          { step: '01', title: 'Soumission', desc: 'Présentez votre projet' },
          { step: '02', title: 'Validation', desc: 'Analyse par FW3' },
          { step: '03', title: 'Campagne', desc: '4-12 semaines' },
          { step: '04', title: 'Réalisation', desc: 'Votre projet prend vie' },
        ],
      },
    },
    faq: {
      title: 'Questions',
      titleHighlight: 'fréquentes',
      items: [
        {
          question: 'Quels types de projets FW3 accepte-t-il ?',
          answer: "FW3 accompagne les startups, travailleurs autonomes, œuvres philanthropiques et coopératives dans les secteurs de l'innovation, la culture et le social.",
        },
        {
          question: "Quelle est la durée d'une campagne de financement ?",
          answer: "Les campagnes durent entre 4 et 12 semaines selon les besoins et l'accompagnement choisi.",
        },
        {
          question: 'Quels sont les frais associés ?',
          answer: "Une contribution de 500$ à 1500$ est exigée pour les services d'accompagnement et de soutien technique, selon le besoin de financement.",
        },
        {
          question: 'Comment FW3 utilise-t-il la blockchain ?',
          answer: 'FW3 tire parti des technologies Web3 pour offrir transparence, traçabilité des fonds et accès global aux contributeurs.',
        },
      ],
    },
    contact: {
      title: 'Prêt à lancer votre',
      titleHighlight: 'projet',
      titleEnd: '?',
      description: 'Contactez-nous pour discuter de votre projet et découvrir comment FW3 peut vous aider à atteindre vos objectifs de financement.',
      features: [
        { icon: Clock, text: 'Réponse sous 48h' },
        { icon: Check, text: 'Accompagnement personnalisé' },
        { icon: Globe, text: 'Accès à notre communauté mondiale' },
      ],
      form: {
        name: 'Nom complet',
        namePlaceholder: 'Votre nom',
        email: 'Email',
        emailPlaceholder: 'votre@email.com',
        message: 'Message',
        messagePlaceholder: 'Décrivez votre projet...',
        submit: 'Envoyer le message',
      },
      success: {
        title: 'Message envoyé !',
        description: 'Nous vous répondrons dans les plus brefs délais.',
      },
    },
    footer: {
      description: 'Solutions de financement communautaire propulsées par le Web3.',
      solutions: { title: 'Solutions', items: ['Don pur', 'Don avec récompense', 'Secteurs'] },
      resources: { title: 'Ressources', items: ['Conditions', 'FAQ', 'Contact'] },
      legal: { title: 'Légal', items: ['Mentions légales', 'Politique de confidentialité', 'CGU'] },
      copyright: '© 2024 FW3 - Financement Web3. Tous droits réservés.',
    },
    launchProject: 'Lancer un projet',
    admin: {
      login: 'Administration',
      password: 'Mot de passe',
      passwordPlaceholder: 'Entrez le mot de passe',
      loginBtn: 'Connexion',
      logout: 'Déconnexion',
      wrongPassword: 'Mot de passe incorrect',
      dashboard: 'Tableau de bord',
      projects: 'Projets',
      contacts: 'Contacts',
      settings: 'Paramètres',
      addProject: 'Ajouter un projet',
      editProject: 'Modifier le projet',
      deleteProject: 'Supprimer le projet',
      deleteConfirm: 'Êtes-vous sûr de vouloir supprimer ce projet ?',
      projectName: 'Nom du projet',
      category: 'Catégorie',
      description: 'Description',
      raised: 'Montant collecté',
      goal: 'Objectif',
      contributors: 'Contributeurs',
      type: 'Type de don',
      save: 'Enregistrer',
      cancel: 'Annuler',
      noContacts: 'Aucun contact pour le moment',
      noProjects: 'Aucun projet pour le moment',
      logo: 'Logo du site',
      logoPlaceholder: 'URL du logo (optionnel)',
      uploadLogo: 'Charger un logo',
      removeLogo: 'Supprimer le logo',
      siteName: 'Nom du site',
      settingsSaved: 'Paramètres enregistrés',
      viewContacts: 'Voir les contacts',
      contactDate: 'Date',
      contactMessage: 'Message',
    },
  },
  en: {
    nav: [
      { name: 'Home', href: '#hero' },
      { name: 'Solutions', href: '#solutions' },
      { name: 'Sectors', href: '#sectors' },
      { name: 'Projects', href: '#projects' },
      { name: 'Conditions', href: '#conditions' },
      { name: 'Contact', href: '#contact' },
    ],
    hero: {
      badge: 'Web3 Funding',
      title: 'Transform your',
      titleHighlight: 'ideas',
      titleEnd: 'into reality with the community',
      description: 'FW3 offers community funding solutions for project creators, mobilizing Web3 networks to bring your ambitions to life.',
      cta1: 'Discover solutions',
      cta2: 'View projects',
      stats: [
        { value: '$2.5M+', label: 'Funds raised' },
        { value: '150+', label: 'Funded projects' },
        { value: '12K+', label: 'Contributors' },
        { value: '15+', label: 'Countries reached' },
      ],
    },
    solutions: {
      title: 'Two types of',
      titleHighlight: 'funding',
      subtitle: 'Choose the model that fits your project and community',
      types: [
        {
          icon: Heart,
          title: 'Pure Donation',
          description: 'Contributors give to projects of general interest, charitable or humanitarian. They expect nothing in return.',
          features: ['Social projects', 'Direct impact', 'Supportive community'],
        },
        {
          icon: Gift,
          title: 'Reward-based Donation',
          description: 'Contributors receive in return early access, a digital token, access to fund allocation or a unique experience.',
          features: ['Tokens', 'Exclusive access', 'Unique experiences'],
        },
      ],
    },
    sectors: {
      title: 'Target',
      titleHighlight: 'sectors',
      subtitle: 'FW3 supports innovative projects in three key areas',
      items: [
        {
          icon: Rocket,
          title: 'Entrepreneurship & Innovation',
          description: 'Launch of startups, applications, and innovative technological solutions.',
          examples: ['Tech startup', 'Mobile apps', 'SaaS'],
        },
        {
          icon: Palette,
          title: 'Creativity & Culture',
          description: 'Production of films, albums, board games, books and artistic projects.',
          examples: ['Films & Documentaries', 'Music', 'Games & Publishing'],
        },
        {
          icon: Users,
          title: 'Social & Solidarity',
          description: 'Humanitarian, environmental and neighborhood initiatives.',
          examples: ['Humanitarian', 'Environment', 'Local projects'],
        },
      ],
      markets: {
        title: 'Target markets',
        items: [
          { icon: Rocket, title: 'Startups', desc: '1-18 months' },
          { icon: Users, title: 'Freelancers', desc: 'Self-employed' },
          { icon: Heart, title: 'Philanthropic works', desc: 'Social impact' },
          { icon: Globe, title: 'Cooperatives', desc: 'Shared model' },
        ],
      },
    },
    projects: {
      title: 'Ongoing',
      titleHighlight: 'projects',
      subtitle: 'Discover projects mobilizing the FW3 community',
      filters: ['All', 'Innovation', 'Culture', 'Social'],
      pure: 'Pure donation',
      reward: 'Reward',
      progress: 'Progress',
    },
    conditions: {
      title: 'Conditions for',
      titleHighlight: 'applicants',
      subtitle: 'What you need to know before launching your campaign',
      items: [
        {
          icon: Target,
          title: 'Project presentation',
          description: 'Prepare a maximum 2-page document explaining the project, financial objective, duration, promoters and how funds will be used.',
        },
        {
          icon: Users,
          title: 'Engaged community',
          description: 'Project creators must be able to mobilize their networks. FW3 will engage its own community to ensure success.',
        },
        {
          icon: DollarSign,
          title: 'Contribution',
          description: 'A contribution of $500 to $1500 for 4 to 12 weeks of support and technical assistance depending on funding needs.',
        },
      ],
      process: {
        title: 'Funding process',
        steps: [
          { step: '01', title: 'Submission', desc: 'Present your project' },
          { step: '02', title: 'Validation', desc: 'Analysis by FW3' },
          { step: '03', title: 'Campaign', desc: '4-12 weeks' },
          { step: '04', title: 'Realization', desc: 'Your project comes to life' },
        ],
      },
    },
    faq: {
      title: 'Frequently asked',
      titleHighlight: 'questions',
      items: [
        {
          question: 'What types of projects does FW3 accept?',
          answer: 'FW3 supports startups, freelancers, philanthropic works and cooperatives in the innovation, culture and social sectors.',
        },
        {
          question: 'How long does a funding campaign last?',
          answer: 'Campaigns last between 4 and 12 weeks depending on needs and chosen support.',
        },
        {
          question: 'What are the associated fees?',
          answer: 'A contribution of $500 to $1500 is required for support and technical assistance services, depending on funding needs.',
        },
        {
          question: 'How does FW3 use blockchain?',
          answer: 'FW3 leverages Web3 technologies to offer transparency, fund traceability and global access to contributors.',
        },
      ],
    },
    contact: {
      title: 'Ready to launch your',
      titleHighlight: 'project',
      titleEnd: '?',
      description: 'Contact us to discuss your project and discover how FW3 can help you achieve your funding goals.',
      features: [
        { icon: Clock, text: 'Response within 48h' },
        { icon: Check, text: 'Personalized support' },
        { icon: Globe, text: 'Access to our global community' },
      ],
      form: {
        name: 'Full name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        message: 'Message',
        messagePlaceholder: 'Describe your project...',
        submit: 'Send message',
      },
      success: {
        title: 'Message sent!',
        description: 'We will respond as soon as possible.',
      },
    },
    footer: {
      description: 'Community funding solutions powered by Web3.',
      solutions: { title: 'Solutions', items: ['Pure donation', 'Reward-based', 'Sectors'] },
      resources: { title: 'Resources', items: ['Conditions', 'FAQ', 'Contact'] },
      legal: { title: 'Legal', items: ['Legal notice', 'Privacy policy', 'Terms of use'] },
      copyright: '© 2024 FW3 - Web3 Funding. All rights reserved.',
    },
    launchProject: 'Launch a project',
    admin: {
      login: 'Administration',
      password: 'Password',
      passwordPlaceholder: 'Enter password',
      loginBtn: 'Login',
      logout: 'Logout',
      wrongPassword: 'Incorrect password',
      dashboard: 'Dashboard',
      projects: 'Projects',
      contacts: 'Contacts',
      settings: 'Settings',
      addProject: 'Add project',
      editProject: 'Edit project',
      deleteProject: 'Delete project',
      deleteConfirm: 'Are you sure you want to delete this project?',
      projectName: 'Project name',
      category: 'Category',
      description: 'Description',
      raised: 'Amount raised',
      goal: 'Goal',
      contributors: 'Contributors',
      type: 'Donation type',
      save: 'Save',
      cancel: 'Cancel',
      noContacts: 'No contacts yet',
      noProjects: 'No projects yet',
      logo: 'Site logo',
      logoPlaceholder: 'Logo URL (optional)',
      uploadLogo: 'Upload logo',
      removeLogo: 'Remove logo',
      siteName: 'Site name',
      settingsSaved: 'Settings saved',
      viewContacts: 'View contacts',
      contactDate: 'Date',
      contactMessage: 'Message',
    },
  },
};

const defaultProjects: Project[] = [
  {
    id: '1',
    name: 'EcoChain Solutions',
    category: 'Innovation',
    description: "Plateforme de traçabilité blockchain pour l'agriculture durable",
    raised: 45000,
    goal: 60000,
    contributors: 234,
    type: 'reward',
  },
  {
    id: '2',
    name: 'Studio Créatif MTL',
    category: 'Culture',
    description: "Production d'un documentaire sur l'art urbain montréalais",
    raised: 28000,
    goal: 35000,
    contributors: 156,
    type: 'pure',
  },
  {
    id: '3',
    name: 'Jardin Partagé',
    category: 'Social',
    description: "Création d'un jardin communautaire en zone urbaine",
    raised: 12000,
    goal: 15000,
    contributors: 89,
    type: 'pure',
  },
];

const ADMIN_PASSWORD = 'fw3admin2024';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [language, setLanguage] = useState<Language>('fr');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Admin state
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminTab, setAdminTab] = useState<'projects' | 'contacts' | 'settings'>('projects');
  const [loginError, setLoginError] = useState(false);

  // Data state
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('fw3-projects');
    return saved ? JSON.parse(saved) : defaultProjects;
  });
  const [contacts, setContacts] = useState<ContactSubmission[]>(() => {
    const saved = localStorage.getItem('fw3-contacts');
    return saved ? JSON.parse(saved) : [];
  });
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('fw3-settings');
    return saved ? JSON.parse(saved) : { logo: null, siteName: 'FW3' };
  });

  // Edit state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectForm, setProjectForm] = useState<Omit<Project, 'id'>>({
    name: '',
    category: 'Innovation',
    description: '',
    raised: 0,
    goal: 0,
    contributors: 0,
    type: 'reward',
  });

  const t = translations[language];

  useEffect(() => {
    localStorage.setItem('fw3-projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('fw3-contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('fw3-settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          const id = section.getAttribute('id');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setAdminTab('projects');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newContact: ContactSubmission = {
      id: Date.now().toString(),
      ...formData,
      date: new Date().toISOString(),
    };
    setContacts([newContact, ...contacts]);
    setFormSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? { ...projectForm, id: editingProject.id } : p));
    } else {
      setProjects([...projects, { ...projectForm, id: Date.now().toString() }]);
    }
    setShowProjectForm(false);
    setEditingProject(null);
    setProjectForm({ name: '', category: 'Innovation', description: '', raised: 0, goal: 0, contributors: 0, type: 'reward' });
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectForm({
      name: project.name,
      category: project.category,
      description: project.description,
      raised: project.raised,
      goal: project.goal,
      contributors: project.contributors,
      type: project.type,
    });
    setShowProjectForm(true);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm(t.admin.deleteConfirm)) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleSettingsSave = () => {
    localStorage.setItem('fw3-settings', JSON.stringify(siteSettings));
  };

  const filterKey = language === 'en' ? 
    (activeFilter === 'Tous' ? 'all' : activeFilter) : 
    (activeFilter === 'All' ? 'all' : activeFilter);

  const filteredProjects = filterKey === 'all' || activeFilter === 'Tous' || activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[var(--bg)]/80 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <a href="#hero" className="flex items-center gap-2">
              {siteSettings.logo ? (
                <img src={siteSettings.logo} alt="Logo" className="w-10 h-10 rounded-xl object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
              )}
              <span className="text-xl font-bold tracking-tight">{siteSettings.siteName}</span>
            </a>

            <nav className="hidden lg:flex items-center gap-8">
              {t.nav.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-1"
                aria-label="Change language"
              >
                <Languages className="w-5 h-5" />
                <span className="text-xs font-medium uppercase hidden sm:inline">{language}</span>
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl hover:bg-white/5 transition-colors"
                aria-label="Change theme"
              >
                {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              {!isAdmin && (
                <button
                  onClick={() => setShowAdminLogin(true)}
                  className="p-2 rounded-xl hover:bg-white/5 transition-colors"
                  aria-label="Admin"
                >
                  <Lock className="w-5 h-5" />
                </button>
              )}
              <a
                href="#contact"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent)] text-white font-medium text-sm hover:opacity-90 transition-opacity"
              >
                {t.launchProject}
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-white/5 transition-colors"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden glass border-t border-[var(--border)] animate-fade-in-up">
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              {t.nav.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-[var(--muted)] hover:text-[var(--text)] hover:bg-white/5 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl bg-[var(--accent)] text-white text-center font-medium"
              >
                {t.launchProject}
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Admin Login Modal */}
      {showAdminLogin && !isAdmin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glass rounded-3xl p-8 w-full max-w-md mx-4 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{t.admin.login}</h2>
              <button onClick={() => { setShowAdminLogin(false); setLoginError(false); }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleAdminLogin(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t.admin.password}</label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                  placeholder={t.admin.passwordPlaceholder}
                />
              </div>
              {loginError && (
                <p className="text-red-400 text-sm">{t.admin.wrongPassword}</p>
              )}
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold hover:opacity-90 transition-all"
              >
                {t.admin.loginBtn}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Admin Panel */}
      {isAdmin && (
        <div className="fixed inset-0 z-[100] bg-[var(--bg)] overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold">{t.admin.dashboard}</h1>
              <button
                onClick={handleAdminLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                {t.admin.logout}
              </button>
            </div>

            {/* Admin Tabs */}
            <div className="flex gap-2 mb-8">
              {(['projects', 'contacts', 'settings'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setAdminTab(tab)}
                  className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                    adminTab === tab
                      ? 'bg-[var(--accent)] text-white'
                      : 'glass hover:bg-white/10'
                  }`}
                >
                  {t.admin[tab]}
                </button>
              ))}
            </div>

            {/* Projects Tab */}
            {adminTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{t.admin.projects}</h2>
                  <button
                    onClick={() => {
                      setEditingProject(null);
                      setProjectForm({ name: '', category: 'Innovation', description: '', raised: 0, goal: 0, contributors: 0, type: 'reward' });
                      setShowProjectForm(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent)] text-white font-medium hover:opacity-90 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    {t.admin.addProject}
                  </button>
                </div>

                {showProjectForm && (
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      {editingProject ? t.admin.editProject : t.admin.addProject}
                    </h3>
                    <form onSubmit={handleProjectSubmit} className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">{t.admin.projectName}</label>
                        <input
                          type="text"
                          required
                          value={projectForm.name}
                          onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">{t.admin.category}</label>
                        <select
                          value={projectForm.category}
                          onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                        >
                          <option value="Innovation">Innovation</option>
                          <option value="Culture">Culture</option>
                          <option value="Social">Social</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">{t.admin.description}</label>
                        <textarea
                          required
                          rows={3}
                          value={projectForm.description}
                          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none transition-colors resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">{t.admin.raised}</label>
                        <input
                          type="number"
                          required
                          value={projectForm.raised}
                          onChange={(e) => setProjectForm({ ...projectForm, raised: Number(e.target.value) })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">{t.admin.goal}</label>
                        <input
                          type="number"
                          required
                          value={projectForm.goal}
                          onChange={(e) => setProjectForm({ ...projectForm, goal: Number(e.target.value) })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">{t.admin.contributors}</label>
                        <input
                          type="number"
                          required
                          value={projectForm.contributors}
                          onChange={(e) => setProjectForm({ ...projectForm, contributors: Number(e.target.value) })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">{t.admin.type}</label>
                        <select
                          value={projectForm.type}
                          onChange={(e) => setProjectForm({ ...projectForm, type: e.target.value as 'pure' | 'reward' })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                        >
                          <option value="pure">{t.projects.pure}</option>
                          <option value="reward">{t.projects.reward}</option>
                        </select>
                      </div>
                      <div className="md:col-span-2 flex gap-3">
                        <button
                          type="submit"
                          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold hover:opacity-90 transition-all"
                        >
                          <Save className="w-4 h-4" />
                          {t.admin.save}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setShowProjectForm(false); setEditingProject(null); }}
                          className="px-6 py-3 rounded-xl glass hover:bg-white/10 transition-all"
                        >
                          {t.admin.cancel}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {projects.length === 0 ? (
                  <div className="glass rounded-2xl p-8 text-center text-[var(--muted)]">
                    {t.admin.noProjects}
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {projects.map((project) => (
                      <div key={project.id} className="glass rounded-2xl p-6 flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{project.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              project.type === 'pure' ? 'bg-pink-500/10 text-pink-400' : 'bg-[var(--accent)]/10 text-[var(--accent)]'
                            }`}>
                              {project.type === 'pure' ? t.projects.pure : t.projects.reward}
                            </span>
                            <span className="text-xs text-[var(--muted)]">{project.category}</span>
                          </div>
                          <p className="text-sm text-[var(--muted)] mb-2">{project.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span>${project.raised.toLocaleString()} / ${project.goal.toLocaleString()}</span>
                            <span className="flex items-center gap-1 text-[var(--muted)]">
                              <Users className="w-4 h-4" />
                              {project.contributors}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditProject(project)}
                            className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                          >
                            <Edit3 className="w-5 h-5 text-[var(--accent)]" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                          >
                            <Trash2 className="w-5 h-5 text-red-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Contacts Tab */}
            {adminTab === 'contacts' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">{t.admin.contacts}</h2>
                {contacts.length === 0 ? (
                  <div className="glass rounded-2xl p-8 text-center text-[var(--muted)]">
                    {t.admin.noContacts}
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {contacts.map((contact) => (
                      <div key={contact.id} className="glass rounded-2xl p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">{contact.name}</h3>
                            <a href={`mailto:${contact.email}`} className="text-sm text-[var(--accent)] hover:underline">
                              {contact.email}
                            </a>
                          </div>
                          <span className="text-xs text-[var(--muted)]">
                            {new Date(contact.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
                          </span>
                        </div>
                        <p className="text-sm text-[var(--muted)]">{contact.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {adminTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">{t.admin.settings}</h2>
                <div className="glass rounded-2xl p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.admin.siteName}</label>
                    <input
                      type="text"
                      value={siteSettings.siteName}
                      onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.admin.logo}</label>
                    <div className="flex items-center gap-4">
                      {siteSettings.logo && (
                        <img src={siteSettings.logo} alt="Logo" className="w-16 h-16 rounded-xl object-cover" />
                      )}
                      <input
                        type="text"
                        value={siteSettings.logo || ''}
                        onChange={(e) => setSiteSettings({ ...siteSettings, logo: e.target.value || null })}
                        className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                        placeholder={t.admin.logoPlaceholder}
                      />
                    </div>
                    <p className="text-xs text-[var(--muted)] mt-2">
                      {language === 'fr' ? 'Entrez une URL d\'image (ex: https://example.com/logo.png)' : 'Enter an image URL (e.g., https://example.com/logo.png)'}
                    </p>
                  </div>
                  <button
                    onClick={handleSettingsSave}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold hover:opacity-90 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    {t.admin.save}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--accent-secondary)]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in-up">
              <Wallet className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-sm text-[var(--muted)]">{t.hero.badge}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              {t.hero.title} <span className="gradient-text">{t.hero.titleHighlight}</span>
              <br className="hidden sm:block" /> {t.hero.titleEnd}
            </h1>
            
            <p className="text-lg sm:text-xl text-[var(--muted)] mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {t.hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <a
                href="#solutions"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[var(--accent)] text-white font-semibold hover:opacity-90 transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                {t.hero.cta1}
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#projects"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl glass hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                {t.hero.cta2}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {t.hero.stats.map((stat, i) => (
              <div key={i} className="glass rounded-2xl p-6 text-center">
                <p className="text-2xl lg:text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-[var(--muted)] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {t.solutions.title} <span className="gradient-text">{t.solutions.titleHighlight}</span>
            </h2>
            <p className="text-[var(--muted)] max-w-2xl mx-auto">
              {t.solutions.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {t.solutions.types.map((type, i) => (
              <div
                key={i}
                className="glass rounded-3xl p-8 lg:p-10 hover:scale-[1.02] transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center mb-6 group-hover:animate-pulse-glow">
                  <type.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{type.title}</h3>
                <p className="text-[var(--muted)] mb-6">{type.description}</p>
                <ul className="space-y-3">
                  {type.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <Check className="w-4 h-4 text-[var(--accent)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section id="sectors" className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent)]/5 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {t.sectors.title} <span className="gradient-text">{t.sectors.titleHighlight}</span>
            </h2>
            <p className="text-[var(--muted)] max-w-2xl mx-auto">
              {t.sectors.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {t.sectors.items.map((sector, i) => (
              <div
                key={i}
                className="glass rounded-3xl p-8 hover:scale-[1.02] transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-5">
                  <sector.icon className="w-6 h-6 text-[var(--accent)]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{sector.title}</h3>
                <p className="text-[var(--muted)] text-sm mb-5">{sector.description}</p>
                <div className="flex flex-wrap gap-2">
                  {sector.examples.map((ex, j) => (
                    <span key={j} className="px-3 py-1 rounded-full bg-white/5 text-xs text-[var(--muted)]">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Target Markets */}
          <div className="mt-16 glass rounded-3xl p-8 lg:p-12">
            <h3 className="text-xl font-bold mb-6 text-center">{t.sectors.markets.title}</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {t.sectors.markets.items.map((market, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                    <market.icon className="w-5 h-5 text-[var(--accent)]" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{market.title}</p>
                    <p className="text-xs text-[var(--muted)]">{market.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {t.projects.title} <span className="gradient-text">{t.projects.titleHighlight}</span>
            </h2>
            <p className="text-[var(--muted)] max-w-2xl mx-auto">
              {t.projects.subtitle}
            </p>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {t.projects.filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? 'bg-[var(--accent)] text-white'
                    : 'glass hover:bg-white/10'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="glass rounded-2xl p-8 text-center text-[var(--muted)]">
              {t.admin.noProjects}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, i) => (
                <div
                  key={project.id}
                  className="glass rounded-3xl p-6 hover:scale-[1.02] transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.type === 'pure' 
                        ? 'bg-pink-500/10 text-pink-400' 
                        : 'bg-[var(--accent)]/10 text-[var(--accent)]'
                    }`}>
                      {project.type === 'pure' ? t.projects.pure : t.projects.reward}
                    </span>
                    <span className="text-xs text-[var(--muted)]">{project.category}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2">{project.name}</h3>
                  <p className="text-sm text-[var(--muted)] mb-4">{project.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[var(--muted)]">{t.projects.progress}</span>
                      <span className="font-medium">{Math.round((project.raised / project.goal) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] rounded-full"
                        style={{ width: `${Math.min((project.raised / project.goal) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-bold">${project.raised.toLocaleString()}</span>
                      <span className="text-[var(--muted)]"> / ${project.goal.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[var(--muted)]">
                      <Users className="w-4 h-4" />
                      <span>{project.contributors}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Conditions Section */}
      <section id="conditions" className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-secondary)]/5 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {t.conditions.title} <span className="gradient-text">{t.conditions.titleHighlight}</span>
            </h2>
            <p className="text-[var(--muted)] max-w-2xl mx-auto">
              {t.conditions.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {t.conditions.items.map((item, i) => (
              <div
                key={i}
                className="glass rounded-3xl p-8 hover:scale-[1.02] transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-[var(--accent)]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-[var(--muted)] text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="mt-16 glass rounded-3xl p-8 lg:p-12">
            <h3 className="text-xl font-bold mb-8 text-center">{t.conditions.process.title}</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.conditions.process.steps.map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center mx-auto mb-4 text-white font-bold">
                    {item.step}
                  </div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-[var(--muted)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 lg:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t.faq.title} <span className="gradient-text">{t.faq.titleHighlight}</span>
            </h2>
          </div>

          <div className="space-y-4">
            {t.faq.items.map((item, i) => (
              <div
                key={i}
                className="glass rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium pr-4">{item.question}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-[var(--accent)] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[var(--muted)] shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-[var(--muted)] text-sm animate-fade-in-up">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent)]/10 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                {t.contact.title} <span className="gradient-text">{t.contact.titleHighlight}</span>{t.contact.titleEnd}
              </h2>
              <p className="text-[var(--muted)] mb-8">
                {t.contact.description}
              </p>
              
              <div className="space-y-4">
                {t.contact.features.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-[var(--accent)]" />
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl p-8">
              {formSubmitted ? (
                <div className="text-center py-8 animate-fade-in-up">
                  <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{t.contact.success.title}</h3>
                  <p className="text-[var(--muted)] text-sm">{t.contact.success.description}</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">{t.contact.form.name}</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                      placeholder={t.contact.form.namePlaceholder}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">{t.contact.form.email}</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                      placeholder={t.contact.form.emailPlaceholder}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">{t.contact.form.message}</label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none transition-colors resize-none"
                      placeholder={t.contact.form.messagePlaceholder}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-4 rounded-xl bg-[var(--accent)] text-white font-semibold hover:opacity-90 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    {t.contact.form.submit}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                {siteSettings.logo ? (
                  <img src={siteSettings.logo} alt="Logo" className="w-10 h-10 rounded-xl object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                )}
                <span className="text-xl font-bold">{siteSettings.siteName}</span>
              </div>
              <p className="text-sm text-[var(--muted)]">
                {t.footer.description}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{t.footer.solutions.title}</h4>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                <li><a href="#solutions" className="hover:text-[var(--text)] transition-colors">{t.footer.solutions.items[0]}</a></li>
                <li><a href="#solutions" className="hover:text-[var(--text)] transition-colors">{t.footer.solutions.items[1]}</a></li>
                <li><a href="#sectors" className="hover:text-[var(--text)] transition-colors">{t.footer.solutions.items[2]}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{t.footer.resources.title}</h4>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                <li><a href="#conditions" className="hover:text-[var(--text)] transition-colors">{t.footer.resources.items[0]}</a></li>
                <li><a href="#faq" className="hover:text-[var(--text)] transition-colors">{t.footer.resources.items[1]}</a></li>
                <li><a href="#contact" className="hover:text-[var(--text)] transition-colors">{t.footer.resources.items[2]}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal.title}</h4>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                <li><a href="#" className="hover:text-[var(--text)] transition-colors">{t.footer.legal.items[0]}</a></li>
                <li><a href="#" className="hover:text-[var(--text)] transition-colors">{t.footer.legal.items[1]}</a></li>
                <li><a href="#" className="hover:text-[var(--text)] transition-colors">{t.footer.legal.items[2]}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[var(--border)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--muted)]">
              {t.footer.copyright}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
