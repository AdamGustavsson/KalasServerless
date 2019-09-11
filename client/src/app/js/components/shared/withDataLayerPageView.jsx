import React, { Component } from 'react';

const withDataLayerPageView = WrappedComponent =>
  class extends React.Component {
    constructor() {
      super();
    }
    componentDidMount() {
        const locationRegex = new RegExp(/#(.*)\?.*/) ;
        const locationArray = locationRegex.exec(location.hash);
        dataLayer.push({'page': locationArray[1]});
        console.log("adding pageview to datalayer for page: " + locationArray[1]);
        dataLayer.push({'event': 'pageview'});
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
  export default withDataLayerPageView;