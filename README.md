## obstacle
A simple multipurpose loading/loader plugin for any frontend project.
Works in any typescript and javascript project.

This plugin makes it easy to create and use loading buttons and api content loaders, etc in different contexts. 

# **Installation**

```javascript
npm install obstacle --save
```

# **Usage**


#### **Import the module**

```javascript
import { Obstacle } from 'obstacle'
```

#### Below are the MainOptions that can currently be passed directly to the plugin's "create" method

```javascript
/* syntax */
Obstacle.create(element/*  HTMLElement | string */, options /* MainOptions = {} */)
Obstacle.destroy(element/*  HTMLElement | string */)

/* Types */
MainOptions {
    action?: Function | void /* This is the default action to perform when the obstacle is created
     NOTE: Do not call the function passed as action. Otherwise the function will be executed immediately. */
    onClick?: Function  /* You can also add a click event to the obstacle to make users perform an action if they click on the obstacle after its created. */
    timer?: number /* If you want the obstacle to be automatically destroyed at a specific time. Note: should be in miliseconds e.g: 5000 = 5sec */
    showCountdown?: boolean /* Displays the countdown timer on the element. only works if timer is set */
    text?: string /* Custom text to show on the overlay if needed. Defaults to "Wait..." */
    icon?: string /* Custom icon to show on the overlay if needed. You have to use your prefered icons class used in project as string */
    font?: number /* Custom font-size for the inner texts. Defaults to "16"*/
    animate?: boolean /* Whether to animate the icon if con is provided. defaults to true ( 360deg spin animation) */


    injectHTML?: string /* You can decide not to use any of the other options above and insert your own code */
    useOverlay?: boolean /* If injecting your own code, you may decide not to use default overlay */
}
```

#### It has diverse applications, but some common use scenarios are shown below.

```javascript
import { Obstacle } from 'obstacle'
import '/node_modules/obstacle/dist/obstacle.min.css' /* Or use it from cdn link 
 unpkg.com/obstacle/dist/obstacle.min.css */

// block login button until api response
const sendBtn = document.querySelector('#sendBtn')
/* activates when button is clicked */
        Obstacle.create(sendBtn, {
			icon: 'icon-spin6',
			text: 'Please wait',
            action: function () {
                $Auth.login({
                    email: this.email
                    password: this.password,
                }).then(done => {
                    Obstacle.destroy(sendBtn)
                })
            }
		})
				
// disable element and re-enable after a countdown timer
            Obstacle.create('#button', {
				action: function () { 
					// some default actions to perform
				},
				onClick: function () { 
					// what happens if user click element while obstacle is active
					// some actions to perform 
				},
				text: 'Please wait',
				timer: 10000,
				showCountdown: true,
				font: 30
			})


// inject a prefered custom element instead of default options
const customHtml = `
	<div class="LoadingClass custom-overlay custom-loading-icon m-auto">
		// some more innerHtml
	</div>
`
			window.onload = function {
				Obstacle.create('#main-page .wholePageLoading', {
					injectHTML: customHtml,
					useOverlay: false,
					action: function () { 
						// some default actions to perform
						fetch('api-stuffs-link').then(()=>{
							//
							Obstacle.destroy(...)
						})
					},
				})
			}

// more diverse use cases ...
```







## **disclaimer**
Please note that no guarantee is granted with the use of this code.
