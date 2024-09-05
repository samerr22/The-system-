import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateFailure,
  updateSart,
  updateSuccess,
} from "../redux/user/userSilce.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { combineSlices } from "@reduxjs/toolkit";

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  console.log(currentUser);
  console.log(formData);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload");
      return;
    }
    try {
      dispatch(updateSart());
      const res = await fetch(`/api/auth/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
        alert("succesfull");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-slate-200">
        {" "}
        {/* Added relative class */}
        <div className=" flex justify-center items-center">
          <div className="">
            <div className="flex justify-center items-center">
              <div className="font-serif text-3xl mt-8 uppercase text-gray-900">
                supplier profile
              </div>
            </div>
            <div className="flex justify-center items-center">
             
            </div>
            <div className="flex justify-center items-center">
              <Link to={`/clientT`}>
                <button className="text-lg  bg-blue-600 w-24 text-white rounded-xl  h-10 hover:opacity-80 ml-[1280px] font-serif  ">
                  contract 
                </button>
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col mt-4 gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={filePickerRef}
                hidden
              />
              <div
                className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
                onClick={() => filePickerRef.current.click()}
              >
                {imageFileUploadProgress && (
                  <CircularProgressbar
                    value={imageFileUploadProgress || 0}
                    text={`${imageFileUploadProgress}%`}
                    strokeWidth={5}
                    styles={{
                      root: {
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      },
                      path: {
                        stroke: `rgba(62, 152, 199, ${
                          imageFileUploadProgress / 100
                        })`,
                      },
                    }}
                  />
                )}
                <img
                  src={imageFileUrl || currentUser.profilePicture}
                  alt="user"
                  className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                    imageFileUploadProgress &&
                    imageFileUploadProgress < 100 &&
                    "opacity-60"
                  }`}
                />
              </div>
              {imageFileUploadError && (
                <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
                  {imageFileUploadError}
                </p>
              )}

              <div className="w-[1400px] flex justify-center items-center shadow-lg bg-gray-100 rounded-xl h-[400px] mb-10 ">
                <div className="flex ml-[-70px] gap-48">
                  <div className="">
                    <div className="">
                      <h3 className="font-semibold text-slate-800 uppercase text-sm ml-1">
                        suplier's name
                      </h3>
                      <input
                        className=" bg-slate-100 p-3 rounded-lg w-[460px] h-9"
                        type="text"
                        placeholder=""
                        id="supname"
                        onChange={handleChange}
                        defaultValue={currentUser.supname}
                      />
                    </div>
                    <div className="mt-2">
                      <h3 className="font-semibold text-slate-800 uppercase text-sm ml-1">
                        contact person
                      </h3>

                      <input
                        className=" bg-slate-100 p-3 rounded-lg w-[460px]  h-9"
                        type="text"
                        placeholder=""
                        id="contname"
                        onChange={handleChange}
                        defaultValue={currentUser.contname}
                      />
                    </div>
                    <div className="mt-2">
                      <h3 className="font-semibold text-slate-800 uppercase text-sm ml-1">
                        contact number
                      </h3>
                      <input
                        className=" bg-slate-100 p-3 rounded-lg w-[460px]  h-9"
                        type="text"
                        placeholder=""
                        id="contactN"
                        onChange={handleChange}
                        defaultValue={currentUser.contactN}
                      />
                    </div>
                    <div className="mt-2">
                      <h3 className="font-semibold text-slate-800 uppercase text-sm ml-1">
                        username
                      </h3>

                      <input
                        className=" bg-slate-100 p-3 border rounded-lg w-[460px]  h-9"
                        type="text"
                        placeholder=""
                        id="username"
                        onChange={handleChange}
                        defaultValue={currentUser.username}
                      />
                    </div>
                    <div className="mt-2">
                      <h3 className="font-semibold text-slate-800 uppercase text-sm ml-1">
                        email
                      </h3>

                      <input
                        className=" bg-slate-100 p-3 rounded-lg w-[460px]  h-9"
                        type="text"
                        placeholder=""
                        id="email"
                        onChange={handleChange}
                        defaultValue={currentUser.email}
                      />
                    </div>
                    <div className="mt-2">
                      <h3 className="font-semibold text-slate-800 uppercase text-sm ml-1">
                        password
                      </h3>

                      <input
                        className=" bg-slate-100 p-3 rounded-lg w-[460px]  h-9"
                        type="text"
                        placeholder=""
                        id="password"
                        onChange={handleChange}
                        defaultValue={currentUser.password}
                      />
                    </div>
                  </div>

                  <div>
                    <div>
                      <h3 className="font-semibold text-slate-800 uppercase text-sm ml-1">
                        head office address
                      </h3>
                      <input
                        className=" bg-slate-100 p-3 rounded-lg w-[460px]  h-9"
                        type="text"
                        placeholder=""
                        id="headAddress"
                        onChange={handleChange}
                        defaultValue={currentUser.headAddress}
                      />
                    </div>
                    <div className="mt-2">
                      <h3 className="font-semibold text-slate-800 uppercase text-sm ml-1">
                        factory address
                      </h3>

                      <input
                        className=" bg-slate-100 p-3 rounded-lg w-[460px]  h-9"
                        type="text"
                        placeholder=""
                        id="factoryAddress"
                        onChange={handleChange}
                        defaultValue={currentUser.factoryAddress}
                      />
                    </div>
                    <div className="mt-2">
                      <h3 className="font-semibold text-slate-800 uppercase text-sm ml-1">
                        country of origin
                      </h3>
                      <input
                        className=" bg-slate-100 p-3 rounded-lg w-[460px]  h-9"
                        type="text"
                        placeholder=""
                        id="counuty"
                        onChange={handleChange}
                        defaultValue={currentUser.counuty}
                      />
                    </div>

                    <div className="mt-2">
                      <h3 className="font-semibold text-slate-800 uppercase text-sm ml-1">
                        business registration number
                      </h3>
                      <input
                        className=" bg-slate-100 p-3 rounded-lg w-[460px]  h-9"
                        type="text"
                        placeholder=""
                        id="businessNumber"
                        onChange={handleChange}
                        defaultValue={currentUser.businessNumber}
                      />
                    </div>

                    <div className="mt-2">
                      <h3 className="font-semibold text-slate-800 uppercase text-sm ml-1">
                        tax identification number
                      </h3>
                      <input
                        className=" bg-slate-100 p-3 rounded-lg w-[460px]  h-9"
                        type="text"
                        placeholder=""
                        id="taxnumber"
                        onChange={handleChange}
                        defaultValue={currentUser.taxnumber}
                      />
                    </div>
                    <div className="mt-5">
                      <button
                        className=" bg-red-600 text-white shadow-md   p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
                        type="submit"
                        gradientDuoTone="purpleToBlue"
                        outline
                        disabled={loading || imageFileUploading}
                      >
                        {loading ? "Loading..." : "Update"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            {updateUserSuccess && (
              <p className="mt-5 text-green-600 bg-green-300 w-300 h-7 rounded-lg text-center ">
                {updateUserSuccess}
              </p>
            )}
            {updateUserError && (
              <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
                {updateUserError}
              </p>
            )}
            {error && (
              <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
