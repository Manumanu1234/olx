
import { initializeApp } from "firebase/app";
import 'firebase/auth'
import 'firebase/storage'
        var firebaseConfig = {
            apiKey: "AIzaSyAhXH29-LnyIYuQOESGpQC5xh1wJIZJRpY",
            authDomain: "fir-ae12d.firebaseapp.com",
            projectId: "fir-ae12d",
            storageBucket: "fir-ae12d.appspot.com",
            messagingSenderId: "558571414389",
            appId: "1:558571414389:web:80db616f412dff30bc293c",
            measurementId: "G-NCCKWES0NK"
          };
        export const Firebase = initializeApp(firebaseConfig)