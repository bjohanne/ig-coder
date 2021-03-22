/* Interfaces for appSettings settings */

export interface IMode {
    management: Boolean
}

export interface IPreferences {
    useCoreOnly: Boolean,
    usePrefixSuffix: Boolean
}

/* Other interfaces */

export interface ILocationState {
    from: {
        pathname: string
    }
}

export interface ISignUpData {
    username: string,
    password: string,
    firstname: string,
    lastname: string
}
