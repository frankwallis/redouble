declare module jasmine {
    interface Matchers {
        toBeRejected(): boolean;
        toBeRejectedWith(e: any): boolean;
        toBeResolved(): boolean;
        toBeResolvedWith(a: any): boolean;
    }
}
