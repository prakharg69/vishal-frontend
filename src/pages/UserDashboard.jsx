import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { 
  Bell, 
  MapPin, 
  AlertTriangle, 
  Heart, 
  Shield, 
  Car, 
  Send, 
  Clock, 
  CheckCircle, 
  LogOut,
  MessageSquare,
  Zap,
  Activity,
  Navigation,
  Sparkles
} from "lucide-react";

export default function UserDashboard() {
  const { user, logout } = useAuth();

  const [category, setCategory] = useState("medical");
  const [message, setMessage] = useState("");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [activeTab, setActiveTab] = useState("create");
  const [locationStatus, setLocationStatus] = useState("📍 Ready to track");

  const categoryIcons = {
    medical: { icon: <Heart className="w-5 h-5" />, color: "from-rose-400 to-pink-500" },
    security: { icon: <Shield className="w-5 h-5" />, color: "from-blue-400 to-cyan-500" },
    accident: { icon: <Car className="w-5 h-5" />, color: "from-amber-400 to-orange-500" }
  };

  const getMyRequests = async () => {
    try {
      setFetching(true);
      const res = await axios.get(
        "http://localhost:5001/api/request/my",
        { withCredentials: true }
      );
      setRequests(res.data.requests);
    } catch {
      setRequests([]);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    getMyRequests();
  }, []);

  const handleCreateRequest = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      alert("Please describe your problem");
      return;
    }

    setLocationStatus("📍 Getting location...");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          setLoading(true);
          setLocationStatus("📍 Sending emergency alert...");
          const { latitude, longitude } = pos.coords;

          await axios.post(
            "http://localhost:5001/api/request/create",
            {
              category,
              message,
              latitude,
              longitude
            },
            { withCredentials: true }
          );

          setMessage("");
          setLocationStatus("📍 Alert sent successfully!");
          getMyRequests();
          
          // Add success animation effect
          setTimeout(() => setLocationStatus("📍 Ready to track"), 2000);
        } catch (err) {
          alert(
            err.response?.data?.message ||
              "Failed to create request"
          );
          setLocationStatus("📍 Error - Try again");
        } finally {
          setLoading(false);
        }
      },
      () => {
        alert("Location permission denied");
        setLocationStatus("📍 Location blocked");
      }
    );
  };

  const pendingRequests = requests.filter(r => r.status === "pending");
  const repliedRequests = requests.filter(r => r.status === "replied");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    Emergency Response
                  </h1>
                  <p className="text-slate-600">Rapid assistance dashboard</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold text-slate-900">{user?.name}</p>
                <p className="text-sm text-slate-600">{user?.email}</p>
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-2 mb-8">
            {["create", "pending", "responses"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "bg-white text-slate-600 hover:bg-slate-50 shadow"
                }`}
              >
                {tab === "create" && "🚨 Create Alert"}
                {tab === "pending" && "⏳ Pending"}
                {tab === "responses" && "💬 Responses"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-2 space-y-8">
            {/* CREATE REQUEST CARD */}
            {activeTab === "create" && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50 transform transition-all duration-300 hover:scale-[1.01]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-xl animate-pulse">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Emergency Alert System</h2>
                </div>

                <form onSubmit={handleCreateRequest} className="space-y-6">
                  {/* Category Selection */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Select Emergency Type
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(categoryIcons).map(([key, { icon, color }]) => (
                        <button
                          type="button"
                          key={key}
                          onClick={() => setCategory(key)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            category === key
                              ? `border-transparent bg-gradient-to-r ${color} text-white shadow-lg transform scale-105`
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            {icon}
                            <span className="text-sm font-medium capitalize">
                              {key}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Emergency Details
                    </label>
                    <div className="relative">
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe your emergency situation in detail..."
                        rows={4}
                        className="w-full p-4 pr-12 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 resize-none bg-white/50 backdrop-blur-sm"
                      />
                      <MessageSquare className="absolute right-4 top-4 w-5 h-5 text-slate-400" />
                    </div>
                  </div>

                  {/* Location Status */}
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-3">
                      <Navigation className="w-5 h-5 text-blue-500 animate-bounce" />
                      <span className="font-medium text-slate-700">{locationStatus}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                      loading
                        ? "bg-gradient-to-r from-slate-400 to-slate-500"
                        : "bg-gradient-to-r from-red-500 to-pink-500 hover:shadow-2xl hover:shadow-red-200"
                    } text-white shadow-lg`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-3">
                        <Activity className="w-5 h-5 animate-spin" />
                        Sending Emergency Alert...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <Send className="w-5 h-5" />
                        🚨 Send Emergency Alert
                      </div>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* PENDING REQUESTS */}
            {activeTab === "pending" && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Active Requests</h2>
                  </div>
                  <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full font-medium">
                    {pendingRequests.length} Pending
                  </span>
                </div>

                {fetching ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  </div>
                ) : pendingRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                      <Bell className="w-12 h-12 text-slate-400" />
                    </div>
                    <p className="text-slate-500 text-lg">No active emergencies</p>
                    <p className="text-slate-400">All clear! 🎉</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingRequests.map((req) => (
                      <div
                        key={req._id}
                        className="group bg-gradient-to-r from-white to-blue-50 border-2 border-blue-100 rounded-2xl p-6 hover:border-blue-300 transition-all duration-300 transform hover:scale-[1.01]"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-xl bg-gradient-to-r ${categoryIcons[req.category]?.color || 'from-blue-400 to-cyan-500'}`}>
                              {categoryIcons[req.category]?.icon || <AlertTriangle className="w-5 h-5 text-white" />}
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-slate-900 capitalize">
                                {req.category} Emergency
                              </h3>
                              <p className="text-sm text-slate-600">
                                Requested {new Date(req.createdAt).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                          <div className="px-4 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-full">
                            <span className="text-amber-700 font-medium flex items-center gap-2">
                              <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></div>
                              Waiting Response
                            </span>
                          </div>
                        </div>
                        <p className="text-slate-700 mb-4 bg-slate-50 p-4 rounded-xl">
                          {req.message}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>Location: {req.latitude?.toFixed(4)}, {req.longitude?.toFixed(4)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* RESPONSES */}
            {activeTab === "responses" && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Emergency Responses</h2>
                  </div>
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium">
                    {repliedRequests.length} Responses
                  </span>
                </div>

                {repliedRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-12 h-12 text-slate-400" />
                    </div>
                    <p className="text-slate-500 text-lg">No responses yet</p>
                    <p className="text-slate-400">Awaiting responder feedback</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {repliedRequests.map((req) => (
                      <div
                        key={req._id}
                        className="group bg-gradient-to-r from-white to-green-50 border-2 border-green-100 rounded-2xl p-6 hover:border-green-300 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-xl bg-gradient-to-r ${categoryIcons[req.category]?.color || 'from-blue-400 to-cyan-500'}`}>
                              {categoryIcons[req.category]?.icon || <AlertTriangle className="w-5 h-5 text-white" />}
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-slate-900 capitalize">
                                {req.category} Emergency
                              </h3>
                              <p className="text-sm text-slate-600">
                                Responded {new Date(req.updatedAt).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                          <div className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full">
                            <span className="text-green-700 font-medium flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" />
                              Resolved
                            </span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="bg-slate-50 p-4 rounded-xl">
                            <p className="text-slate-700">{req.message}</p>
                          </div>

                          {/* Responder Reply */}
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="p-2 bg-green-100 rounded-lg">
                                <MessageSquare className="w-5 h-5 text-green-600" />
                              </div>
                              <h4 className="font-bold text-green-800">Responder's Message</h4>
                            </div>
                            <p className="text-green-700">{req.response || "No message provided"}</p>
                          </div>

                          {/* Services Provided */}
                          {req.servicesProvided?.length > 0 && (
                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-5">
                              <h4 className="font-bold text-blue-800 mb-3">Services Provided</h4>
                              <div className="flex flex-wrap gap-3">
                                {req.servicesProvided.map((srv, i) => (
                                  <div
                                    key={i}
                                    className="px-4 py-2 bg-white border border-blue-200 rounded-full flex items-center gap-2"
                                  >
                                    <Sparkles className="w-4 h-4 text-blue-500" />
                                    <span className="text-blue-700 font-medium">
                                      {srv.name}: <span className="text-blue-900">{srv.quantity}</span>
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <div className="space-y-8">
            {/* STATS CARD */}
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-6 shadow-2xl border border-white/50">
              <h3 className="font-bold text-xl text-slate-900 mb-6">Emergency Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                    </div>
                    <span className="text-slate-700">Total Requests</span>
                  </div>
                  <span className="text-2xl font-bold text-slate-900">{requests.length}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Clock className="w-5 h-5 text-amber-500" />
                    </div>
                    <span className="text-slate-700">Active</span>
                  </div>
                  <span className="text-2xl font-bold text-amber-600">{pendingRequests.length}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="text-slate-700">Resolved</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{repliedRequests.length}</span>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl p-6 shadow-2xl border border-white/50">
              <h3 className="font-bold text-xl text-slate-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setActiveTab("create")}
                  className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <AlertTriangle className="w-6 h-6 mb-2" />
                  <span className="font-medium">New Alert</span>
                </button>
                <button 
                  onClick={getMyRequests}
                  className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Activity className="w-6 h-6 mb-2" />
                  <span className="font-medium">Refresh</span>
                </button>
              </div>
            </div>

            {/* LOGOUT BUTTON */}
            <button
              onClick={logout}
              className="w-full p-4 bg-gradient-to-r from-white to-red-50 border-2 border-red-200 text-red-600 rounded-2xl font-bold flex items-center justify-center gap-3 hover:border-red-300 hover:bg-red-50 transition-all duration-300 transform hover:scale-[1.02]"
            >
              <LogOut className="w-5 h-5" />
              Logout Session
            </button>

            {/* STATUS INDICATOR */}
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 shadow-2xl border border-white/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium text-slate-700">System Status</span>
              </div>
              <p className="text-sm text-slate-600">
                Emergency response system is <span className="text-green-600 font-medium">ACTIVE</span>
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Ready to dispatch help 24/7
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            Emergency Response Dashboard • For immediate assistance call 911
          </p>
        </div>
      </div>
    </div>
  );
}