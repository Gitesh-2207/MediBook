import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const DoctorProfile = () => {
    const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
        useContext(DoctorContext);
    const { currency } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);

    const updateProfile = async () => {
        try {
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                available: profileData.available,
            };

            const { data } = await axios.post(
                `${backendUrl}/api/doctor/update-profile`,
                updateData,
                {
                    headers: {
                        Authorization: `Bearer ${dToken}`, // ✅ Correct header
                    },
                }
            );

            if (data.success) {
                toast.success(data.message);
                setIsEdit(false);
                getProfileData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };

    useEffect(() => {
        if (dToken) getProfileData();
    }, [dToken]);

    if (!profileData) return null;

    return (
        <div className="flex justify-center mt-10 px-4">
            <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl w-full flex flex-col md:flex-row gap-6 border border-gray-100">
                {/* Profile Image */}
                <div className="flex justify-center md:justify-start">
                    <img
                        src={profileData.image}
                        alt={profileData.name}
                        className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
                    />
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                    <p className="text-2xl font-semibold text-gray-800">
                        {profileData.name}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-1 text-gray-600">
                        <p className="text-sm font-medium">
                            {profileData.degree} - {profileData.speciality}
                        </p>
                        <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                            {profileData.experience}
                        </span>
                    </div>

                    {/* About */}
                    <div className="mt-4">
                        <p className="text-sm text-gray-500 font-medium uppercase">About</p>
                        <p className="text-gray-700 mt-1">{profileData.about}</p>
                    </div>

                    {/* Fees */}
                    <p className="mt-4 text-gray-800 font-medium">
                        Appointment Fee:{" "}
                        <span className="text-blue-600 font-semibold">
                            {currency}
                            {isEdit ? (
                                <input
                                    type="number"
                                    className="border border-gray-300 rounded px-2 py-1 ml-2 w-24"
                                    value={profileData.fees}
                                    onChange={(e) =>
                                        setProfileData((prev) => ({
                                            ...prev,
                                            fees: e.target.value,
                                        }))
                                    }
                                />
                            ) : (
                                profileData.fees
                            )}
                        </span>
                    </p>

                    {/* Address */}
                    <div className="mt-4">
                        <p className="text-sm text-gray-500 font-medium uppercase">
                            Address
                        </p>
                        <p className="text-gray-700 mt-1">
                            {isEdit ? (
                                <>
                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
                                        onChange={(e) =>
                                            setProfileData((prev) => ({
                                                ...prev,
                                                address: { ...prev.address, line1: e.target.value },
                                            }))
                                        }
                                        value={profileData.address?.line1 || ""}
                                    />
                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded px-2 py-1 w-full"
                                        onChange={(e) =>
                                            setProfileData((prev) => ({
                                                ...prev,
                                                address: { ...prev.address, line2: e.target.value },
                                            }))
                                        }
                                        value={profileData.address?.line2 || ""}
                                    />
                                </>
                            ) : (
                                <>
                                    {profileData.address?.line1}
                                    <br />
                                    {profileData.address?.line2}
                                </>
                            )}
                        </p>
                    </div>

                    {/* Availability */}
                    <div className="flex items-center mt-5 space-x-2">
                        <input
                            id="available"
                            type="checkbox"
                            checked={profileData.available}
                            onChange={() =>
                                isEdit &&
                                setProfileData((prev) => ({
                                    ...prev,
                                    available: !prev.available,
                                }))
                            }
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="available" className="text-gray-700">
                            Available
                        </label>
                    </div>

                    {/* Edit / Save Button */}
                    <button
                        onClick={() => {
                            if (isEdit) {
                                updateProfile();
                            } else {
                                setIsEdit(true);
                            }
                        }}
                        className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        {isEdit ? "Save Changes" : "Edit Profile"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;
