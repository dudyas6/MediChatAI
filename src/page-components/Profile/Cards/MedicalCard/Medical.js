
import userLogo from '@/assets/Logos/User.jpg';
import Image from 'next/image';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useAuth } from '@/controllers/auth.controller';
import React, { useState } from "react";
const Medical = () => {
  const { currentUser } = useAuth();
  return (
    <form>
      <div className="space-y-12 max-w-[60%] border p-4">
        <div className="pb-12 border-b border-gray-900/10">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Medical Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Please let us know about your medical history for better assistance.
          </p>
          <div className="mt-4 sm:col-span-3">
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Gender
              </label>
              <div className="mt-2">
                <select
                  id="gender"
                  name="gender"
                  autoComplete="gender"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          <div className="mt-5 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="date-of-birth"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Date of Birth
              </label>
              <div className="mt-2">
                <input
                  id="date-of-birth"
                  name="date-of-birth"
                  type="date"
                  autoComplete="bday"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-5 sm:col-span-3">
              <label
                htmlFor="chronic-conditions"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Chronic Conditions
              </label>
              <div className="mt-1">
                <input
                  placeholder="Permanent Diseases"
                  id="chronic-conditions"
                  name="chronic-conditions"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-5 sm:col-span-3">
              <label
                htmlFor="past-medical-conditions"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Past Medical Conditions Or Surgeries
              </label>
              <div className="mt-1">
                <input
                  placeholder="Past Medical Treatments And Conditions You Had"
                  id="pastmedical conditions"
                  name="past-medical-conditions"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-5 sm:col-span-3">
              <label
                htmlFor="allergies"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Allergies
              </label>
              <div className="mt-1">
                <input
                  placeholder="Allergies"
                  id="allergies"
                  name="allergies"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-5 sm:col-span-4">
              <label
                htmlFor="medications"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Current Medications
              </label>
              <div className="mt-2">
                <input
                  placeholder="Dailey Taken Medications"
                  id="medications"
                  name="medications"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-5 sm:col-span-3">
              <label
                htmlFor="lifestyle-information"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Lifestyle Information 
              </label>
              <div className="mt-2">
                <input
                  placeholder="Smoking Status, Alcohol Consumption, Diet etc..."
                  id="lifestyle information"
                  name="lifestyle-information"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
  );
};

export default Medical;
