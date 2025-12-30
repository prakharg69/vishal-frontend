// components/HowItWorks.jsx
import { useState } from 'react';

const steps = [
  {
    number: "01",
    title: "Request Help",
    desc: "User submits a help request by selecting category and priority level based on urgency.",
    icon: "📱",
    details: [
      "Select service category (Medical, Security, Accident, etc.)",
      "Set priority level (Critical, High, Medium)",
      "Enable location sharing for accurate matching",
      "Add optional notes or photos if safe to do so"
    ],
    duration: "30 seconds",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    number: "02",
    title: "Smart Broadcast",
    desc: "The system automatically notifies verified nearby responders matching the request category.",
    icon: "📢",
    details: [
      "AI-powered responder matching algorithm",
      "Location-based radius calculation",
      "Real-time availability checking",
      "Priority queuing for critical requests"
    ],
    duration: "10-15 seconds",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    number: "03",
    title: "First Accept Wins",
    desc: "The first responder who accepts is instantly assigned to provide immediate assistance.",
    icon: "⚡",
    details: [
      "Instant assignment upon acceptance",
      "Responder details shared with user",
      "Real-time location tracking enabled",
      "Secure communication channel established"
    ],
    duration: "Instant",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50"
  },
  {
    number: "04",
    title: "Real-Time Resolution",
    desc: "Continuous communication and updates until the situation is fully resolved.",
    icon: "✅",
    details: [
      "Live audio/video communication",
      "Progress updates every 2 minutes",
      "Post-incident follow-up system",
      "Feedback collection for improvement"
    ],
    duration: "Varies by situation",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50"
  }
];

const features = [
  { title: "No Manual Dispatch", desc: "Fully automated responder assignment" },
  { title: "Real-Time Tracking", desc: "Live location updates for both parties" },
  { title: "Priority-Based Routing", desc: "Critical requests get fastest response" },
  { title: "24/7 Availability", desc: "Round-the-clock emergency service" }
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f8fafc] px-6 py-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#eff6ff] text-[#2563eb] rounded-full text-sm font-semibold mb-4">
            Process Flow
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-6">
            How It Works
          </h1>
          <p className="text-lg text-[#64748b] max-w-3xl mx-auto leading-relaxed">
            Our automated system eliminates manual coordination delays, connecting users with 
            nearby responders in real-time through a streamlined four-step process.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Left Column - Process Steps */}
          <div className="lg:col-span-2">
            {/* Connection Line - Desktop Only */}
            <div className="hidden lg:block relative">
              <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 via-green-500 to-orange-500"></div>
              
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="relative mb-12 last:mb-0"
                  onMouseEnter={() => setActiveStep(index)}
                >
                  {/* Step Connector Dot */}
                  <div className="absolute left-10 top-6 transform -translate-x-1/2">
                    <div className={`w-4 h-4 rounded-full bg-linear-to-r ${step.color} ${
                      activeStep >= index ? 'ring-4 ring-opacity-30' : ''
                    } ring-current transition-all duration-300`}></div>
                  </div>

                  <div className={`ml-24 bg-white rounded-2xl shadow-lg border border-blue-100 p-8 hover:shadow-xl transition-all duration-300 cursor-pointer ${
                    activeStep === index ? 'ring-2 ring-blue-500' : ''
                  }`}>
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className={`text-3xl ${step.bgColor} p-4 rounded-xl`}>
                          {step.icon}
                        </div>
                        <div>
                          <span className="text-sm font-bold text-[#64748b]">STEP {step.number}</span>
                          <h3 className="text-2xl font-bold text-[#0f172a] mt-1">{step.title}</h3>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        ⏱️ {step.duration}
                      </span>
                    </div>
                    
                    <p className="text-[#64748b] text-lg mb-6">{step.desc}</p>
                    
                    {/* Expanded Details */}
                    <div className={`space-y-3 transition-all duration-500 ${
                      activeStep === index ? 'max-h-90 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}>
                      <h4 className="font-semibold text-[#0f172a] text-sm uppercase tracking-wide">
                        Process Details:
                      </h4>
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-[#0f172a]">{detail}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Expand/Collapse Indicator */}
                    <div className="mt-6 flex justify-center">
                      <button 
                        onClick={() => setActiveStep(activeStep === index ? -1 : index)}
                        className="text-[#2563eb] hover:text-blue-700 font-medium flex items-center space-x-2"
                      >
                        <span>{activeStep === index ? 'Show Less' : 'Learn More'}</span>
                        <svg 
                          className={`w-4 h-4 transition-transform duration-300 ${
                            activeStep === index ? 'rotate-180' : ''
                          }`}
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-6">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6"
                  onClick={() => setActiveStep(activeStep === index ? -1 : index)}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl ${step.bgColor} flex items-center justify-center text-2xl`}>
                      {step.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#64748b]">STEP {step.number}</span>
                      <h3 className="text-xl font-bold text-[#0f172a]">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-[#64748b] mb-4">{step.desc}</p>
                  
                  {activeStep === index && (
                    <div className="space-y-3 mt-4 pt-4 border-t border-blue-100">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start text-sm">
                          <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-[#0f172a]">{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Features & Demo */}
          <div className="space-y-8">
            {/* Key Features */}
            <div className="bg-gradient-to-br from-[#2563eb] to-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">System Advantages</h3>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold">{feature.title}</h4>
                      <p className="text-blue-100 text-sm mt-1">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Time Demo */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
              <h3 className="text-2xl font-bold text-[#0f172a] mb-6">Average Response Times</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#0f172a] font-medium">Critical Priority</span>
                    <span className="text-[#2563eb] font-bold">2-5 mins</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#0f172a] font-medium">High Priority</span>
                    <span className="text-[#2563eb] font-bold">5-10 mins</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#0f172a] font-medium">Medium Priority</span>
                    <span className="text-[#2563eb] font-bold">10-15 mins</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Start CTA */}
            <div className="bg-gradient-to-r from-[#eff6ff] to-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-[#0f172a] mb-4">Ready to Get Started?</h3>
              <p className="text-[#64748b] mb-6">
                Download our app and be prepared for any emergency situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="px-6 py-3 bg-[#0f172a] text-white rounded-xl font-semibold hover:bg-gray-900 transition-colors">
                  Download App
                </button>
                <button className="px-6 py-3 bg-white text-[#2563eb] border border-blue-300 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Process Visualization - Bottom Section */}
        <div className="mt-16 bg-white rounded-3xl shadow-lg border border-blue-100 p-8 md:p-12">
          <h3 className="text-3xl font-bold text-[#0f172a] text-center mb-10">
            The Complete Response Flow
          </h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-3xl`}>
                    {step.icon}
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-1 bg-gradient-to-r from-gray-300 to-gray-400"></div>
                  )}
                </div>
                <h4 className="text-lg font-bold text-[#0f172a] mb-2">{step.title}</h4>
                <p className="text-[#64748b] text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-3 px-6 py-4 bg-green-50 text-green-700 rounded-xl">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold">System Status: All services operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}