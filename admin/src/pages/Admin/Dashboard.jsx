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
    if (appointment.cancelled) {
      return { text: "Cancelled", color: "text-red-600 bg-red-100" };
    } else if (appointment.payment && appointment.payment === true) {
      return { text: "Completed", color: "text-green-600 bg-green-100" };
    } else {
      return { text: "Pending", color: "text-yellow-600 bg-yellow-100" };
    }
  };

  return (
    dashData && (
      <div className="m-6 space-y-10">
        {/* -------- SUMMARY CARDS -------- */}
        <div className="flex flex-wrap gap-6">
          {/* Doctors */}
          <div className="flex items-center gap-4 bg-white p-4 min-w-56 rounded-xl border border-gray-100 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
            <img className="w-16 h-16" src={assets.doctor_icon} alt="Doctors" />
            <div>
              <p className="text-2xl font-bold text-gray-700">
                {dashData.doctors}
              </p>
              <p className="text-gray-500 text-sm tracking-wide">Doctors</p>
            </div>
          </div>

          {/* Appointments */}
          <div className="flex items-center gap-4 bg-white p-4 min-w-56 rounded-xl border border-gray-100 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
            <img
              className="w-16 h-16"
              src={assets.appointments_icon}
              alt="Appointments"
            />
            <div>
              <p className="text-2xl font-bold text-gray-700">
                {dashData.appointments}
              </p>
              <p className="text-gray-500 text-sm tracking-wide">Appointments</p>
            </div>
          </div>

          {/* Patients */}
          <div className="flex items-center gap-4 bg-white p-4 min-w-56 rounded-xl border border-gray-100 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
            <img
              className="w-16 h-16"
              src={assets.patients_icon}
              alt="Patients"
            />
            <div>
              <p className="text-2xl font-bold text-gray-700">
                {dashData.patients}
              </p>
              <p className="text-gray-500 text-sm tracking-wide">Patients</p>
            </div>
          </div>
        </div>

        {/* -------- LATEST BOOKINGS -------- */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4 border-b pb-3">
            <img src={assets.list_icon} alt="list icon" className="w-6 h-6" />
            <p className="font-semibold text-gray-800 text-xl tracking-wide">
              Latest Bookings
            </p>
          </div>

          {/* Latest Appointments */}
          <div className="divide-y divide-gray-100">
            {dashData.latestAppointments &&
              dashData.latestAppointments.length > 0 ? (
              dashData.latestAppointments.map((item, index) => {
                const { text, color } = getStatusLabel(item);
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between py-4 px-2 hover:bg-gray-50 rounded-lg transition-all duration-200"
                  >
                    {/* Doctor Info */}
                    <div className="flex items-center gap-4">
                      <img
                        src={item.docData.image}
                        alt="Doctor"
                        className="w-14 h-14 rounded-full object-cover border border-gray-200 shadow-sm"
                      />
                      <div>
                        <p className="font-semibold text-gray-800 text-base">
                          {item.docData.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.docData.speciality || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* Appointment Date & Time (Stacked vertically) */}
                    <div className="flex flex-col items-center justify-center min-w-[90px]">
                      <p className="text-gray-700 font-medium">{item.slotDate}</p>
                      <p className="text-gray-500 text-sm mt-1">{item.slotTime}</p>
                    </div>

                    {/* Status */}
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${color}`}
                    >
                      {text}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500 py-6 text-sm">
                No recent appointments
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
