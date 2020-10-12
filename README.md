# ppass Frontend
> Secure way for you to check if your password has ever been hacked in a data breach.
> ppass Password checker built with the Node, Express, TypeScript and React.

![screenshot](https://github.com/silvertechguy/ppass-api/blob/master/ppass-screenshot.png)
- Check out the deployed site [here](https://ppass-official.herokuapp.com/)
- If you are looking for the API - Backend repo, [click here](https://github.com/silvertechguy/ppass-api)
- Check out the deployed site [API](https://ppass-api.herokuapp.com/)
- API Endpoints: [here](https://github.com/silvertechguy/ppass-api/blob/master/api-spec.md)

## Usage
### Install Dependencies & Run
```
yarn
yarn start
```

## Hints about the Project
Passwords get leaked all the time. We've heard about data breaches. Facebook has been hacked with data breaches. You do not want to send your password over the internet because it's being transferred to a server somewhere in the world. It's traveling through the internet wires and somebody could intercept it. 
haveibeenpwned.com gives us a password API to check our password if it's ever been hacked.
*I do not want to send my password to this API. The best security is to trust no one.*
**Here is what I did.**
**I sent a sha1 hashed version of my password. I only give him the first 5 characters of my hashed password.**
- The API is going to look in its database of all these passwords and pick all the hashed passwords that have the first 5 characters that match our password.
- With the response data, I can now check my full hash to see if the password has ever been hacked.
- The API is never going to know our full hashed password and therefore never be able to guess our password.


👨‍💻 My projects are available at https://silvertechguy.netlify.app

📫 Reach me at my email silvertechguy@gmail.com

twitter https://twitter.com/silvertechyguy

LinkedIn https://linkedin.com/in/silvertechguy
