import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../Context/ShopContext";
import { assets } from "../assets/frontend_assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

const MyProfile = () => {
  const { userData, setUserData, token, loadProfile, backendUrl } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", userData.address);
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadProfile();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          My Profile
        </h2>

        <div className="flex flex-col items-center mb-6">
          {isEdit ? (
            <label htmlFor="image" className="cursor-pointer relative group">
              <img
                className="w-36 h-36 rounded-full object-cover shadow-md border"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile"
              />
              {!image && (
                <img
                  className="w-10 absolute bottom-1 right-1 opacity-80 group-hover:opacity-100"
                  src={assets.upload_icon}
                  alt="Upload Icon"
                />
              )}
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img
              className="w-36 h-36 rounded-full object-cover shadow-md border"
              src={userData.image}
              alt="Profile"
            />
          )}

          {isEdit ? (
            <input
              className="mt-4 text-xl font-semibold border-b text-center focus:outline-none"
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <h3 className="mt-4 text-xl font-semibold text-gray-800">
              {userData.name}
            </h3>
          )}
        </div>

        <hr className="my-4" />

        {/* Contact Info */}
        <div className="space-y-3 text-gray-700">
          <h4 className="font-semibold text-gray-600 underline">Contact Info</h4>

          <div className="grid grid-cols-2 gap-2">
            <p className="font-medium">Email:</p>
            <p className="text-blue-600">{userData.email}</p>

            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                type="text"
                className="border rounded px-2 py-1"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p>{userData.phone}</p>
            )}

            <p className="font-medium">Address:</p>
            {isEdit ? (
              <input
                type="text"
                className="border rounded px-2 py-1"
                value={userData.address}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
              />
            ) : (
              <p>{userData.address}</p>
            )}
          </div>
        </div>

        <hr className="my-4" />

        {/* Basic Info */}
        <div className="space-y-3 text-gray-700">
          <h4 className="font-semibold text-gray-600 underline">Basic Info</h4>

          <div className="grid grid-cols-2 gap-2">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                className="border rounded px-2 py-1"
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    gender: e.target.value,
                  }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}

            <p className="font-medium">Date of Birth:</p>
            {isEdit ? (
              <input
                type="date"
                className="border rounded px-2 py-1"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    dob: e.target.value,
                  }))
                }
              />
            ) : (
              <p>{userData.dob}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
          {isEdit ? (
            <button
              className="bg-blue-600 hover:bg-primaryhover text-white px-6 py-2 rounded-full transition-all"
              onClick={updateUserProfile}
            >
              Save Changes
            </button>
          ) : (
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition-all"
              onClick={() => setIsEdit(true)}
            >
              Edit Profile
            </button>
          )}
          <button
            className="flex items-center gap-2 text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-full transition-all"
            onClick={() => window.history.back()}
          >
            <FontAwesomeIcon icon={faBackward} />
            Back
          </button>
        </div>
      </div>
    )
  );
};

export default MyProfile;
