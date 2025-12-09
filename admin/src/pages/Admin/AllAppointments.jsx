import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments } = useContext(AdminContext);
  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  // Determine appointment status
  const getStatusLabel = (appointment) => {
    if (appointment.cancelled) {
      return { text: "Cancelled", color: "text-red-600 bg-red-50" };
    } else if (appointment.payment && appointment.payment === true) {
      return { text: "Completed", color: "text-green-600 bg-green-50" };
    } else {
      return { text: "Pending", color: "text-yellow-600 bg-yellow-50" };
    }
  };

  // Format date
  const formatSlotDate = (dateStr) => {
    if (!dateStr) return "-";
    const [day, month, year] = dateStr.split("_");
    if (!day || !month || !year) return dateStr;
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-6 px-4">
      {/* Title */}
      <p className="mb-5 text-2xl font-bold text-gray-800 border-b pb-2 tracking-wide">
        📅 All Appointments
      </p>

      {/* Table Wrapper */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-md text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto">
        {/* Header */}
        <div
          className="grid grid-cols-[0.3fr_2fr_1fr_2fr_2fr_1fr_0.8fr]
          items-center bg-gradient-to-r from-blue-100 to-blue-50 
          text-gray-800 font-semibold py-3 px-6 border-b border-gray-300 
          text-[15px] sticky top-0 z-10"
        >
          <p className="text-center">#</p>
          <p>Patient</p>
          <p className="text-center">Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p className="text-center">Amount</p>
          <p className="text-center">Status</p>
        </div>

        {/* Data Rows */}
        {appointments && appointments.length > 0 ? (
          appointments.map((appointment, index) => {
            const { text, color } = getStatusLabel(appointment);
            const isEven = index % 2 === 0;

            return (
              <div
                key={appointment._id || index}
                className={`grid grid-cols-[0.3fr_2fr_1fr_2fr_2fr_1fr_0.8fr]
                items-center py-3 px-6 text-[15px]
                ${isEven ? "bg-gray-50" : "bg-white"}
                hover:bg-blue-50 hover:shadow-sm transition-all duration-200 border-b`}
              >
                {/* # */}
                <p className="text-center text-gray-700 font-medium">
                  {index + 1}
                </p>

                {/* Patient Name */}
                <p className="text-gray-800 font-medium truncate">
                  {appointment.userData?.name || "N/A"}
                </p>

                {/* Age */}
                <p className="text-center text-gray-600">
                  {appointment.userData?.dob
                    ? calculateAge(appointment.userData.dob)
                    : "-"}
                </p>

                {/* Date & Time */}
                <p className="text-gray-700 font-medium">
                  {formatSlotDate(appointment.slotDate)}{" "}
                  <span className="text-gray-500 text-sm ml-1">
                    {appointment.slotTime || ""}
                  </span>
                </p>

                {/* Doctor */}
                <p className="text-gray-800 font-medium truncate">
                  {appointment.docData?.name || "N/A"}
                </p>

                {/* Amount */}
                <p
                  className={`text-center font-semibold ${appointment.amount
                      ? "text-green-600"
                      : "text-gray-400"
                    }`}
                >
                  {appointment.amount ? `₹${appointment.amount}` : "N/A"}
                </p>

                {/* Status */}
                <p
                  className={`text-center font-semibold rounded-full px-2 py-1 text-sm ${color}`}
                >
                  {text}
                </p>
              </div>
            );
          })
        ) : (
          <div className="py-10 text-center text-gray-500 text-base">
            No appointments found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
