# React-Native-FMPicker
A PickerIOS that will show at the bottom of the window

### Screenshot
![screen shot](https://raw.githubusercontent.com/peter4k/React-Native-FMPicker/master/screenshot.png)

### Alternate version
Altered the structure of the compoment for more flexibility. 
You can pass items as object arrays.
And also onSubmit returns the object itself.

```
// cities: [ {name: 'İstanbul', city_code: 34}, {name: 'İzmir', city_code: 35} ];
// 

<FMPicker ref={'pickerCities'} 
	items={this.state.cities} 
	valueField="city_code" 
	labelField="name"
	onSubmit={ (city)=> this.citySelected(city) } 
	/>
	```