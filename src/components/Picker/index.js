import React, {useEffect, useState} from 'react'
import { View, Text, Modal, Image, StyleSheet, ScrollView, FlatList, SafeAreaView, TouchableWithoutFeedback } from 'react-native'

import { Ionicons } from '@expo/vector-icons';
import ElevatedView from 'react-native-elevated-view';

import styles from './style';

const ITEM_HEIGHT = 47;
const ITEM_SEPARATOR_HEIGHT = 1;

// TODO: Make Picker FullScreen and search
// TODO: Implement PURE Component
const Picker = (props) => {
    let listRef;

    const {display, close, options, selected = 0, onSelection, mainColor} = props;

    const [listingOptions, setListingOptions] = useState(options);

    useEffect(()=>{
        
        // Excluding Selected Region
        setListingOptions(options.filter((item, index) => index !== selected ));

    }, [selected]);

    const getCountryCode = ({code, name}) => code ? code: name;

    const itemSeparator = () => <View style={styles.pickerItemSeparatorWrapper}>
        <View style={[styles.pickerItemSeparator, {height: ITEM_SEPARATOR_HEIGHT}]}></View>
    </View>;

    // TODO: Implement Selected item Feature
    const pickerItem = ({item}, isSelected = false) => {
        const {code, name, flag} = item;

        let _itemSelected = isSelected;
        let _countryCode = getCountryCode(item);

        const _itemStyles = [styles.pickerItem, {height: ITEM_HEIGHT}];
        if(_itemSelected) _itemStyles.push(styles.pickerItemSelected);

        const _itemTextStyles = [styles.pickerItemText];
        // if(_itemSelected) _itemTextStyles.push({color: mainColor});

        const _itemTextWrapperStyles = [styles.pickerItemTextWrapper];
        if(_itemSelected) _itemTextWrapperStyles.push({width: '76%'});

        let _itemName = <View style={_itemTextWrapperStyles}>
            <Text style={_itemTextStyles} numberOfLines={1} ellipsizeMode='tail'>{name}</Text>
        </View>;

        let _flagImage = flag ? <View style={styles.pickerItemImageWrapper}>
                <Image style={styles.pickerItemImage} source={{uri: flag}} />
                {/* <Image style={styles.pickerItemImage} source={{uri: 'https://cdn.countryflags.com/thumbs/sweden/flag-round-250.png'}} /> */}
                {/* <Image style={styles.pickerItemImage} source={{uri: `https://cdn.countryflags.com/thumbs/${name.toLowerCase()}/flag-round-250.png`}} /> */}
            </View> : null;

        let _itemContent = <View style={_itemStyles}>
            {_flagImage}{_itemName}
            { _itemSelected ? <View style={styles.pickerItemSelectedIcon}>
                    <Ionicons name="md-checkmark" size={28} color={mainColor} />
                </View> : null
            }
        </View>;

        let _itemContentWrapped = <View style={styles.pickerItemWrapper}>{_itemContent}</View>
        // if(_itemSelected){
        //     _itemContentWrapped = <ElevatedView style={styles.pickerItemWrapper} elevation={0}>
        //         {_itemContent}
        //     </ElevatedView>
        // }

        return <TouchableWithoutFeedback key={_countryCode} onPress={() => onSelection(_countryCode)}>
            {_itemContentWrapped}
        </TouchableWithoutFeedback>
    };

    const renderSelected = () => {
        let _selectedOption = options.find((item, index) => selected === index );

        if(!_selectedOption || Object.keys(_selectedOption).length === 0) return null;

        // console.log('_selectedOption', _selectedOption);

        return <View style={styles.pickerItemSelectedContainer}>
            <Text style={[styles.groupTitle, {marginBottom: 10}]}>Selected</Text>
            {pickerItem({item: _selectedOption}, true)}
            <Text style={[styles.groupTitle, {marginTop: 20,}]}>All Regions</Text>
        </View>;
    };

    // TODO: Implement loading indicator
    const renderListing = () => {

        return <View style={styles.pickerContent}>
            {/* {renderSelected()} */}
            <SafeAreaView>
                <FlatList
                    ref={ ref => listRef = ref }
                    persistentScrollbar={true}
                    data={listingOptions}
                    ListHeaderComponent={renderSelected()}
                    renderItem={pickerItem}
                    keyExtractor={getCountryCode}
                    ItemSeparatorComponent={itemSeparator}
                    getItemLayout={(data, index) => ({length: ITEM_HEIGHT, offset: (ITEM_HEIGHT + ITEM_SEPARATOR_HEIGHT) * index, index})}
                />
            </SafeAreaView>
        </View>
    }

    const renderContent = () => {

        return <View style={styles.picker}>
            <TouchableWithoutFeedback onPress={close}><View style={styles.pickerOverlay}></View></TouchableWithoutFeedback>
            <View style={styles.pickerWrapper}>
                <View style={styles.pickerHeader}>
                    <Text style={styles.pickerHeaderText}>Choose your Region</Text>
                </View>
                {renderListing()}
                <View style={styles.pickerFooter}>
                    <TouchableWithoutFeedback onPress={close}>
                        <View style={[styles.cancelButton, {backgroundColor: mainColor}]}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>;
    }
 
    return <Modal
			animationType="fade"
			transparent={true}
			visible={display}
			onRequestClose={() => {}}
		>
			{ renderContent() }
		</Modal>
}

export default Picker;