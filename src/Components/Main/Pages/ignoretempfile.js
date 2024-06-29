
function RegisterPage() {

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col justify-center font-[sans-serif] text-[#333] sm:h-screen p-4">
      <div className="bg-white max-w-md w-full mx-auto border border-gray-300 rounded-md p-6">
        <div className="text-center mb-12">
          <span>
            <img src={medichatLogo} alt="logo" className="w-20 inline-block" />
          </span>
        </div>
          <div className="space-y-6">
            <div>
              <label className="text-sm mb-2 block">TEMP</label>
              <input
                type="text"
                className="bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
              />
            </div>
          </div>
          <div className="!mt-10">
            <button
              type="button"
              className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
              onClick={handleSubmit}
            >
              Update Details
            </button>
          </div>
          <p className="text-sm mt-6 text-center">
            ErrorDiv
          </p>
      </div>
    </div>
  );
}

export default RegisterPage;
