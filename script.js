// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase,ref as dbRef,update,get } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { getStorage, ref as storageRef, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDt8m3HYqsdARjZxpc8j31Gjhk4n32KFiA",
    authDomain: "database-internet-of-vehicles.firebaseapp.com",
    databaseURL: "https://database-internet-of-vehicles-default-rtdb.firebaseio.com",
    projectId: "database-internet-of-vehicles",
    storageBucket: "database-internet-of-vehicles.appspot.com",
    messagingSenderId: "821975788301",
    appId: "1:821975788301:web:cb618dffdf320fea6a5e44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

var InputText = document.getElementById("InputData");
var submitButton = document.getElementById("InputButton")

submitButton.addEventListener("click", inputdata);
function inputdata(value){
    var str = "";
    str = InputText.value;
    InputText.value = "";
    console.log(str);
    const newdata = {str};
    const path = "/Inputdata";
    const dbref = dbRef(db, `/${path}`);
    update(dbref, newdata).then(() => {
        console.log("上傳成功");
    }).catch((error) => {
        console.log("上傳失敗")})
}

var PrintLabel = document.getElementById("PrintInputData");
var printButton = document.getElementById("PrintButton");

printButton.addEventListener("click", printdata);
function printdata(){
    var str = "";
    const path = "/Inputdata";
    const dbref = dbRef(db, `/${path}`);
    get(dbref).then((snapshot) => {
        if(snapshot.exists()){
            const data = snapshot.val();
            str = data.str;
            PrintLabel.innerText = str;
            console.log("取得成功")
        }
    })
}

var clearButton = document.getElementById("ClearButton");

clearButton.addEventListener("click", clearlabel);
function clearlabel(){
    PrintLabel.innerHTML = "尚未有輸入";
}

var ImgSelector = document.getElementById("ImageSelect");
var imgDisplay = document.getElementById("ImageDisplay");

function populateImageSelector() {
    const storageFolderRef = storageRef(storage, "images/"); // 假設圖片存放在 "images/" 資料夾
    listAll(storageFolderRef)
        .then((res) => {
            res.items.forEach((itemRef) => {
                getDownloadURL(itemRef).then((url) => {
                    const option = document.createElement("option");
                    option.value = url;
                    option.textContent = itemRef.name; // 顯示檔案名稱
                    ImgSelector.appendChild(option);
                });
            });
        })
        .catch((error) => {
            console.error("無法列出檔案: ", error);
        });
}

// 當用戶選擇圖片時更新顯示
ImgSelector.addEventListener("change", () => {
    const selectedImageUrl = ImgSelector.value;
    if (selectedImageUrl) {
        imgDisplay.src = selectedImageUrl;
    } else {
        imgDisplay.src = "";
    }
});

// 呼叫函數初始化選擇器
populateImageSelector();