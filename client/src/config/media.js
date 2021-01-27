export const breakpoints = [375, 500, 768, 1024, 1440];
export const labels = ['XSmobile', 'mobile', 'tablet', 'laptop', 'desktop'];

//How to use:     
/*     [media.above.tablet]: {
        background: 'red',
    }, */

const above = breakpoints.reduce(
    (obj, value, i) => ({
        ...obj,
        [labels[i]]: `@media screen and (min-width: ${value}px)`,
    }),
    {}
);

const below = breakpoints.reduce(
    (obj, value, i) => ({
        ...obj,
        [labels[i]]: `@media screen and (max-width: ${value - 1}px)`,
    }),
    {}
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    above,
    below
};