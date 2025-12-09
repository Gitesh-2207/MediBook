import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const MyProfile = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const { userData, setUserData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  // ✅ Safe fallback for null userData
  const safeUser = userData || {
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: { line1: "", line2: "" },
    image: "",
  };

  // ✅ Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        toast.error("Not authorized, please login again");
        return;
      }
      try {
        const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
          headers: { token }, // ✅ match backend authUser middleware
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

  // ✅ Handle profile update
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", safeUser._id);
      formData.append("name", safeUser.name);
      formData.append("phone", safeUser.phone);
      formData.append("dob", safeUser.dob);
      formData.append("gender", safeUser.gender);
      formData.append("address", JSON.stringify(safeUser.address));
      if (imageFile) formData.append("image", imageFile);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            token, // ✅ consistent with backend middleware
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success("Profile updated successfully");
        setIsEdit(false);
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // ✅ Safe image fallback
  const profileSrc =
    imageFile
      ? URL.createObjectURL(imageFile)
      : safeUser.image && safeUser.image.trim() !== ""
      ? `${backendUrl.replace(/\/$/, "")}/${safeUser.image}`
      : "/default-profile.png";

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      {!userData ? (
        <p>Loading profile...</p>
      ) : (
        <>
          {/* Profile Image */}
          <div className="relative">
            <img
              className="w-36 rounded"
              src={profileSrc}
              alt={safeUser.name || "Profile Image"}
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
              value={safeUser.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <p className="font-medium text-3xl text-neutral-800 mt-4">
              {safeUser.name || "No Name"}
            </p>
          )}

          <hr className="bg-zinc-400 h-[1px] border-none" />

          {/* Contact Info */}
          <div>
            <p className="text-neutral-500 underline mt-3">
              CONTACT INFORMATION
            </p>
            <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
              <p className="font-medium">Email id:</p>
              <p className="text-blue-500">{safeUser.email}</p>

              <p className="font-medium">Phone:</p>
              {isEdit ? (
                <input
                  className="bg-gray-100 max-w-52"
                  type="text"
                  value={safeUser.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                />
              ) : (
                <p className="text-blue-400">{safeUser.phone}</p>
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
                    value={safeUser.address.line1}
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
                    value={safeUser.address.line2}
                    type="text"
                  />
                </div>
              ) : (
                <p className="text-gray-500">
                  {safeUser.address.line1}
                  <br />
                  {safeUser.address.line2}
                </p>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div>
            <p className="text-neutral-500 underline mt-3">
              BASIC INFORMATION
            </p>
            <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
              <p className="font-medium">Gender:</p>
              {isEdit ? (
                <select
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      gender: e.target.value,
                    }))
                  }
                  value={safeUser.gender}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              ) : (
                <p className="text-gray-400">{safeUser.gender}</p>
              )}

              <p className="font-medium">Birthday:</p>
              {isEdit ? (
                <input
                  type="date"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      dob: e.target.value,
                    }))
                  }
                  value={safeUser.dob || ""}
                />
              ) : (
                <p className="text-gray-400">{safeUser.dob}</p>
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
        </>
      )}
    </div>
  );
};

export default MyProfile;
