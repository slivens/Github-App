export default class NavigationUtil{
    static backTop(navigation){
        navigation.goBack();
    }
    static resetToHomePage(params){
        const {navigation}=params;
        navigation.navigate("Main");
    }
}