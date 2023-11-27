import { StyleSheet } from "react-native";



export const CustomColors = {
    White: "#FFFEFF",
    Bice_blue: "#1969A3",
    Persian_red: "#BB342F",
    Hunyadi_yellow: "#DDA448",
    Persian_green: "#23967F",
    Rich_black: "#0F1020",
    Giants_orange: "#FF5714",
    United_nations_blue: "#5899E2",
    Claret: "#840032",
    Robin_egg_blue: "#06BCC1",
    Ash_gray: "#C5D8D1",
    Isabeline: "#F4EDEA",
    Dark_purple: "#0F0326",
    Lavander_blush: "#EDE3E9",
    Engineering_orange: "#BA1200",
    Columbia_blue: "#C8E0F4",
    Baby_poweder: "#F4F4ED",
    Anti_flash_white: "#EDF2EF",

}

export const getStatusColor = (status: any) => {
    switch (status) {
        case 'PENDING':
            return CustomColors.Hunyadi_yellow;
        case 'DELIVERING':
            return CustomColors.United_nations_blue; // colorcustom
        case 'DELIVERED':
            return CustomColors.Persian_green;
        case 'CANCELED':
            return CustomColors.Claret;
        default:
            return CustomColors.United_nations_blue; // colorcustom
    }
};

const cicle = {
    position: "absolute",
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
};

export const getCircleStyle = (priority: number) => {
    switch (priority) {
        case 0:
            return CustomStyles.greencicle;
        case 1:
            return CustomStyles.yellowcicle;
        case 2:
            return CustomStyles.orangecicle;
        case 3:
            return CustomStyles.redcicle;
        default:
            return CustomStyles.greencicle;
    }
};


export const CustomStyles = StyleSheet.create({
    home: {
        backgroundColor: CustomColors.Anti_flash_white,
        height: "100%",
    },
    img: {
        backgroundColor: CustomColors.White,
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        resizeMode: "contain",
    },
    imgCart: {
        width: 120,
        height: 120,
        resizeMode: "contain",
    },
    textBrand: {
        color: CustomColors.Rich_black
    },
    textProduct: {
        color: CustomColors.Bice_blue
    },
    priorityText: {
        color: CustomColors.Rich_black,
        backgroundColor: CustomColors.White,
    },
    recipeTetx: {
        color: CustomColors.Robin_egg_blue
    },
    isVip: {
        color: CustomColors.Persian_green,
        fontWeight: "500",
    },
    buttontext: {
        color: CustomColors.Lavander_blush,
    },
    textMoney: {
        fontSize: 20,
        fontWeight: "bold",
        color: CustomColors.Dark_purple
    },
    detailButtton: {
        backgroundColor: CustomColors.Persian_green
    },
    cancelButton: {
        backgroundColor: CustomColors.Claret
    },
    redcicle: {
        ...cicle,
        backgroundColor: CustomColors.Claret,
    },
    greencicle: {
        ...cicle,
        backgroundColor: CustomColors.Persian_green,
    },
    yellowcicle: {
        ...cicle,
        backgroundColor: CustomColors.Hunyadi_yellow,
    },
    orangecicle: {
        ...cicle,
        backgroundColor: CustomColors.Persian_red,
    },
    setingCardColor: {
        backgroundColor: CustomColors.Bice_blue
    },
    separator: {
        height: 0.8,
        width: "100%",
        marginVertical: 8,
        backgroundColor: CustomColors.Bice_blue,
    },
    settingCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        width: "100%",
        paddingHorizontal: 12,
        alignItems: "flex-end",
    },
    arrowicon: {
        position: "absolute",
        // right: 0,

        left: 0,
        top: 0,
        // paddingLeft: 40,
        // gap: 10,
        alignItems: "flex-end",
        width: "100%",
        justifyContent: "space-evenly",
        // marginRight: 12,
        backgroundColor: "transparent"
    }




})
