import { MainOptions } from './@types'
import {
    overlay,
    overlayDelay,
    injectCustomHtml,
    breakClick
} from './functions'


class _Obstacl {
    /* keep track of target elements for easy termination */
    private stack: any = [] as HTMLElement[]


    create (element: HTMLElement | string, opts: MainOptions = {}) {
        const text = 'text' in opts ? opts.text : 'Wait...'
        const icon = 'icon' in opts ? opts.icon : ''
        const font = 'font' in opts ? opts.font : 16

        /* Better to use an Element directly if already available. Otherwise use it's DOM selector to query it. */
        let elem = this.verifyElement(element)

        if (elem)
        {

            /* Prevent duplicate activation on an element */
            const exist = this.stack.includes(elem)

            if (!exist)
            {
                elem.classList.add('isDisabled')
                this.stack.push(elem)

                /* prevent disabled elements such as buttons from been clickable while the obstacl is active */
                if (!opts.onClick)
                {
                    elem.addEventListener('click', breakClick, false)
                }

                /* if a default "action" is specified, activate it */
                if (opts.action)
                {
                    opts.action()
                }
                /* if an "onClick" action is specified, activate it */
                if (opts.onClick)
                {
                    elem.addEventListener('click', function (e) {
                        e.preventDefault()
                        opts.onClick()
                        return
                    }, false)
                }
                if (opts.timer)
                {
                    if (opts.showCountdown)
                    {
                        elem.appendChild(overlayDelay({ timer: opts.timer, text, font }))
                    }
                    else
                    {
                        elem.appendChild(overlay({ text, icon, font, animate: opts.animate }))
                    }


                    let $this = this
                    setTimeout(function () {
                        $this.destroy(elem)
                    }, opts.timer)
                }
                else if (opts.injectHTML)
                {
                    if (typeof opts.injectHTML !== 'string')
                    {
                        console.error('property "injectHTML" expects value of type string.')
                        return
                    }
                    else
                    {
                        const useOverlay = 'useOverlay' in opts ? opts.useOverlay : true
                        elem.appendChild(injectCustomHtml(opts.injectHTML, useOverlay))
                    }
                }
                else
                {
                    elem.appendChild(overlay({ text, icon, font, animate: opts.animate }))
                }

            }
            return
        }
        console.error('invalid target supplied to $Obstacl creator.')
    }

    destroy (element: HTMLElement | string) {
        /* if you have access to the button at the point of destruction, use it. Otherwise use it's 'selector' to get it from the DOM. */

        let elem = this.verifyElement(element)

        if (elem)
        {
            const overlay = elem.getElementsByClassName('Overlay')[ 0 ]
            this.stack.splice(this.stack.indexOf(elem), 1)

            elem.classList.remove('isDisabled')
            elem.removeChild(overlay)
            elem.removeEventListener('click', breakClick, false)

            return
        }
        console.error('invalid target supplied to $Obstacl destroyer.')

    }

    private verifyElement (element: HTMLElement | string): HTMLElement {
        if (typeof element === 'string')
        {
            return document.querySelector(element)
        }
        else
        {
            return element
        }
    }
}

export const Obstacl = new _Obstacl()