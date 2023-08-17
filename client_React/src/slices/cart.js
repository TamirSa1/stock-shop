import { createSlice } from "@reduxjs/toolkit"; // שורה שצריך להעתיק כפי שהיא

const initialState = { // שורה שצריך להעתיק כפי שהיא
    cartArray: [], // לא קבוע, יהיה על פי הסטייט שאני ארצה ליצור על פי שם משתנה שאבחר והערך שלו שיכול להיות מספר, סטרינג, בוליאן וכו
}
export const cartArraySlice = createSlice({ // שורה שצריך להעתיק כפי שהיא למעט השם משתנה שצריך לבחור
    name: 'cartArray', //  לרוב משתמשים בשם של הסטייט צריך לבחור איזה שם שארצה (לא משתמשים בשם הזה שוב) 
    initialState, // שורה שצריך להעתיק כפי שהיא
    reducers: { // שורה שצריך להעתיק כפי שהיא
        increase: (state, action) => { // השם של הרדיוס (פונקציה) משתנה והכמות על פי בחירה כל השאר סינטקס קבוע
            state.cartArray += action.payload; // state."name(from line 4)" action.payload -> קבוע. should write what the function do
        } ,
       newCartArray: (state, action) => {
        state.cartArray = action.payload;
       }, 
       addCartItem: (state, action) => {
        state.cartArray.push(action.payload) //הוספת מוצר למערך הקיים - לעגלה
       }
    }
});

export const { increase , newCartArray , addCartItem} = cartArraySlice.actions; //  שורה קבועה למעט השמות של הפונקציות בתוך הסוגריים ושם המשתנה לפני הנקודה.אקשיונס

export default cartArraySlice.reducer; // שורה קבועה למעט שם המשתנה