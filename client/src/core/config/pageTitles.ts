/*
    Static page titles for each Route defined in app.tsx.
    Import this in the Route's component and set
        document.title = pageTitles.<route name>;
*/

const pageTitles = {
    prefix: "IG Coder \u00b7 ",
    dashboard: "Dashboard",
    landing: "Welcome",
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
