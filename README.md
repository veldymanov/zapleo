# Template

## Directory structure

```
.git/                   - 
.idea/                  - 
docs/                   - Application for deployment ('app/' with only minified files).
                          'docs/' folder name has chosen for hosting in GitHub Pages when needed.
                                To create the 'docs/' run 'gulp build'
                                To start browser-sync run 'gulp build:server'                          
node_modules/           - NPM modules. Created after 'npm install'
src/                    - Contains full application.
    about/              - All self-created app files for 'about.html' page (structure similar to 'docs/home/')
    common_files        - Contains common files for 2 or more pages (structure similar to 'docs/home/')
    external_libraries/ - Contains all external files. (Created by 'gulp')
    home/               - All self-created app files for 'index.html' page
        css/            - Scss and css files for 'index.html' page
        img/            - All images for 'index.html' page
            images/     -
            icons/      -
        js/             - All self-created JavaScript files for 'index.html' page       
    index.html          - Page production (minified) version    
    manifest.md         -
    README.md           - Application's readme file
    service-worker.js   -   
.gitignore              - 
gulpfile.js             - Gulp file
LICENCE                 - Licence agreement
package.json            - NPM package file
README.md               - Project's readme file
```

## Gulp
### 1 Prepare system
#### 1.1 Install Git. Use Git Bash.
#### 1.2 Install Node.js and NPM
```
    node -v
    npm -v 
        //npm install npm@latest -g
```
#### 1.3 Install global NPM packages 
```
    gulp -v
    //npm rm -g gulp
    npm install gulp-cli -g
		
    browser-sync --version 
    //npm rm -g browser-sync
    npm install -g browser-sync
	
    npm-check --version
    npm install -g npm-check	 
```

### 2 Run New Project
#### 2.1 Check packages versions
```
    npm-check -u
```
#### 2.2 Prepare project directory
```
- Copy 'template/' directory and paste where you need. (Exclude '.git','.idea', '.sass-cache' and 'node_modules/')
- Change directory name to project name. 
```
#### 2.3 Create Git Repo
##### 2.3.1 Inside new project directory run:
```
    git init
    git status
    git add .
    git commit -m "First commit"
```
##### 2.3.2 On BitBucket
```
- In 'https://bitbucket.org/veldymanov/' create a new repository.
- Click 'I have existing project'
- Inside project's directory run the commands shown:
    git remote add origin https://veldymanov@bitbucket.org/veldymanov/template.git
    git push -u origin master
```
#### 2.4 Make changes in 'package.json'
#### 2.5 Install npm packages
````
    npm install
````
#### 2.6 Run the project
````
    gulp
````
#### 2.7 Create 'docs/' directory - application (with only minified files) for deployment
````
    gulp build
     //run browser-sync for build
     gulp build:server
````

## Service Worker
### Changes to the project
````
After making any changes to the project:
 1. In 'service-worker.js' change CACHE version here
    .....
    // Each time when make changes in project - change CACHE version
    const CACHE = 'templateCache-v1';
    ......
  2. Load changes to server and reload page to install new (changed) Service Worker. 
  3. Close (reload is not enough) the page (pages) in Browser and start it again to make 
  changed Service Worker active. Otherwise your application still will be under controll
  of previous Service Worker version.
````
### Service Worker
#### Short theory
````
A service worker is first registered.

After it is immediately downloaded when a user first accesses a service worker–controlled 
site/page.

Installation is attempted when the downloaded file is found to be new — either different 
to an existing service worker (byte-wise compared), or the first service worker encountered 
for this page/site.

If this is the first time a service worker has been made available, installation is attempted, 
then after a successful installation it is activated.

If there is an existing service worker available, the new version is installed in the background, 
but not yet activated — at this point it is called the worker in waiting. It is only activated 
when there are no longer any pages loaded that are still using the old service worker. 
As soon as there are no more such pages still loaded, the new service worker activates 
(becoming the active worker).

````
#### Coordination with server
````
As said above the Service Worker installation is attempted when the downloaded 
file 'service-worker.js' is new or changed. And if your server cached this file 
the new version will be available only after server cache renewal. 
And site/page will stay under control of old Service Worker version.
````