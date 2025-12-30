// components/Services.jsx
import { useState } from 'react';

const services = [
  {
    id: 1,
    title: "Medical Emergency",
    desc: "Immediate medical assistance connected to nearby responders based on urgency.",
    icon: "🩺",
    features: [
      "Verified medical professionals",
      "Ambulance dispatch coordination",
      "Real-time location sharing",
      "Medical history access (opt-in)"
    ],
    responseTime: "2-5 mins",
    priorityLevel: "Critical",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50"
  },
  {
    id: 2,
    title: "Security Assistance",
    desc: "Quick response for personal safety, threats, or security-related issues.",
    icon: "🛡️",
    features: [
      "Trained security personnel",
      "Police coordination",
      "Live audio/video streaming",
      "Safe location guidance"
    ],
    responseTime: "3-7 mins",
    priorityLevel: "High",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    id: 3,
    title: "Accident Support",
    desc: "Fast coordination during road or workplace accidents to minimize delays.",
    icon: "🚨",
    features: [
      "Multiple responder dispatch",
      "Traffic management support",
      "Insurance documentation",
      "Witness coordination"
    ],
    responseTime: "4-8 mins",
    priorityLevel: "High",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50"
  },
  {
    id: 4,
    title: "General Assistance",
    desc: "Any urgent assistance routed intelligently based on priority and location.",
    icon: "🤝",
    features: [
      "24/7 availability",
      "Multi-category responders",
      "Priority-based queuing",
      "Community volunteers"
    ],
    responseTime: "5-10 mins",
    priorityLevel: "Medium",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50"
  }
];

const stats = [
  { value: "Under 5 min", label: "Avg. Response Time" },
  { value: "24/7", label: "Availability" },
  { value: "95%+", label: "User Satisfaction" },
  { value: "500+", label: "Active Responders" }
];

export default function Services() {
  const [activeService, setActiveService] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-white px-6 py-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#eff6ff] text-[#2563eb] rounded-full text-sm font-semibold mb-4">
            Our Services
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-6">
            Rapid Response Services
          </h1>
          <p className="text-lg text-[#64748b] max-w-3xl mx-auto leading-relaxed">
            Priority-based emergency and assistance services that connect users with verified nearby 
            responders in real-time. Each service is optimized for speed and effectiveness.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-3xl font-bold text-[#2563eb] mb-2">{stat.value}</div>
              <div className="text-sm text-[#64748b] font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 lg:grid-cols-2 mb-16">
          {services.map((service) => (
            <div 
              key={service.id}
              className={`bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300 ${
                activeService === service.id ? 'ring-2 ring-[#2563eb]' : ''
              }`}
              onMouseEnter={() => setActiveService(service.id)}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`text-3xl ${service.bgColor} p-3 rounded-xl`}>
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#0f172a]">{service.title}</h3>
                        <div className="flex items-center space-x-3 mt-2">
                          <span className="px-3 py-1 bg-[#eff6ff] text-[#2563eb] rounded-full text-xs font-bold">
                            {service.priorityLevel} Priority
                          </span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            ⏱️ {service.responseTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[#64748b] text-lg leading-relaxed mb-6">
                      {service.desc}
                    </p>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <h4 className="font-semibold text-[#0f172a] text-sm uppercase tracking-wide">
                    Key Features:
                  </h4>
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#0f172a]">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <button className="w-full py-3 bg-gradient-to-r from-[#2563eb] to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98]">
                  Request {service.title}
                </button>
              </div>
              
              {/* Service Status Bar */}
              <div className="h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 opacity-80"></div>
            </div>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-3xl shadow-lg border border-blue-100 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-[#0f172a] text-center mb-12">
            How Our Service Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#eff6ff] text-[#2563eb] rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-3">Request Help</h3>
              <p className="text-[#64748b]">
                Select service type, priority level, and provide location. Your request is instantly logged.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#eff6ff] text-[#2563eb] rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-3">Smart Matching</h3>
              <p className="text-[#64748b]">
                Our algorithm finds the nearest available responder based on urgency and expertise.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#eff6ff] text-[#2563eb] rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-3">Instant Connection</h3>
              <p className="text-[#64748b]">
                Get connected via voice/video with real-time location tracking until help arrives.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="mt-12 p-6 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl text-center">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
              <div className="text-left">
                <h4 className="font-bold text-red-700">Life-Threatening Emergency?</h4>
                <p className="text-red-600 text-sm">Call local emergency services immediately</p>
              </div>
            </div>
            <button className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors">
              🚨 Emergency Hotline: 112
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}