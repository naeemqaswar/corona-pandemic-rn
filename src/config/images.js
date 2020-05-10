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

export default {
	...app,
	...loaders,
	...backgrounds,
};
