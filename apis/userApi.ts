"use server";
// Import the functions you need from the SDKs you need
import { FirebaseError, initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import "firebase/compat/auth";
import { headers } from "next/headers";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB7seCnJU4kFGqh0tZtEKj7mvMAmI6vrHo",
    authDomain: "intern-b6fe6.firebaseapp.com",
    projectId: "intern-b6fe6",
    storageBucket: "intern-b6fe6.appspot.com",
    messagingSenderId: "900068023995",
    appId: "1:900068023995:web:2c32b51a269985cc3a939e"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);
const backendUrl = process.env.BACKEND_URL
//THis is for testing the FE with Firebase emulator
// if(headers().get('host') === "localhost:3000")
//     auth.useEmulator("http://127.0.0.1:9099");
export async function login(formData: FormData) {
    return await auth.signInWithEmailAndPassword(formData.get("email")?.toString() ?? "", formData.get("password")?.toString() ?? "").then(async (value) => {
        const token = await auth.currentUser?.getIdToken()
        return { id: auth.currentUser?.uid, token: token }
    }).catch((error) => {
        console.log(error)
        if (error instanceof FirebaseError) {
            if (error.code == "auth/invalid-credential")
                throw new Error("Wrong email or password ")
            //This help if we want to handle other error
            throw new Error("Unknown Firebase error")
        }
        throw new Error("Unknown error")
    })
}
export async function signup(formData: FormData) {
    return await auth.createUserWithEmailAndPassword(formData.get("email")?.toString() ?? "", formData.get("password")?.toString() ?? "").then(async (value) => {
        const token = await auth.currentUser?.getIdToken()
        const data = { "email": formData.get("email"), "name": "Unknown", "dateOfBirth": new Date().toISOString() }
        const result = await fetch(backendUrl + "/create-user", { method: "POST", body: JSON.stringify(data), headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" } })
        if (result.status == 200)
            return { id: auth.currentUser?.uid, token: token }
        throw new Error("Server Error")
    }).catch((error) => {
        if (error instanceof FirebaseError) {
            console.log(error)
            if (error.code == "auth/invalid-email")
                throw new Error("The email is invalid")
            if (error.code == 'auth/missing-password')
                throw new Error("The password is missing")
            if (error.code == 'auth/email-already-in-use')
                throw new Error("The email is already in use")
            //This help if we want to handle other error
            throw new Error("Unknown Firebase error")

        }
        throw new Error("Unknown error")
    })

}

export async function getUserData(token: string) {
    const backend_url = process.env.BACKEND_URL;
    return await fetch(`${backend_url}/fetch-user-data`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}