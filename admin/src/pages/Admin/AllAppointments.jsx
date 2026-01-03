import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments } =
    useContext(AdminContext);
  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  // ✅ Correct Appointment Status Logic
  const getStatusLabel = (appointment) => {
    if (appointment.cancelled === true) {
      return {
        text: "Cancelled",
        color: "text-red-600 bg-red-100",
      };
    }

    if (appointment.payment === true) {
      return {
        text: "Completed",
        color: "text-green-600 bg-green-100",
      };
    }

    return {
      text: "Pending",
      color: "text-yellow-600 bg-yellow-100",
    };
  };

  // ✅ Correct Date Format (dd_mm_yyyy → dd/mm/yyyy)
  const formatSlotDate = (dateStr) => {
    if (!dateStr) return "-";
    const [day, month, year] = dateStr.split("_");
    if (!day || !month || !year) return dateStr;
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-6 px-4">
      {/* Title */}
      <p className="mb-5 text-2xl font-bold text-gray-800 border-b pb-2">
        📅 All Appointments
      </p>

      {/* Table */}
      <div className="bg-white border rounded-xl shadow-md text-sm max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="grid grid-cols-[0.3fr_2fr_1fr_2fr_2fr_1fr_1fr] bg-blue-50 font-semibold py-3 px-6 sticky top-0 z-10 border-b">
          <p className="text-center">#</p>
          <p>Patient</p>
          <p className="text-center">Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p className="text-center">Amount</p>
          <p className="text-center">Status</p>
        </div>

        {/* Rows */}
        {appointments && appointments.length > 0 ? (
          appointments.map((appointment, index) => {
            const { text, color } = getStatusLabel(appointment);

            return (
              <div
                key={appointment._id}
                className={`grid grid-cols-[0.3fr_2fr_1fr_2fr_2fr_1fr_1fr]
                py-3 px-6 items-center border-b hover:bg-blue-50`}
              >
                {/* Index */}
                <p className="text-center">{index + 1}</p>

                {/* Patient */}
                <p className="font-medium">
                  {appointment.userData?.name || "N/A"}
                </p>

                {/* Age */}
                <p className="text-center">
                  {appointment.userData?.dob
                    ? calculateAge(appointment.userData.dob)
                    : "-"}
                </p>

                {/* Date & Time */}
                <p>
                  {formatSlotDate(appointment.slotDate)}{" "}
                  <span className="text-gray-500 text-sm">
                    {appointment.slotTime}
                  </span>
                </p>

                {/* Doctor */}
                <p className="font-medium">
                  {appointment.docData?.name || "N/A"}
                </p>

                {/* Amount */}
                <p className="text-center font-semibold text-green-600">
                  {appointment.amount ? `₹${appointment.amount}` : "N/A"}
                </p>

                {/* Status */}
                <p
                  className={`text-center font-semibold rounded-full px-3 py-1 ${color}`}
                >
                  {text}
                </p>
              </div>
            );
          })
        ) : (
          <div className="py-10 text-center text-gray-500">
            No appointments found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
