
export const postChatSession = async (user, session) => {
    try {
        const response = await fetch('/api/chat/history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user,
                session,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                message: errorData.message || 'An error occurred!',
            };
        }
        const data = await response.json();
        return {
            success: true,
            message: "Message sent, we'll be soon in touch!",
        };
    } catch (error) {
        console.error('Error sending chat session:', error);
        return {
            success: false,
            message: 'An unexpected error occurred!',
        };
    }
};

export const getChatHistoryFromDB = async (user) => {
    const response = await fetch(`/api/chat/history?username=${user.username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    return data;
}

<<<<<<< Updated upstream
export const sendMessageToOPENAI = async (message) =>{
    const response = await fetch(`/api/chat/`, {
=======
export const sendMessageToOPENAI = async (message,currentUser) =>{
    const response = await fetch(`/api/chat/sendmsgapi`, {
>>>>>>> Stashed changes
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message,
            currentUser
        }),
    });
    const data = await response.json();
    return data;
}
