
'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    PickerIOS,
    PickerItemIOS
} = React;

var SCREEN_WIDTH = require('Dimensions').get('window').width;


var Component = React.createClass({
    findItemByValue: function (value) {   

        var ret = null

        this.props.items.forEach(s=> {
            if(s[this.props.valueField] === value) {
                ret = s;
            }
        });

        return ret;
    },

    show: function(){
        this.setState({modalVisible: true});
    },
    
    getInitialState: function(){
        return {
            items: this.props.items, // item : {value, label}
            color: this.props.color || '#007AFF',
            modalVisible: false,
            selectedItem: this.props.items[0]
        };
    },

    ok: function(){
        if(this.props.onSubmit){
            this.props.onSubmit(this.state.selectedItem);
        } 
        this.setState({modalVisible: false});
    },

    cancel: function() {
        this.setState({modalVisible: false});
    },

    pickerValueChanged: function (value) {
        var selectedItem = this.findItemByValue(value)
        this.setState({ selectedItem });
    },
    
    render: function() {
        return (
            <Modal
                animated={false}
                transparent={true}
                visible={this.state.modalVisible}>
                <View style={styles.basicContainer}>
                    <View style={styles.modalContainer}>
                        <View style={styles.buttonView}>

                            <TouchableOpacity onPress={this.cancel.bind(this)}>
                                <Text style={{color:this.state.color}}>İptal</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.ok.bind(this)}>
                                <Text style={{color:this.state.color}}>Tamam</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mainBox}>
                            {/*Model body*/}
                            <PickerIOS
                                ref={'picker'}
                                style={styles.bottomPicker}
                                selectedValue={this.state.selectedItem[this.props.valueField]}
                                onValueChange={this.pickerValueChanged}
                                >
                                {this.state.items.map((item, i) => {
                                    var value = item[this.props.valueField];
                                    var label = item[this.props.labelField];

                                    return (
                                        <PickerItemIOS
                                            value={value}
                                            label={label} />
                                    )
                                })}
                            </PickerIOS>
                        </View>

                    </View>
                </View>
            </Modal>
        );
    }
});

var styles = StyleSheet.create({
    basicContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer:{
        position:'absolute',
        bottom:0,
        right:0,
        left:0,
        width:SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        padding:0,
        backgroundColor: 'white'
    },
    buttonView:{
        width:SCREEN_WIDTH,
        padding: 8,
        borderTopWidth:0.5,
        borderTopColor:'lightGray',
        justifyContent: 'space-between',
        flexDirection:'row',
    },
    bottomPicker : {
        width:SCREEN_WIDTH
    },
    mainBox: {
    }
});

module.exports = Component;
