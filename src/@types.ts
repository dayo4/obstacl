
export interface MainOptions {
    action?: Function | void /* This is the default action to perform when the obstacl is created
     NOTE: Do not call the function passed as action. Otherwise the function will be executed immediately. */
    onClick?: Function  /* You can also add a click event to the obstacl to make users perform an action if they click on the obstacl after its created. */
    timer?: number /* If you want the obstacl to be automatically destroyed at a specific time. Note: should be in miliseconds e.g: 5000 = 5sec */
    showCountdown?: boolean /* Displays the countdown timer on the element. only works if timer is set */
    text?: string /* Custom text to show on the overlay if needed. Defaults to "Wait..." */
    icon?: string /* Custom icon to show on the overlay if needed.  */
    font?: number /* Custom font-size for the inner texts. Defaults to "16"*/
    animate?: boolean /* Whether to animate the icon. defaults to true ( 360deg spin animation) */

    injectHTML?: string /* You can decide not to use any of the other options above and insert your own code */
    useOverlay?: boolean /* If injecting your own code, you may decide not to use default overlay */
}

export interface OverlayOptions {
    text?: string,
    icon?: string,
    font?: number,
    animate?: boolean
}

export interface OverlayDelayOptions {
    timer: number,
    text?: string,
    font?: number
}