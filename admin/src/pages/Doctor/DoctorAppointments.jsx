import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

const DoctorAppointments = () => {
    const { dToken, appointments, getAppointments } = useContext(DoctorContext);
    const { calculateAge, backendUrl } = useContext(AppContext);
    const [loadingIds, setLoadingIds] = useState({});

    useEffect(() => {
        if (dToken) {
            getAppointments();
        }
    }, [dToken]);

    // ✅ Status label styling
    const getStatusLabel = (appointment) => {
        if (appointment.cancelled) {
            return { text: "Rejected", color: "text-red-600" };
        } else if (appointment.isCompleted) {
            return { text: "Completed", color: "text-green-600" };
        } else {
            return { text: "Pending", color: "text-yellow-600" };
        }
    };

    // ✅ Unified update function (Accept / Reject / Complete)
    const updateStatus = async (appointmentId, status) => {
        setLoadingIds((prev) => ({ ...prev, [appointmentId]: true }));
        try {
            const response = await axios.post(
                `${backendUrl}/api/doctor/update-appointment-status`,
                { appointmentId, status },
                { headers: { Authorization: `Bearer ${dToken}` } }
            );

            if (response.data.success) {
                getAppointments();
            } else {
                alert(response.data.message || "Failed to update appointment");
            }
        } catch (error) {
            console.error("Error updating appointment:", error);
            alert("Something went wrong!");
        } finally {
            setLoadingIds((prev) => ({ ...prev, [appointmentId]: false }));
        }
    };

    return (
        <div className="w-full max-w-6xl m-5">
            {/* Title */}
            <p className="mb-4 text-lg font-semibold text-gray-800">
                All Appointments
            </p>

            {/* Table Wrapper */}
            <div className="bg-white border rounded-lg shadow-sm text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto">
                {/* Header Row */}
                <div
                    className="grid grid-cols-[0.3fr_2fr_1fr_1.5fr_1.5fr_1fr_1fr_2fr]
          items-center bg-gray-100 text-gray-800 font-semibold
          py-3 px-6 border-b border-gray-300 text-[15px] sticky top-0 z-10"
                >
                    <p className="text-center">#</p>
                    <p>Patient</p>
                    <p className="text-center">Age</p>
                    <p>Date & Time</p>
                    <p className="text-center">Payment</p>
                    <p className="text-center">Fees</p>
                    <p className="text-center">Status</p>
                </div>

                {/* Appointment Rows */}
                {appointments && appointments.length > 0 ? (
                    appointments.map((appointment, index) => {
                        const { text, color } = getStatusLabel(appointment);
                        const isDisabled =
                            appointment.isCompleted || appointment.cancelled;
                        const isLoading = loadingIds[appointment._id];

                        return (
                            <div
                                key={appointment._id || index}
                                className="grid grid-cols-[0.3fr_2fr_1fr_1.5fr_1.5fr_1fr_1fr_2fr]
                items-center py-3 px-6 text-[15px]
                hover:bg-blue-50 transition-all duration-200 ease-in-out border-b border-gray-200"
                            >
                                {/* # */}
                                <p className="text-center text-gray-700 font-medium">
                                    {index + 1}
                                </p>

                                {/* Patient Name */}
                                <div>
                                    <p className="text-gray-800 font-medium">
                                        {appointment.userData?.name || "N/A"}
                                    </p>
                                    <p className="text-gray-500 text-[13px]">
                                        {appointment.userData?.email || "No email"}
                                    </p>
                                </div>

                                {/* Age */}
                                <p className="text-center text-gray-600">
                                    {appointment.userData?.dob
                                        ? calculateAge(appointment.userData.dob)
                                        : "-"}
                                </p>

                                {/* Date & Time */}
                                <p className="text-gray-700">
                                    {appointment.slotDate}{" "}
                                    <span className="text-gray-500">{appointment.slotTime}</span>
                                </p>

                                {/* Payment */}
                                <p
                                    className={`text-center font-semibold ${appointment.payment ? "text-green-600" : "text-gray-500"
                                        }`}
                                >
                                    {appointment.payment ? "Paid" : "Unpaid"}
                                </p>

                                {/* Fees */}
                                <p
                                    className={`text-center font-semibold ${appointment.amount ? "text-green-600" : "text-gray-400"
                                        }`}
                                >
                                    {appointment.amount ? `$${appointment.amount}` : "N/A"}
                                </p>

                                {/* Status */}
                                <p className={`text-center font-semibold ${color}`}>{text}</p>


                            </div>
                        );
                    })
                ) : (
                    <p className="text-center py-6 text-gray-500">
                        No appointments found
                    </p>
                )}
            </div>
        </div>
    );
};

export default DoctorAppointments;
