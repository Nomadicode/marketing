import React, { useState, useEffect } from 'react';
import {
  Code2,
  Rocket,
  Smartphone,
  Globe,
  Database,
  Shield,
  Star,
  ChevronRight,
  MessageSquare,
  Users,
  CheckCircle,
  DollarSign,
  Clock,
  Zap,
  Code,
  Github,
  ExternalLink
} from 'lucide-react';
import { supabase } from './lib/supabase';
import type { SuccessStory, Review, InternalProject } from './types/database';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function App() {
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
      title: 'Small Business Websites',
      description: 'Custom, mobile-friendly websites that help your business stand out and attract more customers.'
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'E-commerce Solutions',
      description: 'Affordable online stores that make selling your products easy and profitable.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Business Automation',
      description: 'Streamline your operations with custom tools that save time and reduce costs.'
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Custom Solutions',
      description: 'We don\'t use templates, we use your business to create a custom solution for you.'
    }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          <h3>Quote submitted successfully!</h3>
          <p>We will get back to you as soon as possible.</p>
        </div>
      );
      console.log('Quote submitted successfully:', data);
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast.error(
        <div>
          <h3>Error submitting quote:</h3>
          <p>{error instanceof Error ? error.message : 'An unknown error occurred'}</p>
        </div>
      );
    }
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
            <a href="#services" className="hover:text-blue-200">Services</a>
            <a href="#portfolio" className="hover:text-blue-200">Portfolio</a>
            <a href="#testimonials" className="hover:text-blue-200">Testimonials</a>
            <a href="#contact" className="hover:text-blue-200">Contact</a>
          </div>
        </nav>
        
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Affordable Tech Solutions for Growing Businesses</h1>
            <p className="text-xl mb-8">Transform your small business with custom digital solutions that won't break the bank. Start your journey to success today.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#quote" className="inline-flex items-center justify-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Get Your Free Quote
                <ChevronRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Small Businesses Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <DollarSign className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Budget-Friendly</h3>
              <p className="text-gray-600">We offer flexible payment plans and solutions that fit your budget</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quick Launch</h3>
              <p className="text-gray-600">Time is money, we get you online fast so you can start making money</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Growth Focus</h3>
              <p className="text-gray-600">We focus on helping your business grow and scale, we don't just build a website, we build a business</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Personalized Solutions</h3>
              <p className="text-gray-600">We don't use templates, we use your business to create a custom solution for you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Solutions for Your Business</h2>
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
          <h2 className="text-3xl font-bold text-center mb-16">Success Stories</h2>
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
          <h2 className="text-3xl font-bold text-center mb-16">Our Projects</h2>
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
                          Visit Project
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
                          View Code
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
          <h2 className="text-3xl font-bold text-center mb-16">From Our Clients</h2>
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
          <h2 className="text-3xl font-bold text-center mb-16">Get Your Free Quote</h2>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What do you need?</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="website">Business Website</option>
                  <option value="ecommerce">Online Store</option>
                  <option value="automation">Business Automation</option>
                  <option value="custom">Custom Solution</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Budget</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                >
                  <option value="">Select a range</option>
                  <option value="500-1k">$500 - $1,000</option>
                  <option value="1k-2k">$1,000 - $2,000</option>
                  <option value="2k-5k">$2,000 - $5,000</option>
                  <option value="5k+">$5,000+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tell us about your business</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="What does your business do? What are your goals?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Your Free Quote
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
              <p className="text-gray-400">Empowering small businesses with affordable digital solutions.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Business Websites</li>
                <li>Online Stores</li>
                <li>Business Automation</li>
                <li>Custom Solutions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>hello@nomadicode.com</li>
                <li>+1 (856) 263-0593</li>
                <li>
                  <a href="https://wa.me/18562630593" className="hover:text-blue-200">WhatsApp</a>
                </li>
                <li>
                  <a href="https://calendly.com/richard-nomadicode/30min" className="hover:text-blue-200">Book a Free Consultation</a>
                </li>
              </ul>
            </div>
            <div>
              {/* <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Success Stories</li>
                <li>Small Business Guide</li>
                <li>Pricing</li>
                <li>FAQ</li>
              </ul> */}
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Nomadicode. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <ToastContainer />
    </div>
  );
}

export default App;