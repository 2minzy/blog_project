import decodeJwt from 'jwt-decode';

const authProvider = {
  // called when the user attempts to log in
  login: async ({ email, password, role }) => {
    const request = new Request('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    let response;

    try {
      response = await fetch(request);
    } catch (e) {
      throw new Error('Network Error!');
    } finally {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      const { token } = await response.json();

      localStorage.setItem('token', token);
    }
  },

  // called when the API returns an error
  checkError: async error => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      throw new Error({ message: false });
    }
    // other error code (404, 500, etc): no need to log out
  },

  // // called when the user navigates to a new location, to check for authentication
  checkAuth: async () => {
    if (!localStorage.getItem('token')) {
      throw new Error();
    }
  },

  // called when the user clicks on the logout button
  logout: async () => {
    localStorage.removeItem('token');
  },

  // getIdentity: () => {
  //   try {
  //     const { id, name } = JSON.parse(localStorage.getItem('auth'));
  //     return Promise.resolve({ id, name });
  //   } catch (error) {
  //     return Promise.reject(error);
  //   }
  // },

  // // called when the user navigates to a new location, to check for permissions / roles
  // getPermissions: () => {
  //   const role = localStorage.getItem('permissions');
  //   return role ? Promise.resolve(role) : Promise.reject();
  // },

  getIdentity: () => Promise.resolve(),
  // authorization
  getPermissions: params => Promise.resolve(),
};

export default authProvider;
