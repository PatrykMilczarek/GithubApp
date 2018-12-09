import * as React from "react";

const loaderStyle: React.CSSProperties = {
  position: "fixed",
  top: "45%",
  right: "45%",
  fontSize: "30px"
};
const withLoaderHOC = (Component: any) => {
  return function withLoader({ isLoading, ...props }: any) {
    return isLoading ? (
      <p style={loaderStyle}>Loading data...</p>
    ) : (
      <Component {...props} />
    );
  };
};
export default withLoaderHOC;
