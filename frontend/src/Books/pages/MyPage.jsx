import React from 'react';
import { Helmet } from 'react-helmet';

const MyPage = () => {
  return (
    <div>
      <Helmet>
        <title>Read Flow</title>
        <meta name="description" content="This is a custom description for SEO." />
        <meta name="keywords" content="React, SEO, Helmet, Custom" />
        <link rel="canonical" href="https://my-website.com/my-page" />
        <meta property="og:title" content="My Custom OpenGraph Title" />
        <meta property="og:description" content="This is a description for social media sharing." />
        {/* Add other tags as needed */}
      </Helmet>
    
    </div>
  );
};

export default MyPage;
