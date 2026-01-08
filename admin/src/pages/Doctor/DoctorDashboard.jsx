import React, { useEffect, useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorDashboard = () => {
    const {
        dToken,
        dashData,
        getDashData,
        latestAppointments,
        getAppointments,
    } = useContext(DoctorContext);

    useEffect(() => {
        if (dToken) {
            getDashData();
            getAppointments(); // to load latestAppointments
        }
    }, [dToken]);

    if (!dashData) {
        return (
            <p className="text-center mt-10 text-gray-500">
                Loading dashboard...
            </p>
        );
    }

    const { earnings, appointments, patients } = dashData;

    // SAME status logic style as All Appointments
    const getStatusLabel = (appointment) => {
        if (appointment.cancelled) {
            return { text: "Cancelled", color: "text-red-600 bg-red-100" };
        } else if (appointment.payment === true) {
            return { text: "Completed", color: "text-green-600 bg-green-100" };
        } else {
            return { text: "Pending", color: "text-yellow-600 bg-yellow-100" };
        }
    };

    // Format date from "dd_mm_yyyy" → "dd/mm/yyyy"
    const formatSlotDate = (dateStr) => {
        if (!dateStr) return "-";
        const [day, month, year] = dateStr.split("_");
        if (!day || !month || !year) return dateStr;
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Doctor Dashboard</h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-100 p-4 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold text-blue-700">Earnings</h3>
                    <p className="text-2xl font-bold mt-2">₹{earnings}</p>
                </div>

                <div className="bg-green-100 p-4 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold text-green-700">
                        Appointments
                    </h3>
                    <p className="text-2xl font-bold mt-2">{appointments}</p>
                </div>

                <div className="bg-purple-100 p-4 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold text-purple-700">Patients</h3>
                    <p className="text-2xl font-bold mt-2">{patients}</p>
                </div>
            </div>

            {/* Latest Appointments */}
            <div className="mt-10 bg-white border border-white rounded-xl shadow-md">

                {/* Header */}
                <div className="grid grid-cols-[0.3fr_2fr_1.5fr_1fr_1fr]
                    bg-blue-50 font-semibold py-3 px-6 sticky top-0 z-10 border-b border-white">
                    <p className="text-center">#</p>
                    <p>Patient</p>
                    <p>Date</p>
                    <p>Time</p>
                    <p className="text-center">Status</p>
                </div>

                {/* Rows */}
                {latestAppointments && latestAppointments.length > 0 ? (
                    latestAppointments.map((item, index) => {
                        const { text, color } = getStatusLabel(item);

                        return (
                            <div
                                key={item._id}
                                className="grid grid-cols-[0.3fr_2fr_1.5fr_1fr_1fr]
                                items-center py-3 px-6 border-b border-white
                                hover:bg-blue-50 transition"
                            >
                                <p className="text-center">{index + 1}</p>

                                <p className="font-medium text-gray-800">
                                    {item.userData?.name || "N/A"}
                                </p>

                                {/* Format date here */}
                                <p className="text-gray-700">{formatSlotDate(item.slotDate)}</p>

                                <p className="text-gray-700">{item.slotTime}</p>

                                <p
                                    className={`text-center font-semibold px-3 py-1 rounded-full ${color}`}
                                >
                                    {text}
                                </p>
                            </div>
                        );
                    })
                ) : (
                    <p className="py-6 text-center text-gray-500">
                        No recent appointments
                    </p>
                )}
            </div>
        </div>
    );
};

export default DoctorDashboard;
