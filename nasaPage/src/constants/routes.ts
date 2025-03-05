type Routes={
    [key:string]:string
};

export const routes:Routes={
    HOME : '/',
    APOD : '/apod',
    MARS_ROVER : '/mars-rover',
    NEO: '/neo',
    EARTH_IMAGERY: '/earth-imagery',
    APOD_DETAILS: '/apod-details/:date',
    MARS_ROVER_DETAILS: '/mars-rover-details/:id'
}