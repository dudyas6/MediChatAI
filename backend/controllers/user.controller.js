export async function updateUserPersonalDetails(currentUser, formData) {
  //validate form data?
  try {
    const response = await fetch('/api/user/details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentUser,
        formData,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        message: error,
      };
    }
    return {
      success: true,
      message: 'Details updated succesfuly!',
    };
  } catch (e) {
    return {
      success: false,
      message: e,
    };
  }
}
