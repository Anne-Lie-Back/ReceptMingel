import AuthenticationContextProvider from './authentication/authentication.context';

//Put all contexts here for easy Providing
const ApplicationContextProvider = ({ children }) => (
    <AuthenticationContextProvider>
        {children}
    </AuthenticationContextProvider>
);

export default ApplicationContextProvider;