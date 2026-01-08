import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { aToken, getDashData, dashData } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  // ---- STATUS LOGIC ----
  const getStatusLabel = (appointment) => {
    if (appointment.cancelled === true) {
      return { text: "Cancelled", color: "text-red-600 bg-red-100" };
    } else if (appointment.payment === true) {
      return { text: "Completed", color: "text-green-600 bg-green-100" };
    } else {
      return { text: "Pending", color: "text-yellow-600 bg-yellow-100" };
    }
  };

  // ---- DATE FORMAT ----
  const formatSlotDate = (dateStr) => {
    if (!dateStr) return "-";
    const [day, month, year] = dateStr.split("_");
    return `${day}/${month}/${year}`;
  };

  return (
    dashData && (
      <div className="m-4 md:m-6 space-y-8">
        {/* -------- SUMMARY CARDS -------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SummaryCard
            icon={assets.doctor_icon}
            label="Doctors"
            value={dashData.doctors}
          />
          <SummaryCard
            icon={assets.appointments_icon}
            label="Appointments"
            value={dashData.appointments}
          />
          <SummaryCard
            icon={assets.patients_icon}
            label="Patients"
            value={dashData.patients}
          />
        </div>

        {/* -------- LATEST APPOINTMENTS -------- */}
        <div className="bg-white rounded-xl shadow-md border border-white overflow-hidden">
          <p className="px-4 md:px-6 py-4 text-lg font-semibold text-gray-800">
            📅 Latest Appointments
          </p>

          {/* ---- DESKTOP HEADER ---- */}
          <div className="hidden md:grid grid-cols-[0.3fr_2fr_2fr_1fr_1fr] bg-blue-50 font-semibold py-3 px-6 text-sm">
            <p className="text-center">#</p>
            <p>Doctor</p>
            <p>Date</p>
            <p className="text-center">Time</p>
            <p className="text-center">Status</p>
          </div>

          {/* ---- APPOINTMENTS ---- */}
          {dashData.latestAppointments?.length > 0 ? (
            dashData.latestAppointments.map((item, index) => {
              const { text, color } = getStatusLabel(item);

              return (
                <div
                  key={index}
                  className="border-t border-white px-4 py-4 md:px-6 md:py-3 hover:bg-blue-50 transition"
                >
                  {/* ---- MOBILE VIEW ---- */}
                  <div className="md:hidden space-y-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.docData.image}
                        alt="Doctor"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {item.docData.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatSlotDate(item.slotDate)} • {item.slotTime}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${color}`}
                    >
                      {text}
                    </span>
                  </div>

                  {/* ---- DESKTOP VIEW ---- */}
                  <div className="hidden md:grid grid-cols-[0.3fr_2fr_2fr_1fr_1fr] items-center">
                    <p className="text-center">{index + 1}</p>

                    <div className="flex items-center gap-3">
                      <img
                        src={item.docData.image}
                        alt="Doctor"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <p className="font-medium text-gray-800">
                        {item.docData.name}
                      </p>
                    </div>

                    <p className="text-gray-700">
                      {formatSlotDate(item.slotDate)}
                    </p>

                    <p className="text-center text-gray-500 text-sm">
                      {item.slotTime}
                    </p>

                    <p
                      className={`text-center font-semibold rounded-full px-3 py-1 text-xs ${color}`}
                    >
                      {text}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-gray-500">
              No recent appointments
            </div>
          )}
        </div>
      </div>
    )
  );
};

/* ---- SUMMARY CARD COMPONENT ---- */
const SummaryCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-white shadow-md hover:shadow-lg hover:scale-105 transition">
    <img className="w-14 h-14" src={icon} alt={label} />
    <div>
      <p className="text-2xl font-bold text-gray-700">{value}</p>
      <p className="text-gray-500 text-sm">{label}</p>
    </div>
  </div>
);

export default Dashboard;
