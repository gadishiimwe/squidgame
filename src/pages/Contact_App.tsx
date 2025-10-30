import { Mail, MapPin, Phone, Send } from 'lucide-react';

function Contact_App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-slate-900 mb-4">Get In Touch</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Have a question or want to work together? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Send us a message</h2>

              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 md:p-12 text-white">
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                <p className="text-blue-100 mb-8 leading-relaxed">
                  Reach out to us through any of the following channels and we'll get back to you as soon as possible.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="bg-white/10 p-3 rounded-lg group-hover:bg-white/20 transition-all">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a
                        href="mailto:demo@example.com"
                        className="text-blue-100 hover:text-white transition-colors"
                      >
                        demo@example.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="bg-white/10 p-3 rounded-lg group-hover:bg-white/20 transition-all">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <a
                        href="tel:+1234567890"
                        className="text-blue-100 hover:text-white transition-colors"
                      >
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="bg-white/10 p-3 rounded-lg group-hover:bg-white/20 transition-all">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-blue-100">
                        123 Business Street<br />
                        Suite 100<br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Business Hours</h3>
                <div className="space-y-3 text-black">
                  <div className="flex justify-between">
                    <span className="font-medium">Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium-text-black">Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact_App;
