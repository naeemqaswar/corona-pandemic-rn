import React, { Component, createContext } from 'react';
import { Text, View } from 'react-native';
import {AppLoading, SplashScreen} from 'expo';
import { Asset } from 'expo-asset';

import { fetchAll, fetchCountries } from "../api";
import { images } from "../config";
import { Storage } from "../library/helpers";
import { objectToArray } from "../library/Utils";

export const DataContext = createContext();

const defaultRegion = {
	iso: 'global',
	name: 'Global',
	flag: 'https://i2x.ai/wp-content/uploads/2018/01/flag-global.jpg',
};

export default class DataContextProvider extends Component {

	state = {
        loading: false,
		repError: false,
		globalData: {},
		region: {},
		defaultRegion,
		savedRegion: "",
		countries: [],
		countryOptions: [],
		showCountrySelection: false,
    }

	async componentDidMount(){
		SplashScreen.preventAutoHide();

        this._toggleRegionSelector = this._toggleRegionSelector.bind(this);
        this._refreshContent = this._refreshContent.bind(this);

		await this._appBootstrap();
	}
 
	async _appBootstrap() {
		
		// Loading region info to State
		this.setState({savedRegion: await Storage.get('region')});
		
		await this._fetchContent();

		// Cashing all image resources
		let _imageResources = objectToArray(images);
		await _imageResources.map(image => {
			return Asset.fromModule(image).downloadAsync();
		});
		
		// Hiding Splash Screen
		SplashScreen.hide();
	};

	async _fetchContent() {

		await this._fetchGlobalData();
        
		await this._getCountryData();
	}

	// TODO: Handle all requests with promise.all 
	_fetchGlobalData = () => {

		return fetchAll((error, response) => {
			// console.log('fetchAll response:', response);
            
			if(error === true) { 

				this.setState({repError: true});
				return false;
			 }

			let _globalData = {...defaultRegion, ...response};
			let _regionUpdate = { globalData: _globalData };

			// Loading Global info if no saved region or it was set to Global
			if(!this.state.savedRegion || this.state.savedRegion === defaultRegion.iso) _regionUpdate['region'] = _globalData;
			
			this.setState(_regionUpdate);
        });
	}

	_getCountryData = () => {

		return fetchCountries((error, response) => {
			// console.log('fetchCountries response:', response);
            
			if(error === true) { 
				
				this.setState({repError: true});
				return false;
			 }

			if(response.length) this._organizeCountryData(response);
        });
	}

	_organizeCountryData = (countries) => {

		if(!countries) return false;

		let _organizedData = {};
		let _countriesList = {};
		let _countryOptionsList = [];

		_countryOptionsList.push({...defaultRegion, 'code': defaultRegion.iso});

		countries.forEach(country => {

			const {cases, active, recovered, deaths, country: countryName, continent, countryInfo: { iso3: code, flag, lat, long }, updated} = country;

			let _countryCode = code ? code: countryName;
			let _countryContent = { cases, active, recovered, deaths, 'name': countryName, 'iso': code, continent, flag, lat, long, updated };

			// _countriesList[_countryCode] = _countryContent;
			_countriesList[_countryCode] = {
                ...country,
                'name': countryName,
                'iso': code,
            };
			_countryOptionsList.push({'code': _countryCode, 'name': countryName, flag});
		});

		_organizedData = {
			countries: _countriesList,
			countryOptions: _countryOptionsList,
		};

		// Setting Country data if no region found
		if(!this.state.region || Object.keys(this.state.region).length === 0) {

			// Setting country as region, if not available set to Global Data
			let _countryInfo = _countriesList[this.state.savedRegion];
			_organizedData['region'] = _countryInfo ? _countryInfo:this.state.globalData;
		};

		this.setState({
            ..._organizedData,
            loading: false,
        });
	};

    async _refreshContent(){
        this.setState({loading: true});

		await this._fetchContent();
		
        this.setState({loading: false});
    }

	_handleCountryChange = (countryCode) => {

		const {countries, globalData} = this.state;
		
		if(!countries || (!countries[countryCode] && countryCode != defaultRegion.iso)) return false;

		// Setting details for selected country and if iso code is global then it will set Global data
		let _selectedCountry = countryCode == defaultRegion.iso ? globalData:countries[countryCode];

		// Saving country code to local memory
		Storage.save('region', countryCode);

		this.setState({
			region: _selectedCountry,		// Setting selected country data
			showCountrySelection: false,	// Closing Country selection list
		});
	};
    
    _toggleRegionSelector(status) {
        this.setState({showCountrySelection: status});
    }

    render() {
        return <DataContext.Provider value={{
            ...this.state, 
            toggleRegionSelector: this._toggleRegionSelector,
            changeCountry: this._handleCountryChange,
            refreshContent: this._refreshContent,
        }}>
            {this.props.children}
        </DataContext.Provider>
    }
}