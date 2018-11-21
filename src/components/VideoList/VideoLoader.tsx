import * as React from 'react';
import ContentLoader from "react-content-loader";

export default () => (
  <div style={{display: 'flex'}}>
    <div style={{width: 231, marginRight: 20}}>
      <ContentLoader 
        height={200}
        width={175}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <rect y="119.8" rx="3" ry="3" width="100" height="10" /> 
        <rect width="231" height="104.8" />
      </ContentLoader>
    </div>
    <div style={{width: 231, marginRight: 20}}>
      <ContentLoader 
        height={200}
        width={175}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <rect y="119.8" rx="3" ry="3" width="100" height="10" /> 
        <rect width="231" height="104.8" />
      </ContentLoader>
    </div>
    <div style={{width: 231, marginRight: 20}}>
      <ContentLoader 
        height={200}
        width={175}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <rect y="119.8" rx="3" ry="3" width="100" height="10" /> 
        <rect width="231" height="104.8" />
      </ContentLoader>
    </div>
  </div>
)