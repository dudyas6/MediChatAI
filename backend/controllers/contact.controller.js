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
        
        const data = await response.json();
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
