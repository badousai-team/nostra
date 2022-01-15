import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link as MuiLink } from '@mui/material'

// TODO: https://mui.com/guides/routing/
const Link = React.forwardRef((props, ref) => {
  const { href, className, children, ...linkProps } = props
  const component = (href && (href.indexOf('ttp://') >= 0 || href.indexOf('ttps://') >= 0)) ? undefined : RouterLink
  return (
    <MuiLink
      ref={ref}
      component={component}
      to={component ? href : undefined}
      href={href}
      className={className}
      {...linkProps}
    >
      {props.children}
    </MuiLink>
  )
})

export default Link
