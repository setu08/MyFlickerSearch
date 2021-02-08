export interface ImageSearchRequest {
    farm: string;
    id: string;
    secret: string;
    server: string;
    title: string;
  }
  
  export interface ImageSearchResponse {
    photos: {
      photo: ImageSearchRequest[];
    };
  }