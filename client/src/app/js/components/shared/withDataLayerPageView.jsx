import React, { Component } from 'react';

const withDataLayerPageView = WrappedComponent =>
  class extends React.Component {
    constructor() {
      super();
    }
    componentDidMount() {
        dataLayer.push({'page': window.location.pathname});
        console.log("adding pageview to datalayer for page: " + window.location.pathname);
        dataLayer.push({'event': 'pageview'});
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
  export default withDataLayerPageView;