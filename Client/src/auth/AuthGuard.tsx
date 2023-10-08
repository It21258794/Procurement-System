import { AuthContext } from './AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import AuthRole from './AuthRole';
import React from 'react';

export const AuthGuard = ({ children }) => {
  let authPayload = React.useContext(AuthContext);
  const { fromStorage } = authPayload;
  const data = JSON.parse(fromStorage);

  // const [token,setToken] = useState([]);
  const navigate = useNavigate();

  try {
    console.log('auths', data);
    // setToken(authPayload.token)
    if (!data || !data.token) {
      //  navigate("/login")
      console.log('no payload');
      return <>{children}</>;
    }
    const decoded = jwt_decode(data.token);
    const userRole = decoded.role;
    console.log(userRole);

    if (userRole === AuthRole.PROCUREMENT_MANAGER) {
      return <Navigate to="/manager/sites" />;
    } else if (userRole === AuthRole.PROCUREMENT_ADMIN) {
      return <Navigate to="/admin" />;
    } else if (userRole === AuthRole.SUPERVISOR) {
      return <Navigate to="/supervisor" />;
    } else if (userRole === AuthRole.SUPLLIER) {
      return <Navigate to="/supllier" />;
    }
  } catch (error) {
    console.log(error);
  }
};

export const ManagerAuthGuard = ({ children }) => {
  try {
    let authPayload = React.useContext(AuthContext);
    const { fromStorage } = authPayload;
    const data = JSON.parse(fromStorage);

    if (!data || !data.token) {
      return <Navigate to="/login" />;
    }

    const decoded = jwt_decode(data.token);
    const userRole = decoded.role;

    if (userRole === AuthRole.PROCUREMENT_ADMIN) {
      // navigate('/manager')
      return <Navigate to="/admin" />;
    }

    if (userRole != AuthRole.PROCUREMENT_MANAGER) {
      return <Navigate to="/login" />;
    }

    return <>{children}</>;
  } catch (error) {
    console.log(error);
  }
};

// export const AdminAuthGuard = ({ children }) => {
//   const navigate = useNavigate();

//   try {
//     let authPayload = useContext(AuthContext);

//      if (!authPayload || !authPayload.token) {
//       console.log("no payloard");
//       return <Navigate to="/login" />;
//     }

//     var decoded = jwt_decode(authPayload.token);
//     const userRole = decoded.role;

//     if (userRole === AuthRole.PROCUREMENT_ADMIN) {
//       return <Navigate to="/admin" />;
//     }

//     if (userRole === AuthRole.PROCUREMENT_MANAGER) {
//       return <Navigate to="/manager" />;
//     }
//     // alert("Manager")

//     return <>{children}</>;
//   } catch (error) {
//     // alert(error);
//   }
// };

// export function GuestGuard({ children }) {
//   const navigate = useNavigate();

//   try {
//     let authPayload = useContext(AuthContext);
//     if (authPayload && authPayload.token) {
//       var decoded = jwt_decode(authPayload.token);

//       const decodedEmail = decoded.email;
//       let adminString = decodedEmail.substring(0, 5);

//       if (adminString === 'super') {
//         navigate('/admin');
//       }
//       else if (adminString === 'admin') {
//         navigate('/manager');
//       } else {
//         navigate('/app');
//       }
//     }
//     return <>{children}</>;
//   } catch (error) {
//   //  alert(error);
//   }
// }
