import AuthenticationContextProvider from './authentication/authentication.context';

const ApplicationContextProvider = ({ children }) => (
    <AuthenticationContextProvider>
        {children}
    </AuthenticationContextProvider>
);

export default ApplicationContextProvider;