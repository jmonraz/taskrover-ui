// this calls will be used to implement the api calls for the backend
class APiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    // implement method for sign in
    async postSignIn(username, password) {
        try {
            // call api to sign in the user
            const response = await fetch(`${this.baseUrl}/login`, {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password
                })
            })

            if(response.statusCode === 200) {
                // return the user data
                return response.json()
            } else {
                // return the error
                return response.json()
            }
        } catch (error) {
            console.log(error);
        }
    }
}