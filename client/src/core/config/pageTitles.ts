/*
    Static page titles for each Route defined in App.tsx.
    Import this in the Route's component and set
        document.title = pageTitles.<route name>;
*/

const pageTitles = {
    prefix: "IG Coder \u00b7 ", // Small bullet symbol
    dashboard: "Dashboard",
    landing: "Welcome",
    welcome: "Welcome",
    login: "Sign in",
    register: "Sign up",
    pwdReset: "Reset password",
    myProjects: "My Projects",
    myDocuments: "My Documents",
    notLoggedIn: "Not signed in",
    noPermission: "Permission denied",
    notFound: "Page not found"
}

export default pageTitles;
