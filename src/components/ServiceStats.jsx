import { useAuth } from "../context/AuthContext";

export default function ServiceStats() {
  const { service } = useAuth();

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        {service.name} – Available Resources
      </h2>

      <p className="text-slate-600 mb-6">
        {service.address}
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        {service.services.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 flex justify-between items-center"
          >
            <span className="font-medium text-slate-800">
              {item.name}
            </span>
            <span className="text-blue-600 font-bold">
              {item.quantity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
