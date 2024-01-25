export const getChatBotResponse = async (subject, description) => {
    const response = await fetch('https://taskrover-chat-api-16b8a8e00129.herokuapp.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            subject: 'CHATBOT - ' + subject,
            description: description
        })
    });

    return await response.json();
};
