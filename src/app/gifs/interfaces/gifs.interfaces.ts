

export interface GifsPagination {
    count: number;
    offset: number;
    total_count: number;
}

export interface GifsMeta {
    response_id: string;
    msg: string;
    status: number;
}

export interface GifsImage {
    height: string;
    width: string;
    size: string;
    url: string;
}

export interface GifsImagePreview {
    height: string;
    width: string;
    mp4: string;
}

export interface GifsUser {
    avatar_url: string;
    banner_image: string;
    banner_url: string;
    profile_url: string;
    username: string;
    display_name: string;
    description: string;
    instagram_url: string;
    website_url: string;
    is_verified: boolean;
}

export interface GifsSearch {
    id: string;
    rating: string;
    title: string;
    type: string;
    images: {
        orginal: GifsImage;
        downsized: GifsImage;
        downsized_medium: GifsImage;
        hd?: GifsImage;
        preview: GifsImagePreview;
    };
    username: string;
    user: GifsUser;
}


export interface GifsResponse<T> {
    data: T;
    meta: GifsMeta;
    pagination: GifsPagination;
}
