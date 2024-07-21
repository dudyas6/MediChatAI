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
    const resetUrl = 'http://localhost:3000/resetpassword/${user._id}';
    const response = await fetch('/api/contact/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: user.email,
        subject: 'Password Reset Request',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                Please click on the following link, or paste this into your browser to complete the process:\n\n
                ${resetUrl}\n\n
                If you did not request this, please ignore this email and your password will remain unchanged.\n`,
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
