<p align="center">
<img width="300" src="https://user-images.githubusercontent.com/2161622/147661746-f532af50-7e67-465d-a88c-56fd4866a559.png">
</p>
<h3 align="center">Kontenbase Todo Example</h3>
<p align="center">Simple Todo App example with Next Js as Front-end, and <a href="https://kontenbase.com" target="_blank">Kontenbase</a> as Back-end</p>
<br/>

## Live Demo
[https://kontenbase-todo.vercel.app](https://kontenbase-todo.vercel.app)

<img width="800" src="https://user-images.githubusercontent.com/2161622/147662051-f1311ebe-dc17-429e-b203-ceecaec2c3d5.png">

## Getting Started
Make sure you already installed latest node js on your pc

### Kontenbase Back-end Setup

1. Create Account/Login to your Kontenbase app at www.kontenbase.com. 
2. Create service named "todos" as private service
<img width="300" src="https://user-images.githubusercontent.com/2161622/147662221-603c91b6-cbf2-4a45-bab0-e70e361a3062.png">
3. Customize "todos" by adding some fields below:

- name => Single Line Text
- checked => Check Box
<img width="300" src="https://user-images.githubusercontent.com/2161622/147662337-7e699135-2adf-47ed-9474-1205685e2c8a.png">
4. Copy the api key from the setting menu
<img width="300" src="https://user-images.githubusercontent.com/2161622/147662468-0290af67-cdc2-460d-bc0d-22b4fea416b7.png">


### Front-end Setup
Run the Front-end development server:
1. Install the dependencies with:
  ```
  npm install
  ```
2. Create a file .env copy from .env.example
3. Change the NEXT_APP_KONTENBASE_API_KEY you get in the [Kontenbase](https://kontenbase.com)
4. Start developing and watch for code changes:
```
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy your own
Deploy the example using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkontenbase%2Fkontenbase%2Ftree%2Fmain%2Fexamples%2Fnextjs-todo&env=NEXT_PUBLIC_KONTENBASE_API_KEY&envDescription=API%20Key%20you%20get%20from%20Kontenbase&envLink=https%3A%2F%2Fkontenbase.com&project-name=kontenbase-todo&repo-name=kontenbase-todo)
