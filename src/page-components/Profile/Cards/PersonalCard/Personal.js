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
import { countries } from '@/components/Shared/Consts';
import LoadingButton from '@/components/Shared/LoadingButton';

const Personal = () => {
  const { currentUser, getCurrentUser } = useAuth();
  const [loading, setLoading] = useState(false);
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
    coverPhoto: '',
    profilePhoto: '',
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
    const data = new FormData();
    data.append('file', file);
    data.append('username', currentUser.username);
    data.append('field', field);

    try {
      const imageURL = await uploadUserImage(data);
      return imageURL;
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
    setLoading(true);
    try {
      const newFormData = { ...formData };

      if (coverFile) {
        const coverPhotoURL = await handleFileUpload(coverFile, 'coverPhoto');
        newFormData.coverPhoto = coverPhotoURL;
        setCoverFile(null);
      }

      if (imageFile) {
        const profilePhotoURL = await handleFileUpload(
          imageFile,
          'profilePhoto'
        );
        newFormData.profilePhoto = profilePhotoURL;
        setImageFile(null);
      }

      setFormData(newFormData);

      await updateUserPersonalDetails(currentUser, newFormData);
      getCurrentUser();
      toast.success(
        'Profile updated successfully, effects might appear in a short period of time.'
      );
    } catch (error) {
      toast.error('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setSelectedImage(currentUser.details?.profilePhoto || userLogo);
      setSelectedCover(currentUser.details?.coverPhoto || '');
      setFormData(
        currentUser.details || {
          about: '',
          firstName: '',
          lastName: '',
          country: '',
          streetAddress: '',
          coverPhoto: '',
          profilePhoto: '',
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

    return valid;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12  w-full md:max-w-[60%] border p-4">
          <div className="pb-12 border-b border-gray-900/10">
            <h3 className="text-xl font-medium text-gray-900">
              Personal Information
            </h3>
            <p className="text-sm text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 max-w-[80%]">
              {/* About Section */}
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
                          <p className="pl-1 dark:text-white">
                            or drag and drop
                          </p>
                        </div>
                        <input
                          id="fileInputCover"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleCoverChange}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Inputs */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              {/* Other Inputs */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  autoComplete="tel"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.country}
                  onChange={handleChange}
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="streetAddress"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street Address
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  id="streetAddress"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.streetAddress}
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Region
                </label>
                <input
                  type="text"
                  name="region"
                  id="region"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.region}
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-full">
                <div className="flex items-center gap-x-3">
                  <input
                    id="notifications"
                    name="notifications"
                    type="checkbox"
                    checked={formData.notifications}
                    onChange={handleChange}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="notifications"
                    className="text-sm font-medium leading-6 text-gray-900"
                  >
                    Get notified when updates are available.
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-x-6">
            <LoadingButton
              loading={loading}
              buttonText="Update"
              type="submit"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default Personal;
