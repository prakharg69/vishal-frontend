// components/About.jsx
import { FaUsers, FaShieldAlt, FaClock, FaHeartbeat, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';

export default function About() {
  const values = [
    {
      icon: <FaClock className="w-6 h-6" />,
      title: "Speed",
      desc: "Reducing response time from minutes to seconds through automation"
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: "Reliability",
      desc: "Verified responders with background checks and real-time tracking"
    },
    {
      icon: <FaUsers className="w-6 h-6" />,
      title: "Community",
      desc: "Building a network of trained responders ready to help neighbors"
    },
    {
      icon: <FaHeartbeat className="w-6 h-6" />,
      title: "Care",
      desc: "Prioritizing human lives and well-being above everything else"
    }
  ];

  const stats = [
    { number: "Under 5min", label: "Average Response Time", icon: "⚡" },
    { number: "24/7", label: "Service Availability", icon: "🕒" },
    { number: "95%+", label: "User Satisfaction", icon: "⭐" },
    { number: "1000+", label: "Lives Impacted", icon: "❤️" }
  ];

  const features = [
    "No manual dispatch - Fully automated system",
    "Real-time location tracking",
    "Priority-based request routing",
    "Secure end-to-end communication",
    "Multi-category emergency support",
    "Community volunteer integration"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-white px-6 py-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#eff6ff] text-[#2563eb] rounded-full text-sm font-semibold mb-4">
            Our Mission
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-6">
            About <span className="text-[#2563eb]">QuickResponse</span>
          </h1>
          <p className="text-lg text-[#64748b] max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing emergency response by connecting people in need with 
            verified nearby responders through an automated, priority-based system.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 text-center hover:shadow-md transition-shadow group"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-[#2563eb] mb-2 group-hover:scale-105 transition-transform">
                {stat.number}
              </div>
              <div className="text-sm text-[#64748b] font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          
          {/* Left Column - Story */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
              <h2 className="text-2xl font-bold text-[#0f172a] mb-6">
                Our Story
              </h2>
              <div className="space-y-4">
                <p className="text-[#64748b] text-lg leading-relaxed">
                  QuickResponse was born from a simple observation: traditional emergency systems often 
                  rely on manual coordination, which significantly increases response time during critical moments.
                </p>
                <p className="text-[#64748b] text-lg leading-relaxed">
                  We recognized that every second counts in emergencies. By removing the dependency on 
                  manual dispatch centers and enabling direct, automated connections between those in need 
                  and nearby responders, we've created a system that delivers help faster.
                </p>
                <p className="text-[#64748b] text-lg leading-relaxed">
                  Our "first accept wins" model ensures that the nearest available responder can provide 
                  immediate assistance, creating a fair distribution of tasks and dramatically reducing 
                  waiting times.
                </p>
              </div>
            </div>

            {/* Core Features */}
            <div className="bg-gradient-to-br from-[#2563eb] to-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Core Features</h3>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-blue-200" />
                    <span className="text-blue-50">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Values & Mission */}
          <div className="space-y-8">
            {/* Our Values */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
              <h2 className="text-2xl font-bold text-[#0f172a] mb-8">
                Our Values
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <div 
                    key={index} 
                    className="p-6 rounded-xl bg-gradient-to-br from-white to-[#eff6ff] border border-blue-100 hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#eff6ff] flex items-center justify-center text-[#2563eb] mb-4">
                      {value.icon}
                    </div>
                    <h4 className="text-lg font-bold text-[#0f172a] mb-2">{value.title}</h4>
                    <p className="text-[#64748b] text-sm">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission Statement */}
            <div className="bg-gradient-to-r from-[#eff6ff] to-blue-50 border border-blue-200 rounded-2xl p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-[#2563eb] flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-4">Our Mission</h3>
                  <p className="text-[#64748b] text-lg leading-relaxed">
                    To create safer communities by leveraging technology to deliver immediate, 
                    reliable emergency assistance when and where it's needed most.
                  </p>
                  <div className="mt-6 pt-6 border-t border-blue-200">
                    <p className="text-[#0f172a] font-semibold text-xl">
                      "Our goal is simple: deliver the right help at the right time."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How We're Different */}
        <div className="bg-white rounded-3xl shadow-lg border border-blue-100 p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-[#0f172a] text-center mb-10">
            How We're Different
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6">
                🚨
              </div>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-3">Traditional Systems</h3>
              <ul className="space-y-2 text-[#64748b] text-sm">
                <li>• Manual dispatch centers</li>
                <li>• Longer response times</li>
                <li>• Limited responder availability</li>
                <li>• Fixed emergency categories</li>
              </ul>
            </div>
            
            <div className="text-center p-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-xl">
                <div className="w-16 h-16 bg-[#eff6ff] rounded-2xl flex items-center justify-center text-2xl text-[#2563eb] mx-auto mb-6">
                  ⚡
                </div>
                <h3 className="text-xl font-semibold text-[#0f172a] mb-3">QuickResponse</h3>
                <ul className="space-y-2 text-[#64748b] text-sm">
                  <li>• Automated matching</li>
                  <li>• Under 5-minute response</li>
                  <li>• Community responders</li>
                  <li>• Flexible categories</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6">
                📈
              </div>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-3">The Impact</h3>
              <ul className="space-y-2 text-[#64748b] text-sm">
                <li>• 60% faster response</li>
                <li>• 95% user satisfaction</li>
                <li>• Community empowerment</li>
                <li>• Scalable solution</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Team/Community CTA */}
        <div className="bg-linear-to-r from-[#2563eb] to-blue-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-blue-100 text-lg mb-8">
              Whether you need help or want to help others, QuickResponse connects people 
              to create safer, more responsive communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-[#2563eb] font-bold rounded-xl hover:bg-blue-50 transition-colors">
                Become a Responder
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
                Download App
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}