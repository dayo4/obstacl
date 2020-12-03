import { OverlayOptions, OverlayDelayOptions } from './@types'


export function overlay (opts: OverlayOptions) {
    const span = document.createElement('span')
    span.classList.add('Overlay')
    span.innerHTML = `
        <span class="${opts.icon} ${opts.animate === false ? '' : 'animate-spin'} mr-2" style="font-size: ${opts.font}px;">
        </span>
        <span style="font-size: ${opts.font}px;">
            ${opts.text}
        </span>
    `

    return span
}


export function injectCustomHtml (html: string, useOverlay: boolean = true) {
    const div = document.createElement('div')
    div.classList.add(useOverlay ? 'Overlay' : '')
    div.innerHTML = html

    return div
}


export function overlayDelay (opts: OverlayDelayOptions) {
    const span = document.createElement('span')
    span.classList.add('Overlay')
    span.innerHTML = `
        <span class="DelayCount mr-2" style="font-size: ${opts.font}px;">
        </span>
        <span style="font-size: ${opts.font}px;">
            ${opts.text}
        </span>
    `

    let time = Math.ceil(opts.timer / 1000)
    for (let i = time; i >= 0; i--)
    {
        setTimeout(function () {
            span.firstChild.textContent = String(i)
        }, opts.timer - (1000 * i))
    }

    return span
}

export function breakClick (e) {
    e.preventDefault()
    return
}