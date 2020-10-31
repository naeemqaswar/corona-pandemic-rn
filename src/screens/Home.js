import React, { useState, useEffect, lazy, Suspense } from "react";
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from "react-native";

import { fetchAll, fetchCountries } from "../api";
import { colors, images } from "../config";
import { Storage } from "../library/helpers";
import { numWithCommas } from "../library/Utils";
import { DataContext } from '../context/DataContext';

import Loader from "../components/Loader";
import Picker from "../components/Picker";
import ErrorScreen from "../components/ErrorScreen";
import { MainCounter, MajorCounters, CounterSection } from "../components/Home";

// const Picker = lazy(() => import("../components/Picker"));

// TODO: Show content Loader until Region value is not set
// TODO: Stop Picker component re-rendering on Tap (Open)
// TODO: Implement PURE Component
class Home extends React.Component {

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

	componentDidMount(){}
	
	getCountryOptionsIndex = code => (code && this.context.countryOptions.length) > 0 ? this.context.countryOptions.map(e => e.code).indexOf(code):0;

	_regionSelectionPopup = () => {

		const {region, countryOptions, showCountrySelection, toggleRegionSelector, changeCountry, loading} = this.context;

		// Getting selected country's index
		let _selectedCountryIndex = Object.keys(region).length > 0 ? this.getCountryOptionsIndex(region.iso):0;

		return <Picker
			options={countryOptions}
			selected={_selectedCountryIndex}
			onSelection={changeCountry}
			display={showCountrySelection}
			close={() => toggleRegionSelector(false)}
			mainColor={colors.main}
			loading={loading}
		/>;
	};

	_lastUpdatedText(timestamp) {

		if(!timestamp) return null;

		let _updateDateTime = new Date(timestamp).toUTCString();

		return <View style={styles.lastUpdatedWrapper}>
			<Text style={styles.lastUpdatedText}>Last updated: {_updateDateTime}</Text>
		</View>
	}

	// Error message for bad request
    _showError = (message) => {

		const {refreshContent} = this.context;

		return <ErrorScreen 
			message={message} 
			defaultAction={refreshContent} 
		/>;
	};

	_renderContentPlaceHolder(){
		return <View style={styles.homePlaceHolderContainer}>
			<ActivityIndicator size="large"/>
		</View>
	}

	_renderContent() {

		const {loading, region, repError} = this.context;

		if(repError === true) return this._showError();
		
		// console.log('region:',region);
		if(Object.keys(region).length === 0) return this._renderContentPlaceHolder();

		const {updated, cases, recovered, deaths, critical, todayCases, todayDeaths, tests, testsPerOneMillion, casesPerOneMillion, deathsPerOneMillion} = region;

		console.log('region:', region);

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

		// TODO: Add last updated text at bottom of screen
		return <View style={styles.container}>
			<MainCounter value={numWithCommas(cases) } />
			<MajorCounters counters={_majorCounters} />
			<View style={{marginTop: 25}}>
				{_counterSections}
			</View>
			{this._regionSelectionPopup()}
			{this._lastUpdatedText(updated)}
		</View>;
	}

	render() {

		const {loading = false} = this.context;

		return <ScrollView 
			style={styles.container}
			contentContainerStyle={{flexGrow: 1}}
			showsVerticalScrollIndicator={false}>
				<Loader visible={loading}/>
				{this._renderContent()}
		</ScrollView>;
	}
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	homePlaceHolderContainer:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	majorCountersContainer:{
		// backgroundColor: '#e2e1e0',
		alignItems: 'center',
		marginTop: -40,
	},
	stayElevated: {
		width: '80%',
		height: 70,
		backgroundColor: 'white'
	},
	lastUpdatedWrapper:{
		alignItems: 'center',
		paddingBottom: 10,
	},
	lastUpdatedText:{
		fontSize: 13,
		color: '#9c9c9c',
	},
});