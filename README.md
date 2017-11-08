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
opt-status.xlsx           - Status of site optimization 
package.json              - 
README.md                 - Project's readme file
```

## Gulp
###  Prepare system
#### Install Git. Use Git Bash.
#### Install Node.js and NPM
```
    //check node version
    node -v
    //check npm version
    npm -v 
```
#### Install global NPM packages 
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

### Run The Project
#### Clone repository:
```
    git clone https://veldymanov@bitbucket.org/veldymanov/zapleo_new.git
```
#### Inside "../zapleo_new/" install npm packages
````
    npm install
````
#### Check packages versions:
```
    npm-check -u
```
#### Run the project (inside "../zapleo_new/")
````
    gulp
````
#### Save changes
````
    git status
    git add .
    git commit -m "write comments!!!!"
    git push
````
#### Create 'docs/' directory - application (with only minified files)
````
    gulp build
     //run browser-sync for build
     gulp build:server
````

### Move css inline
````
    
````

### Filezilla
````
	/domains/zapleo.com/public_html/dev/zapleo_new
````