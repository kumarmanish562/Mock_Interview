import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import { testimonials } from '@/lib/constants';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">What Users Say</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              See how our AI mock interviewer has helped others prepare for their dream jobs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-6 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                      <FaQuoteLeft className="text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 dark:text-gray-300">"{testimonial.quote}"</p>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Ace Your Next Interview?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start practicing with our AI interviewer today and receive instant feedback to improve your skills.
          </p>
          <a 
            href="/role" 
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-700 hover:bg-gray-100 font-medium rounded-lg transition-colors"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
}