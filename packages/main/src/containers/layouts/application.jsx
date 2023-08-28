import ConditionalWrapper from "common/src/components/helpers/ConditionalWrapper";
import Error from "common/src/components/shared/error";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styledComponents from "styled-components";
import IsVerifiedAccount from "../../components/isVerifiedAccount/isVerifiedAccount";
import Navbar from "../../components/navbar";
import SidebarComponent from "../../components/sidebar/sidebarComponent";

const Container = styledComponents.div`
  margin:0px 0px;
  padding: 0px 0px;
`;

const Application = (props) => {
  const { loggedIn = false,role=null,isVerified,freeTrialExpired,packExpired,email } = useSelector(state => state.user);
  const { hasError = null, error = null, errorInfo = null } = useSelector(state => state);
  const [refresh, setRefresh] = useState(false);
  //The sidebar has a bug (and it's package is abondoned) 
  //This is a workaround to make the sidebar component refresh 
  useEffect(() => setTimeout(() => setRefresh(true), 1000), []);

  if (hasError) {
    return (
      <Error error={ error } errorInfo={ errorInfo } />
    );
  }
  const shouldDisableMenu = ()=> (
    freeTrialExpired === true &&
    packExpired === true  &&
    role === "teacher"
  ); 
  return (
    <Container>
      <div >
        <Navbar { ...props } />
      </div>
      <div id="notifications"></div>
      <ConditionalWrapper
        condition={ loggedIn }
        wrapper={
          (children) => {
            return (
              <>
                <IsVerifiedAccount
                  role={ role }
                  email={ email }
                  isVerified={ isVerified }
                />
                <div
                  style={ {
                    // pointerEvents:"none"
                    // props.email &&
                    // (props.isVerified === false ||
                    //   (props.freeTrialExpired === true &&
                    //     props.packExpired === true )) &&
                    // role === "teacher"
                    //   ? window.location.includes("payments")
                    //     ? "inherit"
                    //     : "none"
                    //   : "inherit"
                  
                  } }
                >
                  <SidebarComponent
                    { ...props }
                    refresh={ refresh }
                    disabled={ 
                      shouldDisableMenu() ? 
                        "none": "inherit"
                    }
                  >
                    <div>
                      { children }
                    </div>
                  </SidebarComponent>
                </div>
              </>
            );
          }
        }
      >
        { props.children }
      </ConditionalWrapper>  
    </Container >
  );
};

export default Application;
