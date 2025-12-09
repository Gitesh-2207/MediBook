import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const MyProfile = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // example: http://localhost:4000
  const token = localStorage.getItem("token"); // token saved after login

  const { userData, setUserData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success) {
          setUserData(data.userData);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, [backendUrl, token]);

  // Handle profile update
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", userData._id);
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);
      formData.append("address", JSON.stringify(userData.address));
      if (imageFile) formData.append("image", imageFile);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success("Profile updated successfully");
        setIsEdit(false);
        // Update local context with latest data
        setUserData((prev) => ({
          ...prev,
          ...userData,
          image: imageFile ? URL.createObjectURL(imageFile) : prev.image,
        }));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      {/* Profile Image */}
      <div className="relative">
        const profileSrc =
  imageFile
    ? URL.createObjectURL(imageFile)
    : userData.image?.trim()
    ? userData.image
    : "/default-profile.png";

<img className="w-36 rounded" src={profileSrc} alt={userData.name || "Profile Image"} />

        {isEdit && (
          <input
            type="file"
            accept="image/*"
            className="absolute bottom-0 left-0 bg-white text-xs p-1"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        )}
      </div>

      {/* Name */}
      {isEdit ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData.name || "No Name"}
        </p>
      )}

      <hr className="bg-zinc-400 h-[1px] border-none" />

      {/* Contact Info */}
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-500">{userData.email || "Not Set"}</p>

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-52"
              type="text"
              value={userData.phone || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-400">{userData.phone || "Not Set"}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div className="flex flex-col gap-2">
              <input
                className="bg-gray-50"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={userData.address?.line1 || ""}
                type="text"
              />
              <input
                className="bg-gray-50"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={userData.address?.line2 || ""}
                type="text"
              />
            </div>
          ) : (
            <p className="text-gray-500">
              {userData.address?.line1 || ""}
              <br />
              {userData.address?.line2 || ""}
            </p>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender || ""}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400">{userData.gender || "Not Set"}</p>
          )}

          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              type="date"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              value={userData.dob || ""}
            />
          ) : (
            <p className="text-gray-400">{userData.dob || "Not Set"}</p>
          )}
        </div>
      </div>

      {/* Edit / Save Button */}
      <div className="mt-10">
        {isEdit ? (
          <button
            className="border border-primary px-8 py-2 rounded text-primary"
            onClick={handleSave}
          >
            Save Information
          </button>
        ) : (
          <button
            className="border border-primary px-8 py-2 rounded text-primary"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
