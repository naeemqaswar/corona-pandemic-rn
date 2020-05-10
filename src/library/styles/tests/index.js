export const containerBorderTestXXX = {
    borderWidth: 1,
    borderColor: 'red',
};

export const containerBorderTest = (color = 'red', width = 1) => {
    return {
        borderWidth: width,
        borderColor: color,
    };
};