import { configureStore } from '@reduxjs/toolkit'; // שורה שצריך להעתיק כפי שהיא
import cartArrayReducer from "../slices/cart"; // כל קובץ שיש בסלייסס מקבל אימפורט משלו השם משתנה פלוס רדיוסר

export const store = configureStore({ // שורה שצריך להעתיק כפי שהיא
    reducer: { // שורה שצריך להעתיק כפי שהיא
        cartStore: cartArrayReducer, // כל אימפורט מקבל שם שאני בוחר נקודותיים והאימפורט שעשיתי (אובייקט) השם שיופיע בקומפוננטה שבה ארצה להעביר את המידע

    }, // שורה שצריך להעתיק כפי שהיא
}); // שורה שצריך להעתיק כפי שהיא