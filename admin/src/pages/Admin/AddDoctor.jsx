import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [education, setEducation] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!docImg) return toast.error("Please upload a doctor image");

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", fees);
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("education", education);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data", aToken },
        }
      );

      if (data.success) {
        toast.success("Doctor added successfully!");
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setAbout("");
        setSpeciality("General Physician");
        setDegree("");
        setEducation("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex justify-center items-center p-6">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          🩺 Add New Doctor
        </h2>

        {/* Doctor Image Upload */}
        <div className="flex flex-col items-center mb-8">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-24 h-24 object-cover bg-gray-100 border-2 border-dashed border-indigo-300 rounded-full hover:scale-105 transition-transform"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="doctor"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p className="text-gray-600 mt-2 text-sm">Click to upload photo</p>
        </div>

        {/* Form Fields */}
        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <label className="block mb-1 font-medium">Doctor Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Dr. John Doe"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="example@email.com"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="••••••••"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Experience</label>
            <select
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i} value={`${i + 1} Year`}>
                  {i + 1} Year
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Fees</label>
            <input
              onChange={(e) => setFees(e.target.value)}
              value={fees}
              type="number"
              placeholder="Enter consultation fees"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Speciality</label>
            <select
              onChange={(e) => setSpeciality(e.target.value)}
              value={speciality}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              <option value="General Physician">General Physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Education</label>
            <input
              onChange={(e) => setEducation(e.target.value)}
              value={education}
              type="text"
              placeholder="e.g. MBBS, MD"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Degree</label>
            <input
              onChange={(e) => setDegree(e.target.value)}
              value={degree}
              type="text"
              placeholder="Doctorate, etc."
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Address Line 1</label>
            <input
              onChange={(e) => setAddress1(e.target.value)}
              value={address1}
              type="text"
              placeholder="123 Main Street"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Address Line 2</label>
            <input
              onChange={(e) => setAddress2(e.target.value)}
              value={address2}
              type="text"
              placeholder="City, State"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block mb-1 font-medium">About Doctor</label>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            placeholder="Write a short bio about the doctor..."
            rows={4}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          ></textarea>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-10 py-3 rounded-full font-medium hover:bg-indigo-700 transition-all shadow-md"
          >
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
