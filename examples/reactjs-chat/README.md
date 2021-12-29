<p align="center">
<img width="300" src="https://user-images.githubusercontent.com/2161622/147641752-a059d073-3acc-472f-844e-f9d4553e4c50.png">
</p>
<h3 align="center">Kontenbase Chat Example</h3>
<p align="center">Simple Chat App example with React Js as Front-end, and <a href="https://kontenbase.com" target="_blank">Kontenbase</a> as Back-end</p>
<br/>

## Live Demo
[https://kontenbase-chat.vercel.app](https://kontenbase-chat.vercel.app)

<img width="800" src="https://user-images.githubusercontent.com/2161622/147642073-ccd343ad-4629-443f-af83-ec09a58fd4e2.png">


## Getting Started
Make sure you already installed latest node js on your pc

### Kontenbase Back-end Setup

1. Create Account/Login to your Kontenbase app at www.kontenbase.com. 
2. Create service named "chats" as private service
<img width="300" src="https://user-images.githubusercontent.com/2161622/147642458-09eb7203-1757-4d7c-b63c-f94abdd095e5.png">
3. Customize "chats" by adding some fields below:
- text => Single Line Text
- createdBy => Created By
- createdAt => Created At
<img width="300" src="https://user-images.githubusercontent.com/2161622/147642635-699a13d3-a65f-44ad-a37b-49d46c0ec723.png">
4. Copy the api key from the setting menu
<img width="300" src="https://user-images.githubusercontent.com/2161622/147642777-033fbb72-b6eb-40d9-8fff-407eda0b69f3.png">


### Front-end Setup
Run the Front-end development server:
1. Install the dependencies with:
  ```
  npm install
  ```
2. Create a file .env copy from .env.example
3. Change the REACT_APP_KONTENBASE_API_KEY you get in the [Kontenbase](https://kontenbase.com)
4. Start developing and watch for code changes:
```
npm run start
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy your own
Deploy the example using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkontenbase%2Fkontenbase%2Ftree%2Fmain%2Fexamples%2Freactjs-chat&env=REACT_APP_KONTENBASE_API_KEY&envDescription=API%20Key%20you%20get%20from%20Kontenbase&envLink=https%3A%2F%2Fkontenbase.com&project-name=kontenbase-chat&repo-name=kontenbase-chat)