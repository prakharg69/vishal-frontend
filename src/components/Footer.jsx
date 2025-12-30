// components/Footer.jsx (without react-icons)
export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#f8fafc] border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0f172a]">
              Quick<span className="text-[#2563eb]">Response</span>
            </h2>
            <p className="text-[#64748b] text-sm leading-relaxed">
              Instant emergency response system connecting people in need with verified nearby responders.
            </p>
            <div className="flex space-x-4">
              {['Facebook', 'Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#eff6ff] flex items-center justify-center text-[#2563eb] hover:bg-[#2563eb] hover:text-white transition-colors"
                >
                  {social.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#0f172a] mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Services', 'About Us', 'How It Works', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-[#64748b] hover:text-[#2563eb] transition-colors flex items-center group"
                  >
                    <span className="w-1 h-1 bg-[#2563eb] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-[#0f172a] mb-4">Services</h3>
            <ul className="space-y-3">
              {['Medical Emergency', 'Security Help', 'Accident Support', 'General Assistance', 'Fire Response'].map((service) => (
                <li key={service}>
                  <a 
                    href="#" 
                    className="text-[#64748b] hover:text-[#2563eb] transition-colors flex items-center group"
                  >
                    <span className="w-1 h-1 bg-[#2563eb] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-[#0f172a] mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#eff6ff] flex items-center justify-center text-[#2563eb] mt-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#0f172a]">Emergency Hotline</p>
                  <p className="text-[#2563eb] font-bold">112 / 911</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#eff6ff] flex items-center justify-center text-[#2563eb] mt-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#0f172a]">Email</p>
                  <p className="text-[#64748b]">support@quickresponse.com</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#eff6ff] flex items-center justify-center text-[#2563eb] mt-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#0f172a]">Headquarters</p>
                  <p className="text-[#64748b]">123 Safety Street, Emergency City</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-blue-100 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-[#64748b] text-sm mb-4 md:mb-0">
            © {currentYear} QuickResponse System. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-[#64748b] hover:text-[#2563eb] text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[#64748b] hover:text-[#2563eb] text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-[#64748b] hover:text-[#2563eb] text-sm transition-colors">
              Cookie Policy
            </a>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-[#2563eb] font-medium">System Status: Online</span>
            </div>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="mt-8 p-4 bg-[#eff6ff] border border-blue-200 rounded-lg text-center">
          <p className="text-sm text-[#0f172a]">
            <span className="font-bold text-[#2563eb]">⚠️ IMPORTANT:</span> For immediate life-threatening emergencies, please call local emergency services first.
          </p>
        </div>
      </div>
    </footer>
  );
}