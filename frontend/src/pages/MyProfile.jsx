import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const MyProfile = () => {
  const { userData, setUserData, backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  if (!userData) return <p>Loading profile...</p>;

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", userData._id);
      formData.append("name", userData.name);
      formData.append("phone", userData.phone || "");
      formData.append("dob", userData.dob || "");
      formData.append("gender", userData.gender || "");
      formData.append("address", JSON.stringify(userData.address || {}));
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
        setUserData(data.data || userData); // backend should return updated user
        setIsEdit(false);
        setImageFile(null);
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong while updating");
    }
  };

  const getProfileImage = () => {
    if (imageFile) return URL.createObjectURL(imageFile);
    if (userData.image?.startsWith("http")) return userData.image;
    if (userData.image)
      return `${backendUrl.replace(/\/$/, "")}/${userData.image.replace(/^\//, "")}`;
    return "/default-profile.png";
  };

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      {/* Profile Image */}
      <div className="relative">
        <img
          className="w-36 h-36 object-cover rounded"
          src={getProfileImage()}
          alt={userData.name || "Profile"}
          onError={(e) => (e.target.src = "/default-profile.png")}
        />
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
          <p className="text-blue-500">{userData.email}</p>

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
            <p className="text-blue-400">{userData.phone || "Not Provided"}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div className="flex flex-col gap-2">
              <input
                className="bg-gray-50"
                type="text"
                placeholder="Address line 1"
                value={userData.address?.line1 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
              <input
                className="bg-gray-50"
                type="text"
                placeholder="Address line 2"
                value={userData.address?.line2 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            </div>
          ) : (
            <p className="text-gray-500">
              {userData.address?.line1 || "N/A"}
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
              value={userData.gender || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400">{userData.gender || "Not Provided"}</p>
          )}

          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              type="date"
              value={userData.dob || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-400">{userData.dob || "Not Provided"}</p>
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
