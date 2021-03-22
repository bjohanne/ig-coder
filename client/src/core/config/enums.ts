/* The following 3 enums pertain to the management layer of the system. */

export enum OperationType {
    createDataset   = 1,
    read            = 2,
    update          = 3,
    delete          = 4
}

export enum MemberType {
    owner   = 1,
    member  = 2,
    guest   = 3
}

export enum VisibilityType {
    private     = 1,
    internal    = 2,
    public      = 3
}
