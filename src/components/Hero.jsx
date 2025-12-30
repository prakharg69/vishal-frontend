import { ArrowRight, Shield, Zap, Users, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
    const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#eff6ff] via-[#f8fafc] to-blue-100 py-2 px-4 md:py-28">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center">
          {/* Badge/Pill */}
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#2563eb] px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-blue-100">
            <Shield className="w-4 h-4" />
            <span>Trusted by 500+ emergency teams worldwide</span>
          </div>

          {/* Main Headline - Centered */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-[#0f172a]">
            <span className="block">Instant Help When</span>
            <span className="block">
              <span className="text-[#2563eb]">Every Second</span>
              <span> Counts</span>
            </span>
          </h1>

          {/* Subtitle - Centered */}
          <p className="text-lg text-[#64748b] max-w-3xl mx-auto mb-10 leading-relaxed font-medium px-4">
  Get instant help from nearby responders. Request by priority and category—matched automatically with the fastest available.
</p>
        </div>

        {/* Features List - Centered */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-12 px-4">
          <div className="bg-white p-5 md:p-6 rounded-2xl border border-blue-50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Zap className="w-6 h-6 text-[#2563eb]" />
              </div>
              <div>
                <h3 className="font-bold text-[#0f172a] mb-1 text-lg">Instant Dispatch</h3>
                <p className="text-[#64748b] text-sm md:text-base">First responder assignment in seconds</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 md:p-6 rounded-2xl border border-blue-50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Users className="w-6 h-6 text-[#2563eb]" />
              </div>
              <div>
                <h3 className="font-bold text-[#0f172a] mb-1 text-lg">Smart Matching</h3>
                <p className="text-[#64748b] text-sm md:text-base">Location-based responder selection</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 md:p-6 rounded-2xl border border-blue-50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-3 bg-blue-50 rounded-xl">
                <CheckCircle className="w-6 h-6 text-[#2563eb]" />
              </div>
              <div>
                <h3 className="font-bold text-[#0f172a] mb-1 text-lg">Decentralized</h3>
                <p className="text-[#64748b] text-sm md:text-base">Automatic coordination, no manual intervention</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button - Centered */}
        <div className="flex justify-center items-center gap-4 mb-14">
          <button className="group relative px-7 md:px-8 py-3 md:py-4 bg-[#2563eb] text-white rounded-xl font-semibold text-base md:text-lg hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl shadow-lg shadow-blue-500/20 flex items-center gap-3" onClick={()=> navigate("/login/user")}>
            Get Started for Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

       
      </div>
    </section>
  );
}