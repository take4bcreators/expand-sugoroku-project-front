import React from 'react';

type SEOType = {
  pageTitle: string,
}

export default function SEO({pageTitle}: SEOType ) {
  return (
    <>
      <body className="f-sg-body" />
      <title>{pageTitle}</title>
    </>
  )
}
