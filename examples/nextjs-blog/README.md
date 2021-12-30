<p align="center">
<img width="300" src="https://kontenbase-blog.vercel.app/logo.svg">
</p>
<h3 align="center">Kontenbase Blog Example</h3>
<p align="center">Simple Blog example with Next Js as Front-end, and <a href="https://kontenbase.com" target="_blank">Kontenbase</a> as Back-end</p>
<br/>

## Live Demo
[https://kontenbase-blog.vercel.app](https://kontenbase-blog.vercel.app)

![image](https://user-images.githubusercontent.com/41622719/147728792-9fa54e17-7983-45bb-b50b-00351c903c06.png)

## Getting Started
Make sure you already installed latest node js on your pc

### Kontenbase Back-end Setup

1. Create Account/Login to your Kontenbase app at www.kontenbase.com. 
2. Create service named "blogs" as private service
<img width="300" src="https://user-images.githubusercontent.com/41622719/147729254-4ed672c3-c8ce-416d-be12-9986eb5f7891.png">
3. Customize "blogs" by adding some fields below:

- title => Single Line Text
- content => Long Text
- slug => Single Line Text
- date => Created At
- coverImage => Url
- author => Created By
- excerpt => Long Text
<img width="300" src="https://user-images.githubusercontent.com/41622719/147729342-c34a9ba4-a01b-4164-baee-8f1c187ba25c.png">
4. Copy the api key from the setting menu
<img width="300" src="https://user-images.githubusercontent.com/41622719/147729372-a5383414-b664-4257-ac57-6ae9496f3241.png">

### Front-end Setup
Run the Front-end development server:
1. Install the dependencies with:
  ```
  npm install
  ```
2. Create a file .env copy from .env.example
3. Change the NEXT_PUBLIC_KONTENBASE_API_KEY you get in the [Kontenbase](https://kontenbase.com)
4. Start developing and watch for code changes:
```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy your own
Deploy the example using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkontenbase%2Fkontenbase%2Ftree%2Fmain%2Fexamples%2Fnextjs-blog&env=NEXT_PUBLIC_KONTENBASE_API_KEY&envDescription=API%20Key%20you%20get%20from%20Kontenbase&envLink=https%3A%2F%2Fkontenbase.com&project-name=kontenbase-blog&repo-name=kontenbase-blog)