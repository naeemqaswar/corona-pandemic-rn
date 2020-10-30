const assetsPath = "../../assets/";

const app = {
	icon: require(assetsPath + "icon.png"),
	logo: require(assetsPath + "logo.png"),
};

const loaders = {};

const backgrounds = {
	mainCounter: require(assetsPath + "counter-bg-filled.png"),    // transparent | filled
	coronaMap: require(assetsPath + "background-map.jpg"),
};

const misc = {
	errorScreen: require(assetsPath + "error-screen-image.png"),
};

export default {
	...app,
	...loaders,
	...backgrounds,
	...misc,
};
