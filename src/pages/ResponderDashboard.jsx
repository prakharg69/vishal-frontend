import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import AddService from "../components/AddService";
import ServiceStats from "../components/ServiceStats";
import axios from "axios";
import {
  Activity,
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  Compass,
  Download,
  Eye,
  MapPin,
  MessageSquare,
  RefreshCw,
  Send,
  Shield,
  Truck,
  Users,
  Zap,
  AlertCircle,
  Battery,
  Radio,
  Target,
  Navigation,
  Wifi,
  Satellite,
  Map
} from "lucide-react";

export default function ResponderDashboard() {
  const {
    service,
    serviceLoading,
    incomingRequests,
    incomingLoading,
    getService,
    getIncomingRequests,
    respondToRequest
  } = useAuth();

  const [showResponseBox, setShowResponseBox] = useState(null);
  const [providedServices, setProvidedServices] = useState({});
  const [replyMessage, setReplyMessage] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const [animationPulse, setAnimationPulse] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [manualLocation, setManualLocation] = useState({
    latitude: "",
    longitude: "",
    address: ""
  });

  /* =========================
     FETCH DATA
  ========================== */
  useEffect(() => {
    getService();
    getIncomingRequests();
    // Get current location on load
    getCurrentLocation();
  }, []);

  /* =========================
     GET CURRENT LOCATION
  ========================== */
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
          setManualLocation(prev => ({
            ...prev,
            latitude: latitude.toString(),
            longitude: longitude.toString()
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  /* =========================
     UPDATE LOCATION
  ========================== */
  const updateLocation = async (lat, lng, address = "") => {
    try {
      setLocationLoading(true);
      
      const response = await axios.post(
        "http://localhost:5001/api/responder/set-location",
        {
          latitude: lat,
          longitude: lng,
          address: address || `Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`
        },
        { withCredentials: true }
      );

      if (response.data.responder) {
        alert("Location updated successfully!");
        setCurrentLocation({ latitude: lat, longitude: lng });
        setShowLocationModal(false);
        
        // Trigger success animation
        setAnimationPulse(true);
        setTimeout(() => setAnimationPulse(false), 1000);
      }
    } catch (error) {
      console.error("Failed to update location:", error);
      alert("Failed to update location. Please try again.");
    } finally {
      setLocationLoading(false);
    }
  };

  /* =========================
     HANDLE MANUAL UPDATE
  ========================== */
  const handleManualUpdate = () => {
    const lat = parseFloat(manualLocation.latitude);
    const lng = parseFloat(manualLocation.longitude);
    
    if (isNaN(lat) || isNaN(lng)) {
      alert("Please enter valid coordinates");
      return;
    }
    
    if (lat < -90 || lat > 90) {
      alert("Latitude must be between -90 and 90");
      return;
    }
    
    if (lng < -180 || lng > 180) {
      alert("Longitude must be between -180 and 180");
      return;
    }
    
    updateLocation(lat, lng, manualLocation.address);
  };

  /* =========================
     USE CURRENT LOCATION
  ========================== */
  const handleUseCurrentLocation = () => {
    if (!currentLocation) {
      alert("Unable to get current location. Please check permissions.");
      return;
    }
    
    updateLocation(currentLocation.latitude, currentLocation.longitude);
  };

  /* =========================
     SPLIT REQUESTS
  ========================== */
  const pendingRequests = incomingRequests.filter(r => r.status === "pending");
  const resolvedRequests = incomingRequests.filter(r => r.status === "replied");

  /* =========================
     HANDLE QTY CHANGE
  ========================== */
  const handleQtyChange = (serviceName, value) => {
    if (value === "") {
      setProvidedServices(prev => {
        const copy = { ...prev };
        delete copy[serviceName];
        return copy;
      });
      return;
    }

    const num = Number(value);
    if (num < 0) return;

    setProvidedServices(prev => ({
      ...prev,
      [serviceName]: num
    }));
  };

  /* =========================
     RESET RESPONSE
  ========================== */
  const resetResponse = () => {
    setProvidedServices({});
    setReplyMessage("");
    setShowResponseBox(null);
  };

  /* =========================
     CHECK OVER QUANTITY
  ========================== */
  const hasOverQuantity = () => {
    if (!service?.services) return false;

    return service.services.some(
      srv =>
        providedServices[srv.name] !== undefined &&
        providedServices[srv.name] > srv.quantity
    );
  };

  /* =========================
     SEND RESPONSE
  ========================== */
  const handleSendResponse = async (reqId) => {
    if (!replyMessage.trim()) {
      alert("Please enter response message");
      return;
    }

    if (hasOverQuantity()) {
      alert("Provided quantity exceeds available stock");
      return;
    }

    const servicesProvided = Object.entries(providedServices)
      .filter(([_, qty]) => qty > 0)
      .map(([name, quantity]) => ({ name, quantity }));

    if (servicesProvided.length === 0) {
      alert("Please provide at least one service");
      return;
    }

    const success = await respondToRequest({
      requestId: reqId,
      response: replyMessage,
      servicesProvided
    });

    if (success) {
      resetResponse();
      getIncomingRequests();
      getService();
      // Trigger animation
      setAnimationPulse(true);
      setTimeout(() => setAnimationPulse(false), 1000);
    }
  };

  // Emergency category icons
  const emergencyIcons = {
    medical: { icon: <Activity className="w-5 h-5" />, color: "from-red-400 to-pink-500", bg: "bg-red-100" },
    security: { icon: <Shield className="w-5 h-5" />, color: "from-blue-400 to-cyan-500", bg: "bg-blue-100" },
    accident: { icon: <AlertTriangle className="w-5 h-5" />, color: "from-amber-400 to-orange-500", bg: "bg-amber-100" }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 px-4 py-8">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 ${animationPulse ? 'animate-pulse' : ''}`}>
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent">
                  Emergency Responder Dashboard
                </h1>
                <p className="text-slate-600 flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                    Active Dispatch Center
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">24/7 Emergency Response</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* LOCATION BUTTON */}
              <button
                onClick={() => setShowLocationModal(true)}
                className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <MapPin className="w-5 h-5" />
                Update Location
              </button>

              <button
                onClick={() => { getService(); getIncomingRequests(); }}
                className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <RefreshCw className="w-5 h-5" />
                Refresh Data
              </button>
              
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  R
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* TABS */}
          <div className="flex space-x-2 mb-8">
            {["pending", "resolved", "dispatch"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl transform scale-105"
                    : "bg-white/80 text-slate-600 hover:bg-slate-50 shadow"
                }`}
              >
                {tab === "pending" && (
                  <>
                    <AlertTriangle className="w-5 h-5" />
                    Active Alerts ({pendingRequests.length})
                  </>
                )}
                {tab === "resolved" && (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Resolved Cases ({resolvedRequests.length})
                  </>
                )}
                {tab === "dispatch" && (
                  <>
                    <Truck className="w-5 h-5" />
                    Dispatch Center
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* LOCATION UPDATE MODAL */}
        {showLocationModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl">
                    <Map className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Update Your Location</h2>
                </div>
                <button
                  onClick={() => setShowLocationModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* CURRENT LOCATION DISPLAY */}
                {currentLocation && (
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-2xl">
                    <p className="text-sm font-medium text-slate-700 mb-2">Current Location:</p>
                    <p className="text-lg font-bold text-blue-800">
                      {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
                    </p>
                  </div>
                )}

                {/* COORDINATE INPUTS */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Latitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={manualLocation.latitude}
                      onChange={(e) => setManualLocation(prev => ({ ...prev, latitude: e.target.value }))}
                      placeholder="e.g., 28.6139"
                      className="w-full p-3 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Longitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={manualLocation.longitude}
                      onChange={(e) => setManualLocation(prev => ({ ...prev, longitude: e.target.value }))}
                      placeholder="e.g., 77.2090"
                      className="w-full p-3 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                </div>

                {/* ADDRESS */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Address (Optional)
                  </label>
                  <input
                    type="text"
                    value={manualLocation.address}
                    onChange={(e) => setManualLocation(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="e.g., Central Park, New York"
                    className="w-full p-3 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {/* BUTTONS */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleUseCurrentLocation}
                    disabled={!currentLocation || locationLoading}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {locationLoading ? "Updating..." : "Use Current Location"}
                  </button>
                  <button
                    onClick={handleManualUpdate}
                    disabled={locationLoading || !manualLocation.latitude || !manualLocation.longitude}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {locationLoading ? "Updating..." : "Update Manually"}
                  </button>
                </div>

                <div className="text-center pt-4 border-t border-slate-200">
                  <button
                    onClick={getCurrentLocation}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    ↻ Refresh Current Location
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN - SERVICE & STATS */}
          <div className="space-y-8">
            {/* SERVICE STATUS */}
            {serviceLoading ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                </div>
              </div>
            ) : service ? (
              <div className="transform hover:scale-[1.02] transition-all duration-300">
                <ServiceStats />
              </div>
            ) : (
              <div className="bg-gradient-to-br from-white to-amber-50 rounded-3xl p-8 shadow-2xl border border-amber-100 transform hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Setup Required</h2>
                </div>
                <p className="text-slate-600 mb-6">Configure your emergency services to start responding</p>
                <AddService />
              </div>
            )}

            {/* SYSTEM STATUS */}
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 shadow-2xl border border-blue-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">System Status</h3>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">LIVE</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Satellite className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-slate-700">Signal Strength</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-slate-200 rounded-full h-2">
                      <div className="w-4/5 bg-green-500 h-2 rounded-full"></div>
                    </div>
                    <span className="font-bold text-green-600">85%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Wifi className="w-5 h-5 text-purple-500" />
                    </div>
                    <span className="text-slate-700">Response Time</span>
                  </div>
                  <span className="font-bold text-blue-600">~2.4s</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Battery className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="text-slate-700">System Uptime</span>
                  </div>
                  <span className="font-bold text-emerald-600">99.8%</span>
                </div>

                {/* CURRENT LOCATION DISPLAY */}
                {currentLocation && (
                  <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <MapPin className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                        <span className="text-slate-700">Your Location</span>
                        <p className="text-xs text-slate-500">
                          {currentLocation.latitude.toFixed(4)}, {currentLocation.longitude.toFixed(4)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowLocationModal(true)}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Update
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN - REQUESTS */}
          <div className="lg:col-span-2">
            {/* PENDING REQUESTS */}
            {activeTab === "pending" && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl animate-pulse">
                      <Bell className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Active Emergency Alerts</h2>
                      <p className="text-slate-600">Real-time incoming requests</p>
                    </div>
                  </div>
                  <div className="px-6 py-2 bg-gradient-to-r from-red-100 to-pink-100 rounded-full">
                    <span className="text-red-700 font-bold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      {pendingRequests.length} URGENT
                    </span>
                  </div>
                </div>

                {incomingLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="animate-pulse bg-slate-100 rounded-2xl p-6 h-40"></div>
                    ))}
                  </div>
                ) : pendingRequests.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-16 h-16 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">All Clear!</h3>
                    <p className="text-slate-600">No active emergency alerts at this moment.</p>
                    <p className="text-slate-500 text-sm mt-2">System standing by for dispatch...</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {pendingRequests.map(req => {
                      const emergency = emergencyIcons[req.category] || emergencyIcons.medical;
                      
                      return (
                        <div
                          key={req._id}
                          className="group bg-gradient-to-r from-white to-red-50 border-2 border-red-100 rounded-2xl p-6 hover:border-red-300 transition-all duration-300 transform hover:scale-[1.01]"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                              <div className={`p-3 rounded-xl bg-gradient-to-r ${emergency.color}`}>
                                {emergency.icon}
                              </div>
                              <div>
                                <h3 className="font-bold text-xl text-slate-900">
                                  {req.category.toUpperCase()} EMERGENCY
                                </h3>
                                <p className="text-slate-600 flex items-center gap-2">
                                  <Users className="w-4 h-4" />
                                  <span className="font-medium">{req.userId?.name || "Anonymous User"}</span>
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full">
                                <span className="text-blue-700 font-medium flex items-center gap-2">
                                  <MapPin className="w-4 h-4" />
                                  {req.latitude?.toFixed(4)}, {req.longitude?.toFixed(4)}
                                </span>
                              </div>
                              <button
                                onClick={() => {
                                  resetResponse();
                                  setShowResponseBox(showResponseBox === req._id ? null : req._id);
                                }}
                                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                                  service
                                    ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-lg hover:scale-105 text-white"
                                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <Send className="w-5 h-5" />
                                  {showResponseBox === req._id ? "Close" : "Respond"}
                                </div>
                              </button>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-xl mb-6">
                            <p className="text-slate-700">{req.message}</p>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{new Date(req.createdAt).toLocaleTimeString()}</span>
                            </div>
                            <span className="text-slate-300">•</span>
                            <div className="flex items-center gap-2">
                              <Navigation className="w-4 h-4" />
                              <span>Distance: ~1.2km</span>
                            </div>
                            <span className="text-slate-300">•</span>
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4" />
                              <span>Priority: HIGH</span>
                            </div>
                          </div>

                          {/* RESPONSE BOX */}
                          {showResponseBox === req._id && service && (
                            <div className="mt-8 pt-8 border-t border-slate-200">
                              <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg">
                                  <Target className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Dispatch Resources</h3>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                {service?.services?.map(srv => {
                                  const usedQty = providedServices[srv.name];
                                  const remaining = usedQty === undefined ? srv.quantity : srv.quantity - usedQty;
                                  const isOver = usedQty !== undefined && usedQty > srv.quantity;

                                  return (
                                    <div
                                      key={srv.name}
                                      className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                                        isOver
                                          ? "border-red-300 bg-red-50"
                                          : usedQty !== undefined && usedQty > 0
                                          ? "border-green-300 bg-green-50"
                                          : "border-slate-200 bg-white"
                                      }`}
                                    >
                                      <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                          <div className="p-2 bg-blue-100 rounded-lg">
                                            <Radio className="w-4 h-4 text-blue-600" />
                                          </div>
                                          <div>
                                            <p className="font-bold text-slate-900">{srv.name}</p>
                                            <p className="text-xs text-slate-500">In stock: {srv.quantity}</p>
                                          </div>
                                        </div>
                                        <div className="relative">
                                          <input
                                            type="number"
                                            min="0"
                                            value={usedQty ?? ""}
                                            onChange={e => handleQtyChange(srv.name, e.target.value)}
                                            className={`w-24 p-3 border-2 rounded-xl text-center font-bold ${
                                              isOver
                                                ? "border-red-500 bg-red-50 text-red-600"
                                                : usedQty !== undefined && usedQty > 0
                                                ? "border-green-500 bg-green-50 text-green-600"
                                                : "border-slate-300"
                                            } focus:ring-2 focus:ring-blue-200`}
                                            placeholder="0"
                                          />
                                          {isOver && (
                                            <AlertCircle className="absolute -right-6 top-3 w-5 h-5 text-red-500" />
                                          )}
                                        </div>
                                      </div>

                                      {usedQty !== undefined && usedQty !== "" && (
                                        <div className="flex items-center justify-between text-sm">
                                          <span className={`font-medium ${isOver ? "text-red-600" : "text-slate-600"}`}>
                                            Remaining after dispatch:
                                          </span>
                                          <span className={`font-bold ${isOver ? "text-red-600" : "text-green-600"}`}>
                                            {remaining}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>

                              {/* RESPONSE MESSAGE */}
                              <div className="mb-6">
                                <label className="block text-sm font-bold text-slate-900 mb-3">
                                  <div className="flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5" />
                                    Response Message
                                  </div>
                                </label>
                                <div className="relative">
                                  <textarea
                                    value={replyMessage}
                                    onChange={e => setReplyMessage(e.target.value)}
                                    placeholder="Enter dispatch instructions and reassurance message..."
                                    rows={4}
                                    className="w-full p-4 pr-12 border-2 border-slate-300 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 bg-white"
                                  />
                                  <Send className="absolute right-4 top-4 w-5 h-5 text-slate-400" />
                                </div>
                              </div>

                              {/* ACTION BUTTONS */}
                              <div className="flex gap-4">
                                <button
                                  disabled={hasOverQuantity() || !replyMessage.trim()}
                                  onClick={() => handleSendResponse(req._id)}
                                  className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                                    hasOverQuantity() || !replyMessage.trim()
                                      ? "bg-gradient-to-r from-slate-400 to-slate-500 cursor-not-allowed"
                                      : "bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                                  } text-white`}
                                >
                                  <div className="flex items-center justify-center gap-3">
                                    <Send className="w-5 h-5" />
                                    DISPATCH RESPONSE
                                  </div>
                                </button>
                                <button
                                  onClick={resetResponse}
                                  className="px-8 py-4 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-300 transition-all duration-300"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* RESOLVED REQUESTS */}
            {activeTab === "resolved" && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Resolved Cases</h2>
                      <p className="text-slate-600">Successfully handled emergencies</p>
                    </div>
                  </div>
                  <div className="px-6 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full">
                    <span className="text-green-700 font-bold">{resolvedRequests.length} COMPLETED</span>
                  </div>
                </div>

                {resolvedRequests.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                      <Compass className="w-16 h-16 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Mission Log Empty</h3>
                    <p className="text-slate-600">No resolved emergency cases yet.</p>
                    <p className="text-slate-500 text-sm mt-2">All responses will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {resolvedRequests.map(req => {
                      const emergency = emergencyIcons[req.category] || emergencyIcons.medical;
                      
                      return (
                        <div
                          key={req._id}
                          className="bg-gradient-to-r from-white to-emerald-50 border-2 border-emerald-100 rounded-2xl p-6 hover:border-emerald-300 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                              <div className={`p-3 rounded-xl bg-gradient-to-r ${emergency.color}`}>
                                {emergency.icon}
                              </div>
                              <div>
                                <h3 className="font-bold text-xl text-slate-900">
                                  {req.category.toUpperCase()} - RESOLVED
                                </h3>
                                <p className="text-slate-600">{req.userId?.name || "Anonymous"}</p>
                              </div>
                            </div>
                            <div className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full">
                              <span className="text-emerald-700 font-bold flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                RESOLVED
                              </span>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-xl">
                              <p className="text-slate-700">{req.message}</p>
                            </div>

                            {/* SERVICES PROVIDED */}
                            {req.servicesProvided?.length > 0 && (
                              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-5">
                                <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                                  <Download className="w-5 h-5" />
                                  Resources Deployed
                                </h4>
                                <div className="flex flex-wrap gap-3">
                                  {req.servicesProvided.map((srv, i) => (
                                    <div
                                      key={i}
                                      className="px-4 py-2 bg-white border border-blue-200 rounded-full flex items-center gap-2 shadow-sm"
                                    >
                                      <Zap className="w-4 h-4 text-blue-500" />
                                      <span className="text-blue-700 font-medium">
                                        {srv.name}: <span className="text-blue-900 font-bold">{srv.quantity}</span>
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* RESPONSE */}
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5">
                              <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5" />
                                Response Sent
                              </h4>
                              <p className="text-green-700">{req.response}</p>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-slate-500">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>Resolved: {new Date(req.updatedAt).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* DISPATCH CENTER */}
            {activeTab === "dispatch" && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                      <Truck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Dispatch Command Center</h2>
                      <p className="text-slate-600">Real-time emergency coordination</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-200">
                    <h3 className="font-bold text-lg text-slate-900 mb-4">Live Response Teams</h3>
                    <div className="space-y-4">
                      {[
                        { name: "Medical Team Alpha", status: "available", eta: "3min" },
                        { name: "Security Patrol", status: "on_route", eta: "5min" },
                        { name: "Accident Response", status: "available", eta: "2min" },
                        { name: "Search & Rescue", status: "busy", eta: "8min" }
                      ].map((team, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200">
                          <div>
                            <p className="font-medium text-slate-900">{team.name}</p>
                            <p className="text-sm text-slate-600">ETA: {team.eta}</p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            team.status === 'available' ? 'bg-green-100 text-green-700' :
                            team.status === 'on_route' ? 'bg-blue-100 text-blue-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {team.status.toUpperCase()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 border border-purple-200">
                    <h3 className="font-bold text-lg text-slate-900 mb-4">Emergency Protocols</h3>
                    <div className="space-y-4">
                      {["Medical Emergency", "Security Threat", "Accident Response", "Natural Disaster"].map((proto, i) => (
                        <button
                          key={i}
                          className="w-full text-left p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-slate-900">{proto}</span>
                            <Eye className="w-5 h-5 text-slate-400" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}