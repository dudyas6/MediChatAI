export async function updateUserPersonalDetails(currentUser, formData) {
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
    const updatedUser = await response.json();

    return {
      updatedUser: updatedUser,
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

export const findExistingUser = async (username) => {
  const userResponse = await fetch(
    `/api/user?username=${encodeURIComponent(username)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const user = await userResponse.json();
  if (userResponse.ok) {
    return { success: true, message: 'User Found!', user: user };
  } else {
    return { success: false, message: 'controller: User does not exist!' };
  }
};

export const uploadUserImage = async (formData) => {
  try {
    const response = await fetch('/api/user/details/image', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.fileUrl;
  } catch (error) {
    console.error('There was an error uploading the image:', error);
    throw error;
  }
};

export const getUserImages = async (username) => {
  try {
    const response = await fetch(
      `/api/user/details/image?username=${username}`,
      {
        method: 'GET',
      }
    );
    const data = await response.json();
    if (!response.ok) {
      console.error('Network response was not ok');
    }
    return data;
  } catch (error) {
    console.error('There was an error uploading the image:', error);
    throw error;
  }
};
