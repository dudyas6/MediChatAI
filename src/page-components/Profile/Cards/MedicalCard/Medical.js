import { medicalProperties } from '@/components/Shared/Consts';
import { useAuth } from '@/controllers/auth.controller';
import React, { useState } from 'react';
import ComboBox from './ComboBox';

const Medical = () => {
  const { currentUser } = useAuth();
  const [selectedChronicConditions, setSelectedChronicConditions] = useState(
    []
  );
  const [selectedPastConditions, setSelectedPastConditions] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [selectedMedications, setSelectedMedications] = useState([]);
  const [selectedLifestyle, setSelectedLifestyle] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedChronicConditions);

    // Example: Submit data to an API
    // fetch('/api/submit', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Success:', data);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12 max-w-[60%] border p-4">
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900">
            Medical Information
          </h3>
          <p className="text-sm text-gray-600">
            Please provide detailed medical history for better assistance.
          </p>

          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-900"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="date-of-birth"
                className="block text-sm font-medium text-gray-900"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="date-of-birth"
                name="date-of-birth"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="height"
                className="block text-sm font-medium text-gray-900"
              >
                Height (in cm)
              </label>
              <input
                type="number"
                id="height"
                name="height"
                placeholder="e.g., 170"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-gray-900"
              >
                Weight (in kg)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                placeholder="e.g., 70"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="blood-type"
                className="block text-sm font-medium text-gray-900"
              >
                Blood Type
              </label>
              <select
                id="blood-type"
                name="blood-type"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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

            <div className="sm:col-span-1">
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
              htmlFor="extra"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Additional Details
            </label>
            <div className="mt-2">
              <textarea
                id="extra"
                name="extra"
                rows={4}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                // value={formData.about}
                // onChange={handleChange}
                placeholder="Please let us know more about your health, if there is something missing in the form."
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600"></p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default Medical;
