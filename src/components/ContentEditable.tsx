import React, {createRef} from 'react'

const ContentEditable = (_props: Prop) => {
  const {tagName, noHtml, disabled, html, className, onChange, ...props} = _props
  const selfRef = createRef<HTMLElement>()

  console.log(selfRef)

  const getEl = () => {
    return selfRef?.current
  }

  const getHtml = () => {
    const el = getEl()
    if (el == null) return html
    return noHtml ? el.innerText: el.innerHTML 
  }

  const emitChanges = (_event: React.SyntheticEvent) => {
    const el = getEl()
    if (el == null) return

    if (el.innerHTML != html) {
      const event = Object.assign(_event, {
        target: {
          value: getHtml()
        }
      });
      onChange(event as ContentEditableEvent)
    }
  }

  return React.createElement(tagName || 'div', {
    ...props,
    ref: selfRef,
    contentEditable: !disabled,
    className,
    dangerouslySetInnerHTML: {__html: html},
    onInput: emitChanges,
    onBlur: props.onBlur || emitChanges,
    onKeyDown: props.onKeyDown || emitChanges,
    onKeyUp: props.onKeyUp || emitChanges,
  }, props.children);
}

ContentEditable.defaultProps = {
  tagName: 'div',
  disabled: false,
  className: null,
  noHtml: true,
  html: ''
}

export default ContentEditable


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ContentEditableEvent = React.SyntheticEvent<any, Event> & {target: {value: string}}

type Override<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R;
type ExtendedDivProp = Override<JSX.IntrinsicElements["div"], {onChange : (event: ContentEditableEvent) => void}>

interface Prop extends ExtendedDivProp {
  html?: string;
  disabled?: boolean;
  tagName?: string;
  className?: string;
  noHtml?: boolean;
}