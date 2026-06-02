// Mock for next/link used in Storybook
import React from 'react';
export default function Link({ href, children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return <a href={href} {...rest}>{children}</a>;
}
