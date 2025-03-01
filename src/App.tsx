import React, { useState, useEffect } from 'react';
import {
  Globe,
  Star,
  ChevronRight,
  Users,
  DollarSign,
  Clock,
  Zap,
  Code,
  Github,
  ExternalLink,
  CircleHelp
} from 'lucide-react';
import { supabase } from './lib/supabase';
import type { SuccessStory, Review, InternalProject } from './types/database';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function App() {
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'website',
    budget: '',
    message: ''
  });

  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [internalProjects, setInternalProjects] = useState<InternalProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [storiesRes, reviewsRes, projectsRes] = await Promise.all([
          supabase
            .from('success_stories')
            .select('*')
            .order('created_at', { ascending: false }),
          supabase
            .from('reviews')
            .select('*')
            .order('created_at', { ascending: false }),
          supabase
            .from('internal_projects')
            .select('*')
            .order('created_at', { ascending: false })
        ]);

        if (storiesRes.error) throw storiesRes.error;
        if (reviewsRes.error) throw reviewsRes.error;
        if (projectsRes.error) throw projectsRes.error;

        setSuccessStories(storiesRes.data);
        setReviews(reviewsRes.data);
        setInternalProjects(projectsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const services: Service[] = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: t('services.website.title'),
      description: t('services.website.description')
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: t('services.ecommerce.title'),
      description: t('services.ecommerce.description')
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('services.automation.title'),
      description: t('services.automation.description')
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: t('services.custom.title'),
      description: t('services.custom.description')
    },
    {
      icon: <CircleHelp className="w-6 h-6" />,
      title: t('services.other.title'),
      description: t('services.other.description')
    }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.category || !formData.budget || !formData.message) {
      toast.error(t('form.error'));
      return;
    }

    try {
      const { data, error } = await supabase
        .from('quotes')
        .insert(formData)
        .select();

      if (error) throw error;
      
      setFormData({
        name: '',
        email: '',
        category: 'website',
        budget: '',
        message: ''
      });

      toast.success(
        <div>
          <h3>{t('form.success')}</h3>
          <p>{t('form.successMessage')}</p>
        </div>
      );
      console.log('Quote submitted successfully:', data);
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast.error(
        <div>
          <h3>{t('form.errorSubmission')}</h3>
          <p>{error instanceof Error ? error.message : t('form.errorSubmission')}</p>
        </div>
      );
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-black via-gray-900 to-blue-900 text-white">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/nomadicode-logo.png" alt="Nomadicode" className="h-10" />
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#services" className="hover:text-blue-200">{t('links.services')}</a>
            <a href="#portfolio" className="hover:text-blue-200">{t('links.portfolio')}</a>
            <a href="#testimonials" className="hover:text-blue-200">{t('links.testimonials')}</a>
            <a href="#contact" className="hover:text-blue-200">{t('links.contact')}</a>
          </div>
        </nav>
        
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">{t('hero.title')}</h1>
            <p className="text-xl mb-8">{t('hero.description')}</p>
            <p className="text-xl text-center text-gray-300 p-2 block rounded-md bg-blue-500 mb-8">{t('hero.weSpeakSpanish')}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#quote" className="inline-flex items-center justify-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                {t('hero.button')}
                <ChevronRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{t('pitch.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <DollarSign className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('pitch.budget.title')}</h3>
              <p className="text-gray-600">{t('pitch.budget.description')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('pitch.quickLaunch.title')}</h3>
              <p className="text-gray-600">{t('pitch.quickLaunch.description')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('pitch.growth.title')}</h3>
              <p className="text-gray-600">{t('pitch.growth.description')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('pitch.personalized.title')}</h3>
              <p className="text-gray-600">{t('pitch.personalized.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">{t('services.title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-blue-600 mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="portfolio" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">{t('successStories.title')}</h2>
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {successStories.map((story) => (
                <div key={story.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <img src={story.image_url} alt={story.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                    <p className="text-gray-600 mb-4">{story.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {story.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">
                      <p>{story.client_name}</p>
                      <p>{story.industry}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Internal Projects Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">{t('internalProjects.title')}</h2>
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {internalProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <img src={project.image_url} alt={project.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.project_url && (
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          {t('internalProjects.visit')}
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-gray-600 hover:text-gray-700"
                        >
                          <Github className="w-4 h-4 mr-1" />
                          {t('internalProjects.viewCode')}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">{t('testimonials.title')}</h2>
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    <img src={review.image_url} alt={review.author} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <h3 className="font-semibold">{review.author}</h3>
                      <p className="text-gray-600 text-sm">{review.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{review.content}</p>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quote Builder Section */}
      <section id="quote" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">{t('form.title')}</h2>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.name')}</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.email')}</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.category')}</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="website">{t('form.options.website')}</option>
                  <option value="ecommerce">{t('form.options.ecommerce')}</option>
                  <option value="automation">{t('form.options.automation')}</option>
                  <option value="custom">{t('form.options.custom')}</option>
                  <option value="other">{t('form.options.other')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.budget')}</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                >
                  <option value="">{t('form.budgetOptions')}</option>
                  <option value="100-500"> &lt;$500</option>
                  <option value="500-1k">$500 - $1,000</option>
                  <option value="1k-2k">$1,000 - $2,000</option>
                  <option value="2k-5k">$2,000 - $5,000</option>
                  <option value="5k+">$5,000+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.details')}</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder={t('form.detailsPlaceholder')}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {t('form.title')}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/nomadicode-logo.png" alt="Nomadicode" className="h-8" />
              </div>
              <p className="text-gray-400">{t('footer.pitch')}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.solutions.title')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>{t('footer.solutions.website')}</li>
                <li>{t('footer.solutions.ecommerce')}</li>
                <li>{t('footer.solutions.automation')}</li>
                <li>{t('footer.solutions.custom')}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.contact.title')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="mailto:hello@nomadicode.com" className="hover:text-blue-200">hello@nomadicode.com</a>
                </li>
                <li>
                  <a href="tel:+18562630593" className="hover:text-blue-200">+1 (856) 263-0593</a>
                </li>
                <li>
                  <a href="https://wa.me/18562630593" className="hover:text-blue-200">WhatsApp</a>
                </li>
                <li>
                  <a href="https://calendly.com/richard-nomadicode/30min" className="hover:text-blue-200">{t('footer.contact.consultation')}</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-400"> 
            <div className="flex justify-center gap-4 pb-4">
              <button
                className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-blue-500 hover:text-white transition-colors ${i18n.language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'}`}  
                onClick={() => changeLanguage('en')}>English</button>
              <button
                className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-blue-500 hover:text-white transition-colors ${i18n.language === 'es' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'}`}
                onClick={() => changeLanguage('es')}>Español</button>
            </div>
            <p>&copy; {new Date().getFullYear()} Nomadicode. {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
      <ToastContainer />
    </div>
  );
}

export default App;