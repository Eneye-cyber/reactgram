import { Client, Account, Databases, Storage, Avatars} from 'appwrite'

const env = import.meta.env

export const appwriteConfig = {
    projectId: env.VITE_APPWRITE_PROJECT_ID,
    url: env.VITE_APPWRITE_URL,
    databaseId: env.VITE_APPWRITE_DATABASE_ID,
    storageId: env.VITE_APPWRITE_STORAGE_ID,
    userCollectionId: env.VITE_APPWRITE_USER_COLLECTION_ID,
    postCollectionId: env.VITE_APPWRITE_POST_COLLECTION_ID,
    savesCollectionId: env.VITE_APPWRITE_SAVES_COLLECTION_ID,
}
// Instantiate client
export const client = new Client();
// Configure client
client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);

//use client as argument for other imports
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);