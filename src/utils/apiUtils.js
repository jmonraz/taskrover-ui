export const getChatBotResponse = async (subject, description) => {

    const response = await fetch('https://taskrover-chat-api-16b8a8e00129.herokuapp.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            subject: subject[0],
            description: description[0]
        })
    });

    return await response.json();
};
