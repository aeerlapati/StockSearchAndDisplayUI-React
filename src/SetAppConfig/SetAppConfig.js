import React, {Component} from 'react';
// import auth0Client from '../Auth';
import './splash-screen.css';

import { getConfig } from '../../_helpers/envUtils';

// https://auth0.com/blog/creating-a-splash-screen-for-your-react-apps/

function LoadingMessage() {
  return (
    <div className="splash-screen">
      Loading...
      <div className="loading-dot">.</div>
    </div>
  );
}

function setAppConfig(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        config: {}
      };

      // console.log("====== SET APP CONFIG STATE====");
      // console.log(this.state);
    }

    // async componentDidMount() {
    componentDidMount() {

      let oktaConfig = {}
      
      try {
        // await auth0Client.loadSession();

          // await getConfigNew("oidc").then((res)=> {
          // await getConfig("oidc").then((res)=> {
                // console.log("==== [Set App Config HOC] GETTING NEW OIDC CONFIG====")
                // console.log(res);

                // if(res){
                    oktaConfig = getConfig("oidc");

                    setTimeout(() => {
                      this.setState({
                          loading: false,
                          config: oktaConfig              
                      });
          
                  }, 150);
                // } 
              // });

      } catch (err) {
        // console.log(err);
        // this.setState({
        //   loading: false,
        //   config: {}
        // });
      }
    }

    render() {
      // while checking user session, show "loading" message
      if (this.state.loading) return LoadingMessage();

      // otherwise, show the desired route
      //   return <WrappedComponent {...this.props} />;
      return <WrappedComponent config={this.state.config} />;
    }
  };
}

export default setAppConfig;