import jwt from 'jsonwebtoken';

export const postContactRequest = async (name, email, message) => {
  try {
    const response = await fetch('/api/contact/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.error || 'An error occurred!',
      };
    }
    return {
      success: true,
      message: "Message sent, we'll be soon in touch!",
    };
  } catch (error) {
    console.error('Error sending contact request:', error);
    return {
      success: false,
      message: 'An unexpected error occurred!',
    };
  }
};

export const sendEmail = async (user) => {
  try {
    const username = user.username;

    const response = await fetch('/api/auth/restore-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        to: user.email,
        subject: 'MediChat - Password Reset Request',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.error || 'An error occurred!',
      };
    }
    return {
      success: true,
      message: 'Email has been sent!',
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'An unexpected error occurred!',
    };
  }
};
