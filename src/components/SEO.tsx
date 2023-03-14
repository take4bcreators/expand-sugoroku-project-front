import React from 'react';

type SEOType = {
  pageTitle: string,
}

export default function SEO({pageTitle}: SEOType ) {
  return (
    <>
      <title>{pageTitle}</title>
    </>
  )
}
