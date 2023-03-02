import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { GoogleAuthProvider, FacebookAuthProvider, Unsubscribe, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp,  deleteApp } from "firebase/app";
import { getAnalytics, logEvent, setUserId, setUserProperties } from "firebase/analytics";
import { getFirestore, addDoc, collection, updateDoc, doc, onSnapshot, getDoc, DocumentData} from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Auth, getAuth, OAuthCredential, createUserWithEmailAndPassword, signInWithCredential, signInAnonymously, SignInMethod, signInWithPopup, signOut, UserCredential } from "firebase/auth";
import { HttpClientProvider } from "src/app/core";

export interface FirebaseDocument{
  id:string;
  data:DocumentData;
}

export interface FirestoreImages{

}
export const FIRESTORE_PLAYERS_COLLECTION = 'eteam-maker-players';
export const FIRESTORE_TEAMS_COLLECTION = 'eteam-maker-teams';
export const FIRESTORE_ROSTERS_COLLECTION = 'eteam-maker-rosters';
export const FIRESTORE_IMAGES_COLLECTION = 'eteam-maker-images';
export const FIRESTORAGE_PREFIX_PATH = 'eteam-maker-images';


@Injectable({providedIn: 'root'})
export abstract class FirebaseService{

  protected active=false;
  protected app:any;
  protected db:any;
  protected webStorage:any;
  protected auth:Auth;
  protected analytics = null;
  protected user:any;
  protected _isLogged = new BehaviorSubject<boolean>(false);
  public isLogged$ = this._isLogged.asObservable();

  public abstract init():any;
  public abstract imageUpload(blob: Blob): Promise<any>;
  public abstract createDocument(collectionName:string, data:any):Promise<string>;
  public abstract updateDocument(collectionName:string, document:string, data:any):Promise<void>;
  public abstract getDocuments(collectionName:string):Promise<FirebaseDocument[]>;
  public abstract getDocument(collectionName:string, document:string):Promise<FirebaseDocument>;
  public abstract getDocumentBy(collectionName:string, field:string, value:any):Promise<FirebaseDocument[]>;
  public abstract subscribeToCollection(collectionName:any, subject: BehaviorSubject<any[]>, mapFunction:(el:DocumentData)=>any):Unsubscribe
  public abstract setUserAndEmail(uid:string, email:string):any;
  public abstract createUserWithEmailAndPassword(email:string, password:string):any;
  public abstract connectUserWithEmailAndPassword(email:string, password:string):any;
  public abstract signOut():any;
  public abstract signOut(signInAnon:boolean):any;
  public abstract isUserConnected():Promise<boolean>;
  public abstract isUserConnectedAnonymously():Promise<boolean>;
  public abstract connectAnonymously():Promise<void>;
  public abstract deleteUser():Promise<void>;

}
