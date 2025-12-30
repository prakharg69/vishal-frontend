// components/Services.jsx
import { FaStethoscope, FaShieldAlt, FaCarCrash, FaHandsHelping } from 'react-icons/fa';

const services = [
  {
    icon: <FaStethoscope className="w-8 h-8" />,
    title: "Medical Emergency",
    desc: "Connect instantly with nearby medical professionals for urgent health situations.",
    features: ["Real-time responder location", "Medical background verified", "Ambulance dispatch"],
    responseTime: "Under 2 mins",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    icon: <FaShieldAlt className="w-8 h-8" />,
    title: "Security Help",
    desc: "Immediate safety response from trained security personnel nearby.",
    features: ["Trained responders", "Real-time tracking", "Local authority alert"],
    responseTime: "Under 90 secs",
    gradient: "from-blue-600 to-blue-700"
  },
  {
    icon: <FaCarCrash className="w-8 h-8" />,
    title: "Accident Support",
    desc: "Rapid coordination for road accidents with multi-responder dispatch.",
    features: ["Multi-responder dispatch", "Traffic management", "Insurance support"],
    responseTime: "Under 3 mins",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    icon: <FaHandsHelping className="w-8 h-8" />,
    title: "General Assistance",
    desc: "Priority-based urgent help for any situation requiring immediate attention.",
    features: ["24/7 availability", "Priority queuing", "Location-based matching"],
    responseTime: "Under 2 mins",
    gradient: "from-blue-600 to-blue-700"
  }
];

export default function Services() {
  return (
    <section className="py-20 px-8 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#eff6ff] text-[#2563eb] rounded-full text-sm font-semibold mb-4">
            Our Services
          </span>
          <h2 className="text-4xl font-bold text-[#0f172a] mb-4">
            Rapid Response Categories
          </h2>
          <p className="text-lg text-[#64748b] max-w-2xl mx-auto">
            Instant connection to verified responders based on your emergency type and priority level
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((item, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-100"
            >
              {/* Icon Container */}
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${item.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {item.icon}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-[#0f172a] mb-3 group-hover:text-[#2563eb] transition-colors">
                {item.title}
              </h3>
              <p className="text-[#64748b] text-sm mb-6 leading-relaxed">
                {item.desc}
              </p>

              {/* Features List */}
              <ul className="space-y-2 mb-6">
                {item.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    <svg className="w-4 h-4 text-[#2563eb] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#0f172a] font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Response Time Badge */}
              <div className="pt-6 border-t border-blue-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#64748b]">Avg. Response</span>
                  <span className="px-3 py-1 bg-[#eff6ff] text-[#2563eb] rounded-full text-sm font-bold">
                    {item.responseTime}
                  </span>
                </div>
              </div>

              {/* Hover Indicator */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 group-hover:w-4/5 transition-all duration-300 rounded-t-full"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl shadow-lg border border-blue-100">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-[#0f172a] font-medium">
                All services include <span className="text-[#2563eb] font-bold">real-time tracking</span> and <span className="text-[#2563eb] font-bold">verified responders</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}