import axios from 'axios';
// import React, { useCallback, useEffect, useState } from 'react';
import React, { useCallback, useContext, useEffect, useState } from 'react';

const Initialvalue = {
  token: null,
};
export const AuthContext = React.createContext(Initialvalue);

export function AuthProviderComponent({ children }: any) {
  const [loading, setLoading] = useState(true);
  const [authPayload, setAuthPayload] = useState(Initialvalue);
  const init = React.useCallback(async () => {
    try {
      setLoading(true);
      const fromStorage = localStorage.getItem('token');
      console.log(fromStorage);
      // if (fromStorage) {
      //   const data = JSON.parse(fromStorage);
      //   const axiosClient = axios.create({
      //     baseURL: 'http://localhost:8000',
      //     headers: {
      //       Authorization: 'Bearer ' + data.token,
      //     },
      //   });
      //   axios.interceptors.response.use(
      //     function (response) {
      //       return response;
      //     },
      //     function (error) {
      //       if (
      //         error?.response?.data?.err &&
      //         error?.response?.data?.err === 'Forbinded Resources'
      //       ) {
      //         localStorage.removeItem('token');
      //         // window.location.href = 'http://localhost:5173/login';
      //       }

      //       return Promise.reject(error);
      //     },
      //   );

      // }
      setAuthPayload({ fromStorage });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    init();
  }, [init]);

  React.useEffect(() => {
    console.log(authPayload); // Log authPayload here
  }, [authPayload]);

  if (loading) return React.createElement('div', null, 'Loading....');

  return (
    <AuthContext.Provider value={{ ...authPayload, init }}>
      {children}
    </AuthContext.Provider>
  );
  // return React.createElement(AuthContext.Provider, { value: { ...authPayload, init } }, children);
}
