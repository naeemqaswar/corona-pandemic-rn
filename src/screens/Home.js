import React, { useState, useEffect, lazy, Suspense } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity, ImageBackground, ScrollView } from "react-native";

import { SplashScreen } from 'expo';
import ElevatedView from 'react-native-elevated-view';
// import { Container, Content } from "native-base";

import { fetchAll, fetchCountries } from "../api";
import { colors, images } from "../config";
import { Storage } from "../library/helpers";
import { numWithCommas } from "../library/Utils";

import {DataContext} from '../context/DataContext';
import Picker from "../components/Picker";
import {MainCounter, MajorCounters, CounterSection} from "../components/Home";

// const Picker = lazy(() => import("../components/Picker"));

const defaultRegion = {
	iso: 'global',
	name: 'Global',
	flag: 'https://i2x.ai/wp-content/uploads/2018/01/flag-global.jpg',
};

// TODO: Show content Loader until Region value is not set
// TODO: Stop Picker component re-rendering on Tap (Open)
// TODO: Implement PURE Component
class Home extends React.PureComponent {

	static contextType = DataContext;	// Referencing context value

	state = {
		repError: false,
		globalData: {},
		region: {},
		savedRegion: "",
		countries: [],
		countryOptions: [],
		showCountrySelection: false,
	}
	
	getCountryOptionsIndex = code => (code && this.context.countryOptions.length) > 0 ? this.context.countryOptions.map(e => e.code).indexOf(code):0;
	
	// Error message for bad request
    _showError = () => {
        return <View><Text>Unable to process request</Text></View>;
	};

	_countryListPopup = () => {

		const {region, countryOptions, showCountrySelection, toggleRegionSelector, changeCountry} = this.context;

		// Getting selected country's index
		let _selectedCountryIndex = Object.keys(region).length > 0 ? this.getCountryOptionsIndex(region.iso):0;

		return <Picker options={countryOptions} selected={_selectedCountryIndex} onSelection={changeCountry} display={showCountrySelection} close={() => toggleRegionSelector(false)} mainColor={colors.main} />;

		// TODO: Test and re-implement component Lazy loading
		return <Suspense fallback={<View><Text>Loading...</Text></View>}>
			<Picker options={countryOptions} selection={this._handleCountryChange} scrollTo={100} display={showCountrySelection} close={() => this.setState({showCountrySelection: false})}/>
		</Suspense>
	};

	_renderContent() {

		const { updated, cases, recovered, deaths, critical, todayCases, todayDeaths, tests, testsPerOneMillion, casesPerOneMillion, deathsPerOneMillion} = this.context.region;

		// console.log('this.context.region', this.context.region);

		console.log('this.context.region', this.context.region);

		let _majorCounters = {
			recovered: numWithCommas(recovered), 
			deaths: numWithCommas(deaths), 
			critical: numWithCommas(critical)
		};

		let _countersCollections = [
			{
				head: "Last 24 Hours",
				subHead: "12pm - 12pm",
				icon: "md-time",
				counters: [{
					title: "Cases",
					value: numWithCommas(todayCases),
				},
				{
					title: "Deaths",
					value: numWithCommas(todayDeaths),
				}]
			},
			{
				head: "Average Cases",
				icon: "ios-stats",
				counters: [{
					title: "Cases / Million",
					value: numWithCommas(casesPerOneMillion),
				},
				{
					title: "Deaths / Million",
					value: numWithCommas(deathsPerOneMillion),
				}]
			},
			{
				head: "Tests Conducted",
				icon: "ios-flask",
				counters: [{
					title: "Total Tests",
					value: numWithCommas(tests),
				},
				{
					title: "Tests / Million",
					value: numWithCommas(testsPerOneMillion),
				}]
			},
		];

		let _counterSections = _countersCollections.map(({head, subHead = '', icon, counters}, index) => (
			<CounterSection key={index} head={head} subHead={subHead} icon={icon} list={counters}/>
		));

		return <View style={styles.container}>
			<MainCounter value={numWithCommas(cases) } />
			<MajorCounters counters={_majorCounters} />
			<View style={{marginTop: 25}}>
				{_counterSections}
			</View>
			{this._countryListPopup()}
		</View>;
	}

	render() {

		const {loading, region, repError} = this.context;

        if(repError === true) return this._showError();

        if(loading || Object.keys(region).length === 0) return <Text>Loading...</Text>;

		return <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			{this._renderContent()}
		</ScrollView>
	}
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// paddingBottom: 10,
	},
	majorCountersContainer:{
		// backgroundColor: '#e2e1e0',
		alignItems: 'center',
		marginTop: -40,
		// borderWidth: 1,
	},
	stayElevated: {
		width: '80%',
		height: 70,
		backgroundColor: 'white'
	},
});