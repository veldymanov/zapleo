# Template

## Directory structure

```
docs/                     - Application for deployment ('app/' with only minified files).
                            'docs/' folder name has chosen for hosting in GitHub Pages when needed.
                                To create the 'docs/' run 'gulp build'
                                To start browser-sync run 'gulp build:server'                          
node_modules/             - NPM modules. Created after 'npm install'
src/                      - Contains full application.
    css/                  - All scss and css files
    fonts/                - Application's fonts
    imgages/              - All images
        blog/             - Blog page images
            blog-post/    - Blog Post pages images
                comments/ -
        customers/        - Customers page photos
        icons/            - All icons
        img/              - for photos opt and '.webp' creation 
        linea/            -
        team/             - Team page photos
            resume/       - Team's resumes
    js/                   - All js files
    about.html            - About page
    blog.html             - Blog page
    blob_post.html        - Blog Post page
    contact.html          - Contact page    
    index.html            - Main page
    item_portfolio.html   - Item Portfolio page
    portfolio.html        - Portfolio page
    services.html         - Services page
    team.html             - Team page
    testimonials.html     - Testimonial page
    manifest.md           -
    service-worker.js     -   
.gitignore                - 
gulpfile.js               - 
package.json              - 
README.md                 - Project's readme file
```

## Gulp
### 1 Prepare system
#### 1.1 Install Git. Use Git Bash.
#### 1.2 Install Node.js and NPM
```
    //check node version
    node -v
    //check npm version
    npm -v 
```
#### 1.3 Install global NPM packages 
```
    npm install gulp-cli -g
        //check gulp version
        gulp -v
    
	npm install -g browser-sync	
        //check browser-sync version
        browser-sync --version 
	
    npm install -g npm-check
        //check npm-check version
        npm-check --version	 
```

### 2 Run The Project
#### 2.1 Clone repository:
```
    git clone https://veldymanov@bitbucket.org/veldymanov/zapleo_new.git
```
#### 2.2 Inside "../zapleo_new/" install npm packages
````
    npm install
````
#### 2.3 Check packages versions:
```
    npm-check -u
```
#### 2.4 Run the project (inside "../zapleo_new/")
````
    gulp
````
#### 2.5 Save changes
````
    git status
    git add .
    git commit -m "write comments!!!!"
    git push
````
#### 2.6 Create 'docs/' directory - application (with only minified files)
````
    gulp build
     //run browser-sync for build
     gulp build:server
````
