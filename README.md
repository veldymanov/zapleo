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
        linea/            -
        parallax/         -
        team/             - Team page photos
            resume/       - Team's resumes
    js/                   - All js files
    about.html            - About page
    blog.html             - Blog page
    blob_post.html        - Blog Post page
    contact.html          - Contact page    
    index.html            - Main page
    item_portfolio.html   - Item Portfolio page
    manifest.md           -
    portfolio.html        - Portfolio page
    service-worker.js     - 
    services.html         - Services page
    team.html             - Team page
    testimonials.html     - Testimonial page    
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
#### Check packages versions (works in Windows cmd):
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
#### Pictures (.jpg, .png, .gif, .svg) optimizing, and creating .webp (from .jpg, .png)
````
    All pictures inside 'src/images/' directory will be optimized.
    Optimized pictures will get ".z" (*.z.{png, jpg, gif, svg, webp}) suffix, which shows that picture is optimized.
    Original pictures will be deleted. 

    To start optimization run (inside "../zapleo_new/"):
        gulp pic
````
#### Create production version of the app (in 'docs/' directory):
````
    gulp build
     //run browser-sync for build
     gulp build:server
````

### Filezilla
````
	/domains/zapleo.com/public_html/dev/zapleo_new
    url: zapleo.com/dev/zapleo_new/
````

### URL
````
    http://dev.zapleo.com/zapleo_new/
````