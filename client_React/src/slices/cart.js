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
        },
        newCartArray: (state, action) => {
            state.cartArray = action.payload;
        },
        addCartItem: (state, action) => {
            state.cartArray.push(action.payload) //הוספת מוצר למערך הקיים - לעגלה
        },
        removeCloseSpan: (state, action) => {
            const ArrayAfterRemoveElemntInCart = state.cartArray.filter((element) => element._id !== action.payload._id) // מוציאים מהמערך הקיים של הקארט את האלמנט שיש לו את אותו אי.די
            // action.payload --> האלמנט שאני רוצה למחוק 
            // פילטר - מוציא מהמערך את האלמנט ששווה ומשאיר את האלמנט ששונה לכן לרוב בפילטר יהיה שונה מ
            state.cartArray = [...ArrayAfterRemoveElemntInCart]  // דרך שעובדת בריאקט להשוות בין מערכים 
        }
    }
});

export const { increase, newCartArray, addCartItem , removeCloseSpan} = cartArraySlice.actions; //  שורה קבועה למעט השמות של הפונקציות בתוך הסוגריים ושם המשתנה לפני הנקודה.אקשיונס

export default cartArraySlice.reducer; // שורה קבועה למעט שם המשתנה