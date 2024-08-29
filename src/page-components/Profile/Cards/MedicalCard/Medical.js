import { medicalProperties } from '@/components/Shared/Consts';
import { useAuth } from '@/controllers/auth.controller';
import React, { useState, useEffect } from 'react';
import ComboBox from './ComboBox';
import { updateUserMedicalDetails } from '@/controllers/user.controller';
import { toast } from 'react-toastify';
import LoadingButton from '@/components/Shared/LoadingButton';

const Medical = () => {
  const { currentUser, getCurrentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const [selectedChronicConditions, setSelectedChronicConditions] = useState(
    []
  );
  const [selectedPastConditions, setSelectedPastConditions] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [selectedMedications, setSelectedMedications] = useState([]);
  const [selectedLifestyle, setSelectedLifestyle] = useState([]);
  const [formData, setFormData] = useState({
    gender: '',
    dateOfBirth: '',
    height: '',
    weight: '',
    bloodType: '',
    chronicConditions: [],
    allergies: [],
    lifestyleInfo: [],
    pastMedicalConditions: [],
    currentMedications: [],
    additionalDetails: '',
  });

  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        gender: currentUser.medical?.gender || '',
        dateOfBirth: currentUser.medical?.dateOfBirth
          ? new Date(currentUser.medical.dateOfBirth).toISOString().split('T')[0]
          : '',
        height: currentUser.medical?.height || '',
        weight: currentUser.medical?.weight || '',
        bloodType: currentUser.medical?.bloodType || '',
        chronicConditions: currentUser.medical?.chronicConditions || [],
        allergies: currentUser.medical?.allergies || [],
        lifestyleInfo: currentUser.medical?.lifestyleInfo || [],
        pastMedicalConditions: currentUser.medical?.pastMedicalConditions || [],
        currentMedications: currentUser.medical?.currentMedications || [],
        additionalDetails: currentUser.medical?.additionalDetails || '',
      }));
      setSelectedChronicConditions(
        currentUser.medical?.chronicConditions || []
      );
      setSelectedPastConditions(
        currentUser.medical?.pastMedicalConditions || []
      );
      setSelectedAllergies(currentUser.medical?.allergies || []);
      setSelectedMedications(currentUser.medical?.currentMedications || []);
      setSelectedLifestyle(currentUser.medical?.lifestyleInfo || []);
    }
  }, [currentUser]);
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      chronicConditions: selectedChronicConditions,
      pastMedicalConditions: selectedPastConditions,
      allergies: selectedAllergies,
      currentMedications: selectedMedications,
      lifestyleInfo: selectedLifestyle,
    };
    setLoading(true);
    await updateUserMedicalDetails(currentUser, updatedData);
    getCurrentUser();
    toast.success('Medical details updated successfully');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className=" space-y-12 w-full md:max-w-[60%] border p-4">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Medical Information
            </h3>
            <p className="text-sm text-gray-600 dark:text-white">
              Please provide detailed medical history for better assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth || ''}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="height"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Height (in cm)
              </label>
              <input
                type="text"
                id="height"
                name="height"
                value={formData.height || ''}
                onChange={handleChange}
                placeholder="e.g., 170"
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Weight (in kg)
              </label>
              <input
                type="text"
                id="weight"
                name="weight"
                value={formData.weight || ''}
                onChange={handleChange}
                placeholder="e.g., 70"
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="bloodType"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Blood Type
              </label>
              <select
                id="bloodType"
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="sm:col-span-1 ">
              <ComboBox
                label="Chronic Conditions"
                options={medicalProperties.Chronic}
                selectedOptions={selectedChronicConditions}
                setSelectedOptions={setSelectedChronicConditions}
              />
            </div>

            <div className="sm:col-span-1">
              <ComboBox
                label="Past Medical Conditions or Surgeries"
                options={medicalProperties.ConditionsAndSurgeries}
                selectedOptions={selectedPastConditions}
                setSelectedOptions={setSelectedPastConditions}
              />
            </div>

            <div className="sm:col-span-1">
              <ComboBox
                label="Allergies"
                options={medicalProperties.Allergies}
                selectedOptions={selectedAllergies}
                setSelectedOptions={setSelectedAllergies}
              />
            </div>

            <div className="sm:col-span-1">
              <ComboBox
                label="Current Medications"
                options={medicalProperties.Medication}
                selectedOptions={selectedMedications}
                setSelectedOptions={setSelectedMedications}
              />
            </div>

            <div className="sm:col-span-1">
              <ComboBox
                label="Lifestyle Information"
                options={medicalProperties.Lifestyle}
                selectedOptions={selectedLifestyle}
                setSelectedOptions={setSelectedLifestyle}
              />
            </div>
          </div>
          <div className="col-span-full">
            <label
              htmlFor="additionalDetails"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
              Additional Details
            </label>
            <div className="mt-2">
              <textarea
                id="additionalDetails"
                name="additionalDetails"
                rows={4}
                value={formData.additionalDetails}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Please let us know more about your health, if there is something missing in the form."
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600"></p>
          </div>
        </div>

        <div className="flex justify-end">
          <LoadingButton loading={loading} buttonText="Update" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default Medical;
