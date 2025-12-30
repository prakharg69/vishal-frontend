import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const AuthContext = createContext(null);

// 🔥 socket instance (OUTSIDE component)
const socket = io("http://localhost:5001", {
  withCredentials: true,
  autoConnect: false
});

export const AuthProvider = ({ children }) => {

  /* =========================
     AUTH STATE
  ========================== */
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  /* =========================
     SERVICE STATE (RESPONDER)
  ========================== */
  const [service, setService] = useState(null);
  const [serviceLoading, setServiceLoading] = useState(false);

  /* =========================
     REQUEST STATE (RESPONDER)
  ========================== */
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [incomingLoading, setIncomingLoading] = useState(false);
  const [myRequests, setMyRequests] = useState([]);
const [myRequestsLoading, setMyRequestsLoading] = useState(false);

  /* =========================
     AUTH FUNCTIONS
  ========================== */
  const getUser = async () => {
    try {
      const res = await axios.get(
        "https://api-vishal-backend.onrender.com/api/auth/me",
        { withCredentials: true }
      );

      setUser(res.data.user);
      setIsLoggedIn(true);
    } catch {
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };
  const getMyRequests = async () => {
  try {
    setMyRequestsLoading(true);
    const res = await axios.get(
      "https://api-vishal-backend.onrender.com/api/request/my",
      { withCredentials: true }
    );
    setMyRequests(res.data.requests);
  } catch {
    setMyRequests([]);
  } finally {
    setMyRequestsLoading(false);
  }
};


  useEffect(() => {
    getUser();
  }, []);

  /* =========================
     SOCKET CONNECT (ONCE)
  ========================== */
  useEffect(() => {
    if (!loading && user && !socket.connected) {
      socket.connect();

      socket.emit("registerResponder", {
        responderId: user._id,
        role: user.role
      });

      console.log("🟢 Socket connected & registered:", user.role);
    }
  }, [loading, user]);

  /* =========================
     REAL-TIME: RESPONDER (NEW REQUEST)
  ========================== */
  useEffect(() => {
    if (!user || user.role !== "responder") return;

    const handleNewRequest = (request) => {
      console.log("🔥 Real-time request received");
      setIncomingRequests(prev => [request, ...prev]);
    };

    socket.on("newRequest", handleNewRequest);

    return () => {
      socket.off("newRequest", handleNewRequest);
    };
  }, [user]);

  /* =========================
     REAL-TIME: USER (REQUEST REPLIED)
  ========================== */
  useEffect(() => {
    if (!user || user.role !== "user") return;

    const handleRequestReplied = (data) => {
      console.log("✅ Real-time response received:", data);
      console.log("dataaaaaa",data);
      

      // 🔔 update user-side UI/state here if you store requests
      // example:
      setMyRequests(prev =>
        prev.map(r =>
          r._id === data.requestId ? { ...r, ...data } : r
        )
      );
    };

    socket.on("requestReplied", handleRequestReplied);

    return () => {
      socket.off("requestReplied", handleRequestReplied);
    };
  }, [user]);

  /* =========================
     LOGIN / LOGOUT
  ========================== */
  const login = async () => {
    await getUser();
  };

  const logout = async () => {
    try {
      await axios.post(
        "https://api-vishal-backend.onrender.com/api/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch {}

    // 🔴 disconnect socket ONLY here
    socket.disconnect();

    setUser(null);
    setIsLoggedIn(false);
    setService(null);
    setIncomingRequests([]);
  };

  /* =========================
     SERVICE FUNCTIONS
  ========================== */
  const getService = async () => {
    try {
      setServiceLoading(true);

      const res = await axios.get(
        "https://api-vishal-backend.onrender.com/api/service/my",
        { withCredentials: true }
      );

      setService(res.data.service);
    } catch {
      setService(null);
    } finally {
      setServiceLoading(false);
    }
  };

  const createService = async (serviceData) => {
    try {
      setServiceLoading(true);

      const res = await axios.post(
        "https://api-vishal-backend.onrender.com/api/service/create",
        serviceData,
        { withCredentials: true }
      );

      setService(res.data.service);
      return true;
    } catch {
      return false;
    } finally {
      setServiceLoading(false);
    }
  };

  /* =========================
     LOCATION FUNCTION
  ========================== */
  const setLocation = async ({ latitude, longitude, address }) => {
    try {
      const res = await axios.post(
        "https://api-vishal-backend.onrender.com/api/responder/set-location",
        { latitude, longitude, address },
        { withCredentials: true }
      );

      setUser(res.data.responder);
      return true;
    } catch {
      return false;
    }
  };

  /* =========================
     REQUEST FUNCTIONS (RESPONDER)
  ========================== */
  const getIncomingRequests = async () => {
    try {
      setIncomingLoading(true);

      const res = await axios.get(
        "https://api-vishal-backend.onrender.com/api/request/responder",
        { withCredentials: true }
      );

      setIncomingRequests(res.data.requests);
    } catch {
      setIncomingRequests([]);
    } finally {
      setIncomingLoading(false);
    }
  };

  const respondToRequest = async ({
    requestId,
    response,
    servicesProvided
  }) => {
    try {
      await axios.post(
        "https://api-vishal-backend.onrender.com/api/request/respond",
        {
          requestId,
          response,
          servicesProvided
        },
        { withCredentials: true }
      );

      return true;
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Failed to send response"
      );
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        loading,
        login,
        logout,

        service,
        serviceLoading,
        getService,
        createService,

        setLocation,

        incomingRequests,
        incomingLoading,
        getIncomingRequests,
        respondToRequest
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
