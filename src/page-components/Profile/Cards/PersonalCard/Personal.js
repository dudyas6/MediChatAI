import { useAuth } from '@/controllers/auth.controller';
import { useEffect, useState } from 'react';
import userLogo from '@/assets/Logos/User.jpg';
import Image from 'next/image';
import {
  updateUserPersonalDetails,
  uploadUserImage,
} from '@/controllers/user.controller';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {countries} from '@/components/Shared/Consts';

const Personal = () => {
  const { currentUser, getCurrentUser } = useAuth();
  const [selectedImage, setSelectedImage] = useState(userLogo);
  const [selectedCover, setSelectedCover] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [formData, setFormData] = useState({
    about: '',
    firstName: '',
    lastName: '',
    country: '',
    streetAddress: '',
    phone: '',
    city: '',
    region: '',
    postalCode: '',
    notifications: false,
  });

  const handleImageClick = () => {
    document.getElementById('fileInputCover').click();
  };

  const handleButtonClick = () => {
    document.getElementById('fileInputProfile').click();
  };

  const handleFileUpload = async (file, field) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('username', currentUser.username);
    formData.append('field', field);

    try {
      await uploadUserImage(formData);
    } catch (error) {
      console.error('Error uploading the image:', error);
    }
  };

  const handleCoverChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setSelectedCover(fileURL);
      setCoverFile(file);
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setSelectedImage(fileURL);
      setImageFile(file);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    try {
      if (imageFile) {
        await handleFileUpload(imageFile, 'profilePicture');
        setImageFile(null);
      }
      if (coverFile) {
        await handleFileUpload(coverFile, 'coverPhoto');
        setCoverFile(null);
      }
      await updateUserPersonalDetails(currentUser, formData);
      getCurrentUser();
      toast.success(
        'Profile updated successfully, effects might appear in a short period of time.'
      );
    } catch (error) {
      toast.error('Failed to update profile.');
    }
  };

  useEffect(() => {
    if (currentUser) {
      setSelectedImage(currentUser.details?.profilePicture || userLogo);
      setSelectedCover(currentUser.details?.coverPhoto || '');
      setFormData(
        currentUser.details || {
          about: '',
          firstName: '',
          lastName: '',
          country: '',
          streetAddress: '',
          phone: '',
          city: '',
          region: '',
          postalCode: '',
          notifications: false,
        }
      );
    }
  }, [currentUser]);

  const validateForm = () => {
    let valid = true;
    if (!formData.firstName) {
      toast.error('First name is required.');
      valid = false;
    }
    if (!formData.lastName) {
      toast.error('Last name is required.');
      valid = false;
    }

    // Add more validations as needed

    return valid;
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className=" space-y-12 max-w-[60%] border p-4">
          <div className="pb-12 border-b border-gray-900/10">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-white">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 max-w-[80%]">
              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.about}
                    onChange={handleChange}
                    placeholder="Tell us about yourself."
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-white">
                  Write a few sentences about yourself.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Profile Picture
                </label>
                <div className="flex items-center mt-2 gap-x-3">
                  {selectedImage && (
                    <Image
                      src={selectedImage}
                      alt="User"
                      width={100}
                      height={100}
                      quality={100}
                      className="rounded-full"
                    />
                  )}
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={handleButtonClick}
                  >
                    Change
                  </button>
                  <input
                    id="fileInputProfile"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="fileInputCover"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover Photo
                </label>
                <div className="flex flex-col items-center justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-gray-900/25">
                  <div className="text-center">
                    {selectedCover ? (
                      <div
                        className="relative bg-white border border-gray-300 rounded-md cursor-pointer"
                        onClick={handleImageClick}
                      >
                        <Image
                          src={selectedCover}
                          alt="Cover Photo Preview"
                          width={1980}
                          height={1020}
                          quality={100}
                          className="border border-gray-300 rounded-md"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="flex mt-4 text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="fileInputCover"
                            className="relative font-semibold text-indigo-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                          </label>
                          <p className="pl-1 dark:text-white">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600 dark:text-white">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </>
                    )}
                    <input
                      id="fileInputCover"
                      name="coverPhoto"
                      type="file"
                      className="sr-only"
                      accept="image/png, image/jpeg, image/gif"
                      onChange={handleCoverChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pb-12 border-b border-gray-900/10">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-white">
              Use a permanent address where you can receive mail.
            </p>

            <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    id="first-name"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    id="last-name"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    id="street-address"
                    name="streetAddress"
                    type="text"
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    placeholder="Street Address"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    id="region"
                    name="region"
                    type="text"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.region}
                    onChange={handleChange}
                    placeholder="State / Province"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    id="postal-code"
                    name="postalCode"
                    type="text"
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="ZIP / Postal Code"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone number
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    autoComplete="tel"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <div className="flex items-center mt-2">
                  <input
                    id="notifications"
                    name="notifications"
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                    checked={formData.notifications}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="notifications"
                    className="block ml-2 text-sm leading-6 text-gray-900"
                  >
                    Receive notifications
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end mt-6 gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Personal;
