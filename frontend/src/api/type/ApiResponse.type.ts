interface ApiResponse {
    responseAt: string;
}

export interface ApiResultResponse<T> extends ApiResponse {
    result: T;
}

export interface ApiErrorResponse extends ApiResponse {
    errorMessage: string;
}