import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AddService() {
  const { createService, serviceLoading } = useAuth();

  const [service, setService] = useState({
    name: "",
    address: "",
    services: [{ name: "", quantity: "" }]
  });

  /* =========================
     SERVICE FIELD HANDLERS
  ========================== */

  const addServiceField = () => {
    setService({
      ...service,
      services: [...service.services, { name: "", quantity: "" }]
    });
  };

  const updateServiceField = (index, key, value) => {
    const updatedServices = [...service.services];
    updatedServices[index][key] = value;

    setService({
      ...service,
      services: updatedServices
    });
  };

  const removeServiceField = (index) => {
    const updatedServices = service.services.filter(
      (_, i) => i !== index
    );

    setService({
      ...service,
      services: updatedServices
    });
  };

  /* =========================
     CREATE SERVICE
  ========================== */

  const handleCreateService = async () => {
    if (!service.name || !service.address) {
      return alert("Service name and address are required");
    }

    if (service.services.some(s => !s.name || s.quantity === "")) {
      return alert("Please fill all service fields");
    }

    const success = await createService(service);

    if (success) {
      alert("Service created successfully ✅");

      // Reset form
      setService({
        name: "",
        address: "",
        services: [{ name: "", quantity: "" }]
      });
    } else {
      alert("Failed to create service");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        Create Service (Hospital / Center)
      </h2>

      {/* ================= BASIC INFO ================= */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <input
          placeholder="Hospital / Service Name"
          className="p-3 border rounded-lg"
          value={service.name}
          onChange={(e) =>
            setService({ ...service, name: e.target.value })
          }
        />

        <input
          placeholder="Address"
          className="p-3 border rounded-lg"
          value={service.address}
          onChange={(e) =>
            setService({ ...service, address: e.target.value })
          }
        />
      </div>

      {/* ================= CUSTOM SERVICES ================= */}
      <h3 className="text-lg font-semibold text-slate-800 mb-3">
        Available Services
      </h3>

      {service.services.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3"
        >
          <input
            placeholder="Service Name (e.g. Oxygen)"
            className="p-3 border rounded-lg"
            value={item.name}
            onChange={(e) =>
              updateServiceField(index, "name", e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Quantity"
            className="p-3 border rounded-lg"
            value={item.quantity}
            onChange={(e) =>
              updateServiceField(index, "quantity", e.target.value)
            }
          />

          <button
            onClick={() => removeServiceField(index)}
            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg font-medium hover:bg-red-200"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={addServiceField}
        className="mt-2 px-4 py-2 bg-slate-100 rounded-lg font-medium hover:bg-slate-200"
      >
        + Add Another Service
      </button>

      {/* ================= ACTION ================= */}
      <button
        onClick={handleCreateService}
        disabled={serviceLoading}
        className={`mt-6 px-6 py-3 rounded-lg font-semibold text-white ${
          serviceLoading
            ? "bg-blue-400"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {serviceLoading ? "Creating..." : "Create Service"}
      </button>
    </div>
  );
}
